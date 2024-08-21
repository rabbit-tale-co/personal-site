import { Skeleton } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { cn } from "utils/tw"
const RecentPostSkeleton = ({ offset }: { offset?: string }) => {
  const [rotation, setRotation] = useState(0)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRotation(0)
        setIsMobile(true)
      } else {
        if (isMobile === false) {
          // No-op
        } else {
          setRotation(Math.floor(Math.random() * 41) - 20)
          setIsMobile(false)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile]) // Only re-run if isMobile changes

  return (
    <div
    className={cn(
      'animate-revealSm sm:animate-scaleFadeBlog transition-all duration-300 ease-bounce sm:-mr-10 sm:hover:mr-0',
    )}
      style={{
        animationDelay: `${offset}s`,
      }}
    >
      <article
        className="group relative aspect-video w-full origin-center overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 ease-bounce will-change-transform after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-3xl after:border-[5px] after:border-white/50 after:transition-[border] sm:aspect-[4/3] sm:h-40 sm:hover:!rotate-0 sm:hover:scale-110 sm:hover:shadow-2xl sm:hover:after:border-8 sm:active:scale-100 sm:active:after:border-[12px]"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Skeleton
          className="h-full w-full bg-zinc-200"
        />
      </article>
      <header className="flex items-baseline justify-between px-6 pt-4 sm:hidden">
        <Skeleton className="w-3/4 h-5 bg-zinc-200" />
        <Skeleton className="w-1/4 h-5 bg-zinc-200" />
      </header>
    </div>
  )
}

export default RecentPostSkeleton
