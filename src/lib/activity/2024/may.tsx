import type { MonthDataType } from 'lib/activity/activityTypes'

export const mayData: MonthDataType[] = [
	{
		month: 5,
		year: 2024,
		days: [
			{
				day: 26,
				type: 'Blog',
				content: [
					//  { type: 'Image', image: tinyBudiesMock },
					{
						type: 'TextBlock',
						text: {
							title: 'Tiny Buddies - New Mobile Pixel Pet Game',
							body: 'Check out our latest blog post about Tiny Buddies, a new mobile pixel pet game where you take care of your virtual pet.',
						},
						themeData: 'Blog',
					},
					{
						type: 'LinkButton',
						link: {
							external: false,
							href: '/blog/tiny-buddies',
							text: 'Read more',
						},
					},
					{
						type: 'LinkButton',
						link: {
							external: true,
							href: 'https://patreon.com/TinyBuddies',
							text: 'Support us on Patreon ❤️',
						},
					},
				],
			},
		],
	},
]
