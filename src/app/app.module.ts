import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [	
    AppComponent,
    TicketDetailComponent,
      TicketsComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: TicketsComponent
      },
      {
        path: 'ticket-detail/:id', component: TicketDetailComponent
      }
    ])
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
