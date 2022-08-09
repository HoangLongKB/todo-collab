import { Authentication, State } from "../../model";

export const authSelector = (state: State) => {
  return state.authentication.auth;
}

export const authenticationSelector = (state: State): Authentication => {
  return state.authentication;
}