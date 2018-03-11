import axios from 'axios'
import qs from 'qs'

import history from '../history'

import {API_URL, TOPIC_RETRIEVED, TOPIC_ERROR, TOPIC_CREATED} from '../action'

import {addNotification} from './notification'

// axios.defaults.baseURL = 'http://' + API_URL;
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

function topicCreated() {
	return {
		type: TOPIC_CREATED
	}
}

export function getTopic(type) {
	return (dispatch) => {
		axios({
				method: 'get',
				url: '/topic/' + type
			  })
			 .then((response) => {
			 	dispatch(topicRetrieved(response.data));

			 })
			 .catch((error) => {
			 	const msg = (error.response) ? error.response.data : "Error Retrieving Topics! Something went wrong";
		 		dispatch(topicError(msg));	
		 		dispatch(addNotification(msg, 'error'));	
			 });
		}
}

export function createTopic(topic) {
	return (dispatch) => {
		axios({
				method: 'post',
				url: '/topic' ,
				data: qs.stringify({topic: topic})
			  })
			 .then((response) => {
			 	dispatch(topicCreated());
			 	dispatch(addNotification("Topic succesfully created", 'success'));
			 	history.push('/');
			 })
			 .catch((error) => {
			 	const msg = (error.response) ? error.response.data : "Error Adding Topic! Something went wrong";
		 		dispatch(topicError(msg));	
		 		dispatch(addNotification(msg, 'error'));					
			 });
	}
}



