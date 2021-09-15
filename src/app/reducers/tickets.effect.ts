import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs'
import { map, catchError, switchMap } from "rxjs/operators";
import { BackendService } from "../backend.service";
import {
  loadTickets,
  loadTicketsFailed,
  loadTicketsSuccess,
} from "./tickets.action";

@Injectable()
export class TicketEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTickets),
      switchMap(() =>
        this.backendService.tickets().pipe(
          map((tickets) => loadTicketsSuccess({ tickets })),
          catchError(() => of(loadTicketsFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {}
}
