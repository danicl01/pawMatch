import {AfterViewInit, Component, ElementRef, inject, signal, ViewChild} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FormBuilder, Validators} from "@angular/forms";
import {ProfilePerson, ProfilePet, UserCreate, UserService} from "../../services/user.service";
import {toast} from "ngx-sonner";
import {Router} from "@angular/router";
import { petBreeds, PetType } from '../../models/pet-type.enums';

declare var google: any;

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})

export class Form implements AfterViewInit  {
  @ViewChild('ownerCity') cityInput!: ElementRef;
  @ViewChild('ownerAddress') addressInput!: ElementRef;

  loading = signal(false);
  isAddressInputDisabled = true;
  petTypes = Object.values(PetType);
  selectedPetType: PetType = PetType.Dog;
  filteredBreeds: string[] = [];

  private _formBuilder = inject(FormBuilder);
  private _userService = inject(UserService);
  private _router = inject(Router);

  form = this._formBuilder.group({
    firstName: this._formBuilder.control('', Validators.required),
    lastName: this._formBuilder.control('', Validators.required),
    ownerAge: this._formBuilder.control('', [Validators.required, Validators.min(10), Validators.max(99)]),
    ownerSex: this._formBuilder.control('', Validators.required),
    ownerAddress: this._formBuilder.control(''),
    ownerCity: this._formBuilder.control('', Validators.required),
    ownerCountry: this._formBuilder.control('Spain'),
    ownerJob: this._formBuilder.control('', Validators.required),
    ownerAvailability: this._formBuilder.control('', Validators.required),
    ownerDescription: this._formBuilder.control(''),
    ownerImage: this._formBuilder.control(''),
    ownerLatitude: this._formBuilder.control(''),
    ownerLongitude: this._formBuilder.control(''),
    petType: this._formBuilder.control('', Validators.required),
    petFirstName: this._formBuilder.control('', Validators.required),
    petLastName: this._formBuilder.control('', Validators.required),
    petBreed: this._formBuilder.control('', Validators.required),
    petAge: this._formBuilder.control('', [Validators.required, Validators.min(0), Validators.max(30)]),
    petWeight: this._formBuilder.control('', [Validators.required, Validators.min(0.1)]),
    petSize: this._formBuilder.control('', [Validators.required, Validators.min(10)]),
    petSex: this._formBuilder.control('', Validators.required),
    petSexualStatus: this._formBuilder.control('', Validators.required),
    petDiseases: this._formBuilder.control(''),
    petDescription: this._formBuilder.control(''),
    petImage: this._formBuilder.control('')
  });

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Form - PawMatch')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Form - PawMatch',
      },
    ])
  }

  ngOnInit(): void {
    this.form.get('petType')?.valueChanges.subscribe(() => {
      this.onTypeChange();
    });
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  onFileSelected(event: Event, fieldName: 'petImage' | 'ownerImage') {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.form.get(fieldName)?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onTypeChange(): void {
    this.filteredBreeds = petBreeds[this.selectedPetType] || [];
  }

  async submit() {
    if (this.form.invalid) {
      this.showFieldErrors();
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }
    try {
      this.loading.set(true);
      const {
        firstName, lastName, ownerSex, ownerAddress, ownerCity, ownerCountry, ownerLongitude,
          ownerLatitude, ownerJob, ownerAvailability, ownerDescription, ownerImage, petType, petFirstName,
        petLastName, petBreed, petSex, petSexualStatus, petDiseases,
        petDescription, petImage
      } = this.form.value;
      const ownerAge = Number(this.form.value.ownerAge);
      const petAge = Number(this.form.value.petAge);
      const petWeight = Number(this.form.value.petWeight);
      const petSize = Number(this.form.value.petSize);
      const profilePerson: ProfilePerson = {
        name: `${firstName} ${lastName}`,
        sex: ownerSex,
        age: ownerAge,
        job: ownerJob,
        schedule: ownerAvailability,
        description: ownerDescription || '',
        picture: ownerImage || '',
      };
      const profilePet: ProfilePet[] = [{
        name: `${petFirstName} ${petLastName}`,
        sex: petSex,
        age: petAge,
        weight: petWeight,
        size: petSize,
        species: petType,
        breed: petBreed,
        sexualStatus: petSexualStatus,
        diseases: petDiseases || '',
        description: petDescription || '',
        picture: petImage || '',
        search: 'Love',
      }];
      const user: UserCreate = {
        city: ownerCity,
        country: ownerCountry,
        address: ownerAddress || '',
        latitude: ownerLatitude || '',
        longitude: ownerLongitude || '',
        notification: '',
        profilePet: profilePet,
        profilePerson: profilePerson,
        savedUsers: []
      };
      await this._userService.createUser(user);
      toast.success("¡Usuario y mascota registrados con éxito!");
      await this._router.navigate(['/home']);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      toast.error("Hubo un problema al registrar los datos.");
    } finally {
      this.loading.set(false);
    }
  }

  private getPlaceAutocomplete() {
    if (!google || !google.maps) return console.error('Google Maps API no está cargado correctamente');

    const cityAutocomplete = new google.maps.places.Autocomplete(this.cityInput.nativeElement, {
      componentRestrictions: { country: 'es' },
      types: ['(cities)'],
    });

    cityAutocomplete.addListener('place_changed', () => {
      const place = cityAutocomplete.getPlace();
      if (place.geometry) {
        this.isAddressInputDisabled = false;
        this.setAddressAutocomplete(place.geometry.viewport);
      }
    });
  }

  private setAddressAutocomplete(bounds: any) {
    const addressAutocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, {
      bounds: bounds,
      strictBounds: true,
      types: ['address'],
    });
    addressAutocomplete.addListener('place_changed', () => {
      const place = addressAutocomplete.getPlace();
      if (place.geometry) {
        this.form.get('ownerAddress')?.setValue(place.formatted_address);

        const coordinates = place.geometry.location;
        const latitude = coordinates.lat();
        const longitude = coordinates.lng();

        this.form.get('ownerLatitude')?.setValue(latitude);
        this.form.get('ownerLongitude')?.setValue(longitude);
      }
    });
  }

  showFieldErrors() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control && control.invalid) {
        control.markAsTouched();
      }
    });
  }

}