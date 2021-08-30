/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TicketDetailComponent } from './ticket-detail.component';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // imports: [ RouterTestingModule ],
      declarations: [ TicketDetailComponent ],
      providers: [
        { provide: BackendService, useValue: new BackendService()},
        { provide: ActivatedRoute, useValue: { params: of({ id: 0})}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Ticket description', waitForAsync(() => {
    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.description').textContent).toContain('Description: Install a monitor arm')
    })
  }));
});
