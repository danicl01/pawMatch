export enum PetType {
    Dog = 'Dog',
    Cat = 'Cat',
    Hamster = 'Hamster',
}

export const petBreeds = {
    [PetType.Dog]: [
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
    [PetType.Cat]: [
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
    [PetType.Hamster]: [
        'Roborovski', 'Campbell', 'Winter White (Djungarian)', 'Chinese Hamster',
        'Hybrid', 'Syrian Golden', 'Syrian Silver', 'Syrian Black', 'Syrian White',
        'Syrian Panda', 'Roborovski Albino', 'Campbell Albino',
        'Winter White Leucistic', 'Chinese Golden', 'Hybrid Calico'
    ]
};
