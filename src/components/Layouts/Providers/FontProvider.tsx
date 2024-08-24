import { Figtree, Space_Grotesk, Rubik } from 'next/font/google'

export const figtree = Figtree({ variable: '--figtree', subsets: ['latin'] })
export const spaceGrotesk = Space_Grotesk({
	variable: '--space-grotesk',
	subsets: ['latin'],
})
export const rubik = Rubik({
	variable: '--rubik',
	subsets: ['latin'],
	weight: '400',
})

type FontProviderProps = {
	children: React.ReactNode
}

const FontProvider = ({ children }: FontProviderProps) => (
	<div className={`${rubik.variable}`}>{children}</div>
)

export default FontProvider
