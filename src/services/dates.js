
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