import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutComponentComponent } from './sign-out-component.component';

describe('SignOutComponentComponent', () => {
  let component: SignOutComponentComponent;
  let fixture: ComponentFixture<SignOutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignOutComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignOutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
