import { ADD_NOTIFICATION } from '../action';
 
export function addNotification(message, level) {
  return {
    type: ADD_NOTIFICATION,
    message,
    level
  };
}