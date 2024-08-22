import Footer from 'components/Footer'
import FontProvider from 'components/Layouts/Providers/FontProvider'
import MetaTagsProvider from 'components/Layouts/Providers/MetaTagsProvider'
import Nav from 'components/Nav'
import WindowsMode from 'components/WindowsMode'

type LayoutProps = {
	children?: React.ReactNode
	metaTags?: React.ComponentProps<typeof MetaTagsProvider>
}

const Layout = ({ children, metaTags }: LayoutProps) => (
	<FontProvider>
		<MetaTagsProvider {...(metaTags ?? {})} />
		<WindowsMode />
		<div className='flex min-h-screen h-full flex-col'>
			<Nav />
			<main className='flex flex-1 h-full w-full flex-col items-center justify-start px-4'>
				{children}
			</main>
			<Footer />
		</div>
	</FontProvider>
)

export default Layout
