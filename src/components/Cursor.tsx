import type React from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
//import { vec2 } from 'vecteur'

const CursorComponent = () => {
	const cursorRef = useRef<HTMLDivElement>(null)
	// Initialization on component mount
	useEffect(() => {
		const cursor = cursorRef.current ? new Cursor(cursorRef.current) : null
		const update = () => cursor?.update()
		const onMouseMove = (event: MouseEvent) => {
			const x = event.clientX
			const y = event.clientY
			if (cursor) {
				cursor.updateTargetPosition(x, y)
			}
		}
		gsap.ticker.add(update)
		window.addEventListener('pointermove', onMouseMove)
		return () => {
			gsap.ticker.remove(update)
			window.removeEventListener('pointermove', onMouseMove)
		}
	}, [])
	return (
		<div
			ref={cursorRef}
			className='bg-shark-50 pointer-events-none invisible fixed left-0 top-0 z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference lg:visible'
		/>
	)
}

class Cursor {
	el: HTMLElement
	position: {
		previous: { x: number; y: number }
		current: { x: number; y: number }
		target: { x: number; y: number }
		lerpAmount: number
	}
	scale: {
		previous: number
		current: number
		target: number
		lerpAmount: number
	}
	isHovered: boolean
	hoverEl: HTMLElement | null

	constructor(targetEl: HTMLElement) {
		this.el = targetEl
		this.position = {
			previous: { x: -100, y: -100 },
			current: { x: -100, y: -100 },
			target: { x: -100, y: -100 },
			lerpAmount: 0.1,
		}
		this.scale = {
			previous: 1,
			current: 1,
			target: 1,
			lerpAmount: 0.1,
		}
		this.isHovered = false
		this.hoverEl = null
		this.addListeners()
	}

	update() {
		this.position.current = lerpVec2(
			this.position.current,
			this.position.target,
			this.position.lerpAmount
		)
		this.scale.current = gsap.utils.interpolate(
			this.scale.current,
			this.scale.target,
			this.scale.lerpAmount
		)
		const delta = vec2Subtract(this.position.current, this.position.previous)
		this.position.previous = this.position.current
		this.scale.previous = this.scale.current
		gsap.set(this.el, {
			x: this.position.current.x,
			y: this.position.current.y,
		})
		if (!this.isHovered) {
			const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI)
			const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.04
			gsap.set(this.el, {
				rotate: angle,
				scaleX: this.scale.current + Math.min(distance, 1),
				scaleY: this.scale.current - Math.min(distance, 0.3),
			})
		}
	}

	updateTargetPosition(x: number, y: number) {
		if (this.isHovered) {
			const bounds = this.hoverEl?.getBoundingClientRect()
			const cx = bounds?.x ?? 0 + (bounds?.width ?? 0) / 2
			const cy = bounds?.y ?? 0 + (bounds?.height ?? 0) / 2
			const dx = x - cx
			const dy = y - cy
			this.position.target.x = cx + dx * 0.15
			this.position.target.y = cy + dy * 0.15
			this.scale.target = 2
			const angle = Math.atan2(dy, dx) * (180 / Math.PI)
			const distance = Math.sqrt(dx * dx + dy * dy) * 0.01
			gsap.set(this.el, { rotate: angle })
			gsap.to(this.el, {
				scaleX: this.scale.target + Math.min(distance, 0.6) ** 3 * 3,
				scaleY: this.scale.target - Math.min(distance, 0.3) ** 3 * 3,
				duration: 0.5,
				ease: 'power4.out',
				overwrite: true,
			})
		} else {
			this.position.target.x = x
			this.position.target.y = y
			this.scale.target = 1
		}
	}

	addListeners() {
		const hoverEls = gsap.utils.toArray<HTMLElement>('[data-hover]')
		for (const hoverEl of hoverEls) {
			const hoverBoundsEl: HTMLElement | null =
				hoverEl.querySelector<HTMLElement>('[data-hover-bounds]')
			if (hoverBoundsEl) {
				hoverBoundsEl.addEventListener('pointerover', () => {
					this.isHovered = true
					this.hoverEl = hoverBoundsEl
				})
				hoverBoundsEl.addEventListener('pointerout', () => {
					this.isHovered = false
					this.hoverEl = null
				})
			}

			const xTo = gsap.quickTo(hoverEl, 'x', {
				duration: 1,
				ease: 'elastic.out(1, 0.3)',
			})
			const yTo = gsap.quickTo(hoverEl, 'y', {
				duration: 1,
				ease: 'elastic.out(1, 0.3)',
			})
			hoverEl.addEventListener('pointermove', (event: MouseEvent) => {
				const { clientX: cx, clientY: cy } = event
				const { height, width, left, top } = hoverEl.getBoundingClientRect()
				const x = cx - (left + width / 2)
				const y = cy - (top + height / 2)
				xTo(x * 0.2)
				yTo(y * 0.2)
			})
			hoverEl.addEventListener('pointerout', () => {
				xTo(0)
				yTo(0)
			})
		}
	}
}

function lerpVec2(
	a: { x: number; y: number },
	b: { x: number; y: number },
	t: number
) {
	return {
		x: lerp(a.x, b.x, t),
		y: lerp(a.y, b.y, t),
	}
}

function vec2Subtract(
	a: { x: number; y: number },
	b: { x: number; y: number }
) {
	return {
		x: a.x - b.x,
		y: a.y - b.y,
	}
}

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t
}

export default CursorComponent
