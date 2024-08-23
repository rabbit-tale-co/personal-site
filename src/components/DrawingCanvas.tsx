import type * as React from 'react'
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import Button from './Button'

type DrawingCanvasProps = {
	onDrawingStart?: () => void
	onDrawingEnd?: () => void
	name?: string
	value?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface DrawingCanvasRef {
	getDataURL: () => string
	clearCanvas: () => void
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
	({ onDrawingStart, onDrawingEnd, name, value, onChange }, ref) => {
		const canvasRef = useRef<HTMLCanvasElement>(null)
		const contextRef = useRef<CanvasRenderingContext2D | null>(null)
		const isDrawingRef = useRef(false)

		useImperativeHandle(ref, () => ({
			getDataURL: () => {
				if (canvasRef.current) {
					return canvasRef.current.toDataURL()
				}
				return ''
			},
			clearCanvas,
		}))

		useEffect(() => {
			const canvas = canvasRef.current
			if (!canvas) return

			// Set canvas size
			canvas.width = canvas.offsetWidth
			canvas.height = 256

			// Set up the drawing context
			const context = canvas.getContext('2d')
			if (context) {
				context.strokeStyle = 'black'
				context.lineWidth = 2
				context.lineCap = 'round'
				contextRef.current = context
			}
		}, [])

		const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
			event.preventDefault()
			event.stopPropagation()

			isDrawingRef.current = true
			if (onDrawingStart) onDrawingStart()

			const { offsetX, offsetY } = getCoordinates(event)
			contextRef.current?.beginPath()
			contextRef.current?.moveTo(offsetX, offsetY)
		}

		const draw = (event: React.MouseEvent | React.TouchEvent) => {
			if (!isDrawingRef.current || !contextRef.current) return

			event.preventDefault()
			event.stopPropagation()

			const { offsetX, offsetY } = getCoordinates(event)
			contextRef.current.lineTo(offsetX, offsetY)
			contextRef.current.stroke()
		}

		const stopDrawing = (event: React.MouseEvent | React.TouchEvent) => {
			event.preventDefault()
			event.stopPropagation()

			isDrawingRef.current = false
			contextRef.current?.closePath()
			if (onDrawingEnd) onDrawingEnd()
		}

		const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
			const canvas = canvasRef.current
			if (!canvas) return { offsetX: 0, offsetY: 0 }

			const rect = canvas.getBoundingClientRect()

			let offsetX: number
			let offsetY: number

			if ('touches' in event) {
				offsetX = event.touches[0].clientX - rect.left
				offsetY = event.touches[0].clientY - rect.top
			} else {
				offsetX = event.clientX - rect.left
				offsetY = event.clientY - rect.top
			}

			return { offsetX, offsetY }
		}

		const clearCanvas = () => {
			const canvas = canvasRef.current
			const context = contextRef.current
			if (canvas && context) {
				context.clearRect(0, 0, canvas.width, canvas.height)
			}
		}

		return (
			<div className='flex flex-col gap-2'>
				<canvas
					ref={canvasRef}
					onMouseDown={startDrawing}
					onMouseMove={draw}
					onMouseUp={stopDrawing}
					onMouseLeave={stopDrawing}
					onTouchStart={startDrawing}
					onTouchMove={draw}
					onTouchEnd={stopDrawing}
					className='w-full h-64 border border-gray-300 rounded-lg'
				/>
				<Button
					type='button'
					title='Clear'
					onClick={clearCanvas}
					variant='danger'
					className='self-end'
				/>
			</div>
		)
	}
)

export default DrawingCanvas
