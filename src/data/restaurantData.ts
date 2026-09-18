import murghImg from '../assets/images/murgh_musallam_1789767462541.jpg';
import butterChickenImg from '../assets/images/butter_chicken_1789767487738.jpg';
import dalMakhaniImg from '../assets/images/dal_makhani_1789767506696.jpg';
import naanBasketImg from '../assets/images/naan_basket_1789767516737.jpg';
import heroImg from '../assets/images/nawab_hero_ambience_1789767431768.jpg';
import tandoorImg from '../assets/images/nawab_live_tandoor_1789767448055.jpg';

export { heroImg, tandoorImg };

export interface DishItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'Royal Special' | 'Mughlai Main' | 'Vegetarian' | 'Tandoori Breads';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  isVeg: boolean;
  spiceLevel: 'Mild' | 'Medium' | 'Royal Spiced' | 'Hot';
  badge?: string;
  prepTime: string;
}

export const POPULAR_DELIGHTS: DishItem[] = [
  {
    id: 'murgh-musallam',
    name: 'Murgh Musallam',
    hindiName: 'मुर्ग मुसल्लम',
    category: 'Royal Special',
    price: 650,
    originalPrice: 720,
    description: 'Succulent whole chicken slow-cooked with royal spices, rich saffron-almond gravy, garnished with sliced boiled eggs & coriander.',
    image: murghImg,
    isVeg: false,
    spiceLevel: 'Royal Spiced',
    badge: "Nawab's Signature",
    prepTime: '25 mins'
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    hindiName: 'मुरग मखनी',
    category: 'Mughlai Main',
    price: 480,
    originalPrice: 520,
    description: 'Tender tandoor-roasted chicken simmered in rich buttery tomato & cashew gravy with fresh cream swirl and ginger juliennes.',
    image: butterChickenImg,
    isVeg: false,
    spiceLevel: 'Medium',
    badge: 'Bestseller',
    prepTime: '20 mins'
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    hindiName: 'दाल मखनी',
    category: 'Vegetarian',
    price: 340,
    originalPrice: 380,
    description: 'Slow-cooked whole black lentils simmered overnight over live charcoal with churned white butter, cream & secret hand-ground spices.',
    image: dalMakhaniImg,
    isVeg: true,
    spiceLevel: 'Medium',
    badge: 'Chef Favorite',
    prepTime: '15 mins'
  },
  {
    id: 'naan-basket',
    name: 'Naan Basket',
    hindiName: 'शाही नान टोकरी',
    category: 'Tandoori Breads',
    price: 260,
    originalPrice: 290,
    description: 'Assorted royal tandoori breads straight from the clay oven: Garlic Butter Naan, Lachha Paratha, Butter Kulcha & Missi Roti.',
    image: naanBasketImg,
    isVeg: true,
    spiceLevel: 'Mild',
    badge: 'Fresh From Tandoor',
    prepTime: '10 mins'
  }
];

export const WHY_NAWAB_DHABA = [
  {
    id: 'authentic-taste',
    title: 'Authentic Taste',
    subtitle: 'Royal Mughal Recipes',
    description: 'Ancestral spices ground daily and slow-cooked in hand-beaten copper cookware.',
    icon: 'Flame'
  },
  {
    id: 'open-air-seating',
    title: 'Open Air Seating',
    subtitle: 'Lush Courtyard & Gazebos',
    description: 'Dine under the starry sky with soft breezes, fairy lights, and traditional charpai cots.',
    icon: 'Trees'
  },
  {
    id: 'live-tandoori',
    title: 'Live Tandoori',
    subtitle: 'Open Charcoal Ovens',
    description: 'Watch master ustaads slap freshly kneaded dough and skewer kebabs over glowing embers.',
    icon: 'UtensilsCrossed'
  },
  {
    id: 'family-friendly',
    title: 'Family Friendly',
    subtitle: 'Spacious & Welcoming',
    description: 'Dedicated air-conditioned family dining hall, kids play lawn, and spotless clean restrooms.',
    icon: 'Users'
  },
  {
    id: 'free-parking',
    title: 'Free Parking',
    subtitle: 'Valet & 200+ Cars',
    description: 'Secure, illuminated parking right on the highway with 24/7 security & EV charging station.',
    icon: 'Car'
  }
];

export const RESTAURANT_INFO = {
  name: 'Nawab Dhaba',
  tagline: 'Experience the Royal Flavors of India',
  subtext: 'Authentic Mughlai, Tandoori & North Indian Cuisine on the Mumbai-Nashik Highway.',
  address: 'NH 160, Mumbai - Nashik Expressway, Near Bhiwandi Bypass, Padgha, Maharashtra 421101',
  landmark: '2 km before Padgha Toll Plaza, Mumbai Bound Corridor',
  phone: '+91 91234 56789',
  secondaryPhone: '+91 98765 43210',
  timing: 'Open Daily: 12:00 PM – 3:30 AM (Late Night Highway Dining)',
  fssaiNumber: '11523024000482',
  googleRating: 4.8,
  totalReviews: '12,450+',
  distanceGuide: [
    { city: 'Thane Majiwada', dist: '24 km', time: '35 mins' },
    { city: 'Mumbai (Mulund Checknaka)', dist: '32 km', time: '45 mins' },
    { city: 'Kalyan Station', dist: '16 km', time: '25 mins' },
    { city: 'Nashik', dist: '128 km', time: '2.5 hrs' }
  ]
};
