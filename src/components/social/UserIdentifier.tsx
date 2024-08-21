import { Avatar } from '@nextui-org/react'
import { SolidNestAlt } from 'icons/Icons'
import React from 'react'

type Story = {
  id: number
  title: string
}

type UserIdentifierProps = {
  displayName: string
  username: string
  avatarUrl: string
  stories?: Story[]
  canCollapse?: boolean
}

const UserIdentifier = ({
  displayName,
  username,
  avatarUrl,
  stories,
  canCollapse,
}: UserIdentifierProps) => {
  return (
    <div className={'flex gap-3'}>
      <Avatar
        isBordered
        color={stories?.length ? 'primary' : 'default'}
        radius="full"
        className={`${canCollapse && 'max-xl:h-12 max-xl:w-12'} max-sm:h-9 max-sm:w-9`}
        src={avatarUrl}
        alt={displayName}
        fallback={<SolidNestAlt size={24} />}
      />
      <div
        className={`${canCollapse ? 'max-xl:hidden' : 'flex'} flex-col items-start justify-center`}
      >
        <h4 className="font-semibold leading-none text-default-900">
          {displayName}
        </h4>
        <h5 className="text-small tracking-tight text-default-600">
          @{username}
        </h5>
      </div>
    </div>
  )
}

export default UserIdentifier
