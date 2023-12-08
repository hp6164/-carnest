import random
import json
# Car makes and models for generating random listings
car_makes_models = {
    "Toyota": ["Corolla", "Camry", "Prius", "Highlander", "RAV4"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
    "Ford": ["Fiesta", "Focus", "Mustang", "Explorer", "F-150"],
    "Chevrolet": ["Cruze", "Malibu", "Impala", "Equinox", "Silverado"],
    "Nissan": ["Sentra", "Altima", "Maxima", "Rogue", "Murano"],
    "BMW": ["3 Series", "5 Series", "X3", "X5", "M3"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
    "Volkswagen": ["Golf", "Passat", "Jetta", "Tiguan", "Beetle"],
    "Audi": ["A3", "A4", "A6", "Q3", "Q5"]
}

# Function to generate random car listings
def generate_car_listings(num_listings):
    listings = []
    for _ in range(num_listings):
        make = random.choice(list(car_makes_models.keys()))
        model = random.choice(car_makes_models[make])
        year = random.randint(2000, 2022)  # Assuming we're listing used cars only
        price = random.randint(5000, 15000)  # Random price between 5k and 50k

        listing = {
            "make": make,
            "model": model,
            "year": str(year),
            "price": str(price)
        }

        listings.append(listing)

    return listings

# Generate 50 car listings
car_listings = generate_car_listings(50)
car_listings[:5]  # Display first 5 listings as a sample
with open('car_listings.json', 'w') as file:
    json.dump(car_listings, file)
    file.close()
    print("Saved car_listings.json")
    print(car_listings)
