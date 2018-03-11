import { combineReducers } from 'redux'

import topic_reducer from './topic'
import vote_reducer from './vote'

const rootReducer = combineReducers({
	topic: topic_reducer,
	vote: vote_reducer
})

export default rootReducer;