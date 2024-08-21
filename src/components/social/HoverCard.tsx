import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { cn } from 'utils/tw'
import Button from '../Button'
import UserCard from './UserProfileOverview'
import { Avatar, User } from '@nextui-org/react'
import Link from 'next/link'
import { SolidNestAlt } from 'icons/Icons'
import UserIdentifier from './UserIdentifier'

interface Props {
  avatarUrl: string
  displayName: string
  username: string
  bio?: string
  following: string
  followers: string
}

const HoverCard = ({
  avatarUrl,
  displayName,
  username,
  bio,
  following,
  followers,
}: Props) => (
  <HoverCardPrimitive.Root>
    <HoverCardPrimitive.Trigger asChild>
      <Link
        className="ImageTrigger"
        href="https://twitter.com/hasiradoo"
        target="_blank"
        rel="noreferrer noopener"
      >
        <UserIdentifier
          avatarUrl={avatarUrl}
          displayName={displayName}
          username={username}
        />
      </Link>
    </HoverCardPrimitive.Trigger>
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        align="center"
        sideOffset={4}
        className={cn(
          'z-50',
          'w-72 rounded-2xl',
          'border bg-white-50 shadow-xl',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
        )}
      >
        <div className="flex w-full flex-col gap-y-2">
          <UserCard
            displayName={displayName}
            avatarUrl={avatarUrl}
            username={username}
            bio={bio}
            following={following}
            followers={followers}
          />
        </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  </HoverCardPrimitive.Root>
)

export default HoverCard
