export const authErrorCode = {
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  EMAIL_IN_USE: 'auth/email-already-in-use'
}

export const AUTH_ERROR_MESSAGE = {
  [authErrorCode.USER_NOT_FOUND] : 'Account does not exists.',
  [authErrorCode.WRONG_PASSWORD]: 'Incorrect password.',
  [authErrorCode.EMAIL_IN_USE]: 'Email already registered.'
}