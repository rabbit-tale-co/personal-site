import { Image } from '@nextui-org/react'
import placeholder from 'public/images/placeholder.jpg'
import Button from 'components/Button'
import {
	OutlineBookmark,
	OutlineChat,
	OutlineChevronLeft,
	OutlineChevronRight,
	OutlineMore,
	OutlineRepeat,
	OutlineStar,
	SolidBookmark,
	SolidChat,
	SolidRepeat,
	SolidStar,
} from 'icons/Icons'
import { formatNumber } from 'lib/formatNumber'
import React, { useEffect, useState } from 'react'
import Modal from 'components/social/Modal'
import HoverCard from './HoverCard'
import { formatDistanceToNow, differenceInSeconds } from 'date-fns'

const postData = [
	{
		user: {
			id: 1,
			displayName: 'Hasira 🥃🪴',
			username: 'hasiradoo',
			bio: '🪴 № 22 🪴 Bi | Ace  🪴 🇵🇱 / 🇺🇸 🪴 Aspiring Game dev / UI/UX designer / Front-end dev 🪴 Founder of @StarOwl_social & @poker_cats_cr',
			avatarUrl:
				'https://pbs.twimg.com/profile_images/1777614638261080064/H9iQD24q_400x400.jpg',
			coverUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702e',
			followers: [
				{
					id: 4,
				},
			],
			following: [],
			stories: [],
		},
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc sollicitudin lacinia.',
		stats: {
			liked: false,
			commented: false,
			reposted: false,
			bookmarked: false,
			data: {
				likes: 1_233,
				comments: 10_666,
				reposts: 644_666,
				views: 422_345,
			},
			timeStamp: { date: '2024-04-21', time: '21:12' },
		},
		images: [
			'https://kris.starowl.social/og.png',
			'https://pbs.twimg.com/media/F5KYC5XXUAAbFro?format=jpg&name=4096x4096',
		],
	},
	{
		user: {
			id: 2,
			displayName: 'User',
			username: 'User_id',
			bio: 'Full-stack developer, @getnextui lover she/her 🎉',
			avatarUrl: 'https://i.pravatar.cc/150?u=a04658114e23026772e',
			coverUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702e',
			followers: [],
			following: [],
			stories: [
				{
					id: 1,
					title: 'Story 1',
				},
			],
		},
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc sollicitudin lacinia.',
		stats: {
			liked: true,
			commented: false,
			reposted: false,
			bookmarked: false,
			data: {
				likes: 634,
				comments: 34,
				reposts: 0,
				views: 0,
			},
			timeStamp: { date: '2023-12-01', time: '12:00' },
		},
		images: [
			'https://pbs.twimg.com/profile_images/1777614638261080064/H9iQD24q_400x400.jpg',
			'https://kris.starowl.social/og.png',
		],
	},
	{
		user: {
			id: 3,
			displayName: 'User',
			username: 'User_id',
			avatarUrl: 'https://i.pravatar.cc/150?u=a0425311453026702e',
			coverUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702e',
			followers: [],
			following: [],
			stories: [],
		},
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc sollicitudin lacinia.',
		stats: {
			liked: false,
			commented: true,
			reposted: true,
			bookmarked: false,
			data: {
				likes: 2,
				comments: 1_234,
				reposts: 5_555_555,
				views: 0,
			},
			timeStamp: { date: '2023-08-01', time: '12:00' },
		},
		images: ['https://kris.starowl.social/og.png'],
	},
	{
		user: {
			id: 4,
			displayName: 'User',
			username: 'User_id',
			avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702e',
			coverUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702e',
			followers: [],
			following: [
				{
					id: 1,
				},
			],
			stories: [],
		},
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc sollicitudin lacinia.',
		stats: {
			liked: false,
			commented: false,
			reposted: false,
			bookmarked: true,
			data: {
				likes: 0,
				comments: 0,
				reposts: 0,
				views: 0,
			},
			timeStamp: { date: '2021-08-01', time: '12:00' },
		},
		images: [],
	},
]

