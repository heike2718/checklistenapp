import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureVorschlagslisteComponent } from './configure-vorschlagsliste.component';

describe('ConfigureVorschlagslisteComponent', () => {
  let component: ConfigureVorschlagslisteComponent;
  let fixture: ComponentFixture<ConfigureVorschlagslisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureVorschlagslisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureVorschlagslisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
