import { OutlineArrowRight } from 'icons/Icons'
import { cn } from 'utils/tw'

type GarnishProps = {
  className?: string
}

const Garnish = ({ className }: GarnishProps) => (
  <span
    className={cn(
      'relative flex size-4 items-center justify-center overflow-hidden *:transition-transform *:duration-[400ms] *:ease-bounce',
      className,
    )}
  >
    <OutlineArrowRight
      className="absolute -translate-x-5 sm:group-hover:translate-x-0"
    />
    <OutlineArrowRight className="sm:group-hover:translate-x-5" />
  </span>
)

export default Garnish
