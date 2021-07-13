export interface Country {
    name: string;
    alphaCode?: string;
    region: string;
    timezones?: (string)[] | null;
    currencies?: (CurrenciesEntity)[] | null;
    languages?: (LanguagesEntity)[] | null;
}
export interface CurrenciesEntity {
    code: string;
    name: string;
    symbol: string;
}
export interface LanguagesEntity {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}