import type React from 'react'
import type { IconProps } from 'icons/IconProps'

export const OutlineRedo: React.FC<IconProps> = ({ className, size = 24 }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M22 9a1 1 0 0 0-1-1H8a6 6 0 0 0 0 12h11a1 1 0 1 0 0-2H8a4 4 0 0 1 0-8h13a1 1 0 0 0 1-1Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M21.707 9.707a1 1 0 0 0 0-1.414l-4-4a1 1 0 1 0-1.414 1.414L19.586 9l-3.293 3.293a1 1 0 0 0 1.414 1.414l4-4Z'
			fill='currentColor'
		/>
	</svg>
)

export const SolidRedo: React.FC<IconProps> = ({ className, size = 24 }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M15 8a1 1 0 0 0-1-1H8.5a6.5 6.5 0 0 0 0 13H19a1 1 0 1 0 0-2H8.5a4.5 4.5 0 1 1 0-9H14a1 1 0 0 0 1-1Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M21.707 8.707a1 1 0 0 0 0-1.414l-3-3A1 1 0 0 0 17 5v6a1 1 0 0 0 1.707.707l3-3Z'
			fill='currentColor'
		/>
	</svg>
)

export const DuotoneRedo: React.FC<IconProps> = ({ className, size = 24 }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			className='opacity-50'
			d='M22 9a1 1 0 0 0-1-1H8a6 6 0 0 0 0 12h11a1 1 0 1 0 0-2H8a4 4 0 0 1 0-8h13a1 1 0 0 0 1-1Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M21.707 9.707a1 1 0 0 0 0-1.414l-4-4a1 1 0 1 0-1.414 1.414L19.586 9l-3.293 3.293a1 1 0 0 0 1.414 1.414l4-4Z'
			fill='currentColor'
		/>
	</svg>
)