const Posts = () => {
	const [modalImages, setModalImages] = useState<string[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [currentPostStats, setCurrentPostStats] =
		useState<PostStatsProps | null>(null)

	const handleImageClick = (images: string[], stats: PostStatsProps) => {
		setModalImages(images)
		setCurrentPostStats(stats)
		setModalOpen(true)
	}

	return (
		<React.Fragment>
			{postData.map((post, index) => (
				<Post
					key={post.user.id}
					{...post}
					onImageClick={() => handleImageClick(post.images, post.stats)}
				/>
			))}
			{currentPostStats && (
				<Modal
					images={modalImages}
					open={modalOpen}
					setOpen={setModalOpen}
					stats={currentPostStats}
				/>
			)}
		</React.Fragment>
	)
}

export interface PostStatsProps {
	liked: boolean
	commented: boolean
	reposted: boolean
	bookmarked: boolean
	data: { likes: number; comments: number; reposts: number; views: number }
	className?: string
	iconColor?: string
}

const Post = ({
	user,
	content,
	stats,
	images,
	onImageClick,
}: (typeof postData)[0] & { onImageClick: (image: string[]) => void }) => {
	const [postedTimeAgo, setPostedTimeAgo] = useState('')

	useEffect(() => {
		const updatePostedTimeAgo = () => {
			const postDate = new Date(
				`${stats.timeStamp.date} ${stats.timeStamp.time}`
			)
			const now = new Date()
			const diffInSeconds = differenceInSeconds(postDate, now)

			if (diffInSeconds >= 0 && diffInSeconds < 60) {
				setPostedTimeAgo(
					diffInSeconds === 0
						? 'just now'
						: `in ${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'}`
				)
			} else {
				setPostedTimeAgo(formatDistanceToNow(postDate, { addSuffix: true }))
			}
		}

		updatePostedTimeAgo() // Update immediately on component mount
		const intervalId = setInterval(updatePostedTimeAgo, 1000) // Update every second

		return () => clearInterval(intervalId) // Clean up on component unmount
	}, [stats.timeStamp])

	return (
		<article className='w-full cursor-pointer space-y-4 p-3 pb-1.5 transition-colors max-sm:border-b sm:rounded-2xl sm:hover:bg-default-600/5'>
			{/* sm:bg-default-600/5 */}
			<header className='flex items-center justify-between'>
				<HoverCard
					avatarUrl={user.avatarUrl}
					displayName={user.displayName}
					username={user.username}
					following={user.following?.length.toString() ?? '0'}
					followers={user.followers?.length.toString() ?? '0'}
					bio={user.bio}
				/>
				<div className='flex items-center space-x-2'>
					<p className='text-xs lining-nums text-default-500'>
						{postedTimeAgo}
					</p>
					<Button
						aria='Show more'
						variant={'icon'}
						className='text-default-500'
					>
						<OutlineMore size={20} />
					</Button>
				</div>
			</header>
			<PostContent
				content={content}
				images={images}
				onImageClick={onImageClick}
			/>
			<PostStats
				liked={stats.liked}
				commented={stats.commented}
				reposted={stats.reposted}
				bookmarked={stats.bookmarked}
				data={stats.data}
			/>
		</article>
	)
}

const PostContent = ({
	content,
	images,
	onImageClick,
}: {
	content: string
	images: string[]
	onImageClick: (images: string[]) => void
}) => {
	const [currentImage, setCurrentImage] = useState(images[0])

	return (
		<div className='flex flex-col space-y-4'>
			<p className='text-small text-default-600'>{content}</p>
			{images.length > 0 && (
				<div className='relative overflow-hidden rounded-2xl'>
					{images.length > 1 && (
						<React.Fragment>
							<div className='pointer-events-none absolute left-0 right-0 top-0 z-20 flex h-6 items-center bg-gradient-to-b from-shark-950/50 to-transparent px-4'>
								{images.map((image, index) => (
									<div
										key={hashCode(image)}
										className={`mx-1 h-0.5 flex-1 rounded-full backdrop-blur-xl ${currentImage === image ? 'bg-shark-50' : 'bg-shark-50/50'}`}
										// onClick={() => setCurrentImage(image)}
									/>
								))}
							</div>
							<div className='pointer-events-none absolute left-0 right-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-4'>
								<Button
									aria='Previous image'
									onClick={() =>
										setCurrentImage(
											images[
												(images.indexOf(currentImage) - 1 + images.length) %
													images.length
											]
										)
									}
									className={`pointer-events-auto bg-shark-950/30 text-shark-50 backdrop-blur-xl transition-all duration-300 ease-bounce active:-rotate-12 active:scale-90 sm:hover:!scale-90 sm:active:!-rotate-12 sm:active:!scale-75 sm:group-hover:rotate-0 sm:group-hover:scale-100 sm:group-hover:opacity-100 ${images.indexOf(currentImage) <= 0 ? 'invisible' : ''}`}
									variant={'icon'}
								>
									<OutlineChevronLeft size={24} />
								</Button>
								<Button
									aria='Next image'
									onClick={() =>
										setCurrentImage(
											images[(images.indexOf(currentImage) + 1) % images.length]
										)
									}
									variant={'icon'}
									className={`pointer-events-auto bg-shark-950/30 text-shark-50 backdrop-blur-xl transition-all duration-300 ease-bounce active:-rotate-12 active:scale-90 sm:hover:!scale-90 sm:active:!rotate-12 sm:active:!scale-75 sm:group-hover:rotate-0 sm:group-hover:scale-100 sm:group-hover:opacity-100 ${images.indexOf(currentImage) >= images.length - 1 ? 'invisible' : ''}`}
								>
									<OutlineChevronRight size={24} />
								</Button>
							</div>
						</React.Fragment>
					)}
					<Image
						src={currentImage}
						alt='Post image'
						width={1920}
						height={1080}
						fallbackSrc={placeholder.src}
						onClick={() => onImageClick(images)}
						className={'user-select-none w-full object-cover'} //aspect-[${aspectRatio}]
					/>
				</div>
			)}
		</div>
	)
}

export const PostStats = ({
	liked,
	commented,
	reposted,
	bookmarked,
	data,
	iconColor,
	className,
}: PostStatsProps) => {
	return (
		<div className={`flex w-full ${className}`}>
			<div className='flex w-2/3 space-x-2 sm:w-1/2'>
				<Button
					aria='Star hoot'
					variant={'link'}
					hasIcon
					iconPosition={'left'}
					className={`relative w-full justify-start overflow-visible  text-default-500 ${iconColor}`}
				>
					<div className='group flex space-x-2'>
						<div
							className={`relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-gold-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-gold-600 ${liked && 'text-gold-600'}`}
						>
							{liked ? <SolidStar size={20} /> : <OutlineStar size={20} />}
						</div>
						<span
							className={`text-sm lining-nums transition-colors group-hover:text-gold-600 ${liked && 'text-gold-600'}`}
						>
							{data.likes !== 0 ? formatNumber(data.likes) : ''}
						</span>
					</div>
				</Button>
				<Button
					//onClick={onComment}
					aria='Comment hoot'
					variant={'link'}
					hasIcon
					iconPosition={'left'}
					className={`relative w-full justify-start overflow-visible  text-default-500 ${iconColor}`}
				>
					<div className='group flex space-x-2'>
						<div
							className={`relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-blueberry-600 ${commented && 'text-blueberry-600'}`}
						>
							{commented ? <SolidChat size={20} /> : <OutlineChat size={20} />}
						</div>
						<span
							className={`text-sm lining-nums transition-colors group-hover:text-blueberry-600 ${commented && 'text-blueberry-600'}`}
						>
							{data.comments !== 0 ? formatNumber(data.comments) : ''}
						</span>
					</div>
				</Button>
				<Button
					aria='Repost hoot'
					variant={'link'}
					hasIcon
					iconPosition={'left'}
					className={`relative w-full justify-start overflow-visible text-default-500 ${iconColor}`}
				>
					<div className='group flex space-x-2'>
						<div
							className={`relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-green-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-green-600 ${reposted && 'text-green-600'}`}
						>
							{reposted ? (
								<SolidRepeat size={20} />
							) : (
								<OutlineRepeat size={20} />
							)}
						</div>
						<span
							className={`text-sm lining-nums transition-colors group-hover:text-green-600 ${reposted && 'text-green-600'}`}
						>
							{data.reposts !== 0 ? formatNumber(data.reposts) : ''}
						</span>
					</div>
				</Button>
				{/* <Button
          type={'link'}
          hasIcon
          iconPosition={'left'}
          className="group relative w-full justify-start overflow-visible"
        >
          <div className="relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-500 group-hover:before:block group-hover:before:size-10 group-hover:before:bg-blueberry-500 group-hover:before:opacity-30 group-hover:before:content-['']">
            <OutlineHome size={24} />
          </div>
          <span className="lining-nums transition-colors group-hover:text-blueberry-500">
            {data.views !== 0 ? formatNumber(data.views) : ''}
          </span>
        </Button> */}
			</div>
			<div className='flex w-full flex-1 justify-end'>
				<Button
					aria='Bookmark hoot'
					variant={'icon'}
					className={`group relative justify-start overflow-visible  text-default-500 ${iconColor} hover:!bg-transparent`}
				>
					<div
						className={`relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-blueberry-600 ${bookmarked && 'text-blueberry-600'}`}
					>
						{bookmarked ? (
							<SolidBookmark size={20} />
						) : (
							<OutlineBookmark size={20} />
						)}
					</div>
				</Button>
				{/* <Button
          type={'icon'}
          className={`hover:bg-blueberry-600 hover:text-blueberry-600 ${iconColor}`}
        >
          <OutlineBookmark size={24} />
        </Button> */}
				{/* <Button type={'icon'}>
          <OutlineHome className="icon" size={24} />
        </Button> */}
			</div>
		</div>
	)
}

export default Posts

const hashCode = (str: string): number => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash // Convert to 32bit integer
	}
	return hash
}
