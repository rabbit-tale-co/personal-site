import { OutlineArrowLeft } from 'icons/Icons'
import Link from 'next/link'

const BackButton = () => {
  return (
    <div className="mb-4 animate-fade">
      <Link
        aria-description="return to blog"
       className="group flex w-max -translate-x-5 items-center gap-1.5 !text-zinc-600 no-underline duration-300 ease-bounce sm:hover:translate-x-0"
        href={'/blog'}
      >
        <OutlineArrowLeft
          size={16}
           className="-translate-x-4 opacity-0 duration-300 ease-bounce sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
        />
        Back to blog
      </Link>
    </div>
  )
}

export default BackButton
