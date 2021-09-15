import { Action, createReducer, on } from '@ngrx/store';
import * as TicketActions from './tickets.action'
import { Ticket } from '../backend.service';

export interface State {
  tickets: Ticket[];
  loading: boolean;
  error: boolean;
}

export const initialState: State = {
    tickets: [],
    loading: false,
    error: false
}

const ticketsReducer = createReducer(
    initialState,
    on(TicketActions.loadTickets, state => ({ ...state, loading: true })),
    on(TicketActions.loadTicketsSuccess, (state, { tickets }) => ({...state, tickets, loading: false})),
    on(TicketActions.loadTicketsFailed, (state,) => ({...state, tickets: [], loading: false, error: true}))
  );
  
  export function reducer(state: State | undefined, action: Action) {
    return ticketsReducer(state, action);
  }