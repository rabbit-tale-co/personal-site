import type { GetServerSideProps } from 'next'
import type React from 'react'
import Image from 'next/image'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase.config'
import Section from 'components/Section'
import Layout from 'components/Layouts/Layout'
import html2canvas from 'html2canvas'
import Button from 'components/Button'
import { bunnyLog } from 'bunny-log'
import { toast } from 'sonner'
import withAuth from 'src/hoc/withAuth'
import { parseCookies } from 'nookies'

interface Message {
	id: string
	message: string
	drawing?: string
}

interface MessagesPageProps {
	messages: Message[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = context.req.cookies.token

	if (!token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	try {
		const messagesCollection = collection(db, 'anonymousMessages')
		const querySnapshot = await getDocs(messagesCollection)
		const messages = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))

		return {
			props: {
				messages,
			},
		}
	} catch (error) {
		console.error('Error fetching messages:', error)
		return {
			notFound: true,
		}
	}
}

const MessagesPage: React.FC<MessagesPageProps> = ({ messages }) => {
	const handleScreenshot = async (id: string) => {
		const element = document.getElementById(id)
		if (element) {
			const screenshotPromise = html2canvas(element)
				.then((canvas) => {
					const image = canvas.toDataURL('image/png')
					const link = document.createElement('a')
					link.href = image
					link.download = `screenshot-${id}.png`
					link.click()
				})
				.catch((error) => {
					bunnyLog.error('Error taking screenshot:', error)
					throw error // re-throw the error to handle it in toast.promise
				})

			toast.promise(screenshotPromise, {
				loading: 'Taking screenshot...',
				success: 'Screenshot saved successfully!',
				error: 'Failed to take screenshot.',
			})
		}
	}

	const handleDelete = async (id: string) => {
		const deletePromise = deleteDoc(doc(db, 'anonymousMessages', id))
			.then(() => {
				window.location.reload() // Refresh page after delete
			})
			.catch((error) => {
				bunnyLog.error('Error deleting document:', error as Error)
				throw error // re-throw the error to handle it in toast.promise
			})

		toast.promise(deletePromise, {
			loading: 'Deleting message...',
			success: 'Message deleted successfully!',
			error: 'Failed to delete message.',
		})
	}

	return (
		<Layout>
			<Section className='max-w-full'>
				<h2 className='mb-16 text-3xl font-semibold text-center'>
					Lovely Anons
				</h2>
				<div className='p-6'>
					<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-center'>
						{messages.map((message) => (
							<div key={message.id} className='flex flex-col h-full'>
								<div
									className='group relative bg-white rounded-xl transition-transform duration-500 ease-in-out transform-gpu flex-1'
									style={{ width: '375px' }}
									id={message.id}
								>
									{message.drawing && (
										<div className='relative h-64 overflow-hidden rounded-t-xl'>
											<Image
												src={message.drawing}
												alt='User drawing'
												layout='fill'
												objectFit='cover'
												className='transition-opacity border-b-1 border-zinc-300 duration-500 ease-in-out'
											/>
										</div>
									)}
									<div className='p-4 pb-8 bg-white rounded-b-xl'>
										<p className='text-gray-800 text-lg font-medium'>
											{message.message}
										</p>
									</div>
								</div>
								<div className='flex justify-end gap-2 mt-4'>
									<Button
										title='Take screenshot'
										variant={'accent'}
										onClick={() => handleScreenshot(message.id)}
										className='w-full'
									/>
									<Button
										title='Delete message'
										variant={'danger'}
										onClick={() => handleDelete(message.id)}
										className='w-full'
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</Section>
		</Layout>
	)
}

export default withAuth(MessagesPage)
