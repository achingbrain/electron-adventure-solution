export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_MEMBER = 'ADD_MEMBER'

export function addMessage (message) {
  return {
    type: ADD_MESSAGE,
    payload: message
  }
}

export function addMember (member) {
  return {
    type: ADD_MEMBER,
    payload: member
  }
}
