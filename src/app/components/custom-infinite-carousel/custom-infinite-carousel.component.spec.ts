import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInfiniteCarouselComponent } from './custom-infinite-carousel.component';

describe('CustomInfiniteCarouselComponent', () => {
  let component: CustomInfiniteCarouselComponent;
  let fixture: ComponentFixture<CustomInfiniteCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomInfiniteCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInfiniteCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
