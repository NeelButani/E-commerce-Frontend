import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { buildUserSession } from "./users.actions";
import { getUser, getUserIsAuth } from "./users.selectors";

@Injectable()
export class UsersFacade {

  currentUser$ = this.store.pipe(select(getUser));
  isAuthenticated$ = this.store.pipe(select(getUserIsAuth))

  constructor(private store : Store){

  }

  buildUserSess(){
    this.store.dispatch(buildUserSession())
  }
}