import numeral from 'numeral'

export const formatNumber = (num: number) => {
	if (num < 10_000) {
		return numeral(num).format('0,0')
	}
	return numeral(num).format('0.0a').toUpperCase()
}
