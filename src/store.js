import {ApiClient} from './services/api';

const KEYS = {
    COUNTRY: 'country',
    COUNTRIES: 'countries',
}; 

class Store {

    constructor() {
        this._api = new ApiClient();
        this._lastCountry = this._read(KEYS.COUNTRY);
        this._countries = this._read(KEYS.COUNTRIES);
    }

    get country () {
        return this._lastCountry;
    }

    get countries () {
        return this._countries;
    }

    setLastCountry(countryData){
        this._lastCountry = countryData;
        this._save(KEYS.COUNTRY, countryData);
    }

    async fetchCountries () {
        if (!this._countries) {
            this._countries = await this._api.fetchCountries();
            this._save(KEYS.COUNTRIES, this._countries);
        }
        return this._countries;
    }

    _save(key, value) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    _read(key) {
        if (typeof localStorage !== 'undefined') {
            const valueStr = localStorage.getItem(key);
            return valueStr && JSON.parse(valueStr);
        }
    }
}

export const store = new Store();
