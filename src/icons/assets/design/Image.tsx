import type React from 'react'
import type { IconProps } from 'icons/IconProps'

export const OutlineImage: React.FC<IconProps> = ({ className, size }) => (
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
			d='M3.204 17.313a7.045 7.045 0 0 1-.146-1.004 18.88 18.88 0 0 1-.051-1.226l2.343-1.449.079-.048c.33-.205.66-.41 1.034-.507a2.497 2.497 0 0 1 1-.05c.38.058.731.229 1.08.4l.083.04.528.257c.53.258.593.275.635.28a.5.5 0 0 0 .212-.017c.04-.013.1-.04.58-.382l2.505-1.79.093-.066c.384-.276.77-.552 1.215-.671a2.5 2.5 0 0 1 1.186-.025c.45.1.847.36 1.242.619l.096.062 4.081 2.66a25.52 25.52 0 0 1-.057 1.913c-.011.14-.025.276-.042.41l-5.074-3.307c-.563-.367-.633-.395-.68-.405a.5.5 0 0 0-.236.005c-.046.012-.115.043-.662.433l-2.505 1.79-.082.058c-.338.243-.679.487-1.072.607a2.5 2.5 0 0 1-1.061.09c-.408-.054-.785-.239-1.16-.422l-.089-.043-.528-.258c-.492-.239-.55-.255-.59-.261a.5.5 0 0 0-.2.01c-.038.01-.094.032-.56.32l-3.197 1.977ZM11 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M10.357 3h3.286c1.084 0 1.958 0 2.666.058.729.06 1.369.185 1.961.487a5 5 0 0 1 2.185 2.185c.302.592.428 1.233.487 1.961C21 8.4 21 9.273 21 10.357v3.286c0 1.084 0 1.958-.058 2.666-.06.729-.185 1.369-.487 1.961a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.232-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.728.185-1.369.487-1.96A5 5 0 0 1 5.73 3.544c.592-.302 1.233-.428 1.961-.487C8.4 3 9.273 3 10.357 3ZM7.854 5.051c-.605.05-.953.142-1.216.276a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.134-.263.226-.611.276-1.216.05-.617.051-1.41.051-2.546v-3.2c0-1.137 0-1.929-.051-2.546-.05-.605-.142-.953-.276-1.216a3 3 0 0 0-1.311-1.311c-.263-.134-.611-.226-1.216-.276C15.529 5.001 14.736 5 13.6 5h-3.2c-1.137 0-1.929 0-2.546.051Z'
			fill='currentColor'
		/>
	</svg>
)

export const SolidImage: React.FC<IconProps> = ({ className, size }) => (
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
			d='M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v3.52c0 .48 0 .72-.1.854a.5.5 0 0 1-.366.199c-.167.01-.368-.12-.77-.383l-2.846-1.854-.096-.062c-.395-.26-.792-.52-1.242-.62a2.498 2.498 0 0 0-1.186.026c-.445.119-.83.395-1.215.671l-.093.067-2.506 1.789c-.479.342-.538.37-.579.382a.5.5 0 0 1-.212.018c-.042-.006-.105-.023-.635-.28l-.528-.258-.083-.04c-.349-.17-.7-.342-1.08-.4a2.5 2.5 0 0 0-1 .05c-.373.096-.705.302-1.034.507l-.079.048-1.935 1.197A.272.272 0 0 1 3 14.6V9.4Zm.495 7.733c-.155.096-.232.143-.288.215a.535.535 0 0 0-.096.217c-.016.09-.002.168.027.326.065.354.16.653.298.925a4 4 0 0 0 1.748 1.748C6.04 21 7.16 21 9.4 21h5.2c2.24 0 3.36 0 4.216-.436a4 4 0 0 0 1.748-1.748c.218-.429.328-.924.382-1.593.013-.157.019-.235 0-.314a.517.517 0 0 0-.094-.191c-.05-.064-.12-.11-.26-.2l-4.766-3.106c-.563-.367-.633-.394-.68-.405a.5.5 0 0 0-.236.005c-.046.013-.115.043-.662.433l-2.505 1.79-.082.058c-.338.243-.679.487-1.072.608a2.5 2.5 0 0 1-1.061.088c-.408-.053-.785-.237-1.16-.42l-.089-.044-.528-.258c-.492-.239-.55-.255-.59-.261a.5.5 0 0 0-.2.01c-.038.01-.094.032-.56.32l-2.906 1.797ZM11 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
			fill='currentColor'
		/>
	</svg>
)

export const DuotoneImage: React.FC<IconProps> = ({ className, size }) => (
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
			d='M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6V9.4Z'
			fill='currentColor'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-6 4.087c.001.972.01 1.712.07 2.309l3.332-2.06c.465-.288.52-.31.56-.32a.5.5 0 0 1 .2-.01c.039.006.097.022.589.261l.528.258.09.043c.374.184.75.368 1.159.421a2.5 2.5 0 0 0 1.06-.089c.394-.12.735-.364 1.073-.607l.081-.059 2.506-1.789c.547-.39.616-.42.662-.433a.5.5 0 0 1 .237-.005c.046.01.116.038.679.405l5.148 3.354C21 16.183 21 15.477 21 14.6v-.204l-4.082-2.66-.096-.062c-.396-.26-.793-.52-1.242-.62a2.5 2.5 0 0 0-1.186.026c-.445.119-.83.395-1.215.671l-.093.067-2.506 1.789c-.479.342-.538.37-.579.382a.5.5 0 0 1-.212.018c-.042-.006-.106-.023-.635-.28l-.528-.258-.083-.04c-.349-.171-.7-.342-1.081-.4a2.498 2.498 0 0 0-.999.05c-.373.096-.705.302-1.035.507l-.078.048L3 15.087Z'
			fill='currentColor'
		/>
	</svg>
)
