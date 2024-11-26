import {Component, inject, signal} from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {FormBuilder, Validators} from "@angular/forms";
import {ProfilePerson, ProfilePet, UserCreate, UserService} from "../../services/user.service";
import {toast} from "ngx-sonner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class Form {
  private _formBuilder = inject(FormBuilder);
  private _userService = inject(UserService);
  private _router = inject(Router);

  loading = signal(false);

  form = this._formBuilder.group({
    firstName: this._formBuilder.control('', Validators.required),
    lastName: this._formBuilder.control('', Validators.required),
    ownerAge: this._formBuilder.control('', [Validators.required, Validators.min(10), Validators.max(99)]),
    ownerSex: this._formBuilder.control('', Validators.required),
    ownerAddress: this._formBuilder.control(''),
    ownerCity: this._formBuilder.control('', Validators.required),
    ownerCountry: this._formBuilder.control('', Validators.required),
    ownerJob: this._formBuilder.control('', Validators.required),
    ownerAvailability: this._formBuilder.control('', Validators.required),
    ownerDescription: this._formBuilder.control(''),
    ownerImage: this._formBuilder.control(''),

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

  private breeds = {
    Dog: [
      'German Shepherd', 'Labrador Retriever', 'Bulldog', 'Poodle', 'Chihuahua',
      'Beagle', 'Corgi', 'Dalmatian', 'Boxer', 'Cocker Spaniel', 'Shih Tzu',
      'Yorkshire Terrier', 'Pitbull', 'Rottweiler', 'Doberman', 'Golden Retriever',
      'French Bulldog', 'Boston Terrier', 'Pug', 'Maltese', 'Shetland Sheepdog',
      'Collie', 'Cane Corso', 'Great Dane', 'Basset Hound', 'Bloodhound',
      'Coonhound', 'Dachshund', 'Akita', 'Alaskan Malamute', 'Siberian Husky',
      'Samoyed', 'Chow Chow', 'Shar-Pei', 'Schnauzer', 'Airedale Terrier',
      'Cairn Terrier', 'West Highland White Terrier', 'Scottish Terrier',
      'Lhasa Apso', 'Cocker Spaniel', 'Springer Spaniel', 'Papillon',
      'Affenpinscher', 'German Pointer', 'Poodle', 'Canelo', 'Greyhound', 'Pointer'
    ],
    Cat: [
      'Sphynx', 'Persian', 'Maine Coon', 'British Shorthair', 'Siamese',
      'Abyssinian', 'Bengal', 'Savannah', 'Ragdoll', 'Birman', 'Himalayan',
      'Oriental Shorthair', 'Balinese', 'Javanese', 'Tonkinese', 'Russian Blue',
      'Siberian', 'Nebelung', 'Chartreux', 'Korat', 'Devon Rex', 'Cornish Rex',
      'Scottish Fold', 'Munchkin', 'American Curl', 'American Shorthair',
      'American Wirehair', 'Turkish Van', 'Turkish Angora', 'Somali', 'Ocicat',
      'Pixie-bob', 'Chausie', 'Cymric', 'Manx', 'Norwegian Forest Cat',
      'Siberian Shorthair', 'Balinese Longhair', 'Oriental Longhair',
      'Javanese Longhair', 'Colorpoint Shorthair', 'Calico', 'Torbie',
      'Tortoiseshell', 'Tabby', 'Egyptian Mau', 'Ocicat Bengal', 'Ashera',
      'Bengal Savannah', 'Kurilian Bobtail'
    ],
    Hamster: [
      'Roborovski', 'Campbell', 'Winter White (Djungarian)', 'Chinese Hamster',
      'Hybrid', 'Syrian Golden', 'Syrian Silver', 'Syrian Black', 'Syrian White',
      'Syrian Panda', 'Roborovski Albino', 'Campbell Albino',
      'Winter White Leucistic', 'Chinese Golden', 'Hybrid Calico'
    ]
  };

  getBreeds(petType: string): string[] {
    return this.breeds[petType] || [];
  }

  filteredBreeds: string[] = [];

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
    const petType = this.form.get('petType')?.value;
    this.filteredBreeds = this.getBreeds(petType);
  }


  async submit() {
    if (this.form.invalid) {
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }
    try {
      this.loading.set(true);
      const {
        firstName, lastName, ownerSex, ownerAddress, ownerCity, ownerCountry,
        ownerJob, ownerAvailability, ownerDescription, ownerImage, petType, petFirstName,
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
        profilePet: profilePet,
        profilePerson: profilePerson
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
}