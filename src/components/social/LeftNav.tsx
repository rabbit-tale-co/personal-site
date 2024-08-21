import { Avatar, ScrollShadow, User } from '@nextui-org/react'
import Button from 'components/Button'
import {
	OutlineBell,
	OutlineBookmark,
	OutlineChat,
	OutlineCompass,
	OutlineMore,
	OutlineNestAlt,
	OutlineSettings,
	SolidBell,
	SolidBookmark,
	SolidChat,
	SolidChevronRight,
	SolidCompass,
	SolidNestAlt,
	SolidSettings,
	SolidUser,
} from 'icons/Icons'
import React, { use } from 'react'
import NavItem from './Nav/NavItem'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Badge } from 'components/Badges'
import UserIdentifier from './UserIdentifier'

type Story = {
	id: number
	title: string
}

type LeftNavProps = {
	displayName: string
	username: string
	avatarUrl: string
	stories?: Story[]
}

const LeftNav = ({
	displayName,
	username,
	avatarUrl,
	stories,
}: LeftNavProps) => {
	const router = useRouter()
	const pathname = router.pathname
	const isAuthenticated = true
	const NavLinkItem = [
		{
			active: pathname === '/social',
			href: '/',
			text: 'Nest',
			icon: 'home',
			notification: { type: 'dot', count: 0 },
			badge: { active: true, content: 'New Hoots' },
		},
		{
			active: pathname === '/explore',
			href: '/explore',
			text: 'Explore',
			icon: 'explore',
		},
		...(isAuthenticated
			? [
					{
						active: pathname === '/notifications',
						href: '/notifications',
						text: 'Notifications',
						icon: 'notifications',
					},
					{
						active: pathname === '/messages',
						href: '/messages',
						text: 'Chatter',
						icon: 'messages',
					},
					{
						active: pathname === '/bookmarks',
						href: '/bookmarks',
						text: 'Bookmarks',
						icon: 'bookmarks',
					},
				]
			: []),
		{
			active: pathname === '/settings',
			href: '/settings',
			text: 'Settings',
			icon: 'settings',
			notification: { type: 'count', count: 3 },
			badge: { active: true, content: 'New' },
		},
	]

	const activeIcons = {
		home: <SolidNestAlt size={24} />,
		explore: <SolidCompass size={24} />,
		notifications: <SolidBell size={24} />,
		messages: <SolidChat size={24} />,
		bookmarks: <SolidBookmark size={24} />,
		settings: <SolidSettings size={24} />,
	}

	const inactiveIcons = {
		home: <OutlineNestAlt size={24} />,
		explore: <OutlineCompass size={24} />,
		notifications: <OutlineBell size={24} />,
		messages: <OutlineChat size={24} />,
		bookmarks: <OutlineBookmark size={24} />,
		settings: <OutlineSettings size={24} />,
	}

	return (
		<nav className='sticky top-0 hidden h-dvh max-w-[8rem] flex-1 flex-col items-end justify-between p-8 sm:flex lg:ml-0 xl:ml-0 xl:max-w-[14rem] xl:items-start xl:px-0'>
			<ScrollShadow className='mb-4 flex h-full flex-col items-center justify-between overflow-auto lg:w-full lg:px-0'>
				<section className='rounded-2x flex w-full flex-col gap-6 p-2'>
					<ul className='flex flex-col items-end space-y-2'>
						{NavLinkItem.map(
							({ active, href, text, icon, notification, badge }) => (
								//  <Button type={'secondary'} className="w-full justify-start">
								//    {text}
								//  </Button>
								<NavItem
									key={href}
									badge={typeof badge === 'object' ? badge : undefined}
									active={active}
									link={href}
									aria={text}
									//onClick={onClick}
								>
									{icon &&
										(active
											? activeIcons[icon as keyof typeof activeIcons]
											: inactiveIcons[icon as keyof typeof activeIcons])}
									<span className='hidden xl:inline'>{text}</span>
									{/* {icon &&
                    (active
                      ? activeIcons[icon as keyof typeof activeIcons]
                      : inactiveIcons[icon as keyof typeof activeIcons])} */}
									{/* <span
                    className={`hidden flex-none text-lg xl:inline-flex
								${active ? 'font-bold' : 'font-medium'}
							`}
                  >
                    {text}
                  </span> */}
								</NavItem>
							)
						)}
					</ul>
					<Button
						variant={'accent'}
						aria='Hoot'
						size='lg'
						className='max-xl:self-center max-xl:p-3 xl:w-full'
					>
						<span className='hidden xl:inline'>Hoot</span>
						<SolidChevronRight className='hidden max-xl:inline' size={24} />
					</Button>
				</section>
			</ScrollShadow>
			<section className='flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl p-2 shadow-sm transition-colors xl:bg-default-900/5 xl:p-3 xl:hover:bg-default-900/10'>
				<UserIdentifier
					displayName={displayName}
					username={username}
					avatarUrl={avatarUrl}
					stories={stories}
					canCollapse
				/>
				<OutlineMore
					size={20}
					className='mr-1 text-default-500 max-xl:hidden'
				/>
			</section>
		</nav>
	)
}

export default LeftNav
