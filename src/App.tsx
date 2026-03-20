import { useState } from 'react'
import type { CSSProperties } from 'react'
import { HomeBentoGrid } from './components/bento/HomeBentoGrid'
import { ProjectsPageFull } from './components/bento/ProjectsPageFull'
import { cx } from './components/bento/utils'

function withViewTransition(update: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => unknown
  }
  if (!doc.startViewTransition) {
    update()
    return
  }
  doc.startViewTransition(() => update())
}

function App() {
  const [showProjects, setShowProjects] = useState(false)

  const goProjects = () => withViewTransition(() => setShowProjects(true))
  const goHome = () => withViewTransition(() => setShowProjects(false))

  return (
    <main className="bg-[#F8F9FB]">
      <div
        className={cx(
          'mx-auto w-full max-w-[1320px]',
          'p-4 sm:p-5 lg:p-6',
          'min-h-screen lg:h-dvh lg:min-h-0',
          'overflow-auto lg:overflow-hidden',
        )}
      >
        {showProjects ? (
          <section
            className="flex h-full min-h-0 flex-col overflow-auto"
            style={{ viewTransitionName: 'projects-shell' } as CSSProperties}
          >
            <ProjectsPageFull onBack={goHome} />
          </section>
        ) : (
          <section
            className="flex h-full min-h-0 flex-col"
            style={{ viewTransitionName: 'home-shell' } as CSSProperties}
          >
            <div className="min-h-0 flex-1">
              <HomeBentoGrid onGoProjects={goProjects} />
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default App
