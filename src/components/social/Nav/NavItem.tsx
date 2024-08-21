import type { ReactNode } from 'react'

type Props = {
	active?: boolean
	link?: string
	children: ReactNode
	aria?: string
	onClick?: () => void
	isDisabled?: boolean
	badge?: {
		active: boolean
		content: React.ReactNode
	}
}

//import { InfoBadge } from './Notification'
import Link from 'next/link'
import Button from 'components/Button'

const NavItem = ({
	active = false,
	link,
	children,
	onClick,
	badge,
	aria,
}: Props) => {
	return (
		<li
			className={
				'group flex flex-1 cursor-pointer items-center justify-center lg:w-full xl:justify-between'
			}
		>
			<Link
				aria-label={aria}
				tabIndex={-1}
				onClick={onClick}
				href={link || '#'}
				className='w-full'
			>
				<Button
					hasIcon
					aria={aria}
					//  rounded={'xl'}
					iconPosition='left'
					variant={`${active ? 'primary' : 'ghost'}`}
					className={`h-12 !duration-150 max-xl:p-3 lg:group-hover:translate-x-2 ${active ? 'lg:group-hover:bg-default-800' : 'lg:group-hover:bg-default-900/5'}`}
				>
					{children}
				</Button>

				{/* {badge && badge.active && <InfoBadge children={badge.content} />} */}
			</Link>
		</li>
	)
}

export default NavItem
