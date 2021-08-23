export const DATA_ACTION = (payload : any) => {
    return {
        type: "DATA",
        payload
    }
}

export const CARD_SHOW_ACTION = (payload : boolean) => {
    return {
        type : 'CARD_SHOW',
        payload
    }
}