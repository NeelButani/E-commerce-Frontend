import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_FEATURE_KEY, UsersPartialState, UsersSate } from "./users.reducer";


export const getUsersState = createFeatureSelector<UsersPartialState,UsersSate>(USERS_FEATURE_KEY);

export const getUser = createSelector(getUsersState,(state) => {
  state.user
})
export const getUserIsAuth = createSelector(getUsersState,(state) => {
  state.isAuthenticated
})