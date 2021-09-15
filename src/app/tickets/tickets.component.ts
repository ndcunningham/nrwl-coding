import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  map,
  of,
  startWith,
  tap,
} from "rxjs";
import { BackendService, Ticket } from "../backend.service";

@Component({
  selector: "app-tickets",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.sass"],
})
export class TicketsComponent implements OnInit {
  tickets = null;
  users = this.backend.users();
  selectedFilter$ = new BehaviorSubject<"All" | "In Complete" | "Completed">(
    "All"
  );
  error = false;
  searchFilter = new FormControl("");
  searchFilterDebounced$ = this.searchFilter.valueChanges.pipe(
    debounceTime(700),
    startWith('')
  );

  filterSelection = 'All';

  constructor(public backend: BackendService) {}

  ngOnInit() {
    this.tickets = this.getUpdatedTicket();
  }

  filterTickets(selectedFilter: "All" | "In Complete" | "Completed") {
    this.selectedFilter$.next(selectedFilter);
    this.tickets = this.getUpdatedTicket();
    this.filterSelection = selectedFilter;
  }

  createNewTicket(target) {
    const description = target?.value.trim();
    if (description) {
      this.backend
        .newTicket({ description })
        .pipe(tap(() => (this.tickets = this.getUpdatedTicket())))
        .subscribe(() => (target.value = ""));
    }
  }

  markTicketComplete(id: number, completed: boolean) {
    this.backend
      .complete(id, completed)
      .pipe(tap(() => (this.tickets = this.getUpdatedTicket())))
      .subscribe();
  }

  getUpdatedTicket() {
    return combineLatest([
      this.backend.tickets(),
      this.selectedFilter$,
      this.searchFilterDebounced$,
    ]).pipe(
      tap(combined => console.log({combined})),
      map(([tickets, selectedFilter, searchFilterText]) => {
        return tickets
          .filter((ticket) => {
            switch (selectedFilter) {
              case "Completed":
                return ticket.completed;
              case "In Complete":
                return !ticket.completed;
              default:
                return ticket;
            }
          }).filter(ticket => this.searchForTicket(ticket, searchFilterText))
      }),
      tap(() => (this.error = false)),
      catchError((error) => {
        console.error(error);
        this.error = true;
        return of([]);
      })
    );
  }
  searchForTicket(ticket: Ticket, text: string) {
    text = text.trim();
    return ticket.description.includes(text);
  }
}
