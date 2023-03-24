import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import Config from "../Config";

export const DEFAULT_LANGUAGE = Config.DEFAULT_LANGUAGE;

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("./en.json"),
  es: () => require("./es.json"),
};

export const setI18nConfig = (codeLang = null) => {
  // fallback if no available language fits
  return new Promise((resolve, reject) => {
    const deviceLanguageCode =
      RNLocalize.getLocales()?.[0]?.languageCode || DEFAULT_LANGUAGE;
    const fallback = {
      languageTag: ["es", "en"].includes(deviceLanguageCode)
        ? deviceLanguageCode
        : DEFAULT_LANGUAGE,
      isRTL: false,
    };
    const { languageTag, isRTL } = codeLang
      ? { languageTag: codeLang, isRTL: false }
      : fallback;

    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);

    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
    resolve(languageTag);
  });
};

export const getCurrentLanguage = () => {
  return i18n.locale;
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

// save translations in a memoized function

/* const translations = React.memo(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
); */

export default translate;
