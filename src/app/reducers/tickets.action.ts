import { createAction, props } from '@ngrx/store';
import { Ticket } from '../backend.service';

export const loadTickets = createAction('[Tickets Page] Load Tickets');
export const loadTicketsSuccess = createAction('[Tickets Page] Load Tickets Success', props<{tickets: Ticket[]}>());
export const loadTicketsFailed = createAction('[Tickets Page] Load Tickets Failure');