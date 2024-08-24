// import Link from 'next/link'

// type PostProps = {
// 	date: string
// 	href: string
// 	title: string
// }

// const Post = ({ date, href, title }: PostProps) => (
// 	<Link
// 		href={href}
// 		className='mb-6 p-6 flex w-full items-baseline justify-between transition-colors rounded-2xl duration-200 ease-out bg-zinc-800 hover:bg-zinc-900'
// 	>
// 		<p className='text-balance font-medium text-zinc-50'>{title}</p>
// 		<p className='shrink-0 text-sm text-zinc-400'>{date}</p>
// 	</Link>
// )

// export default Post

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "utils/tw";

type RecentPostProps = {
	date: string;
	image: string;
	href: string;
	offset?: string;
	title: string;
};

const Post = ({ date, image, href, offset, title }: RecentPostProps) => {
	const [rotation, setRotation] = useState(0);
	const [isMobile, setIsMobile] = useState(true);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Link
			className={cn(
				"reveal sm:scaleFade transition-all duration-300 ease-bounce group",
				{ "animate-revealSm sm:animate-scaleFadeBlog": isImageLoaded },
			)}
			style={{ animationDelay: `${offset}s` }}
			href={href}
		>
			<article
				className="group relative aspect-video w-full origin-center overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 ease-bounce will-change-transform after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-3xl after:border-[6px] after:border-white/20 after:transition-[border] sm:group-hover:scale-110 sm:group-hover:after:border-8"
				style={{ transform: `rotate(${rotation}deg)` }}
			>
				<Image
					alt="image"
					className="object-cover sm:group-hover:scale-110 transition-all duration-300 ease-bounce"
					fill
					onLoad={() => {
						setIsImageLoaded(true);
					}}
					priority
					sizes="100"
					src={image}
				/>
			</article>
			<header className="flex items-baseline justify-between px-6 pt-4">
				<p className="text-lg font-medium">{title}</p>
				<p className="shrink-0 text-sm">{date}</p>
			</header>
		</Link>
	);
};

export default Post;
