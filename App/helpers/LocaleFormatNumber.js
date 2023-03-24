import {NumberFormat} from 'd2l-intl'

const LocaleFormatNumber = (price, decimals = 2, lang = 'es') => {
	price = price ? price : 0
	price = price.toString()
	price = price.indexOf('.') >= 0 ? parseFloat(price.slice(0, price.indexOf('.') + decimals + 1)) : price;
	const formatter = new NumberFormat(lang,  { minimumFractionDigits: decimals });
	const result = formatter.format(price);
	return result
}

export default LocaleFormatNumber;