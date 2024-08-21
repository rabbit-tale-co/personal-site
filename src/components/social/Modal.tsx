import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Color from 'color-thief-react'
import {
	OutlineChevronLeft,
	OutlineChevronRight,
	OutlineClose,
} from 'icons/Icons'
import { cn } from 'utils/tw'
import { PostStats, type PostStatsProps } from './Post'
import { useMeasure } from 'react-use'

const Modal = (props: {
	children?: React.ReactNode
	images: string[]
	open: boolean
	setOpen: (arg: boolean) => void
	stats: PostStatsProps
}) => {
	const [imageDimensions, setImageDimensions] = useState({
		width: 0,
		height: 0,
		aspectRatio: '16/9',
	})
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const { images, open, setOpen, stats } = props
	const menuRef = useRef<HTMLDivElement | null>(null)
	const [lastColor, setLastColor] = useState('rgba(0, 0, 0, .8)')

	function gcd(a: number, b: number) {
		if (b === 0) {
			return a
		}
		return gcd(b, a % b)
	}

	const calculateAspectRatio = useCallback((width: number, height: number) => {
		const divisor = gcd(width, height)
		return `${width / divisor}/${height / divisor}`
	}, []) as (width: number, height: number) => string

	useEffect(() => {
		const img = new window.Image()
		img.src = images[currentImageIndex]
		img.onload = () => {
			const aspectRatio = calculateAspectRatio(
				img.naturalWidth,
				img.naturalHeight
			)
			setImageDimensions({
				width: img.naturalWidth,
				height: img.naturalHeight,
				aspectRatio,
			})
		}
	}, [images, calculateAspectRatio, currentImageIndex])

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (menuRef.current && menuRef.current === event.target) {
				setOpen(false)
				setCurrentImageIndex(0)
			}
		}

		if (open) {
			document.body.style.overscrollBehavior = 'none'
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overscrollBehavior = 'auto'
			document.body.style.overflow = 'auto'
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [open, setOpen])

	const handlePrev = () => {
		setCurrentImageIndex((oldIndex) =>
			oldIndex > 0 ? oldIndex - 1 : images.length - 1
		)
	}

	const handleNext = () => {
		setCurrentImageIndex((oldIndex) =>
			oldIndex < images.length - 1 ? oldIndex + 1 : 0
		)
	}

	return (
		props.open && (
			<Color
				src={images[currentImageIndex]}
				format='rgbArray'
				crossOrigin='anonymous'
			>
				{({ data, loading, error }) => {
					let bgColor = lastColor
					if (!loading && !error && data) {
						bgColor = `rgba(${data[0]}, ${data[1]}, ${data[2]}, .8)`
						setLastColor(bgColor)
					}
					return (
						<section
							style={{ backgroundColor: bgColor }}
							className={cn(
								'fixed left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center space-y-4 py-10 backdrop-blur-lg transition-all',
								{
									'animate-fadeSm': props.open,
								}
							)}
							ref={menuRef}
						>
							<button
								className='absolute right-4 top-4 z-20 rounded-full bg-shark-950/30 p-2 text-white-50 backdrop-blur-md transition-all duration-300 ease-bounce active:-rotate-12 active:scale-90 sm:scale-75 sm:hover:!scale-90 sm:active:!-rotate-12 sm:active:!scale-75 sm:group-hover:rotate-0 sm:group-hover:scale-100 sm:group-hover:opacity-100'
								onClick={() => {
									setTimeout(() => {
										setOpen(false)
									}, 1)
								}}
								type='button'
							>
								<OutlineClose size={32} />
							</button>
							{images.length > 1 && (
								<React.Fragment>
									<div className='pointer-events-none absolute left-0 right-0 top-0 z-20 mx-auto flex h-6 max-w-2xl items-center space-x-2'>
										{images.map((image, index) => (
											<div
												key={hashCode(image)}
												className={`h-0.5 flex-1 rounded-full backdrop-blur-xl ${currentImageIndex === index ? 'bg-shark-50' : 'bg-shark-50/50'}`}
											/>
										))}
									</div>
									<div className='pointer-events-none absolute left-0 right-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-4'>
										<button
											onClick={handlePrev}
											className={
												'pointer-events-auto absolute left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-shark-950/30 p-2 text-white-50 backdrop-blur-md transition-all duration-300 ease-bounce active:-rotate-12 active:scale-90 sm:scale-75 sm:hover:!scale-90 sm:active:!-rotate-12 sm:active:!scale-75 sm:group-hover:rotate-0 sm:group-hover:scale-100 sm:group-hover:opacity-100'
											} //${currentImageIndex <= 0 ? 'invisible' : ''}
											type='button'
										>
											<OutlineChevronLeft size={32} />
										</button>
										<button
											onClick={handleNext}
											className={
												'pointer-events-auto absolute right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-shark-950/30 p-2 text-white-50 backdrop-blur-md transition-all duration-300 ease-bounce active:-rotate-12 active:scale-90 sm:scale-75 sm:hover:!scale-90 sm:active:!rotate-12 sm:active:!scale-75 sm:group-hover:rotate-0 sm:group-hover:scale-100 sm:group-hover:opacity-100'
											} //${currentImageIndex >= images.length - 1 ? 'invisible' : ''}
											type='button'
										>
											<OutlineChevronRight size={32} />
										</button>
									</div>
								</React.Fragment>
							)}

							<article
								className={cn(
									'relative mx-2 my-2 flex h-dvh w-full max-w-screen-2xl content-center items-center justify-center overflow-hidden shadow-shark-950/30 backdrop:shadow-xl',
									{
										'animate-modalReveal': props.open,
									}
								)}
								onClick={() => setOpen(false)}
								onKeyUp={() => setOpen(false)}
								onKeyDown={() => setOpen(false)}
							>
								{/* <div
                  style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                  }}
                  className="absolute inset-0 bg-cover bg-center"
                /> */}
								<Image
									src={images[currentImageIndex]}
									alt='Post image'
									//layout="fill"
									height={imageDimensions.height}
									width={imageDimensions.width}
									objectFit='contain'
									className='h-dvh w-fit self-center'
									onClick={(e) => e.stopPropagation()}
								/>
							</article>
							<PostStats
								liked={stats.liked}
								commented={stats.commented}
								reposted={stats.reposted}
								bookmarked={stats.bookmarked}
								data={stats.data}
								className='max-w-2xl &[>]'
								iconColor='text-shark-50'
							/>
						</section>
					)
				}}
			</Color>
		)
	)
}

export default Modal

function useCallback(
	arg0: (width: number, height: number) => string,
	arg1: never[]
): (width: number, height: number) => string {
	throw new Error('Function not implemented.')
}

const hashCode = (str: string): number => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash // Convert to 32bit integer
	}
	return hash
}
