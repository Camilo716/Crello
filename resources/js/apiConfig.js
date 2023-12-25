const BASE_API_URL = 'http://127.0.0.1:8000/'

export function getCardListApiUrl() {
    return `${BASE_API_URL}card-list`;
}

export function getCardApiUrl() {
    return `${BASE_API_URL}card`
}

export function getCardsByListApiUrl(listId) {
    return `${getCardApiUrl()}/get-by-list?card_list_id=${listId}`
}

export function getCardsByIdApiUrl(cardId) {
    return `${getCardApiUrl()}/${cardId}`
}