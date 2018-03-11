import axios from 'axios'

import {API_URL, VOTE_UP, VOTE_DOWN, VOTE_ERROR} from '../action'

// axios.defaults.baseURL = 'http://' + API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function voteUp() {
	return {
		type: VOTE_UP
	}
}

function voteDown() {
	return {
		type: VOTE_DOWN
	}
}

function voteError(err) {
	return {
		type: VOTE_ERROR,
		err
	}
}

export function upVote(id) {
	return (dispatch) => {
		axios({
				method: 'get',
				url: '/topic/vote/' + id + '/1'
			  })
			 .then((response) => {
			 	dispatch(voteUp());
			 })
			 .catch((error) => {
			 	const msg = (error.response) ? error.response.data : "Error Voting on Topic! Something went wrong";
		 		dispatch(voteError(msg));						
			 });
		}
}

export function downVote(id) {
	return (dispatch) => {
		axios({
				method: 'get',
				url: '/topic/vote/' + id + '/0'
			  })
			 .then((response) => {
			 	dispatch(voteDown());
			 })
			 .catch((error) => {
			 	const msg = (error.response) ? error.response.data : "Error Voting on Topic! Something went wrong";
		 		dispatch(voteError(msg));						
			 });
		}
}

