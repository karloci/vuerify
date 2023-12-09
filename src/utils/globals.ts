import * as defaultTranslations from './translations.json';

interface Translations {
    [key: string]: string | Translations[] | any;
}

export const globals = {
    host: "",
    locale: "en",
    translations: defaultTranslations as Translations
};

export function setHost(host: string ) {
    globals.host = host;
}

export function setLocale(locale: string ) {
    globals.locale = locale;
}

export function setTranslations(translations: Translations) {
    globals.translations = translations;
}