import drawArcPath from 'arc-path'
import { OutlineUser } from 'icons/Icons'
import React, {
	useState,
	type ReactNode,
	cloneElement,
	useEffect,
	useRef,
} from 'react'
import { cn } from 'utils/tw'

type Size = 'sm' | 'md' | 'lg'
type Radius = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
type Color = 'default' | 'primary' | 'success' | 'warning' | 'danger'

type Story = {
	title: string
	isDisabled: boolean
}

type AvatarProps = {
	size?: Size | string
	isDisabled?: boolean
	radius?: Radius | string
	isBordered?: boolean
	color?: Color | string
	src: string
	name?: string
	showFallback?: boolean
	fallback?: ReactNode
	stories?: Story[]
}

const Avatar: React.FC<AvatarProps> = ({
	size = 'md',
	isDisabled = false,
	radius = 'full',
	isBordered = false,
	color = 'default',
	src,
	name,
	showFallback = true,
	fallback = <OutlineUser size={24} />,
	stories,
}) => {
	const [imageError, setImageError] = useState(false)
	const avatarRef = useRef<HTMLSpanElement | null>(null)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	const iconSize = {
		sm: 20,
		md: 24,
		lg: 28,
	}

	const radiusSize = {
		sm: 0.25,
		md: 0.5,
		lg: 0.75,
		xl: 1,
		'2xl': 1.5,
		full: 2,
	}

	const textColor = {
		success: 'text-success-950',
		danger: 'text-danger-50',
		warning: 'text-warning-950',
		primary: 'text-primary-50',
		default: 'text-default-600',
	}

	const rootStyle = cn(
		'flex relative justify-center items-center overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-default-foreground text-large',
		{
			'size-8': size === 'sm',
			'size-10': size === 'md',
			'size-12': size === 'lg',
			'size-14': size === 'xl',

			[`ring-2 ring-offset-2 ring-${color}`]: isBordered,
			'opacity-50 cursor-not-allowed': isDisabled,

			'rounded-sm': radius === 'sm',
			'rounded-md': radius === 'md',
			'rounded-lg': radius === 'lg',
			'rounded-xl': radius === 'xl',
			'rounded-2xl': radius === '2xl',
			'rounded-full': radius === 'full',

			//[`bg-${color}`]: color,
		}
	)

	const contentStyle = cn(
		`bg-${color} flex relative justify-center items-center overflow-hidden align-middle`,
		{
			'size-6': size === 'sm' && stories,
			'size-8': size === 'md' && stories,
			'size-9': size === 'lg' && stories,
			'size-10': size === 'xl' && stories,

			'rounded-sm': radius === 'sm',
			'rounded-md': radius === 'md',
			'rounded-lg': radius === 'lg',
			'rounded-xl': radius === 'xl',
			'rounded-2xl': radius === '2xl',
			'rounded-full': radius === 'full',
		}
	)

	const handleError = () => {
		setImageError(true)
	}

	const fallbackIcon = React.isValidElement(fallback)
		? cloneElement(fallback as React.ReactElement, {
				size: iconSize[size as Size] || 24,
				className: `${textColor[color as keyof typeof textColor] || textColor.default}`,
			})
		: fallback

	useEffect(() => {
		if (avatarRef.current && canvasRef.current && stories) {
			const ctx = canvasRef.current.getContext('2d')
			if (ctx) {
				const { width, height } = avatarRef.current.getBoundingClientRect()

				canvasRef.current.width = width
				canvasRef.current.height = height

				const center = {
					x: width * 0.5,
					y: height * 0.5,
				}

				const arcWidths: { [key: string]: number } = {
					md: 2,
					lg: 3,
					xl: 4,
				}

				const arcWidth = arcWidths[size] || 2
				const gap = 1
				const outerRadius = Math.min(width, height) * 0.5
				const innerRadius = outerRadius - arcWidth

				if (stories.length === 1) {
					const story = stories[0]
					const startRadians = gap / outerRadius - Math.PI / 2
					const endRadians = Math.PI * 2 - gap / outerRadius - Math.PI / 2
					drawArcPath(
						ctx,
						center.x,
						center.y,
						startRadians,
						endRadians,
						outerRadius,
						innerRadius,
						-2
					)
					ctx.fillStyle = story.isDisabled ? '#d4d4d8' : '#4d41ff'
					ctx.fill()
				} else {
					const radiansPerPart = (Math.PI * 2) / stories.length

					stories.forEach((story, index) => {
						ctx.beginPath()
						const startRadians =
							index * radiansPerPart + gap / outerRadius - Math.PI / 2
						const endRadians =
							(index + 1) * radiansPerPart - gap / outerRadius - Math.PI / 2
						drawArcPath(
							ctx,
							center.x,
							center.y,
							startRadians,
							endRadians,
							outerRadius,
							innerRadius,
							gap
						)
						ctx.fillStyle = story.isDisabled ? '#d4d4d8' : '#4d41ff'
						ctx.fill()
					})
				}
			}
		}
	}, [size, stories])

	return (
		<span ref={avatarRef} className={`${rootStyle}`}>
			{stories && (
				<canvas ref={canvasRef} className='absolute left-0 top-0 z-10 m-auto' />
			)}
			<div className={contentStyle}>
				{imageError || !src ? (
					showFallback ? (
						fallbackIcon
					) : (
						name?.[0]
					)
				) : (
					<img
						src={src}
						alt={name || 'Avatar'}
						className='flex h-full w-full object-cover opacity-0 transition-opacity !duration-500 data-[loaded=true]:opacity-100'
						onError={handleError}
						data-loaded={!imageError}
					/>
				)}
			</div>
		</span>
	)
}

export default Avatar
