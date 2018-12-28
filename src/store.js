import list from './containers/reducer'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  list
})

const initialState = {}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store
