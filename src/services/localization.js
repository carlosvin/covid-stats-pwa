
const langs = {
    en: import('../langs/en.js'),
    es: import('../langs/es.js'),
};
import { writable } from 'svelte/store';

const DEFAULT_LANG = 'en';

class Localization {

    constructor() {
        if (typeof navigator !== 'undefined') {
            this._lang = navigator.language.slice(0, 2).toLowerCase();
            if (!this._lang in langs) {
                this._lang = DEFAULT_LANG;
            }
        } else {
            this._lang = DEFAULT_LANG;
        }
        this._translations = undefined;
    }

    async init () {
        this._translations = (await langs[this._lang]).default;
        return this;
    }

    get(key, def = undefined){
        if (this._translations && key in this._translations) {
            return this._translations[key];
        }
        return def || key;
    }

    placeholders (key, props) {
        let str = this.get(key);
        for (const [k, v] of Object.entries(props)) {
            str = str.replace(`{${k}}`, v);
        }
        return str;
    }
}

export const localization = writable(new Localization());
new Localization().init().then(l => localization.set(l))
