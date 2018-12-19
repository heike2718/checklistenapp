import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWithInputComponent } from './item-with-input.component';

describe('ItemWithInputComponent', () => {
  let component: ItemWithInputComponent;
  let fixture: ComponentFixture<ItemWithInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWithInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWithInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
