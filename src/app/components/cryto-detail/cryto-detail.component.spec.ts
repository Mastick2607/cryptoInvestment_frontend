import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrytoDetailComponent } from './cryto-detail.component';

describe('CrytoDetailComponent', () => {
  let component: CrytoDetailComponent;
  let fixture: ComponentFixture<CrytoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrytoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrytoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
