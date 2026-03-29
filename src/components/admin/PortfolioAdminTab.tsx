import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminPreviewPortfolioProvider } from '../../contexts/AdminPreviewPortfolioContext'
import { useSiteContent } from '../../contexts/SiteContentContext'
import type { PortfolioContent, PortfolioSectionId } from '../../data/siteContentTypes'
import { AboutMeCard } from '../bento/cards/AboutMeCard'
import { EducationCard } from '../bento/cards/EducationCard'
import { ExperienceCard } from '../bento/cards/ExperienceCard'
import { FeaturedProjectCard } from '../bento/cards/FeaturedProjectCard'
import { SkillsExpertiseCard } from '../bento/cards/SkillsExpertiseCard'
import { SummaryObjectiveCard } from '../bento/cards/SummaryObjectiveCard'
import { adminSurfaceClass, adminThreeColumnGridClass } from './adminTheme'
import { PORTFOLIO_SECTIONS } from './portfolioSectionMeta'
import type { PortfolioSectionMeta } from './portfolioSectionMeta'
import { PortfolioSectionForm } from './PortfolioSectionForm'

function portfolioSectionDisplayLabel(
  s: PortfolioSectionMeta,
  draft: PortfolioContent,
): string {
  if (s.id === 'featuredEco') {
    const t = draft.featuredEco.title.trim()
    return t || s.label
  }
  if (s.id === 'featuredSecure') {
    const t = draft.featuredSecure.title.trim()
    return t || s.label
  }
  return s.label
}

function clonePortfolio(p: PortfolioContent): PortfolioContent {
  return structuredClone(p)
}

export function PortfolioAdminTab() {
  const { siteContent, setPortfolio } = useSiteContent()
  const [sectionId, setSectionId] = useState<PortfolioSectionId>('about')
  const [draft, setDraft] = useState<PortfolioContent>(() =>
    clonePortfolio(siteContent.portfolio),
  )
<<<<<<< HEAD
=======
  const resumeFileRef = useRef<HTMLInputElement>(null)
  const [hasServerResume, setHasServerResume] = useState<boolean | null>(null)
  const [resumeUploading, setResumeUploading] = useState(false)
  const [resumeFeedback, setResumeFeedback] = useState<{
    type: 'ok' | 'err'
    text: string
  } | null>(null)
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)

  // Keep draft in sync when server content updates after load/save.
  useEffect(() => {
    setDraft(clonePortfolio(siteContent.portfolio))
  }, [siteContent.portfolio])

  const meta = useMemo(
    () => PORTFOLIO_SECTIONS.find((s) => s.id === sectionId),
    [sectionId],
  )

  const resetDraft = useCallback(() => {
    setDraft(clonePortfolio(siteContent.portfolio))
  }, [siteContent.portfolio])

  const save = useCallback(() => {
    setPortfolio(clonePortfolio(draft))
  }, [draft, setPortfolio])

  const exportJson = useCallback(() => {
    const exportData = {
      ...siteContent,
      portfolio: draft,
    }
    downloadJson('siteContent.json', exportData)
  }, [draft, siteContent])

<<<<<<< HEAD
=======
  useEffect(() => {
    if (sectionId !== 'about') return
    let cancelled = false
    setResumeFeedback(null)
    fetchResumeOnServer().then((v) => {
      if (!cancelled) setHasServerResume(v)
    })
    return () => {
      cancelled = true
    }
  }, [sectionId])

  const onResumeFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setResumeFeedback(null)
    setResumeUploading(true)
    try {
      await uploadResumePdfToServer(file)
      setHasServerResume(true)
      setResumeFeedback({
        type: 'ok',
        text: 'Resume saved. The Download Resume link on the site uses this file.',
      })
    } catch (err) {
      setResumeFeedback({
        type: 'err',
        text: err instanceof Error ? err.message : 'Upload failed.',
      })
    } finally {
      setResumeUploading(false)
    }
  }, [])

