import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotiongifComponent } from './promotiongif.component';

describe('PromotiongifComponent', () => {
  let component: PromotiongifComponent;
  let fixture: ComponentFixture<PromotiongifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotiongifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotiongifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
