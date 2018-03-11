import {TOPIC_RETRIEVED, TOPIC_ERROR, TOPIC_CREATED} from '../action'

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
		case TOPIC_CREATED:
			return Object.assign({}, state, {
					created: true
  				   });
		default:
			return state;
	}
}

export default topic_reducer;