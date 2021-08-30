import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, of, tap } from 'rxjs';
import { BackendService, Ticket } from '../backend.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.sass']
})
export class TicketsComponent implements OnInit {

  tickets = this.backend.tickets();
  users = this.backend.users();
  selectedFilter$ = new BehaviorSubject<'All' | 'In Complete' | 'Completed'>('All');
  error = false;

  constructor(public backend: BackendService) { }

  ngOnInit() {
  }

  filterTickets(selectedFilter: 'All' | 'In Complete' | 'Completed') {
    this.selectedFilter$.next(selectedFilter);
    this.tickets = this.getUpdatedTicket();
  }

  createNewTicket(target) {
    const description = target?.value.trim();
    if (description) {
      this.backend.newTicket({ description }).pipe(
        tap(() => this.tickets = this.getUpdatedTicket())
      ).subscribe(() => target.value = '');
    }
  }

  markTicketComplete(id: number, completed: boolean) {
    this.backend.complete(id, completed ).pipe(
      tap(() => this.tickets =  this.getUpdatedTicket())
    ).subscribe()
  }

  getUpdatedTicket() {
    return combineLatest([this.backend.tickets(), this.selectedFilter$]).pipe(
      map(([tickets, selectedFilter]) => {
        return tickets.filter(ticket => {
          switch (selectedFilter) {
            case 'Completed':
              return ticket.completed;
            case 'In Complete':
              return !ticket.completed;
            default:
              return ticket;
          }
        })
      }),
      tap(() => this.error = false),
      catchError(() => {
        this.error = true;
        return of([])
      })
    );
  }
}
