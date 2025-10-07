import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';
import { CharacterService } from '../../services/character.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let characterServiceSpy: jasmine.SpyObj<CharacterService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CharacterService', ['searchCharacters']);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule], // Importa FormsModule para lidar com [(ngModel)]
      providers: [{ provide: CharacterService, useValue: spy }],
    }).compileComponents();

    characterServiceSpy = TestBed.inject(CharacterService) as jasmine.SpyObj<CharacterService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the input and label', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    const labelElement = fixture.debugElement.query(By.css('label'));

    expect(inputElement).toBeTruthy();
    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent).toContain('Pesquisar');
  });

  it('should call searchCharacters when a term is entered', () => {
    const searchTerm = 'Rick';
    characterServiceSpy.searchCharacters.and.returnValue(of([]));

    component.search(searchTerm);
    expect(characterServiceSpy.searchCharacters).toHaveBeenCalledWith(searchTerm, true);
  });

  it('should debounce input and not call searchCharacters immediately', (done) => {
    const searchTerm = 'Morty';
    characterServiceSpy.searchCharacters.and.returnValue(of([]));

    component.search(searchTerm);
    setTimeout(() => {
      expect(characterServiceSpy.searchCharacters).toHaveBeenCalledWith(searchTerm, true);
      done();
    }, 300); // Aguarda o debounceTime
  });

  it('should set isFloating to true when input is focused', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(component.isFloating).toBeTrue();
  });

  it('should set isFloating to false when input is blurred and empty', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.isFloating).toBeFalse();
  });

  it('should keep isFloating true when input is blurred and not empty', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.value = 'Rick';
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.isFloating).toBeTrue();
  });
});
