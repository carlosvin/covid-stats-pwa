import {ApiClient} from './services/api';

class Store {

    constructor() {
        this._api = new ApiClient();
        if (typeof localStorage !== 'undefined') {
            this._lastCountry = localStorage.getItem('lastCountry');
            this._countries =  localStorage.getItem('countries');
        }        
    }

    get lastCountry () {
        return this._lastCountry;
    }

    setLastCountry(countryCode){
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('lastCountry', countryCode);
        }
    }

    async getCountries () {
        if (!this._countries) {
            this._countries = await this._api.fetchCountries();
            this._setCountries(this._countries);
        }
        return this._countries;
    }

    _setCountries (countries) {
        if (localStorage && countries) {
            localStorage.setItem('countries', countries);
        }
    }
}

export const store = new Store();
