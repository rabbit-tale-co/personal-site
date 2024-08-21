// import React, { useContext, useEffect, useRef, useState } from 'react'
// import Goo from 'gooey-react'
// import { BubbleContext } from './Layout'

// const Bubble = () => {
//   const { showBubble } = useContext(BubbleContext)
//   const ref = useRef({
//     top: Math.random() * window.innerHeight,
//     left: Math.random() * window.innerWidth,
//     speed: Math.random() * 2 + 0.5,
//     size: Math.random() * 200 + 20,
//   })
//   const [style, setStyle] = useState({
//     top: ref.current.top,
//     left: ref.current.left,
//     width: ref.current.size,
//     height: ref.current.size,
//   })

//   useEffect(() => {
//     if (showBubble) {
//       ref.current = {
//         top: window.innerHeight,
//         left: Math.random() * window.innerWidth,
//         speed: Math.random() * 2 + 0.5,
//         size: Math.random() * 200 + 20,
//       }
//       setStyle({
//         top: ref.current.top,
//         left: ref.current.left,
//         width: ref.current.size,
//         height: ref.current.size,
//       })
//     }
//   }, [showBubble])

//   useEffect(() => {
//     const animate = () => {
//       ref.current.top -= ref.current.speed
//       if (ref.current.top < -200) {
//         ref.current.top = window.innerHeight
//         ref.current.left = Math.random() * window.innerWidth
//         ref.current.speed = Math.random() * 2 + 0.5
//         ref.current.size = Math.random() * 200 + 20
//       }
//       setStyle({
//         top: ref.current.top,
//         left: ref.current.left,
//         width: ref.current.size,
//         height: ref.current.size,
//       })
//       requestAnimationFrame(animate)
//     }
//     animate()
//   }, [])

//   return (
//     <svg style={{ position: 'fixed', zIndex: -1, ...style }}>
//       <circle
//         cx={style.width / 2}
//         cy={style.height / 2}
//         r={style.width / 2}
//         fill="white"
//       />
//     </svg>
//   )
// }

// const GooeyBubbles = () => {
//   const [isClient, setIsClient] = useState(false)
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   if (!isClient) {
//     return null
//   }

//   const bubbleCount = Math.floor(Math.random() * 75) + 1 // random number between 1 and 150
//   const bubbles = Array.from({ length: bubbleCount }, (_, i) => (
//     <Bubble key={i} />
//   ))

//   return (
//     <div className="pointer-events-none fixed left-0 top-0 h-full w-full mix-blend-difference">
//       <Goo>{bubbles}</Goo>
//     </div>
//   )
// }

// export default GooeyBubbles
