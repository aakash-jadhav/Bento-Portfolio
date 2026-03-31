import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { IconName } from '../bento/Icon'
import { Select, TagsInput } from '@mantine/core'
import {
  getProjectSidebarActiveBgForTone,
  ProjectGridCard,
} from '../bento/cards/ProjectGridCard'
import type { TagTone } from '../bento/types'
import { useSiteContent } from '../../contexts/SiteContentContext'
import type { ProjectEditorEntry } from '../../data/siteContentTypes'
import { adminInputClass, adminSurfaceClass, adminThreeColumnGridClass } from './adminTheme'

const PROJECT_TONE_OPTIONS = [
  'purple',
  'pink',
  'green',
  'beige',
  'blue',
  'about',
  'skills',
  'resume',
  'neutral',
] as const satisfies readonly TagTone[]

const TONE_SELECT_DATA = PROJECT_TONE_OPTIONS.map((t) => ({
  value: t,
  label: t.charAt(0).toUpperCase() + t.slice(1),
}))

const ICON_OPTIONS: IconName[] = [
  'server',
  'code',
  'mobile',
  'folder',
  'spark',
]

function cloneProjects(p: ProjectEditorEntry[]): ProjectEditorEntry[] {
  return structuredClone(p)
}

function reorderProjects(
  items: ProjectEditorEntry[],
  startIndex: number,
  endIndex: number,
): ProjectEditorEntry[] {
  return arrayMove(items, startIndex, endIndex)
}

