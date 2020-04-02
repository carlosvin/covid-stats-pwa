import {ApiClient} from './api';

const KEYS = {
    COUNTRY: 'country',
    COUNTRIES: 'countries',
    DATES_BY_COUNTRY: 'dates_by_country',
}; 

class Store {

    constructor() {
        this._api = new ApiClient();
        this._countries = this._read(KEYS.COUNTRIES, {countries: undefined});
        this._lastCountry = this._read(KEYS.COUNTRY, this.firstCountry);
        this._datesByCountry = this._read(KEYS.DATES_BY_COUNTRY, {});
    }

    get country () {
        return this._lastCountry;
    }

    get countries () {
        return this._countries && this._countries.countries;
    }

    get dates() {
        return this.country ? this.getDates(this.country.countryCode) : undefined;
    }

    getDates(countryCode) {
        return countryCode in this._datesByCountry ? this._datesByCountry[countryCode].datesInfo : undefined;
    }

    /** @returns Country name if exists otherwise  it returns input code */
    getCountryName (code) {
        return this.countries && code in this.countries ? this.countries[code].countryName : code;
    }

    setCountry(countryData){
        this._lastCountry = countryData;
        this._save(KEYS.COUNTRY, countryData);
    }

    async fetchCountries () {
        if (!this._countries || this._isTooOld(this._countries.timestamp)) {
            const countries = await this._api.fetchCountries();
            for (const code  in countries) {
                const name = countries[code].countryName;
                countries[code].countryName = name.replace("_", " ");
            }
            this._countries = {countries, timestamp: new Date().getTime()};
            this._reloadCountryData();
            this._save(KEYS.COUNTRIES, this._countries);
        }
        return this.countries;
    }

    _reloadCountryData() {
        if (this._lastCountry) {
            this.setCountry(this.countries[this._lastCountry.countryCode]);
        } else {
            this.setCountry(this.firstCountry);
        }
    }

    get firstCountry () {
        return this.countries ? Object.values(this.countries)[0] : undefined;
    }

    async fetchDates(country) {
        if (!(country in this._datesByCountry) || this._isTooOld(this._datesByCountry[country].timestamp)) {
            this._datesByCountry[country] =  {datesInfo: await this._api.fetchCountryDates(country), timestamp: new Date().getTime()};
            this._save(KEYS.DATES_BY_COUNTRY, this._datesByCountry);
        }
        return this._datesByCountry[country].datesInfo;
    }

    _isTooOld(timestamp = 0) {
        return (new Date().getTime() - timestamp) > 3600000;
    }

    _save(key, value) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    _read(key, def = undefined) {
        if (typeof localStorage !== 'undefined') {
            const valueStr = localStorage.getItem(key);
            const value = valueStr ? JSON.parse(valueStr) : undefined;
            return value ? value : def;
        }
        return def;
    }
}

export const store = new Store();
