import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StagaireUpdateComponent } from './stagaire-update.component';



describe('StagaireUpdateComponent', () => {
  let component: StagaireUpdateComponent;
  let fixture: ComponentFixture<StagaireUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StagaireUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagaireUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
