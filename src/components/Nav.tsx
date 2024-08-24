import Button from './Button'
import useClickOutside from 'hooks/useClickOutside'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from 'utils/tw'
import Splt from 'react-spltjs'
import type { LinkProps } from 'next/link'
import {
	OutlineDiscord,
	OutlineMail,
	OutlineSend,
	OutlineTwitter,
	SolidLogo,
} from 'src/icons/Icons'
import { DrawerDialogDemo } from './AnonMessage'

type MenuItemProps = {
	external?: boolean
	href?: LinkProps['href']
	title: string
	icon?: React.ReactNode
	onClick?: () => void
}

const MenuItem = ({
	external = true,
	href,
	title,
	icon,
	onClick,
}: MenuItemProps) => (
	<li>
		{onClick ? (
			<button
				aria-label={title}
				className='flex w-full items-center gap-2 rounded-xl px-3 transition-colors py-2 font-medium text-zinc-700 sm:hover:bg-zinc-100'
				onClick={onClick}
				type='button'
			>
				{icon}
				{title}
			</button>
		) : (
			<Link
				aria-label={title}
				className='flex items-center gap-2 rounded-xl px-3 transition-colors py-2 font-medium text-zinc-700 sm:hover:bg-zinc-100'
				href={href || ''}
				rel={external ? 'noopener noreferrer' : undefined}
				target={external ? '_blank' : undefined}
			>
				{icon}
				{title}
			</Link>
		)}
	</li>
)

const Nav = () => {
	const [open, setOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const menuRef = useClickOutside(() => {
		setOpen(false)
	}) as React.RefObject<HTMLDivElement>

	const handleModalOpen = () => {
		setIsModalOpen(true)
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
	}

	return (
		<header className='relative z-20 mt-6 flex w-full items-center justify-center px-4 sm:mt-16 sm:px-10'>
			<nav className='flex w-full max-w-lg items-center justify-between'>
				<Link className='text-xl items-center flex gap-3' href='/'>
					<SolidLogo size={28} />
					<span>
						<Splt
							text='Kris German'
							className='animate-revealSm hidden sm:inline-block'
							speed={0.05}
							offset={0.1}
							ease='bounce'
						/>
						<Splt
							text='Kris'
							className='animate-revealSm inline-block sm:hidden'
							speed={0.05}
							offset={0.1}
							ease='bounce'
						/>
					</span>
					{/* <SolidLogoText size={96} className="text-shark-950 dark:text-white" /> */}
				</Link>
				<nav className='flex space-x-2'>
					<Button
						className='text-sm'
						title='Blog'
						variant='secondary'
						href={'/blog'}
					/>
					<div className='relative z-50' ref={menuRef}>
						<Button
							className='text-sm'
							onClick={() => {
								setOpen(!open)
							}}
							state={open}
							title='Contact'
							variant='secondary'
						/>
						<ul
							className={cn(
								'invisible absolute right-0 top-14 block w-36 min-w-max origin-top-right scale-75 rounded-2xl bg-white p-1 opacity-0 shadow-lg duration-150 ease-in-out dark:bg-[#2b2b2b]',
								{ 'visible scale-100 opacity-100': open }
							)}
							onClick={() => setOpen(!open)}
							onKeyUp={(e) => {
								if (e.key === 'Enter') setOpen(!open)
							}}
						>
							<MenuItem
								title='Twitter'
								href='https://twitter.com/Hasiradoo'
								icon={<OutlineTwitter size={20} />}
							/>
							<MenuItem
								title='Telegram'
								href='https://t.me/hasiradoo'
								icon={<OutlineSend size={20} />}
							/>
							<MenuItem
								title='Discord'
								href='https://discord.com/users/569975072417251378'
								icon={<OutlineDiscord size={20} />}
							/>
							<DrawerDialogDemo />
							{/* <MenuItem
								title='Message'
								icon={<OutlineMail size={20} />}
								onClick={handleModalOpen}
							/> */}
						</ul>
					</div>
				</nav>
			</nav>
		</header>
	)
}

export default Nav
