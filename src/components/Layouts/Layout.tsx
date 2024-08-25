import Footer from "components/Footer";
import FontProvider from "components/Layouts/Providers/FontProvider";
import MetaTagsProvider from "components/Layouts/Providers/MetaTagsProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";
import Nav from "components/Nav";
import WindowsMode from "components/WindowsMode";
import type React from "react";
import { Toaster } from "components/ui/sonner";

type LayoutProps = {
	children?: React.ReactNode;
	metaTags?: React.ComponentProps<typeof MetaTagsProvider>;
};

const Layout = ({ children, metaTags }: LayoutProps) => (
	<ThemeProvider
		attribute="class"
		defaultTheme="light"
		enableSystem
		disableTransitionOnChange
	>
		<FontProvider>
			{/* <React.Fragment> */}
			<Toaster richColors />
			<MetaTagsProvider {...(metaTags ?? {})} />
			<div className="flex min-h-screen h-full flex-col">
				<Nav />
				<main className="flex flex-1 h-full w-full flex-col items-center justify-start px-4">
					{children}
				</main>
				<Footer />
			</div>
			<WindowsMode />
			{/* </React.Fragment> */}
		</FontProvider>
	</ThemeProvider>
);

export default Layout;
