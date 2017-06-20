export const OPEN_SETTINGS = 'OPEN_SETTINGS'
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS'
export const UPDATE_USER = 'UPDATE_USER'
export const RESET = 'RESET'

export function openSettings () {
  return {
    type: OPEN_SETTINGS,
    payload: true
  }
}

export function closeSettings () {
  return {
    type: CLOSE_SETTINGS,
    payload: true
  }
}

export function updateUser (details) {
  return {
    type: UPDATE_USER,
    payload: {
      name: details.name,
      avatar: details.avatar
    }
  }
}

export function reset (details) {
  return {
    type: RESET
  }
}
