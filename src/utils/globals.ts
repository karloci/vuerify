import * as defaultTranslations from '../localization/translations.json';

interface Translations {
    [key: string]: string | Translations[] | any;
}

export const globals = {
    host: "",
    translations: defaultTranslations as Translations
};

export function setHost(host: string) {
    globals.host = host;
}

export function useTranslations(translations: Translations) {
    globals.translations = translations;
}