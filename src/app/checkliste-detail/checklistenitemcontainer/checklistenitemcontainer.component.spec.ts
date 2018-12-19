import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistenitemcontainerComponent } from './checklistenitemcontainer.component';

describe('ChecklistenitemcontainerComponent', () => {
  let component: ChecklistenitemcontainerComponent;
  let fixture: ComponentFixture<ChecklistenitemcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistenitemcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistenitemcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
