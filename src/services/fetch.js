
import {getIsoDate} from './dates';

const BASE = 'https://covid-rest.appspot.com';

export async function fetchCountryToday (country) {
    const url = `${BASE}/countries/${country}/dates/${getIsoDate()}`;
    const countryDateStats = (await this.fetch(url)).json();
    return countryDateStats;
}