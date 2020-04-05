
export function getIsoDate (date = new Date()) {
    return date.toISOString().substring(0, 10);
}

export function getIsoDateTodayMinus(minusDays = 0) {
    return getIsoDateMinus(new Date(), minusDays);
}

export function getIsoDateMinus(date, minusDays = 0){
    if (minusDays) {
        date.setDate(date.getDate() - minusDays);
    }
    return getIsoDate(date);
}

/** @returns a Map with filtered objects by date. The key must be a valid ISO string date */
export function filterByDate(datesMap, start, end) {
    const map = new Map();

    const startEpochSeconds = new Date(start).getTime() / 1000;
    const endEpochSeconds = new Date(end).getTime() / 1000;

    for (const k in datesMap) {
        const date = datesMap[k];
        if (date.epochSeconds < startEpochSeconds) {
            continue;
        }
        if (date.epochSeconds > endEpochSeconds) {
            continue;
        }
        if (date.confirmedCases === 0 && date.deathsNumber === 0 && map.size === 0) {
            continue;
        }
        map.set(k, date);
    }
    return map;
}