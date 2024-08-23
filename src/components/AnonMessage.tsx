import * as React from 'react'
import { cn } from 'src/utils/tw'
import Button from './Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { z } from 'zod'
import { OutlineMail } from 'icons/Icons'
import { Textarea } from './ui/textarea'
import DrawingCanvas, { type DrawingCanvasRef } from './DrawingCanvas'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { bunnyLog } from 'bunny-log'

export function DrawerDialogDemo() {
	const [open, setOpen] = React.useState(false)

	// const isDesktop = useMediaQuery('(min-width: 768px)')

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button
					aria-label={'Message'}
					className='flex w-full items-center gap-2 rounded-xl px-3 transition-colors py-2 font-medium text-zinc-700 sm:hover:bg-zinc-100'
					type='button'
				>
					<OutlineMail size={20} />
					Message
				</button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Anonymous message</DialogTitle>
					<DialogDescription>
						Send me an anonymous message. I'll respond to your message on my
						twitter account.
					</DialogDescription>
				</DialogHeader>
				<ProfileForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	)
}

const FormSchema = z.object({
	message: z
		.string()
		.min(2, {
			message: 'Message must be at least 2 characters.',
		})
		.max(300, {
			message: 'Message must not be longer than 300 characters.',
		}),
	drawing: z.string().optional(),
})

function ProfileForm({
	className,
	setOpen,
}: {
	className?: string
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	const canvasRef = React.useRef<DrawingCanvasRef | null>(null)

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const canvas = canvasRef.current
		let canvasImage = ''

		if (canvas && typeof canvas.getDataURL === 'function') {
			canvasImage = canvas.getDataURL()
			data.drawing = canvasImage
		} else {
			bunnyLog.error(
				'Canvas is not initialized or getDataURL method is missing'
			)
		}

		const saveMessage = async () => {
			const docRef = doc(db, 'anonymousMessages', `msg_${Date.now()}`)
			await setDoc(docRef, data)
			bunnyLog.info('Document written with ID: ', docRef.id)
		}

		toast.promise(saveMessage(), {
			loading: 'Saving your message...',
			success: () => {
				setOpen(false) // Close the dialog after a successful submission
				return 'Message sent successfully!'
			},
			error: 'Error sending message',
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn('grid items-start gap-4', className)}
			>
				<FormField
					control={form.control}
					name='drawing'
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor='drawing'>Draw your message</FormLabel>
							<FormControl>
								<DrawingCanvas
									ref={canvasRef}
									name={field.name}
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Enter your anonymous message here'
									className='resize-none'
									maxLength={300}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex gap-2 place-self-end'>
					{/* <Button variant={'outline'} title={'Cancel'} /> */}
					<Button type='submit' variant={'accent'} title={'Submit'} />
				</div>
			</form>
		</Form>
	)
}

export default ProfileForm
