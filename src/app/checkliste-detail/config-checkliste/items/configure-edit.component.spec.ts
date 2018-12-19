import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureEditComponent } from './configure-edit.component';

describe('ConfigureEditComponent', () => {
  let component: ConfigureEditComponent;
  let fixture: ComponentFixture<ConfigureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