>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
  return (
    <div
      className={`${adminSurfaceClass} flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl p-3`}
    >
      <div className={`${adminThreeColumnGridClass} min-h-0 flex-1`}>
        {/* Sidebar — 25% */}
        <aside className="flex shrink-0 flex-col gap-2 overflow-visible rounded-xl bg-white p-4 shadow-sm shadow-slate-900/5 lg:p-4">
          <h2 className="text-sm font-semibold text-[#0f172a]">Sections</h2>
          <nav className="flex flex-col items-stretch gap-1.5 overflow-visible pr-0.5">
            {PORTFOLIO_SECTIONS.map((s) => {
              const active = s.id === sectionId
              const Icon = s.Icon
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSectionId(s.id)}
                  className={`flex w-full cursor-pointer items-center gap-2.5 py-2 pl-3 pr-4 text-left text-sm transition ${active
                    ? `${s.activeBgClass} rounded-l-none rounded-r-full font-semibold text-[#0f172a] shadow-sm shadow-slate-900/5`
                    : 'rounded-none text-[#64748b] hover:bg-slate-100/85 hover:rounded-l-none hover:rounded-r-full'
                    }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${active ? 'opacity-90' : 'opacity-70'}`}
                    strokeWidth={1.65}
                  />
                  <span className="min-w-0 flex-1 truncate leading-snug">
                    {portfolioSectionDisplayLabel(s, draft)}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Form — half of remaining 75% (scrollable incl. actions) */}
        <section className="flex min-h-[280px] flex-col overflow-hidden rounded-xl bg-white shadow-sm shadow-slate-900/5 lg:min-h-0">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 lg:p-5">
            <h2 className="text-lg font-bold leading-tight text-[#0f172a] sm:text-xl">
              {meta ? portfolioSectionDisplayLabel(meta, draft) : 'Section'}
            </h2>
            <p className="mt-1 text-sm text-[#94a3b8]">
              Update fields below. Preview updates in real time.
            </p>
            <div className="mt-6">
              <PortfolioSectionForm
                sectionId={sectionId}
                draft={draft}
                setDraft={setDraft}
              />
            </div>
<<<<<<< HEAD
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
    <button
      type="button"
      onClick={exportJson}
      className="cursor-pointer rounded-xl border border-slate-200/90 bg-white px-5 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-slate-50"
      title="Download siteContent.json, replace public/siteContent.json, then redeploy."
    >
      Export JSON
    </button>
=======
          <div className="mt-8 flex flex-col gap-3 border-t border-[#f1f5f9] pt-5">
      <div className="flex flex-wrap gap-3">
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
        {sectionId === 'about' ? (
          <>
            <input
              ref={resumeFileRef}
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              aria-label="Upload PDF resume"
              onChange={onResumeFileChange}
            />
            <button
              type="button"
              disabled={resumeUploading}
              onClick={() => resumeFileRef.current?.click()}
              className="cursor-pointer rounded-xl border border-slate-200/90 bg-white px-5 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              title="Stored in the database (Turso). Max 8 MB."
            >
              {resumeUploading ? 'Uploading…' : 'Upload PDF resume'}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={exportJson}
            className="cursor-pointer rounded-xl border border-slate-200/90 bg-white px-5 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-slate-50"
            title="Download siteContent.json, replace public/siteContent.json, then redeploy."
          >
            Export JSON
          </button>
        )}
      </div>
      {sectionId === 'about' ? (
        <div className="text-xs leading-relaxed text-[#64748b]">
          {resumeFeedback ? (
            <p
              className={
                resumeFeedback.type === 'ok' ? 'text-emerald-800' : 'text-red-600'
              }
            >
              {resumeFeedback.text}
            </p>
          ) : hasServerResume ? (
            <p>A PDF resume is stored on the server for downloads.</p>
          ) : (
            <p>
              No server resume yet. Downloads use{' '}
              <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">/resume.pdf</code>{' '}
              or a legacy browser upload if present.
            </p>
          )}
        </div>
      ) : null}
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
    </div>
  </div>
      </section >

    {/* Preview — half of remaining 75%, off-white surface */ }
    < section
  className = {`flex min-h-[280px] flex-col overflow-hidden rounded-xl lg:min-h-0 ${adminSurfaceClass} shadow-sm shadow-slate-900/5 ring-1 ring-slate-200/60`
}
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
          <AdminPreviewPortfolioProvider value={draft}>
            <div className="mx-auto w-full max-w-[380px]">
              {sectionId === 'about' ? <AboutMeCard /> : null}
              {sectionId === 'summary' ? <SummaryObjectiveCard /> : null}
              {sectionId === 'experience' ? <ExperienceCard /> : null}
              {sectionId === 'education' ? <EducationCard /> : null}
              {sectionId === 'skills' ? (
                <SkillsExpertiseCard showExploringFooter />
              ) : null}
              {sectionId === 'featuredEco' ? (
                <FeaturedProjectCard
                  variant="home"
                  project="eco"
                  onGoProjects={() => {}}
                />
              ) : null}
              {sectionId === 'featuredSecure' ? (
                <FeaturedProjectCard
                  variant="home"
                  project="secure"
                  onGoProjects={() => {}}
                />
              ) : null}
            </div>
          </AdminPreviewPortfolioProvider>
        </div>
      </section >
      </div >
    </div >
  )
}
