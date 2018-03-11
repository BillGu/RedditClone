import { combineReducers } from 'redux'

import topic_reducer from './topic'
import vote_reducer from './vote'
import notification from './notification';

const rootReducer = combineReducers({
	topic: topic_reducer,
	vote: vote_reducer,
	notification
})

export default rootReducer;