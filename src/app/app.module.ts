import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { RouterModule } from "@angular/router";
import { TicketsComponent } from "./tickets/tickets.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { TicketEffects } from "./reducers/tickets.effect";

@NgModule({
  declarations: [AppComponent, TicketDetailComponent, TicketsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: TicketsComponent,
      },
      {
        path: "ticket-detail/:id",
        component: TicketDetailComponent,
      },
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([TicketEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
