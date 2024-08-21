import { cn } from 'utils/tw'

const Section = (props: {
  children?: React.ReactNode
  className?: string
  visualize?: boolean
}) => (
  <section
    className={cn(
      'my-20 flex w-full max-w-lg flex-col items-center text-shark-800 sm:my-32',
      { 'bg-orange-200': props.visualize },
      props.className,
    )}
  >
    {props.children}
  </section>
)

export default Section
