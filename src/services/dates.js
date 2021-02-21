
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

const DAY_MS = 1000 * 3600 * 24;

/** @returns a Map with filtered objects by date. The key must be a valid ISO string date */
export function filterByDate(datesMap, start, end) {
    const map = new Map();
    const startEpochDay = Math.round(new Date(start).getTime() / DAY_MS);
    const endEpochDay = Math.round(new Date(end).getTime() / DAY_MS);

    for (const k in datesMap) {
        const date = datesMap[k];
        if (date.epochDay < startEpochDay) {
            continue;
        }
        if (date.epochDay > endEpochDay) {
            continue;
        }
        if (date.confirmedCases === 0 && date.positiveRate === 0 && map.size === 0) {
            continue;
        }
        map.set(k, date);
    }
    return map;
}