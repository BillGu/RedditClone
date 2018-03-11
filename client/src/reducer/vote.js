import {VOTE_UP, VOTE_DOWN, VOTE_ERROR} from '../action'

const initial_state = {}

function vote_reducer(state = initial_state, action) {
	switch(action.type) {
		case VOTE_UP:
			return Object.assign({}, state, {
					voted: true
  				   });
		case VOTE_ERROR:
			return Object.assign({}, state, {
					error: action.err
  				   });
		case VOTE_DOWN:
			return Object.assign({}, state, {
					voted: true
  				   });
		default:
			return state;
	}
}

export default vote_reducer;