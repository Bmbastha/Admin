import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubItemsComponent } from './add-sub-items.component';

describe('AddSubItemsComponent', () => {
  let component: AddSubItemsComponent;
  let fixture: ComponentFixture<AddSubItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSubItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
