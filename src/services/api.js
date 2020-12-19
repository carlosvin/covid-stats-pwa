import {Url} from './url';

export class ApiClient {
    constructor(base = 'https://covid-rest.appspot.com'){
        this._url = new Url(base);
    }

    async fetchCountries(){
        return ApiClient._fetch(this._url.countries);
    }

    async fetchCountry(country){
        return ApiClient._fetch(this._url.getCountry(country));
    }

    async fetchCountryDates(country){
        return ApiClient._fetch(this._url.getCountryDates(country));
    }

    async fetchCountryDate(country, dateStr) {
        return ApiClient._fetch(this._url.getCountryDate(country, dateStr));
    }

    static async _fetch(url){
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    }
}
