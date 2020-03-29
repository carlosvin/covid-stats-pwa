import {ApiClient} from './api';

const KEYS = {
    COUNTRY: 'country',
    COUNTRIES: 'countries',
    COUNTRIES_DATES: 'countries_dates',
}; 

class Store {

    constructor() {
        this._api = new ApiClient();
        this._lastCountry = this._read(KEYS.COUNTRY);
        this._countries = this._read(KEYS.COUNTRIES, {countries: undefined});
        this._countriesDates = this._read(KEYS.COUNTRIES_DATES, {});
    }

    get country () {
        return this._lastCountry;
    }

    get countries () {
        return this._countries && this._countries.countries;
    }

    setCountry(countryData){
        this._lastCountry = countryData;
        this._save(KEYS.COUNTRY, countryData);
    }

    async fetchCountries () {
        if (!this._countries || this._isTooOld(this._countries.timestamp)) {
            this._countries = {countries: await this._api.fetchCountries(), timestamp: new Date().getTime()};
            this._save(KEYS.COUNTRIES, this._countries);
        }
        return this.countries;
    }

    getCountryDate(countryCode, dateStr) {
        if (countryCode in this._countriesDates) {
            return this._countriesDates[countryCode].dates[dateStr];
        }
        return undefined;
    }

    setCountryDate(countryCode, dateStr, date) {
        if (countryCode in this._countriesDates) {
            this._countriesDates[countryCode].dates[dateStr] = {...date, timestamp: new Date().getTime()};
        } else {
            this._countriesDates = {...this._countriesDates, 
                [countryCode]: { 
                    ...this._countriesDates[countryCode], 
                    dates: {[dateStr]: {...date, timestamp: new Date().getTime()}}}
            };
        }
    }

    async fetchCountryDate (country, dateStr) {
        let date = this.getCountryDate(country, dateStr);
        if (!date || this._isTooOld(date.timestamp)) {
            const date = await this._api.fetchCountryDate(country, dateStr);
            this.setCountryDate(country, dateStr, date);
            return date;
        }
        return date;
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
            return valueStr ? JSON.parse(valueStr) : def;
        }
    }
}

export const store = new Store();
