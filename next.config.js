/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '**',
			},
		],
	},
	reactStrictMode: true,
	env: {
		JWT_SECRET: process.env.JWT_SECRET,
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
	},
}

module.exports = nextConfig
