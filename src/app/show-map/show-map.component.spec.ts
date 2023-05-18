import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMapComponent } from './show-map.component';

describe('ShowMapComponent', () => {
  let component: ShowMapComponent;
  let fixture: ComponentFixture<ShowMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMapComponent]
    });
    fixture = TestBed.createComponent(ShowMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
