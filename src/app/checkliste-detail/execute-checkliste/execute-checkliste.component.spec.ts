import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChecklisteComponent } from './edit-checkliste.component';

describe('EditChecklisteComponent', () => {
  let component: EditChecklisteComponent;
  let fixture: ComponentFixture<EditChecklisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChecklisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChecklisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
