import TextLink from 'components/TextLink'
import type { MonthDataType } from 'lib/activity/activityTypes'
import tinyBudiesMock from 'public/images/feb-2024/tiny_buddies_mock.webp'

export const marchData: MonthDataType[] = [
	{
		month: 3,
		year: 2024,
		days: [
			{
				day: 14,
				type: 'Side Project',
				content: [
					{ type: 'Image', image: tinyBudiesMock },
					{
						type: 'TextBlock',
						text: {
							title: 'Tiny Buddies 🐶🐱',
							body: [
								'Today me and my friend ',
								<TextLink
									key='square-shox-link'
									href='https://github.com/SquareShox'
									text='SquareShox'
									external
								/>,
								` launched a little project called Tiny Buddies. It's a mobile game where you take care of a tiny buddy and help them grow. It's been a blast to work on and I'm excited to see where it goes!`,
							],
						},
						themeData: 'Side Project',
					},
				],
			},
			{
				day: 26,
				type: 'Blog',
				content: [
					{
						type: 'TextBlock',
						text: {
							title: 'New personal site 🎉',
							body: [
								`If you're reading this... thank you! Happy to have you here in my little corner of the internet and I hope you're enjoying yourself. I have plenty more coming and hope you'll stick around ❤️`,
							],
						},
						themeData: 'Blog',
					},
					{
						type: 'LinkButton',
						link: {
							external: false,
							href: '/blog/my-design-journey',
							text: 'Read more',
						},
					},
					{
						type: 'LinkButton',
						link: {
							external: false,
							href: '/404',
							text: 'Check 404 page',
						},
					},
				],
			},
			{
				day: 29,
				type: 'Misc',
				content: [
					{
						type: 'TextBlock',
						text: {
							title: 'Strange activity on the website',
							body: `In the last few hours, I've noticed a huge amount of traffic on my website from various countries. I'm surprised because it's a lot of traffic, considering I only shared the link with a few friends. `,
						},
						themeData: 'Misc',
					},
				],
			},
			{
				day: 30,
				type: 'Blog',
				content: [
					{
						type: 'TextBlock',
						text: {
							title: 'Reflecting on Quiet Holidays',
							body: `This holiday season, I find joy in the simplicity of being with someone special. It's a time for reflection, gratitude, and embracing the quiet moments that bring us closer. No traditional celebrations required, just the warmth of companionship and shared experiences.`,
						},
						themeData: 'Blog',
					},
					{
						type: 'LinkButton',
						link: {
							external: false,
							href: '/blog/embracing-quiet-holidays',
							text: 'Read more',
						},
					},
				],
			},
		],
	},
]
