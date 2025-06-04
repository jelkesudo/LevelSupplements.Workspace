import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerWithPictureComponent } from './banner-with-picture.component';

describe('BannerWithPictureComponent', () => {
  let component: BannerWithPictureComponent;
  let fixture: ComponentFixture<BannerWithPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerWithPictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerWithPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
