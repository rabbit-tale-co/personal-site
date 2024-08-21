import { Avatar, Textarea, Divider } from '@nextui-org/react'
import Button from 'components/Button'
import {
	OutlineBar01Up,
	OutlineBold,
	OutlineFaceSmilling,
	OutlineImage,
	OutlineMore,
	OutlinePlus,
} from 'icons/Icons'
import React, { useState } from 'react'
import { CircularProgress } from '@nextui-org/react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/Form'
import { OutlineItalic } from 'icons/assets/formatting/Italic'
import { Gauge } from 'components/Gauge'

const formSchema = z.object({
	username: z.string().min(2).max(500),
})

const PostForm = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}
	const {
		formState: { errors },
	} = form

	const watch = form.watch('username')
	const progress = (watch.length / 500) * 100

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=' bg-white-50 px-3 pb-3 max-sm:border-b sm:rounded-2xl'
			>
				<div className='flex justify-between sm:hidden'>
					<Button variant='ghost' type='button' text='Cancel' />
					<div className='flex space-x-2 max-sm:space-x-3'>
						<Button
							variant='outline'
							disabled={!watch}
							type='button'
							text='Drafts'
						/>
						{/* <Button variant="icon" type="button" size="sm">
              <OutlineMore size={24} />
            </Button> */}
						<Button
							text='hoot'
							disabled={!watch}
							variant='accent'
							type='submit'
						/>
					</div>
				</div>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='flex items-start justify-between space-x-4 max-sm:mt-2'>
							<div className='flex flex-1 flex-col space-y-4'>
								<div className='flex space-x-4'>
									<div className='flex flex-1 space-x-2'>
										<Avatar
											src='https://pbs.twimg.com/profile_images/1777614638261080064/H9iQD24q_400x400.jpg'
											alt='avatar'
											className='max-sm:h-9 max-sm:w-9'
										/>
										<FormControl>
											{/* <Input
                        placeholder="shadcn"
                        {...field}
                        className="w-fit flex-1"
                      /> */}
											<Textarea
												// isInvalid={!!errors.username}
												minRows={1}
												maxRows={4}
												placeholder='Hoot something nice to us.'
												spellCheck
												autoComplete='off'
												maxLength={500}
												//onChange={(e) => setInputValue(e.target.value)}
												className='w-fit flex-1'
												classNames={{
													inputWrapper: [
														'bg-transparent shadow-none group-data-[hover]:bg-transparent group-data-[focus=true]:bg-transparent',
														//  !!errors.username &&
														//    'ring-2 ring-offset-2 group-data-[focus=true]:ring-red-500 ring-red-500',
													]
														.filter(Boolean)
														.join(' '),
													//   input: !!errors.username && '!placeholder-red-500',
													input: 'text-base',
												}}
												{...field}
											/>
										</FormControl>
									</div>
								</div>
							</div>
						</FormItem>
						// <FormItem>
						//   <FormLabel>Username</FormLabel>
						//   <FormControl>
						//     <Input placeholder="shadcn" {...field} />
						//   </FormControl>
						//   <FormDescription>
						//     This is your public display name.
						//   </FormDescription>
						//   <FormMessage />
						// </FormItem>
					)}
				/>
				{/* <Button variant="accent" type="submit">
          Submit
        </Button> */}
				<div className='mt-2 flex justify-between'>
					<div className='flex items-end space-x-1 sm:ml-12'>
						<Button
							variant={'icon'}
							className={
								'group relative justify-start overflow-visible text-blueberry-600 hover:!bg-transparent'
							}
							type='button'
							aria='Images'
						>
							<div className="relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-blueberry-600">
								<OutlineImage size={20} />
							</div>
						</Button>
						<Button
							variant={'icon'}
							className={
								'group relative justify-start overflow-visible text-blueberry-600 hover:!bg-transparent'
							}
							type='button'
							aria='Pools'
						>
							<div className="relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-blueberry-600">
								<OutlineBar01Up size={20} />
							</div>
						</Button>
						<Button
							variant={'icon'}
							className={
								'group relative justify-start overflow-visible text-blueberry-600 hover:!bg-transparent'
							}
							type='button'
							aria='Emojis'
						>
							<div className="relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-blueberry-600">
								<OutlineFaceSmilling size={20} />
							</div>
						</Button>
						<Divider orientation='vertical' className='h-3/4 self-center' />
						<Button
							variant={'icon'}
							className={
								'group relative justify-start overflow-visible text-blueberry-600 hover:!bg-transparent'
							}
							type='button'
							aria='Bold'
						>
							<div className="relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-blueberry-600">
								<OutlineBold size={20} />
							</div>
						</Button>
						<Button
							variant={'icon'}
							className={
								'group relative justify-start overflow-visible text-blueberry-600 hover:!bg-transparent'
							}
							type='button'
							aria='Italicize'
						>
							<div className="relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-blueberry-600">
								<OutlineItalic size={20} />
							</div>
						</Button>
						{/* <Divider orientation="vertical" />
            <Button
              variant={'icon'}
              className={`group relative justify-start overflow-visible text-blueberry-600`}
            >
              <div className="relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:bg-blueberry-600 group-hover:before:opacity-30 group-hover:before:content-['']">
                <OutlineMore size={20} />
              </div>
            </Button> */}
					</div>
					<div className='flex h-10 items-center space-x-2'>
						{/* <CircleProgress size={24} progress={progress} /> */}
						{watch && (
							<React.Fragment>
								<Gauge
									value={progress}
									gapPercent={5}
									strokeWidth={8}
									displayMode='countdown'
									max={500}
									className={{
										svgClassName: `size-8 transition-transform ${500 - watch.length <= 20 && 'scale-[1.125]'}`,
										textClassName: '',
									}}
								/>
								{/* <CircularProgress
                  aria-label="max hoot characters"
                  size="md"
                  value={progress}
                  showValueLabel={500 - watch.length <= 20}
                  valueLabel={
                    500 - watch.length <= 20 ? `${500 - watch.length}` : ''
                  }
                  classNames={{
                    base: 500 - watch.length === 0 && 'animate-shake',
                    svg: `transition-all !size-8 ${500 - watch.length <= 20 && 'scale-[1.125]'}`,
                    value: `text-xs text-shark-500 ${progress >= 100 && 'text-red-500'}`,
                    indicator:
                      progress >= 100 || 500 - watch.length <= 0
                        ? 'text-red-600'
                        : 500 - watch.length <= 20
                          ? 'text-orange-600'
                          : 'text-blueberry-600',
                  }}
                /> */}
								<Divider
									orientation='vertical'
									className={`h-3/4 self-center ${!watch && 'hidden'}`}
								/>
								<Button
									variant={'icon'}
									className={`group relative justify-start overflow-visible text-blueberry-600 hover:!bg-transparent ${!watch && 'hidden'}`}
									type='button'
									aria='Add next Hoot (nest)'
								>
									<div className="relative before:absolute before:inset-1/2 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:transition-all group-hover:text-blueberry-600 group-hover:before:block group-hover:before:size-8 group-hover:before:opacity-[.12] group-hover:before:content-[''] sm:group-hover:before:bg-blueberry-600 ">
										<OutlinePlus size={20} />
									</div>
								</Button>
							</React.Fragment>
						)}
						{/* <Button
              variant="outline"
              disabled={!watch}
              type="button"
              aria="Draft"
              text="Draft"
              className="max-sm:hidden"
            /> */}
						{/* <Button variant="icon" type="button" size="sm">
              <OutlineMore size={24} />
            </Button> */}
						<Button
							text='hoot'
							disabled={!watch}
							variant='accent'
							type='submit'
							className='max-sm:hidden'
						/>
					</div>
				</div>
			</form>
		</Form>
	)
}

export default PostForm
