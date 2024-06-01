import { createReducer, on } from "@ngrx/store";
import { User } from "../../../shared/models/user";
import * as UsersActions from "./users.actions";

export const USERS_FEATURE_KEY = 'users'

export interface UsersSate {
  user: User,
  isAuthenticated: boolean
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersSate
}

export const initialUserSate: UsersSate = {
  user: null,
  isAuthenticated: false
}

export const usersReducer = createReducer(
  initialUserSate,
  on(UsersActions.buildUserSession, (state) => (
    {
      ...state
    }
  )),
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true
  })),
  on(UsersActions.buildUserSessionFailed, (state, action) => ({
    ...state,
    user: null,
    isAuthenticated: false
  }))

)
