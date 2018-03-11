import {TOPIC_RETRIEVED, TOPIC_ERROR} from '../action'

const initial_state = {}

function topic_reducer(state = initial_state, action) {
	switch(action.type) {
		case TOPIC_RETRIEVED:
			return Object.assign({}, state, {
					data: action.topic
  				   });
		case TOPIC_ERROR:
			return Object.assign({}, state, {
					error: action.err
  				   });
		default:
			return state;
	}
}

export default topic_reducer;