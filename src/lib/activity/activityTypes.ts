import type { StaticImageData } from 'next/image'

type ImageContent = {
	type: 'Image'
	image: StaticImageData
}

export type TextBlockContent = {
	type: 'TextBlock'
	text: {
		title?: string
		body: React.ReactNode
	}
	themeData: Day['type']
}

type LinkButtonContent = {
	type: 'LinkButton'
	link: {
		external?: boolean
		href: string
		text: string
	}
}

export type ContentItem = ImageContent | TextBlockContent | LinkButtonContent

type Day = {
	day: number
	type: 'Blog' | 'Work' | 'Side Project' | 'Feature' | 'Life' | 'Misc'
	content: ContentItem[]
}

export const themeTypes = ['Work', 'Life', 'Misc'];

export type MonthDataType = {
	month: number
	year: number
	days: Day[]
}
