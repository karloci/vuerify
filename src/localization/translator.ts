import {globals} from "../utils/globals";
import * as defaultTranslations from '../localization/translations.json';

interface Translations {
    [key: string]: string | Translations[] | any;
}

export default class Translator {
    private static get translations(): Translations {
        return globals.translations;
    }

    private static get defaultTranslations(): Translations {
        return defaultTranslations as Translations;
    }

    static translate(key: string, replacements: Record<string, string | number>): string {
        const translation = this.findTranslations(key);

        if (typeof translation === 'string') {
            return this.replacePlaceholders(translation, replacements);
        } else {
            throw new Error(`Invalid translation structure for key: ${key}`);
        }
    }

    private static findTranslations(key: string): string | Translations {
        const keys = key.split('.');
        let currentTranslations: Translations = this.translations;

        for (const k of keys) {
            if (typeof currentTranslations[k] === 'undefined') {
                if (typeof this.defaultTranslations[k] !== 'undefined') {
                    currentTranslations = this.defaultTranslations[k] as Translations;
                } else {
                    throw new Error(`Translations not found for key: ${key}`);
                }
            } else {
                currentTranslations = currentTranslations[k] as Translations;
            }
        }

        return currentTranslations;
    }

    private static replacePlaceholders(translation: string, replacements: Record<string, string | number>): string {
        return translation.replace(/:([a-zA-Z0-9_]+)/g, (_, placeholder) => {
            if (typeof replacements[placeholder] !== 'undefined') {
                return String(replacements[placeholder]).trim();
            } else {
                return `:${placeholder}`;
            }
        }).replace(/\s+/g, ' ').trim();
    }
}
