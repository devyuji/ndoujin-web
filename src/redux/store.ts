import {combineReducers, createStore} from 'redux'
import { CARD_SHOW_REDUCER, DATA_REDUCER } from './reducer'

const reducers = combineReducers({
    DATA  : DATA_REDUCER,
    SHOW : CARD_SHOW_REDUCER
});

export const store = createStore(reducers);