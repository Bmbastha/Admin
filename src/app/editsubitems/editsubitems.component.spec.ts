import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubitemsComponent } from './editsubitems.component';

describe('EditsubitemsComponent', () => {
  let component: EditsubitemsComponent;
  let fixture: ComponentFixture<EditsubitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditsubitemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsubitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
