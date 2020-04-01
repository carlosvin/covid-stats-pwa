
export class Url {

    constructor(base){
        this._base = base;
    }

    get countries () {
        return `${this._base}/countries`;
    }

    get dates () {
        return `${this._base}/dates`;
    }

    getCountry (country) {
        return `${this.countries}/${country}`;
    }

    getCountryDates(country){
        return `${this.getCountry(country)}/dates`;
    }

    getCountryDate(country, isoDate){
        return `${this.getCountryDates(country)}/${isoDate}`;
    }

    getDate(dateIso){
        return `${this.dates}/${dateIso}`;
    }

    getDateCountries(isoDate){
        return `${this.getDate(isoDate)}/countries`;
    }

    getDateCountry(isoDate, country){
        return `${this.getDateCountries(isoDate)}/${country}`;
    }
}