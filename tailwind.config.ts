import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: ['class'],
	theme: {
		extend: {
			fontFamily: {
				...defaultTheme.fontFamily,
				sans: ['var(--rubik)', ...defaultTheme.fontFamily.sans],
			},

			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},

			borderRadius: {
				'1.5lg': '10px',
				'2.5xl': '18px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},

			transitionTimingFunction: {
				bounce: 'cubic-bezier(0.2, -0.25, 0, 1.6)',
			},

			keyframes: {
				fade: {
					from: {
						opacity: '0%',
					},
					to: {
						opacity: '100%',
					},
				},

				scaleFade: {
					from: {
						opacity: '0%',
						transform: 'scale(0.75)',
					},
					to: {
						opacity: '100%',
						transform: 'scale(1)',
					},
				},

				scaleOutFade: {
					from: {
						opacity: '100%',
						transform: 'scale(1)',
					},
					to: {
						opacity: '0%',
						transform: 'scale(0.75)',
					},
				},

				reveal: {
					from: {
						opacity: '0%',
						transform: 'translateY(40px)',
					},
					to: {
						opacity: '100%',
						transform: 'translateY(0px)',
					},
				},

				modalReveal: {
					from: {
						opacity: '0%',
						transform: 'scale(0.7) translateY(100px)',
					},
					to: {
						opacity: '100%',
						transform: 'scale(1) translateY(0px) rotate(0deg)',
					},
				},

				rotate: {
					from: {
						opacity: '0%',
						transform: 'translateY(40px) rotate(6deg)',
					},
					to: {
						opacity: '100%',
						transform: 'translateY(0px) rotate(0deg)',
					},
				},

				rotateAlt: {
					from: {
						opacity: '0%',
						transform: 'translateY(40px) rotate(-6deg)',
					},
					to: {
						opacity: '100%',
						transform: 'translateY(0px) rotate(0deg)',
					},
				},

				bouncy: {
					to: {
						transform: 'translateY(-8px)',
					},
				},

				bouncyLite: {
					to: {
						transform: 'translateY(-4px)',
					},
				},

				marquee: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},

				shake: {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-1px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(1px)' },
				},

				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},

			animation: {
				fadeXs: 'fade 0.2s forwards',
				fadeSm: 'fade 0.4s forwards',
				fade: 'fade 0.8s forwards',
				fadeMd: 'fade 1.2s forwards',
				fadeLg: 'fade 1.6s forwards',
				fadeXl: 'fade 2s forwards',

				scaleFade: 'scaleFade 0.4s cubic-bezier(0.7,0,0.5,2) forwards',
				scaleOutFade: 'scaleOutFade 0.4s cubic-bezier(0.7,0,0.5,2) forwards',

				revealSm: 'reveal 0.8s cubic-bezier(0.5,-0.2,0.1,1.2) forwards',
				reveal: 'reveal 1.2s cubic-bezier(0.5,-0.2,0.1,1.3) forwards',
				revealMd: 'reveal 1.4s cubic-bezier(0.5,-0.2,0.1,1.4) forwards',
				revealLg: 'reveal 1.6s cubic-bezier(0.5,-0.2,0.1,1.5) forwards',
				modalReveal: 'modalReveal 0.6s cubic-bezier(0,1,0,1.1) forwards',

				rotate: 'rotate 1s cubic-bezier(0.5,-0.5,0.1,1.8) forwards',
				rotateAlt: 'rotateAlt 1s cubic-bezier(0.5,1,0.1,1.8) forwards',

				marquee: 'marquee 10s linear infinite',
				shake: 'shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',

				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [
		nextui(),
		require('@tailwindcss/typography'),
		require('tailwindcss-animate'),
	],
}
export default config

// import type { Config } from "tailwindcss"

// const config = {
//   darkMode: ["class"],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
// 	],
//   prefix: "",
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// } satisfies Config

// export default config
