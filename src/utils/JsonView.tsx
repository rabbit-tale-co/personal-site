import { cn } from 'utils/tw'

type JsonViewProps = {
	children: React.ReactNode
	noScroll?: boolean
}

const JsonView = (props: JsonViewProps) => {
	return (
		<pre
			className={cn(
				'h-[600px] w-full overflow-scroll rounded-2xl bg-blue-900 p-4 text-white',
				{ 'whitespace-pre-wrap break-words': props.noScroll }
			)}
		>
			{JSON.stringify(props.children, null, 2)}
		</pre>
	)
}

export default JsonView
