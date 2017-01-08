export const reportEvent = (newEvent) => {
  //do something here if needed
  return {
    type: 'REPORT_EVENT',
    newEvent
  }
}

export const loadEvent = (events) => {
  return {
    type: 'LOAD_EVENTS',
    events
  }
}

export const updateEvent = (events) => {
  return {
    type: 'UPDATE_EVENTS',
    events
  }
}

const getUserInfo = (userName = '', userInterests = [], token = {}) => {
  return {
    type: 'GET_USER_INFO',
    userName,
    userInterests,
    token
  }
}

const startFetching = () => {
  return{
    type: 'START_FETCHING'
  }
}
const stopFetching = () => {
  return{
    type: 'STOP_FETCHING'
  }
}

const getEvents = (userInterests) => {

}