import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistenitemComponent } from './checklistenitem.component';

describe('ChecklistenitemComponent', () => {
  let component: ChecklistenitemComponent;
  let fixture: ComponentFixture<ChecklistenitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistenitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistenitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
