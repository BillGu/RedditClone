import axios from 'axios'

import {API_URL, TOPIC_RETRIEVED, TOPIC_ERROR} from '../action'

axios.defaults.baseURL = 'http://' + API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function topicRetrieved(topic) {
	return {
		type: TOPIC_RETRIEVED,
		topic
	}
}

function topicError(err) {
	return {
		type: TOPIC_ERROR,
		err
	}
}

export function getTopic() {
	return (dispatch) => {
		axios({
				method: 'get',
				url: '/topic'
			  })
			 .then((response) => {
			 	dispatch(topicRetrieved(response.data));
			 })
			 .catch((error) => {
			 	const msg = (error.response) ? error.response.data : "Error Retrieving Topics! Something went wrong";
		 		dispatch(topicError(msg));						
			 });
		}
}