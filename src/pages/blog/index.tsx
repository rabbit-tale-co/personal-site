import { Skeleton } from '@nextui-org/react'
import Post from 'components/Blog/Post'
import RecentPost from 'components/Blog/RecentPost'
import RecentPostSkeleton from 'components/Blog/RecentPostSkeleton';
import Button from 'components/Button'
import Layout from 'components/Layouts/Layout'
import Section from 'components/Section'
import dayjs from 'dayjs'
import getPosts, { type postTypes } from 'lib/blog'
import type { GetStaticProps } from 'next'
import { useState } from 'react'

export const getStaticProps: GetStaticProps<{
  posts: postTypes
}> = async () => {
  const posts = await getPosts()
  return {
    props: { posts },
  }
}

const createSlug = (text: string): string => {
  const slug = `/blog/${text}`
  return slug
}

const createDate = (text: string) => {
  const date = dayjs(text).format('MMMM D, YYYY')
  return date
}

const Page = ({ posts }: { posts: postTypes[] }) => {
  const [activePost, setActivePost] = useState(0)

  const activePostData = posts[activePost]

  return (
    <Layout>
      <Section className="max-w-full">
        <h2 className="mb-16 text-xl font-medium">Recent Posts</h2>

        {/* Display skeletions if no posts are available */}
        {posts.length > 0 ? (
          <div className="mx-auto flex w-full flex-col gap-10 sm:max-w-min sm:flex-row sm:gap-0">
            {posts.slice(0, 4).map((post: postTypes, index: number) => (
              <RecentPost
                activePost={activePost}
                date={createDate(post.publishedAt)}
                href={createSlug(post.slug)}
                id={index}
                image={post.coverImage?.url || ''}
                key={`post-${post.id}`}
                offset={`${index * 0.1}`}
                setActivePost={() => setActivePost(index)}
                title={post.title}
              />
            ))}
          </div>
        ) : (
          <div className='mx-auto flex w-full flex-col gap-10 sm:max-w-min sm:flex-row sm:gap-0'>
            {[...Array(4)].map((key, i) => (
              <RecentPostSkeleton key={`skeleton-${key}`} offset={`${i * 0.1}`} />
            ))}
          </div>
        )}

        {activePostData && posts.length > 0 ? (
          <div className="mx-auto mt-20 hidden w-full max-w-lg justify-between gap-6 sm:flex">
            <div className="flex w-2/3 flex-col gap-6">
              <header>
                <p className="mb-2 font-bold">Title</p>
                <p className="min-h-10 text-sm text-zinc-600 opacity-100 transition-opacity">
                  {activePostData.title}
                </p>
              </header>
              <div className="w-auto">
                <p className="mb-2 font-bold">Published</p>
                <p className="text-sm text-zinc-600">
                  {createDate(activePostData.publishedAt)}
                </p>
              </div>
            </div>
            <div className="w-full">
              <p className="mb-2 font-bold">Description</p>
              <p className="min-h-32 text-pretty text-sm text-zinc-600">
                {activePostData.seo.description}
              </p>
              <Button
                className="text-sm"
                title={'Read more'}
                href={createSlug(activePostData.slug)}
                garnish
              />
            </div>
          </div>
        ): (
          <div className="mx-auto mt-20 hidden w-full max-w-lg justify-between gap-6 sm:flex">
            <div className="flex w-2/3 flex-col gap-6">
              <header>
                <Skeleton className="mb-2 h-6 w-14 font-bold bg-zinc-200 rounded-full" />
                <Skeleton className="min-h-10 w-full bg-zinc-200 rounded-lg" />
              </header>
              <div className="w-auto">
                <Skeleton className="mb-2 bg-zinc-200 h-6 w-20 rounded-full font-bold" />
                <Skeleton className="text-zinc-200 h-5 w-1/2 rounded-full" />
              </div>
            </div>
            <div className="w-full">
              <Skeleton className="mb-2 h-6 w-24 bg-zinc-200 rounded-full" />
              <Skeleton className="mb-3 min-h-32 rounded-lg" />
              <Skeleton className="w-5/12 h-10 bg-zinc-200 rounded-full" />
            </div>
          </div>
        )}
      </Section>

      {/* Display older posts section only if there are more than 4 posts */}
      {posts.length > 4 && (
        <Section className="mt-10">
          <h2 className="mb-12 text-xl font-medium">Older Posts</h2>
          {posts.slice(4).map((post: postTypes) => (
            <Post
              date={createDate(post.publishedAt)}
              href={createSlug(post.slug)}
              key={post.id}
              title={post.title}
            />
          ))}
        </Section>
      )}
    </Layout>
  )
}

export default Page
