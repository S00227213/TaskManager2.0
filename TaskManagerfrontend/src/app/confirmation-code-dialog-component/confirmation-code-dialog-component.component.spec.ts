import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ConfirmationCodeDialogComponent } from './confirmation-code-dialog-component.component';

describe('ConfirmationCodeDialogComponentComponent', () => {
  let component: ConfirmationCodeDialogComponent;
  let fixture: ComponentFixture<ConfirmationCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationCodeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
