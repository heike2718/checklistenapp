import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteItemlisteComponent } from './execute-itemliste.component';

describe('ExecuteItemlisteComponent', () => {
  let component: ExecuteItemlisteComponent;
  let fixture: ComponentFixture<ExecuteItemlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecuteItemlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteItemlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
