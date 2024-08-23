// src/pages/annons/index.tsx
import type { GetServerSideProps } from 'next'
import type React from 'react'
import Image from 'next/image'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../../firebase.config'
import Section from 'components/Section'
import Layout from 'components/Layouts/Layout'

interface Message {
	id: string
	message: string
	drawing?: string
}

interface MessagesPageProps {
	messages: Message[]
}

export const getServerSideProps: GetServerSideProps = async () => {
	const querySnapshot = await getDocs(collection(db, 'anonymousMessages'))
	const messages = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Message[]

	return {
		props: {
			messages,
		},
	}
}

const MessagesPage: React.FC<MessagesPageProps> = ({ messages }) => {
	return (
		<Layout>
			<Section className='max-w-full'>
				<h2 className='mb-16 text-3xl font-semibold text-center'>
					Lovely Annons
				</h2>
				<div className='p-6'>
					<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center'>
						{messages.map((message) => (
							<div
								key={message.id}
								className='group relative bg-white rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out transform-gpu hover:-translate-y-2 hover:scale-105'
								style={{ width: '375px' }}
							>
								{message.drawing && (
									<div className='relative h-64 overflow-hidden rounded-t-xl'>
										<Image
											src={message.drawing}
											alt='User drawing'
											layout='fill'
											objectFit='cover'
											className='transition-opacity border-b-1 border-zinc-300 duration-500 ease-in-out group-hover:opacity-75'
										/>
									</div>
								)}
								<div className='p-6 bg-white rounded-b-xl'>
									<p className='text-gray-800 text-lg font-medium'>
										{message.message}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</Section>
		</Layout>
	)
}

export default MessagesPage
