/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TicketsComponent } from './tickets.component';
import { BackendService } from '../backend.service';

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsComponent ],
      providers: [{ provide: BackendService, useValue: new BackendService()}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tickets', waitForAsync(() => {
      fixture.whenRenderingDone().then(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('li').length).toEqual(2);
      })
  }));

  it('should show empty list', waitForAsync(() => {
    component.filterTickets('Completed');
    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('li').length).toEqual(0);
    })
  }))
});
