import Link from 'next/link'
import type React from 'react'
import { cn } from 'utils/tw'
import Garnish from './Garnish'

type ButtonProps = {
  aria?: string
  as?: 'a' | 'button'
  children?: React.ReactNode
  className?: string
  external?: boolean
  garnish?: boolean
  href?: string
  onClick?: () => void
  state?: boolean
  title: string
  type?: 'submit' | 'reset' | 'button' | undefined
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'link' | 'icon'
  hasIcon?: boolean
  iconPosition?: 'left' | 'right'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

// interface ButtonProps {
// 	as?: 'a' | 'button'
// 	hasIcon?: boolean
// 	iconPosition?: 'left' | 'right'
// 	aria?: string
// 	isStickyHover?: boolean | undefined
// 	children?: React.ReactNode
// 	external?: boolean
// 	href?: LinkProps['href']
// 	onClick?: () => void
// 	onKeyUp?: (
// 		e: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>
// 	) => void
// 	state?: boolean
// 	text?: string
// 	className?: string
// 	variant:
// 		| 'primary'
// 		| 'secondary'
// 		| 'outline'
// 		| 'ghost'
// 		| 'icon'
// 		| 'accent'
// 		| 'link'
// 	rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
// 	size?: 'sm' | 'md' | 'lg'
// 	disabled?: boolean
// 	type?: 'button' | 'submit' | 'reset'
// }

// const style = cn(
//   'group w-max overflow-hidden relative px-4 py-2 sm:transition-all block',
//   {
//     'active:scale-95': props.variant !== 'link' && !props.disabled,

//     'bg-default-900 text-default-50 dark:bg-default-50 dark:text-default-900 sm:hover:bg-default-900 dark:sm:hover:bg-default-100':
//       props.variant === 'primary',

//     'bg-default-900/5': props.variant === 'primary' && props.state,

//     'bg-default-900/5 dark:bg-default-50/5 text-default-950 dark:text-white-50 sm:hover:bg-default-100 dark:sm:hover:bg-default-50/10':
//       props.variant === 'secondary',

//     'ring-2 ring-shark-100 hover:ring-shark-950/10 hover:bg-shark-950/5':
//       props.variant === 'outline',

//     '!px-2 sm:hover:bg-white': props.variant === 'icon',

//     'bg-transparent text-shark-500 dark:text-shark-300 sm:hover:bg-shark-950/5 dark:sm:hover:bg-shark-50/5':
//       props.variant === 'ghost' || props.variant === 'icon',

//     'bg-white-950/5 dark:bg-shark-50/5 text-shark-950 dark:text-shark-50':
//       (props.variant === 'ghost' || props.variant === 'icon') &&
//       props.state,

//     'bg-blueberry-500 text-blueberry-50 dark:bg-blueberry-50 dark:text-blueberry-950 sm:hover:bg-blueberry-600 dark:sm:hover:bg-blueberry-100':
//       props.variant === 'accent',

//     'p-0 text-shark-500': props.variant === 'link',

//     'flex items-center justify-center gap-2.5': props.children,

//     'text-xs': size === 'sm',
//     'text-sm sm:text-base': size === 'md',
//     'text-base sm:text-lg py-2.5 px-5': size === 'lg',

//     'pl-5': hasIcon && iconPosition === 'right' && props.variant !== 'link',
//     'pr-5': hasIcon && iconPosition === 'left' && props.variant !== 'link',

//     'cursor-not-allowed opacity-50': props.disabled,

//     'rounded-sm': rounded === 'sm',
//     'rounded-md': rounded === 'md',
//     'rounded-lg': rounded === 'lg',
//     'rounded-xl': rounded === 'xl',
//     'rounded-2xl': rounded === '2xl',
//     'rounded-full': rounded === 'full',
//   }
// )

const Button = ({
  as,
  aria,
  children,
  className,
  external,
  garnish = false,
  href,
  onClick,
  state,
  title,
  type,
  variant = 'primary',
}: ButtonProps) => {
    const Component = as ?? Link

    return (
      <Component
        aria-label={aria ?? title}
        className={cn(
          'group flex w-max items-center justify-center gap-2.5 rounded-full px-4 py-2.5 active:scale-95 sm:transition-all',
          {
            'bg-white-50 font-[550] text-zinc-700': variant === 'primary',
            'bg-white-50': variant === 'primary' && state,

            'bg-transparent font-medium text-zinc-600 sm:hover:bg-white-50':
              variant === 'secondary',
            'bg-white-50 text-zinc-800': variant === 'secondary' && state,

            'bg-red-500': variant === 'accent',
            'bg-red-600': variant === 'accent' && state,
          },
          className
        )}
        href={href || ''}
        onClick={onClick}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
        type={type}
      >
        {title}
        {children}
        {garnish && <Garnish />}
      </Component>
    )
	}

export default Button
