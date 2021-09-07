export const DATA_REDUCER = (state={}, action : any) => {
    switch(action.type) {
        case "DATA" : return state = action.payload;

        default : return state;
    }
}

export const CARD_SHOW_REDUCER = (state = false, action : any) => {
    switch(action.type) {
        case "CARD_SHOW" : return state = action.payload;
        default : return state;
    }
}

export const LOADING_REDUCER = (state = false, action : any) => {
    switch(action.type) {
        case "LOADING" : return state = action.payload;
        default: return state;
    }
}