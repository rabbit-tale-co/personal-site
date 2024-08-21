import { type MonthDataType, themeTypes } from "lib/activity/activityTypes";
import type { ReactNode } from "react";

type TextBlockContent = {
  content: {
    title?: string;
    body: ReactNode;
  };
  themeData: MonthDataType["days"][0]["type"];
};

const TextBlock = (props: TextBlockContent) => {
	return (
		<li
			key={props.content.title}
			className={`mx-2 flex flex-col rounded-[18px] p-4 font-medium ${themeTypes.includes(props.themeData) ? 'bg-zinc-900': 'bg-zinc-50'}`}
		>
			<h2
				className={`mb-2 text-xl font-extrabold ${themeTypes.includes(props.themeData) ? 'text-zinc-50' : 'text-zinc-900'}`}
			>
				{props.content.title}
			</h2>
			<p
				className={`text-pretty ${themeTypes.includes(props.themeData) ? 'text-zinc-300' : 'text-zinc-600'}`}
			>
				{props.content.body}
			</p>
		</li>
	)
}

export default TextBlock
