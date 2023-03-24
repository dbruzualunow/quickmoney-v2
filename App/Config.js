import { Platform } from "react-native"

export const LANGUAGE_ES =  'es'
export const LANGUAGE_EN = 'en'

const Config = {
    DEFAULT_LANGUAGE: LANGUAGE_EN,
    ADMOB_ID: Platform.OS === 'android' ? 'ca-app-pub-7068771338302888/8312313058' : 'ca-app-pub-7068771338302888/9461743198'
}
export default Config