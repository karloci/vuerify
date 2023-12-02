export const globals = {
    host: "",
    locale: "en"
};

export function vuerifyHost(host: string ) {
    globals.host = host;
}

export function vuerifyLocale(locale: string ) {
    globals.locale = locale;
}