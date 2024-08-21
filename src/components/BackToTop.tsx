import Button from 'components/Button'
import { OutlineArrowLeft } from 'icons/Icons'
import Tooltip from './Tooltip'
import { useState, useEffect, useRef } from 'react'

const BackToTop = () => {
	const [isAtTop, setIsAtTop] = useState(true)
	const [isHidden, setIsHidden] = useState(true)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const checkScrollPosition = () => {
			if (window.scrollY === 0) {
				setIsAtTop(true)
			} else {
				setIsAtTop(false)
				setIsHidden(false)
			}
		}

		window.addEventListener('scroll', checkScrollPosition)

		return () => {
			window.removeEventListener('scroll', checkScrollPosition)
		}
	}, [])

	useEffect(() => {
		const button = buttonRef.current

		if (button) {
			button.addEventListener('animationend', (e) => {
				if (e.animationName === 'scaleOutFade' && isAtTop) {
					setIsHidden(true)
				}
			})

			return () => {
				button.removeEventListener('animationend', () => {})
			}
		}
	}, [isAtTop])

	return (
		<header
			className={`pointer-events-none fixed bottom-12 left-0 z-20 mt-6 ${isHidden ? 'hidden' : 'flex'} w-full items-center justify-center px-4 sm:mt-16 sm:px-10`}
		>
			<nav className='flex w-full max-w-2xl items-center justify-end'>
				<div className='group/tooltip pointer-events-auto relative transition-transform hover:scale-90'>
					<Tooltip text='Back To Top' position='right' />
					<Button
						aria-label='Back to top'
						ref={buttonRef}
						// isStickyHover
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						variant={'icon'}
						className={`bg-white-50 !p-3 ring-2 ring-white-200 hover:text-shark-950 lg:bg-transparent lg:hover:!bg-transparent lg:hover:ring-0 ${!isAtTop ? 'animate-revealSm' : 'animate-scaleOutFade'}`}
					>
						<OutlineArrowLeft className='rotate-90' size={24} />
					</Button>
				</div>
			</nav>
		</header>
	)
}

export default BackToTop
