import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWithButtonComponent } from './item-with-button.component';

describe('ItemWithButtonComponent', () => {
  let component: ItemWithButtonComponent;
  let fixture: ComponentFixture<ItemWithButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWithButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWithButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
