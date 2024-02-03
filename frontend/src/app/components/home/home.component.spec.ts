import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageModule } from 'primeng/image';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, ImageModule, ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
