import { useEffect, useState } from 'react'

import FontProvider from 'components/FontProvider'
import MetaTags from 'components/MetaTags'
import { ThemeProvider, useTheme } from 'next-themes'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { NextUIProvider } from '@nextui-org/react'
import LeftNav from './LeftNav'
import Aside from './Aside'

const users = [
	{
		id: 1,
		displayName: 'Hasira 🥃🪴',
		username: 'hasiradoo',
		bio: 'Full-stack developer, @getnextui lover she/her 🎉',
		avatarUrl:
			'https://pbs.twimg.com/profile_images/1777614638261080064/H9iQD24q_400x400.jpg',
		coverUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702e',
		followers: [
			{
				id: 2,
			},
		],
		following: [],
		stories: [],
	},
	{
		id: 2,
		displayName: 'Jane Doe',
		username: 'janedoe',
		bio: 'Full-stack developer, @getnextui lover she/her 🎉',
		avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702e',
		coverUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702f',
		followers: [],
		following: [
			{
				id: 1,
			},
		],
		stories: [],
	},
]

function ThemeWatcher() {
	const { resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)')

		function onMediaChange() {
			const systemTheme = media.matches ? 'dark' : 'light'
			if (resolvedTheme === systemTheme) {
				setTheme('system')
			}
		}

		onMediaChange()
		media.addEventListener('change', onMediaChange)

		return () => {
			media.removeEventListener('change', onMediaChange)
		}
	}, [resolvedTheme, setTheme])

	return null
}

const Layout = (props: {
	children?: React.ReactNode
	metaTagsProps?: React.ComponentProps<typeof MetaTags>
}) => {
	const user = users[0]

	return (
		<ThemeProvider attribute='class' defaultTheme='light'>
			<FontProvider>
				<MetaTags {...(props.metaTagsProps ?? {})} />
				<ThemeWatcher />
				<NextUIProvider>
					<div className='flex lg:justify-center xl:gap-6'>
						<LeftNav
							displayName={user.displayName}
							username={user.username}
							avatarUrl={user.avatarUrl}
							stories={user.stories}
						/>
						<main className='flex w-full flex-col gap-2 py-[2.5rem] leading-none max-sm:py-5 md:max-w-xl lg:max-w-lg xl:max-w-xl'>
							{props.children}
						</main>
						<Aside />
					</div>
				</NextUIProvider>
				<SpeedInsights />
				<Analytics />
			</FontProvider>
		</ThemeProvider>
	)
}

export default Layout
