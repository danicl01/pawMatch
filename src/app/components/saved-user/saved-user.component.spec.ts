import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedUserComponent } from './saved-user.component';

describe('SavedUserComponent', () => {
  let component: SavedUserComponent;
  let fixture: ComponentFixture<SavedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
