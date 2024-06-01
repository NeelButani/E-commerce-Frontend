import { Injectable } from "@angular/core";
import { createEffect , Actions, ofType } from "@ngrx/effects";
import { buildUserSession, buildUserSessionFailed, buildUserSessionSuccess } from "./users.actions";
import { Observable, catchError, concatMap, from, map, of } from "rxjs";
import { LocalStoageService } from "../../../shared/services/local-stoage.service";
import { UsersService } from "../../../shared/services/users.service";
import { Action } from "@ngrx/store";

@Injectable()

export class UsersEffects {

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(buildUserSession),
    concatMap(() : Observable<Action> => {
      if(this.localStorageService.isValidToken()){
        const userId = this.localStorageService.getUserIdfromToken()
        if(userId){
          return from(this.userService.getUser(userId)).pipe(
            map((user) => {
              return buildUserSessionSuccess({user : user})
            }),
            catchError(() => {
              return of(buildUserSessionFailed())
            })
          )
        } else {
          return of(buildUserSessionFailed())
        }
      } else {
        return of(buildUserSessionFailed())
      }
    })
  ))

  constructor(private actions$ : Actions , private localStorageService : LocalStoageService, private userService : UsersService){}
}