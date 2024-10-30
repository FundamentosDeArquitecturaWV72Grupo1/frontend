import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSigninComponent } from './user-signin.component';

describe('UserSigninComponent', () => {
  let component: UserSigninComponent;
  let fixture: ComponentFixture<UserSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
