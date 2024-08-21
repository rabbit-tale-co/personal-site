import Layout from 'components/social/Layout'
import Post from 'components/social/Post' // Fixed import
import PostForm from 'components/social/PostForm'
import React from 'react'

import useColorShades from 'hooks/useColorShade'
import Avatar from 'components/Avatar'
import { Badge } from '@nextui-org/react'

const Page = () => {
  const color = '#3d3d3d'
  const shades = useColorShades(color)
  console.log(shades)
  return (
    <Layout>
      <div>
        {/* <Badge
          content=""
          color="success"
          shape="circle"
          placement="bottom-right"
        > */}
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026702e"
          size="xl"
          stories={[
            {
              title: 'test',
              isDisabled: true,
            },
            {
              title: 'test',
              isDisabled: true,
            },
            {
              title: 'test',
              isDisabled: false,
            },
            {
              title: 'test',
              isDisabled: false,
            },
            {
              title: 'test',
              isDisabled: false,
            },
          ]}
        />
        {/* </Badge> */}
      </div>
      {/* <PostFilters /> */}
      <PostForm />
      <Post />
    </Layout>
  )
}

export default Page
