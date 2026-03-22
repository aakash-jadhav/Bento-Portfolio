import type { Dispatch, SetStateAction } from 'react'
import type { PortfolioContent, PortfolioSectionId } from '../../data/siteContentTypes'
import { adminInputClass } from './adminTheme'

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

export function PortfolioSectionForm({
  sectionId,
  draft,
  setDraft,
}: {
  sectionId: PortfolioSectionId
  draft: PortfolioContent
  setDraft: Dispatch<SetStateAction<PortfolioContent>>
}) {
  const patch = (partial: Partial<PortfolioContent>) =>
    setDraft((d) => ({ ...d, ...partial }))

  switch (sectionId) {
    case 'about': {
      const a = draft.about
      return (
        <div className="space-y-4">
          <Field label="Full name">
            <input
              className={inputClass}
              value={a.name}
              onChange={(e) => patch({ about: { ...a, name: e.target.value } })}
            />
          </Field>
          <Field label="Professional title">
            <input
              className={inputClass}
              value={a.title}
              onChange={(e) => patch({ about: { ...a, title: e.target.value } })}
            />
          </Field>
          <Field label="Email">
            <input
              className={inputClass}
              type="email"
              value={a.email}
              onChange={(e) => patch({ about: { ...a, email: e.target.value } })}
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputClass}
              value={a.phone}
              onChange={(e) => patch({ about: { ...a, phone: e.target.value } })}
            />
          </Field>
          <Field label="Location">
            <input
              className={inputClass}
              value={a.location}
              onChange={(e) => patch({ about: { ...a, location: e.target.value } })}
            />
          </Field>
        </div>
      )
    }
    case 'summary': {
      const s = draft.summary
      return (
        <div className="space-y-4">
          <Field label="Headline">
            <input
              className={inputClass}
              value={s.headline}
              onChange={(e) => patch({ summary: { ...s, headline: e.target.value } })}
            />
          </Field>
          <Field label="Biography">
            <textarea
              className={`${inputClass} min-h-[120px] resize-y`}
              value={s.body}
              onChange={(e) => patch({ summary: { ...s, body: e.target.value } })}
            />
          </Field>
        </div>
      )
    }
    case 'experience': {
      const x = draft.experience
      return (
        <div className="space-y-4">
          <Field label="Years / tenure">
            <input
              className={inputClass}
              value={x.years}
              onChange={(e) => patch({ experience: { ...x, years: e.target.value } })}
            />
          </Field>
          <Field label="Role label">
            <input
              className={inputClass}
              value={x.role}
              onChange={(e) => patch({ experience: { ...x, role: e.target.value } })}
            />
          </Field>
          <Field label="Footer line">
            <input
              className={inputClass}
              value={x.footer}
              onChange={(e) => patch({ experience: { ...x, footer: e.target.value } })}
            />
          </Field>
        </div>
      )
    }
    case 'education': {
      const e = draft.education
      return (
        <div className="space-y-4">
          <Field label="Degree">
            <input
              className={inputClass}
              value={e.degree}
              onChange={(ev) => patch({ education: { ...e, degree: ev.target.value } })}
            />
          </Field>
          <Field label="School">
            <input
              className={inputClass}
              value={e.school}
              onChange={(ev) => patch({ education: { ...e, school: ev.target.value } })}
            />
          </Field>
          <Field label="Meta line">
            <input
              className={inputClass}
              value={e.meta}
              onChange={(ev) => patch({ education: { ...e, meta: ev.target.value } })}
            />
          </Field>
        </div>
      )
    }
    case 'skills': {
      const sk = draft.skills
      return (
        <div className="space-y-6">
          {sk.groups.map((g, gi) => (
            <div
              key={gi}
              className="rounded-2xl border border-black/5 bg-white/80 p-4"
            >
              <Field label={`Group ${gi + 1} title`}>
                <input
                  className={inputClass}
                  value={g.title}
                  onChange={(e) => {
                    const next = sk.groups.map((row, i) =>
                      i === gi ? { ...row, title: e.target.value } : row,
                    )
                    patch({ skills: { groups: next } })
                  }}
                />
              </Field>
              <div className="mt-3">
                <Field label="Tags (comma-separated)">
                  <input
                    className={inputClass}
                    value={g.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                      const next = sk.groups.map((row, i) =>
                        i === gi ? { ...row, tags } : row,
                      )
                      patch({ skills: { groups: next } })
                    }}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      )
    }
    case 'featuredEco':
    case 'featuredSecure': {
      const key = sectionId === 'featuredEco' ? 'featuredEco' : 'featuredSecure'
      const f = draft[key]
      return (
        <div className="space-y-4">
          <Field label="Section label">
            <input
              className={inputClass}
              value={f.headerLabel}
              onChange={(e) =>
                patch({ [key]: { ...f, headerLabel: e.target.value } } as Partial<PortfolioContent>)
              }
            />
          </Field>
          <Field label="Project title">
            <input
              className={inputClass}
              value={f.title}
              onChange={(e) =>
                patch({ [key]: { ...f, title: e.target.value } } as Partial<PortfolioContent>)
              }
            />
          </Field>
          <Field label="Description">
            <textarea
              className={`${inputClass} min-h-[88px] resize-y`}
              value={f.description}
              onChange={(e) =>
                patch({ [key]: { ...f, description: e.target.value } } as Partial<PortfolioContent>)
              }
            />
          </Field>
          <Field label="Code URL">
            <input
              className={inputClass}
              value={f.codeUrl}
              onChange={(e) =>
                patch({ [key]: { ...f, codeUrl: e.target.value } } as Partial<PortfolioContent>)
              }
            />
          </Field>
          <Field label="Demo URL">
            <input
              className={inputClass}
              value={f.demoUrl}
              onChange={(e) =>
                patch({ [key]: { ...f, demoUrl: e.target.value } } as Partial<PortfolioContent>)
              }
            />
          </Field>
        </div>
      )
    }
    default:
      return null
  }
}
