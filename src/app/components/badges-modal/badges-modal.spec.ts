import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesModal } from './badges-modal';

describe('BadgesModal', () => {
  let component: BadgesModal;
  let fixture: ComponentFixture<BadgesModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgesModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgesModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
