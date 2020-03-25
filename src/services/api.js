import {getIsoDate} from './dates';
import {Url} from './url';

export class ApiClient {

    constructor(base = 'https://covid-rest.appspot.com'){
        this._url = new Url(base);
    }

    async fetchCountries(){
        return ApiClient.fetch(this._url.countries);
    }

    async fetchCountry(country){
        return ApiClient.fetch(this._url.getCountry(country));
    }

    async fetchCountryToday (country) {
        return ApiClient.fetch(this._url.getCountryDate(country, getIsoDate()));
    }

    static async fetch(url){
        return await((await fetch(url)).json());
    }
}