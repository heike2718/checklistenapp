import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureChecklisteComponent } from './configure-checkliste.component';

describe('ConfigureChecklisteComponent', () => {
  let component: ConfigureChecklisteComponent;
  let fixture: ComponentFixture<ConfigureChecklisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureChecklisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureChecklisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
