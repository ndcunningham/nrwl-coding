import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { BackendService, Ticket, User } from '../backend.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.sass']
})
export class TicketDetailComponent implements OnInit {
  ticket$: Observable<Ticket>;
  users$: Observable<User[]>;
  
  constructor(private backend: BackendService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ticket$ = this.activatedRoute.params.pipe(
      map(params => params.id),
      mergeMap(id => this.backend.ticket(id))
    );

    this.users$ = this.backend.users();
  }

  updateAssigned(tickedId, assigneeId) {
    this.ticket$ = this.backend.assign(tickedId, assigneeId);
  }

}
