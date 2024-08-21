import Gallery from "components/Calendar/Gallery";
import Modal from "components/Calendar/Modal";
import TextBlock from "./TextBlock";
import useClickOutside from "hooks/useClickOutside";
import {
	themeTypes,
	type ContentItem,
	type MonthDataType,
} from "lib/activity/activityTypes";
import dayjs from "dayjs";
import Image, { type StaticImageData } from "next/image";
import placeholder from "public/images/placeholder.jpg";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "utils/tw";
import CalendarButton from "./CalendarButton";
import Tooltip from "components/Tooltip";

const Calendar = ({ data }: { data: MonthDataType[] }) => {
	const [calBgColor, setCalBgColor] = useState("none");
	const [takeover, setTakeover] = useState(false);
	const [clip, setClip] = useState(false);
	const [loadIn, setLoadIn] = useState(true);
	const [modal, setModal] = useState(false);
	const [activeTile, setActiveTile] = useState<number | null>(null);

	const [modalImage, setModalImage] = useState<string | StaticImageData>(
		placeholder,
	);

	const clickOutsideRef = useClickOutside(() => {
		if (!modal) {
			setTakeover(false);
			setClip(false);
			setCalBgColor("none");
			setActiveTile(null);
		}
	});

	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	const handleClip = () => {
		setTimeout(() => {
			setClip(true);
		}, 500);
	};

	const handleLoadIn = () => {
		setTimeout(() => {
			setLoadIn(false);
		}, 1200);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleLoadIn();
	}, []);

	const bgColors = (arg: string | undefined) => {
		return cn({
			"bg-emerald-500 dark:bg-emerald-600": arg === "Misc",
			"bg-yellow-500 dark:bg-yellow-600": arg === "Life",
			"bg-orange-500 dark:bg-orange-600": arg === "Work",
			"bg-blue-500 dark:bg-blue-600": arg === "Blog",
			"bg-violet-500 dark:bg-violet-600": arg === "Side Project",
			"bg-rose-500 dark:bg-rose-600": arg === "Feature",
			"bg-shark-950 dark:bg-shark-600": !arg,
		});
	};

	const textColor = (arg: string | undefined) => {
		return cn({
			"text-emerald-900 dark:text-emerald-100": arg === "Misc",
			"text-yellow-900 dark:text-yellow-100": arg === "Life",
			"text-orange-900 dark:text-orange-100": arg === "Work",
			"text-blue-100 dark:text-blue-950": arg === "Blog",
			"text-violet-100 dark:text-violet-950": arg === "Side Project",
			"text-rose-100 dark:text-rose-950": arg === "Feature",
			"text-shark-100 dark:text-shark-950": !arg,
		});
	};

	interface DayData {
		type: string;
		day: number;
		content: ContentItem[];
	}

	const sortedData = useMemo(
		() => data.sort((a, b) => b.month - a.month),
		[data],
	);

	// Funkcja pomocnicza do renderowania pojedynczego kafelka
	const renderTile = ({
		day,
		dayData,
		index,
		globalIndex,
		isCurrentMonth,
	}: {
		day: number;
		dayData?: DayData;
		index: number;
		globalIndex: number;
		isCurrentMonth: boolean;
	}) => {
		const active = activeTile === index;

		return (
			<div
				key={index}
				className={cn({
					"scaleFade animate-scaleFade": loadIn,
				})}
				style={{
					animationDelay: `${globalIndex / 50 + 0.04}s`,
				}}
			>
				{takeover && active && (
					<div className="absolute inset-0 z-50 flex flex-col overflow-y-auto p-4">
						<div className="sticky top-0 z-10 self-start">
							<button
								className={`z-50 block w-max rounded-full px-3 py-1.5 font-bold tracking-wide shadow-md transition-transform active:scale-90 sm:hover:scale-90 sm:active:scale-75 ${
									dayData && themeTypes.includes(dayData.type)
										? "bg-zinc-900"
										: "bg-white-50"
								} ${dayData && themeTypes.includes(dayData.type) ? "text-zinc-300" : "text-zinc-600"}`}
								onClick={() => {
									setTakeover(false);
									setClip(false);
									setCalBgColor("none");
									setActiveTile(null);
								}}
								type="button"
							>
								back
							</button>
						</div>
						<ul className="relative flex w-full flex-col gap-2 mt-4">
							{dayData?.content.map((contentItem, contentIndex: number) => (
								<Fragment key={`${contentItem.type}-${contentIndex}`}>
									{contentItem.type === "TextBlock" && (
										<TextBlock
											content={contentItem.text}
											themeData={
												dayData.type as MonthDataType["days"][0]["type"]
											}
										/>
									)}
									{contentItem.type === "Image" && (
										<Gallery
											image={contentItem.image || placeholder}
											onClick={() => {
												setModal(true);
												setModalImage(contentItem.image || placeholder);
											}}
										/>
									)}
									{contentItem.type === "LinkButton" && (
										<CalendarButton
											data={contentItem.link}
											themeData={
												dayData.type as MonthDataType["days"][0]["type"]
											}
										/>
									)}
								</Fragment>
							))}
						</ul>
					</div>
				)}
				{dayData ? (
					<div
						className={cn("group/tooltip relative delay-100", {
							"invisible opacity-0 delay-0": takeover && !active,
							"overflow-clip": clip,
						})}
					>
						<Tooltip text={dayData.type} state={takeover} />
						<button
							onClick={() => {
								setTakeover(true);
								handleClip();
								setActiveTile(index);
								setTimeout(() => {
									setCalBgColor(dayData.type);
								}, 300);
							}}
							className={cn(
								"block h-9 w-full rounded-[9px] transition-all duration-150 hover:scale-90 active:scale-75 min-[400px]:size-10 min-[400px]:rounded-[10px]",
								bgColors(dayData.type),
								{
									"scale-[20] cursor-default duration-300 hover:scale-[20] active:scale-[20]":
										active && takeover,
								},
							)}
							type="button"
						>
							<span
								className={`pointer-events-none duration-0 text-center ${active && takeover ? "opacity-0" : "opacity-100"} ${textColor(dayData?.type)}`}
							>
								{dayData?.day || day}
							</span>
						</button>
					</div>
				) : (
					renderInactiveTile(
						day,
						`inactive-${index}`,
						globalIndex,
						isCurrentMonth,
					)
				)}
			</div>
		);
	};

	const renderInactiveTile = (
		day: number,
		key: string,
		globalIndex: number,
		isCurrentMonth: boolean,
	) => (
		<div
			key={globalIndex}
			className={cn({
				"scaleFade animate-scaleFade": loadIn,
			})}
			style={{
				animationDelay: `${globalIndex / 50 + 0.04}s`,
			}}
		>
			<div
				key={key}
				className={cn(
					"h-9 w-full rounded-[9px] min-[400px]:size-10 min-[400px]:rounded-[10px] delay-100 duration-300 transition-all flex items-center justify-center",
					{
						"bg-zinc-700/20": !isCurrentMonth,
						"bg-zinc-700/60": isCurrentMonth,
						"invisible opacity-0 delay-0 duration-0": takeover,
					},
				)}
			>
				<span
					className={cn("pointer-events-none text-center self-center", {
						"text-zinc-400": !isCurrentMonth,
						"text-zinc-300": isCurrentMonth,
					})}
				>
					{day}
				</span>
			</div>
		</div>
	);

	const renderMonth = (monthIndex: number) => {
		const monthData = sortedData.find(
			(month) => month.month === monthIndex + 1,
		);
		if (!monthData) return null;

		const currentMonth = dayjs().month(monthIndex);
		const monthStartDay = currentMonth.startOf("month").day();
		const monthDays = currentMonth.daysInMonth();
		const totalTiles = 35;

		const previousMonthDays = currentMonth.subtract(1, "month").daysInMonth();
		const blankTiles = Array.from(
			{ length: monthStartDay },
			(_, index) => previousMonthDays - monthStartDay + index + 1,
		);

		const tiles: number[] = Array.from(
			{ length: monthDays },
			(_, index) => index + 1,
		);

		const nextMonthBlankTiles = Array.from(
			{ length: totalTiles - (blankTiles.length + tiles.length) },
			(_, index) => index + 1,
		);

		while (
			blankTiles.length + tiles.length + nextMonthBlankTiles.length >
			totalTiles
		) {
			blankTiles.shift();
		}

		let globalIndex = 0;

		return (
			<section
				key={monthIndex}
				className={cn(
					"reveal relative mx-auto my-10 flex w-full max-h-full max-w-sm flex-col gap-4 overflow-x-clip overflow-y-scroll rounded-3xl bg-zinc-800 p-6 shadow-xl min-[400px]:p-7",
					bgColors(calBgColor),
					{
						"animate-rotate": monthIndex % 2 !== 0 && inView,
						"animate-rotateAlt": monthIndex % 2 === 0 && inView,
					},
				)}
				ref={clickOutsideRef}
			>
				<h2
					className={`reveal animate-revealSm text-sm font-bold tracking-wider text-white-200 ${takeover && "invisible "}`}
				>
					{dayjs(currentMonth).format("MMMM")}
				</h2>
				<div
					key={monthIndex}
					className="grid w-full grid-cols-7 gap-2 min-[400px]:w-full"
				>
					{blankTiles.map((day, index) =>
						renderInactiveTile(day, `prev-${index}`, globalIndex++, false),
					)}
					{tiles.map((day, index) => {
						return renderTile({
							day,
							dayData: monthData.days.find((d) => d.day === day),
							index,
							globalIndex: globalIndex++,
							isCurrentMonth: true,
						});
					})}
					{nextMonthBlankTiles.map((day, index) =>
						renderInactiveTile(day, `next-${index}`, globalIndex++, false),
					)}
				</div>
			</section>
		);
	};

	return (
		<section ref={ref} className="w-full relative">
			{Array.from({ length: 12 }).map((_, monthIndex) =>
				renderMonth(monthIndex),
			)}

			{/* Umieszczenie modala na końcu, aby był na wierzchu */}
			<Modal open={modal} setOpen={setModal}>
				<div className="z-[1000] relative">
					<Image src={modalImage} alt="image" />
				</div>
			</Modal>
		</section>
	);
};

export default Calendar;
