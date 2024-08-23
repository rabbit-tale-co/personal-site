import Link from 'next/link'
import type React from 'react'
import { cn } from 'utils/tw'
import Garnish from './Garnish'

type ButtonProps = {
	aria?: string
	as?: 'a' | 'button'
	children?: React.ReactNode
	className?: string
	external?: boolean
	garnish?: boolean
	href?: string
	onClick?: () => void
	state?: boolean
	title: string
	type?: 'submit' | 'reset' | 'button' | undefined
	size?: 'xs' | 'sm' | 'md' | 'lg'
	disabled?: boolean
	variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'danger'
	hasIcon?: boolean
	iconPosition?: 'left' | 'right'
	rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const Button = ({
	as,
	aria,
	children,
	className,
	external,
	garnish = false,
	href,
	onClick,
	state,
	title,
	type,
	variant = 'primary',
	size = 'sm',
	disabled = false, // Ensure button is disabled correctly
}: ButtonProps) => {
	const Component = as ?? (href ? 'a' : 'button') // Default to 'button' if href is not provided
	const buttonType = href ? undefined : type ?? 'button' // Set type to 'button' if href is not provided and type is not specified

	return (
		<Component
			aria-label={aria ?? title}
			className={cn(
				'group flex w-max cursor-pointer items-center justify-center gap-2.5 rounded-full px-4 py-2.5 active:scale-95 transition-all',
				{
					'bg-white font-[550] text-zinc-700': variant === 'primary',
					'bg-white': variant === 'primary' && state,

					'bg-transparent font-medium text-zinc-600 sm:hover:bg-white':
						variant === 'secondary',
					'bg-white text-zinc-800': variant === 'secondary' && state,

					'bg-zinc-900 font-medium text-zinc-50 sm:hover:bg-zinc-800':
						variant === 'accent',

					'bg-red-500 font-medium text-white sm:hover:bg-red-600':
						variant === 'danger',

					'bg-transparent outline outline-1 outline-zinc-300':
						variant === 'outline',

					'text-xs': size === 'xs',
					'text-sm': size === 'sm',
					'text-base': size === 'md',
					'text-lg': size === 'lg',
				},
				className
			)}
			href={href}
			onClick={onClick}
			rel={external ? 'noopener noreferrer' : undefined}
			target={external ? '_blank' : undefined}
			type={buttonType} // This ensures the button works with forms
			disabled={disabled} // Properly handle the disabled state
		>
			{title}
			{children}
			{garnish && <Garnish />}
		</Component>
	)
}

export default Button
