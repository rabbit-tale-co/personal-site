import dayjs from 'dayjs'
import { SolidLogoText } from 'icons/Icons'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { cn } from 'utils/tw'
import TextLink from './TextLink'

const Footer = () => {
	const [date, setDate] = useState('string' || undefined)

	useEffect(() => {
		setDate(dayjs().format('dddd, MMMM D'))
	}, [])

	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: false,
	})

	return (
		<footer
			className='flex w-full items-center justify-center px-6 pb-12 pt-40 text-zinc-500 sm:px-10'
			ref={ref}
		>
			<div
				className={cn(
					'fade flex w-full max-w-lg flex-col items-center justify-center',
					{
						'animate-fade': inView && date !== undefined,
					}
				)}
			>
				<SolidLogoText size={256} className='text-zinc-950' />
				<p>{date}</p>
				{/* <p>&copy; {dayjs().format('YYYY')} Rabbit Tale Studio</p> */}
				<p>
					Original code by:{' '}
					<TextLink
						href={'https://github.com/loganliffick'}
						text={'Logan Liffick'}
					/>
				</p>
			</div>
		</footer>
	)
}

export default Footer
