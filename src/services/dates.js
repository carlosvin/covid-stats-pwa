
export function getIsoDate (date = new Date()) {
    return date.toISOString().substring(0, 10);
}

export function getIsoDateTodayMinus(minusDays = 0) {
    const date = new Date();
    if (minusDays) {
        date.setDate(date.getDate() - minusDays);
    }
    return getIsoDate(date);
}

/** @returns a Map with filtered objects by date. The key must be a valid ISO string date */
export function filterByDate(datesMap, lastDateIsoStr = undefined) {
    const map = new Map();

    const lastEpochSeconds = lastDateIsoStr ? new Date(lastDateIsoStr).getTime() / 1000 : Infinity;

    for (const k in datesMap) {
        const date = datesMap[k];
        if (date.epochSeconds > lastEpochSeconds) {
            continue;
        }
        if (date.confirmedCases === 0 && date.deathsNumber === 0 && map.size === 0) {
            continue;
        }
        map.set(k, date);
    }
    return map;
}