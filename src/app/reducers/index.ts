import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import { State as TicketState, reducer } from "./tickets.reducer";

export interface State {
  tickets: TicketState;
}

export const reducers: ActionReducerMap<State> = {
  tickets: reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

export const selectTickets = (state: State) => state.tickets;

export const selectAllTickets = createSelector(
  selectTickets,
  (state: TicketState) => state.tickets
);
