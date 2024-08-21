import { OutlineClose } from 'icons/Icons'
import { useEffect, useRef } from 'react'
import { cn } from 'utils/tw'

const Modal = (props: {
	children?: React.ReactNode
	open: boolean
	setOpen: (arg: boolean) => void
}) => {
	const menuRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (menuRef.current && menuRef.current === event.target) {
				props.setOpen(false)
			}
		}

		if (props.open) {
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
	}, [props.open, props.setOpen])

	//FIXME: dark theme colors

	return (
		props.open && (
			<section
				className={cn(
					'fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-shark-950/80 backdrop-blur-sm',
					{
						'animate-fadeSm': props.open,
					}
				)}
				ref={menuRef}
			>
				<article
					className={cn(
						'group relative mx-2 my-2 max-h-screen w-full max-w-2xl overflow-hidden rounded-3xl bg-white-50 text-shark-800 shadow-xl shadow-shark-950/30 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-3xl after:border-[6px] after:border-white-50/50',
						{
							'animate-modalReveal': props.open,
						}
					)}
				>
					<button
						className='absolute right-4 top-4 z-10 rounded-full bg-shark-950/30 p-2 text-white-50 backdrop-blur-md transition-all duration-300 ease-bounce active:-rotate-12 active:scale-90 sm:-rotate-12 sm:scale-75 sm:opacity-0 sm:hover:!scale-90 sm:active:!-rotate-12 sm:active:!scale-75 sm:group-hover:rotate-0 sm:group-hover:scale-100 sm:group-hover:opacity-100'
						onClick={() => {
							setTimeout(() => {
								props.setOpen(false)
							}, 1)
						}}
						type='button'
					>
						<OutlineClose size={24} />
					</button>
					{props.children}
				</article>
			</section>
		)
	)
}

export default Modal
