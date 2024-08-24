import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from 'utils/tw'

type RecentPostProps = {
	activePost: number
	date: string
	id: number
	image: string
	href: string
	offset?: string
	setActivePost: React.MouseEventHandler<HTMLAnchorElement>
	title: string
}

const RecentPost = ({
	activePost,
	date,
	id,
	image,
	href,
	offset,
	setActivePost,
	title,
}: RecentPostProps) => {
	const [rotation, setRotation] = useState(0)
	const [isMobile, setIsMobile] = useState(true)
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setRotation(0)
				setIsMobile(true)
			} else {
				setRotation(Math.floor(Math.random() * 41) - 20)
				setIsMobile(false)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<Link
			className={cn(
				'reveal sm:scaleFade transition-all duration-300 ease-bounce sm:-mr-10 sm:hover:mr-0',
				{ 'animate-revealSm sm:animate-scaleFadeBlog': isImageLoaded }
			)}
			style={{ animationDelay: `${offset}s` }}
			href={href}
			onMouseEnter={setActivePost}
		>
			<article
				className='group relative aspect-video w-full origin-center overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 ease-bounce will-change-transform after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-3xl after:border-[6px] after:border-white/20 after:transition-[border] sm:aspect-[4/3] sm:h-40 sm:hover:!rotate-0 sm:hover:scale-110 sm:hover:shadow-2xl sm:hover:after:border-8 sm:active:scale-100 sm:active:after:border-[12px]'
				style={{ transform: `rotate(${rotation}deg)` }}
			>
				{/* active dot */}
				<div
					className={cn(
						'absolute left-0 top-0 z-10 size-12 opacity-0 transition-opacity duration-100 ease-in group-hover:opacity-0 group-hover:delay-0 group-hover:duration-100',
						{
							'delay-500 duration-300 sm:opacity-100': activePost === id,
						}
					)}
				>
					<div className='absolute left-0 top-0 size-12 bg-black/25 blur-xl' />
					<div className='absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white after:absolute after:h-full after:w-full after:animate-ping after:rounded-full after:bg-white' />
				</div>

				<Image
					alt='image'
					className='object-cover'
					fill
					onLoad={() => {
						setIsImageLoaded(true)
					}}
					priority
					sizes='100'
					src={image}
				/>
			</article>
			<header className='flex items-baseline justify-between px-6 pt-4 sm:hidden'>
				<p className='text-lg font-medium'>{title}</p>
				<p className='shrink-0 text-sm'>{date}</p>
			</header>
		</Link>
	)
}

export default RecentPost
