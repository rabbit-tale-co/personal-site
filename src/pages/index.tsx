import Layout from 'components/Layouts/Layout'
import Tag from 'components/Tag'
import Calendar from 'components/Calendar/Calendar'
import { marchData } from 'lib/activity/2024/mar'
import { februaryData } from 'lib/activity/2024/feb'
import { aprilData } from 'lib/activity/2024/apr'
import { mayData } from 'lib/activity/2024/may'
import { augData } from 'lib/activity/2024/aug'

const data24 = [augData, mayData, aprilData, marchData, februaryData]

const Page = () => (
	<Layout>
		<Tag year='2024' />
		{data24.map((data, index) => (
			<Calendar data={data} key={index.toString()} />
		))}
		{/* <Tag year="2023" />
    <Calendar data={decemberData} /> */}
	</Layout>
)

export default Page
