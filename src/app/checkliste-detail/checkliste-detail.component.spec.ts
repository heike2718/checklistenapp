import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklisteDetailComponent } from './checkliste-detail.component';

describe('ChecklisteDetailComponent', () => {
  let component: ChecklisteDetailComponent;
  let fixture: ComponentFixture<ChecklisteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklisteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklisteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