function SortableSidebarItem({
  id,
  active,
  title,
  tone,
  onClick,
}: {
  id: string
  active: boolean
  title: string
  tone: TagTone
  onClick: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const previewMatchBg = getProjectSidebarActiveBgForTone(tone)

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      type="button"
      onClick={onClick}
      className={`flex w-full items-center py-2 pl-3 pr-4 text-left text-sm font-medium transition cursor-grab active:cursor-grabbing ${active
        ? `${previewMatchBg} rounded-l-none rounded-r-full font-semibold text-slate-900 shadow-sm shadow-slate-900/5`
        : 'rounded-none text-[#64748b] hover:bg-slate-100/85 hover:rounded-l-none hover:rounded-r-full'
        } ${isDragging ? 'opacity-85' : ''}`}
    >
      <span className="min-w-0 flex-1 truncate">{title}</span>
    </button>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}

const inputClass = adminInputClass

export function ProjectsAdminTab() {
  const { siteContent, setProjects } = useSiteContent()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [draft, setDraft] = useState<ProjectEditorEntry[]>(() =>
    cloneProjects(siteContent.projects),
  )

  // Ensure admin UI reflects the latest `public/siteContent.json` after fetch.
  useEffect(() => {
    queueMicrotask(() => {
      setDraft(cloneProjects(siteContent.projects))
    })
  }, [siteContent.projects])

  useEffect(() => {
    queueMicrotask(() => {
      if (selectedIndex >= draft.length) {
        setSelectedIndex(Math.max(0, draft.length - 1))
      }
    })
  }, [draft.length, selectedIndex])

  const safeIndex = Math.min(selectedIndex, Math.max(0, draft.length - 1))
  const selected = draft[safeIndex]

  const updateSelected = useCallback(
    (partial: Partial<ProjectEditorEntry>) => {
      setDraft((rows) =>
        rows.map((row, i) => (i === safeIndex ? { ...row, ...partial } : row)),
      )
    },
    [safeIndex],
  )

  const resetDraft = useCallback(() => {
    setDraft(cloneProjects(siteContent.projects))
  }, [siteContent.projects])

  const save = useCallback(() => {
    setProjects(cloneProjects(draft))
  }, [draft, setProjects])

  const titleList = useMemo(
    () => draft.map((p) => p.title || 'Untitled'),
    [draft],
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const sourceIndex = Number(active.id)
      const destinationIndex = Number(over.id)
      if (
        Number.isNaN(sourceIndex) ||
        Number.isNaN(destinationIndex) ||
        sourceIndex === destinationIndex
      ) {
        return
      }

      setDraft((prev) => reorderProjects(prev, sourceIndex, destinationIndex))

      setSelectedIndex((prevSelected) => {
        if (prevSelected === sourceIndex) return destinationIndex

        // Keep active selection tied to the same project when another row moves around it.
        if (
          sourceIndex < prevSelected &&
          destinationIndex >= prevSelected
        ) {
          return prevSelected - 1
        }
        if (
          sourceIndex > prevSelected &&
          destinationIndex <= prevSelected
        ) {
          return prevSelected + 1
        }
        return prevSelected
      })
    },
    [setDraft, setSelectedIndex],
  )

  if (!selected) {
    return (
      <p className="p-6 text-sm text-[#94a3b8]">No projects to edit.</p>
    )
  }

  return (
    <div
      className={`${adminSurfaceClass} flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl p-3`}
    >
      <div className={`${adminThreeColumnGridClass} min-h-0 flex-1`}>
        <aside className="flex shrink-0 flex-col gap-2 overflow-visible rounded-xl bg-white p-4 shadow-sm shadow-slate-900/5 lg:p-4">
          <h2 className="text-sm font-semibold text-[#0f172a]">Projects</h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={draft.map((_, idx) => String(idx))}
              strategy={verticalListSortingStrategy}
            >
              <nav className="flex flex-col items-stretch gap-1.5 overflow-visible pr-0.5">
                {titleList.map((title, idx) => (
                  <SortableSidebarItem
                    key={`${title}-${idx}`}
                    id={String(idx)}
                    active={idx === safeIndex}
                    title={title}
                    tone={draft[idx].tone}
                    onClick={() => setSelectedIndex(idx)}
                  />
                ))}
              </nav>
            </SortableContext>
          </DndContext>
        </aside>

        <section className="flex min-h-[280px] flex-col overflow-hidden rounded-xl bg-white shadow-sm shadow-slate-900/5 lg:min-h-0">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 lg:p-5">
            <h2 className="text-lg font-bold leading-tight text-[#0f172a] sm:text-xl">
              {selected.title}
            </h2>
            <p className="mt-1 text-sm text-[#94a3b8]">Edit project details for the grid.</p>
            <div className="mt-6 space-y-4">
              <Field label="Title">
                <input
                  className={inputClass}
                  value={selected.title}
                  onChange={(e) => updateSelected({ title: e.target.value })}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className={`${inputClass} min-h-[100px] resize-y`}
                  value={selected.description}
                  onChange={(e) => updateSelected({ description: e.target.value })}
                />
              </Field>
              <Field label="Tags (comma-separated)">
                <TagsInput
                  value={selected.tags}
                  onChange={(nextTags) => updateSelected({ tags: nextTags })}
                  placeholder="Add a tag and press Enter"
                  data={[]}
                  classNames={{
                    root: 'bg-[#f1f5f9] border-0 rounded-2xl',
                    input: 'bg-[#f1f5f9] border-0',
                    section: 'bg-transparent',
                    pill: 'bg-[#f1f5f9] border border-black/8 text-[#0f172a]',
                    inputField: 'bg-[#f1f5f9] border-0',
                    pillsList: 'gap-2',
                  }}
                />
              </Field>
              <Field label="Code link">
                <input
                  className={inputClass}
                  type="url"
                  inputMode="url"
                  placeholder="https://github.com/…"
                  value={selected.codeUrl}
                  onChange={(e) => updateSelected({ codeUrl: e.target.value })}
                />
              </Field>
              <Field label="Visit link">
                <input
                  className={inputClass}
                  type="url"
                  inputMode="url"
                  placeholder="https://…"
                  value={selected.demoUrl}
                  onChange={(e) => updateSelected({ demoUrl: e.target.value })}
                />
              </Field>
              <Field label="Tone">
                <Select
                  data={TONE_SELECT_DATA}
                  value={selected.tone}
                  onChange={(v) => v && updateSelected({ tone: v as TagTone })}
                  allowDeselect={false}
                  comboboxProps={{ withinPortal: true }}
                  classNames={{
                    input: inputClass,
                    section: 'bg-transparent',
                  }}
                />
              </Field>
              <Field label="Icon">
                <select
                  className={inputClass}
                  value={selected.icon}
                  onChange={(e) =>
                    updateSelected({ icon: e.target.value as IconName })
                  }
                >
                  {ICON_OPTIONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 border-t border-[#f1f5f9] pt-5">
              <button
                type="button"
                onClick={save}
                className="cursor-pointer rounded-xl bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={resetDraft}
                className="cursor-pointer rounded-xl border border-slate-200/90 bg-[#f1f5f9] px-5 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-[#e2e8f0]"
              >
                Cancel
              </button>
            </div>
          </div>
        </section>

        <section
          className={`flex min-h-[280px] flex-col overflow-hidden rounded-xl lg:min-h-0 ${adminSurfaceClass} shadow-sm shadow-slate-900/5 ring-1 ring-slate-200/60`}
        >
          <div className="shrink-0 rounded-t-xl bg-white px-4 py-3.5 lg:px-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold tracking-tight text-[#0f172a]">
                Live preview
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/90 bg-emerald-50/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                Auto-syncing
              </span>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-3 lg:px-5 lg:pb-5">
            <div className="mx-auto w-full max-w-[380px]">
              <ProjectGridCard {...draft[safeIndex]} onCopy={() => { }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
