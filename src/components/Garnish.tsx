import { OutlineArrowRight } from 'icons/Icons'
import { cn } from 'utils/tw'

type GarnishProps = {
	className?: string
}

const Garnish = ({ className }: GarnishProps) => (
	<span
		className={cn(
			'relative flex items-center justify-center overflow-hidden *:transition-transform *:duration-&lsqb;400ms&rsqb; *:ease-bounce',
			className
		)}
	>
		<OutlineArrowRight
			className='absolute -translate-x-5 sm:group-hover:translate-x-0'
			size={16}
		/>
		<OutlineArrowRight className='sm:group-hover:translate-x-5' size={16} />
	</span>
)

export default Garnish
