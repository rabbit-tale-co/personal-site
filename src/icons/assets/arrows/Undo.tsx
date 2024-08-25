import type React from 'react'
import type { IconProps } from 'icons/IconProps'

export const OutlineUndo: React.FC<IconProps> = ({ className, size = 24 }) => (
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
			d='M2 9a1 1 0 0 1 1-1h13a6 6 0 0 1 0 12H5a1 1 0 1 1 0-2h11a4 4 0 0 0 0-8H3a1 1 0 0 1-1-1Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M2.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L4.414 9l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4Z'
			fill='currentColor'
		/>
	</svg>
)

export const SolidUndo: React.FC<IconProps> = ({ className, size = 24 }) => (
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
			d='M9 8a1 1 0 0 1 1-1h5.5a6.5 6.5 0 1 1 0 13H5a1 1 0 1 1 0-2h10.5a4.5 4.5 0 1 0 0-9H10a1 1 0 0 1-1-1Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M2.293 8.707a1 1 0 0 1 0-1.414l3-3A1 1 0 0 1 7 5v6a1 1 0 0 1-1.707.707l-3-3Z'
			fill='currentColor'
		/>
	</svg>
)

export const DuotoneUndo: React.FC<IconProps> = ({ className, size = 24 }) => (
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
			d='M2 9a1 1 0 0 1 1-1h13a6 6 0 0 1 0 12H5a1 1 0 1 1 0-2h11a4 4 0 0 0 0-8H3a1 1 0 0 1-1-1Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M2.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L4.414 9l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4Z'
			fill='currentColor'
		/>
	</svg>
)
