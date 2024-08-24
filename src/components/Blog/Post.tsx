import Link from 'next/link'

type PostProps = {
	date: string
	href: string
	title: string
}

const Post = ({ date, href, title }: PostProps) => (
	<Link
		href={href}
		className='mb-6 p-6 flex w-full items-baseline justify-between transition-colors rounded-2xl duration-200 ease-out bg-zinc-800 hover:bg-zinc-900'
	>
		<p className='text-balance font-medium text-zinc-50'>{title}</p>
		<p className='shrink-0 text-sm text-zinc-400'>{date}</p>
	</Link>
)

export default Post
