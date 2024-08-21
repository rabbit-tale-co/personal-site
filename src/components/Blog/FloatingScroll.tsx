import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
	id: string;
	progress?: number;
}

const FloatingScroll = () => {
	const [sections, setSections] = useState<Section[]>([]);

	useEffect(() => {
		const h2Elements = document.querySelectorAll("article h2");
		for (let i = 0; i < h2Elements.length; i++) {
			h2Elements[i].classList.add("scroll-mt-10");
		}

		const sectionData: Section[] = Array.from(h2Elements).map((section) => ({
			id: section.id,
		}));
		setSections(sectionData);

		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = (scrollTop / docHeight) * 100;
			const sectionCount = sectionData.length;
			const sectionProgress = 100 / sectionCount;

			const updatedSections = sectionData.map((section, index) => {
				const start = index * sectionProgress;
				const end = start + sectionProgress;
				let progress = 0;

				if (scrollPercent >= start && scrollPercent <= end) {
					progress = ((scrollPercent - start) / sectionProgress) * 100;
				} else if (scrollPercent > end) {
					progress = 100;
				}

				return { ...section, progress };
			});

			setSections(updatedSections);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<React.Fragment>
			{/* Desktop View */}
			<div className="hidden md:fixed md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 md:z-50 md:flex md:flex-col md:items-center md:space-y-2">
				{/* Overlay */}
				{/* <div className='absolute inset-0 bg-zinc-900/50 blur-3xl pointer-events-none' /> */}
				{sections.map((section) => (
					<div
						key={section.id}
						className="flex transition-transform group cursor-pointer"
						onClick={() => handleClick(section.id)}
						onKeyDown={() => handleClick(section.id)}
					>
						<div className="relative ml-10 w-2 h-24 bg-zinc-300 shadow-sm rounded-full transition-all group-hover:translate-x-4">
							<motion.div
								className="absolute left-0 top-0 w-full bg-zinc-900 rounded-full"
								initial={{ height: 0 }}
								animate={{ height: `${section.progress || 0}%` }}
								transition={{ duration: 0.2, ease: "linear" }}
							/>
							<span className="absolute w-48 pointer-events-none top-1/2 -translate-y-1/2 left-full ml-2 font-bold  capitalize text-gray-900 max-w-xs break-words opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-2 transition-all duration-300">
								{section.id.replace(/^heading-/, "").replace(/-/g, " ")}
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Mobile View */}
			<div className="fixed top-0 left-0 w-full z-50 flex flex-row items-center gap-2 p-4 hidden">
				{/* Overlay */}
				<div className="absolute inset-0 bg-zinc-900/50 blur-xl" />
				{sections.map((section) => (
					<div
						key={section.id}
						className="flex transition-transform group cursor-pointer w-full"
						onClick={() => handleClick(section.id)}
						onKeyDown={() => handleClick(section.id)}
					>
						<div className="relative w-full h-2 bg-zinc-300 rounded-full transition-all group-hover:translate-y-4">
							<motion.div
								className="absolute left-0 top-0 h-full bg-zinc-900 rounded-full"
								initial={{ width: 0 }}
								animate={{ width: `${section.progress || 0}%` }}
								transition={{ duration: 0.2, ease: "linear" }}
							/>
							<span className="absolute w-48 pointer-events-none top-full left-1/2 transform -translate-x-1/2 mt-2 text-gray-800 max-w-xs break-words opacity-0 group-hover:opacity-100 transition-all duration-300">
								{section.id.replace(/^heading-/, "").replace(/-/g, " ")}
							</span>
						</div>
					</div>
				))}
			</div>
		</React.Fragment>
	);
};

export default FloatingScroll;
