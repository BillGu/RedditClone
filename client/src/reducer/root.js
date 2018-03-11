import { combineReducers } from 'redux'

import topic_reducer from './topic';

const rootReducer = combineReducers({
	topic: topic_reducer
})

export default rootReducer;