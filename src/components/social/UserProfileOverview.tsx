import React, { useEffect } from 'react'
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'
import Button from 'components/Button'
import twemoji from 'twemoji'

const UserProfileOverview = ({
  displayName,
  avatarUrl,
  username,
  bio,
  following,
  followers,
}: {
  displayName: string
  avatarUrl: string
  username: string
  bio?: string
  following: string
  followers: string
}) => {
  const [isFollowed, setIsFollowed] = React.useState(false)
  useEffect(() => {
    twemoji.parse(document.body, {
      base: 'https://abs-0.twimg.com/emoji/v2/',
      folder: 'svg',
      ext: '.svg',
    })
  }, [])

  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="items-start justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="lg" src={avatarUrl} />
        </div>
        <Button
          text={isFollowed ? 'Unfollow' : 'Follow'}
          rounded="full"
          size="sm"
          variant={isFollowed ? 'outline' : 'primary'}
          onClick={() => setIsFollowed(!isFollowed)}
        />
      </CardHeader>
      <CardBody className="space-y-4 px-3 py-0">
        <div className="flex flex-col items-start justify-center">
          <h4 className="font-semibold leading-none text-default-600">
            {displayName}
          </h4>
          <h5 className="text-small tracking-tight text-default-500">
            @{username}
          </h5>
        </div>
        <p className="pl-px text-small text-default-500">{bio}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-600">
            {following}
          </p>
          <p className=" text-small text-default-500">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-600">
            {followers}
          </p>
          <p className="text-small text-default-500">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default UserProfileOverview
