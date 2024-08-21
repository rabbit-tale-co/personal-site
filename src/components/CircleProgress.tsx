import React, { useEffect, useState } from 'react'

const CircleProgress = ({
	progress = 0,
	gap = 4,
	activeColor = 'blue',
	inactiveColor = 'gray',
	size = 100,
}) => {
	const [animationProgress, setAnimationProgress] = useState(0)
	const radius = size / 2 - gap / 2
	const circumference = 2 * Math.PI * radius
	const halfGapInRadians = (gap / (2 * radius)) * 1.33
	const strokeDashoffsetActive =
		circumference - animationProgress * circumference
	const strokeDashoffsetInactive =
		circumference - (1 - animationProgress) * circumference

	useEffect(() => {
		const animationDuration = 1000 // 1 second
		const startTime = Date.now()
		const animate = () => {
			const now = Date.now()
			const elapsed = now - startTime
			const t = Math.min(elapsed / animationDuration, 1)
			setAnimationProgress(t * progress)
			if (t < 1) requestAnimationFrame(animate)
		}
		animate()
	}, [progress])

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg width={size} height={size}>
			<circle
				stroke={inactiveColor}
				fill='transparent'
				strokeWidth={gap}
				strokeDasharray={circumference}
				strokeDashoffset={strokeDashoffsetInactive}
				r={radius}
				cx={size / 2}
				cy={size / 2}
			/>
			<circle
				stroke={activeColor}
				fill='transparent'
				strokeWidth={gap}
				strokeDasharray={circumference}
				strokeDashoffset={strokeDashoffsetActive}
				r={radius}
				cx={size / 2}
				cy={size / 2}
			/>
		</svg>
	)
}

export default CircleProgress
