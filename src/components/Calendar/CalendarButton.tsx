import { OutlineArrowRight } from 'icons/Icons'
import { themeTypes, type MonthDataType } from 'lib/activity/activityTypes';
import Link from 'next/link'

type CalendarButtonProps = {
  data: {
    external?: boolean;
    href: string;
    text: string;
  }
  themeData: MonthDataType["days"][0]["type"];
}

const CalendarButton = ({ data, themeData }: CalendarButtonProps) => (
  <li className="mx-2">
    <Link
      className={`group flex w-full items-center justify-between rounded-2xl py-1 pl-6 pr-1 text-base font-bold tracking-wide transition-[letter-spacing,transform] duration-200 ease-bounce sm:hover:bg-white sm:hover:tracking-widest sm:active:scale-[0.98] ${themeTypes.includes(themeData) ? 'bg-zinc-900 text-zinc-50' : 'text-zinc-800 bg-zinc-50'}`}
      href={data.href || ''}
      aria-label={data.text}
      rel={data.external ? 'no-opener no-referrer' : ''}
      target={data.external ? '_blank' : '_self'}
    >
      {data.text}
      <div className="relative flex size-10 items-center justify-center overflow-hidden text-inherit *:transition-transform *:duration-300 *:ease-bounce">
        <OutlineArrowRight
          size={20}
          className="absolute -translate-x-8 sm:group-hover:translate-x-0"
        />
        <OutlineArrowRight
          size={20}
          className="sm:group-hover:translate-x-8"
        />
      </div>
    </Link>
  </li>
)

export default CalendarButton
