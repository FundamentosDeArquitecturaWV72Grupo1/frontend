import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesDetailsComponent } from './games-details.component';

describe('GamesDetailsComponent', () => {
  let component: GamesDetailsComponent;
  let fixture: ComponentFixture<GamesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
