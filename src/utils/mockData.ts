import { Product, Category, Location, ProductModifier, ModifierOption } from '@/types';

// Модификаторы
export const sizeModifier: ProductModifier = {
  id: 'size',
  name: 'Размер',
  required: true,
  options: [
    { id: 's', name: 'S (250 мл)', price: 0, default: true },
    { id: 'm', name: 'M (350 мл)', price: 50 },
    { id: 'l', name: 'L (450 мл)', price: 100 },
  ],
};

export const milkModifier: ProductModifier = {
  id: 'milk',
  name: 'Молоко',
  required: false,
  options: [
    { id: 'regular', name: 'Обычное', price: 0, default: true },
    { id: 'oat', name: 'Овсяное', price: 50 },
    { id: 'coconut', name: 'Кокосовое', price: 50 },
    { id: 'almond', name: 'Миндальное', price: 60 },
  ],
};

export const sugarModifier: ProductModifier = {
  id: 'sugar',
  name: 'Сахар',
  required: false,
  options: [
    { id: 'none', name: 'Без сахара', price: 0, default: true },
    { id: 'regular', name: 'Обычный', price: 0 },
    { id: 'brown', name: 'Коричневый', price: 15 },
  ],
};

export const syrupModifier: ProductModifier = {
  id: 'syrup',
  name: 'Сироп',
  required: false,
  options: [
    { id: 'none', name: 'Без сиропа', price: 0, default: true },
    { id: 'caramel', name: 'Карамель', price: 40 },
    { id: 'vanilla', name: 'Ваниль', price: 40 },
    { id: 'coconut', name: 'Кокос', price: 40 },
    { id: 'lavender', name: 'Лаванда', price: 40 },
  ],
};

export const categories: Category[] = [
  { id: 'coffee', name: 'Кофе' },
  { id: 'tea', name: 'Чай' },
  { id: 'pizza', name: 'Пицца' },
  { id: 'sandwiches', name: 'Сэндвичи & Панини' },
  { id: 'desserts', name: 'Десерты' },
  { id: 'signature', name: 'Фирменные напитки' },
];

export const products: Product[] = [
  // Кофе
  {
    id: 'flat-white',
    name: 'Флэт-уайт',
    description: 'Насыщенный молочный напиток на основе эспрессо',
    price: 260,
    imageUrl: '/assets/images/flat-white.jpg',
    category: 'coffee',
    calories: 180,
    modifiers: [sizeModifier, milkModifier, sugarModifier],
    popular: true,
  },
  {
    id: 'raf-classic',
    name: 'Раф классический',
    description: 'Кофейный напиток на основе сливок и эспрессо',
    price: 290,
    imageUrl: '/assets/images/raf-classic.jpg',
    category: 'coffee',
    calories: 220,
    modifiers: [sizeModifier, sugarModifier, syrupModifier],
    popular: true,
  },
  {
    id: 'americano',
    name: 'Американо',
    description: 'Черный кофе, приготовленный на фирменном зерне Surf Espresso Blend',
    price: 170,
    imageUrl: '/assets/images/americano.jpg',
    category: 'coffee',
    calories: 5,
    modifiers: [sizeModifier, sugarModifier],
  },
  {
    id: 'cappuccino',
    name: 'Капучино',
    description: 'Молочно-кофейный напиток с ярко выраженным вкусом эспрессо',
    price: 260,
    imageUrl: '/assets/images/cappuccino.jpg',
    category: 'coffee',
    calories: 150,
    modifiers: [sizeModifier, milkModifier, sugarModifier, syrupModifier],
    popular: true,
  },
  {
    id: 'latte',
    name: 'Латте',
    description: 'Молочно-кофейный напиток с преобладанием молочного вкуса',
    price: 260,
    imageUrl: '/assets/images/latte.jpg',
    category: 'coffee',
    calories: 180,
    modifiers: [sizeModifier, milkModifier, sugarModifier, syrupModifier],
    popular: true,
  },
  {
    id: 'filter-coffee',
    name: 'Фильтр-кофе',
    description: 'Мягкий по вкусу черный кофе с различными вкусовыми оттенками',
    price: 190,
    imageUrl: '/assets/images/filter-coffee.jpg',
    category: 'coffee',
    calories: 5,
    modifiers: [sizeModifier, sugarModifier],
  },
  
  // Холодный кофе
  {
    id: 'ice-latte',
    name: 'Айс-латте',
    description: 'Кофе со льдом и охлажденным молоком',
    price: 260,
    imageUrl: '/assets/images/ice-latte.jpg',
    category: 'coffee',
    calories: 170,
    modifiers: [sizeModifier, milkModifier, sugarModifier, syrupModifier],
  },
  {
    id: 'espresso-tonic',
    name: 'Эспрессо-тоник',
    description: 'Кофейный напиток с тоником и лимоном',
    price: 280,
    imageUrl: '/assets/images/espresso-tonic.jpg',
    category: 'coffee',
    calories: 120,
    modifiers: [sizeModifier],
  },
  
  // Фирменные напитки
  {
    id: 'double-hawaiian',
    name: 'Двойной гавайский',
    description: 'Фирменный капучино с удвоенной порцией эспрессо',
    price: 310,
    imageUrl: '/assets/images/double-hawaiian.jpg',
    category: 'signature',
    calories: 220,
    modifiers: [sizeModifier, milkModifier, sugarModifier],
    popular: true,
  },
  {
    id: 'raf-salted-caramel',
    name: 'Раф солёная карамель',
    description: 'Кофе со вкусом пряных ирисок',
    price: 320,
    imageUrl: '/assets/images/raf-salted-caramel.jpg',
    category: 'signature',
    calories: 250,
    modifiers: [sizeModifier, sugarModifier],
    popular: true,
  },
  {
    id: 'raf-lavender',
    name: 'Раф лавандовый',
    description: 'Кофейный напиток с лавандовым ароматом',
    price: 320,
    imageUrl: '/assets/images/raf-lavender.jpg',
    category: 'signature',
    calories: 240,
    modifiers: [sizeModifier, sugarModifier],
  },
  {
    id: 'raspberry-latte',
    name: 'Малиновый латте',
    description: 'Молочно-кофейный напиток с малиновой пенкой',
    price: 320,
    imageUrl: '/assets/images/raspberry-latte.jpg',
    category: 'signature',
    calories: 220,
    modifiers: [sizeModifier, milkModifier, sugarModifier],
  },
  
  // Чай
  {
    id: 'milk-oolong',
    name: 'Молочный улун',
    description: 'Улун с тонкими сладкими сливочными нотами',
    price: 190,
    imageUrl: '/assets/images/milk-oolong.jpg',
    category: 'tea',
    calories: 5,
    modifiers: [sizeModifier, sugarModifier],
  },
  {
    id: 'matcha-tonic',
    name: 'Матча-тоник',
    description: 'Холодный напиток на основе тоника и японского чая матча',
    price: 290,
    imageUrl: '/assets/images/matcha-tonic.jpg',
    category: 'tea',
    calories: 150,
    modifiers: [sizeModifier],
    popular: true,
  },
  
  // Пицца
  {
    id: 'pizza-margherita',
    name: 'Маргарита',
    description: 'Классическая итальянская пицца с моцареллой, томатным соусом, базиликом и оливковым маслом',
    price: 450,
    imageUrl: '/assets/images/pizza-margherita.jpg',
    category: 'pizza',
    calories: 850,
  },
  {
    id: 'pizza-pepperoni',
    name: 'Пепперони',
    description: 'Пицца с пепперони, моцареллой, томатным соусом и базиликом',
    price: 550,
    imageUrl: '/assets/images/pizza-pepperoni.jpg',
    category: 'pizza',
    calories: 950,
    popular: true,
  },
  {
    id: 'pizza-four-cheese',
    name: 'Четыре сыра',
    description: 'Горгонзола, моцарелла, скаморца, пармезан, базилик и оливковое масло',
    price: 590,
    imageUrl: '/assets/images/pizza-four-cheese.jpg',
    category: 'pizza',
    calories: 980,
    popular: true,
  },
  
  // Сэндвичи & Панини
  {
    id: 'panini-con-carne',
    name: 'Кон Карне',
    description: 'Сэндвич с пепперони, беконом, моцареллой, томатами черри, рукколой, томатным соусом и скаморцей',
    price: 390,
    imageUrl: '/assets/images/panini-con-carne.jpg',
    category: 'sandwiches',
    calories: 580,
    popular: true,
  },
  {
    id: 'panini-con-verdure',
    name: 'Кон Вердуре',
    description: 'Овощной сэндвич с запеченным кабачком и перцем, рукколой, моцареллой, фирменным соусом песто, оливковым маслом и маслинами',
    price: 350,
    imageUrl: '/assets/images/panini-con-verdure.jpg',
    category: 'sandwiches',
    calories: 480,
  },
  
  // Сладкая пицца (десерт)
  {
    id: 'sweet-pizza-lampone-mora',
    name: 'Лампоне Мора',
    description: 'Пицца с маскарпоне, ежевикой и малиной, украшенная мятой и сахарной пудрой',
    price: 450,
    imageUrl: '/assets/images/sweet-pizza-lampone-mora.jpg',
    category: 'desserts',
    calories: 650,
    popular: true,
  }
];

export const locations: Location[] = [
  {
    id: '1',
    name: 'SURF COFFEE × LUMIERE',
    address: 'Москва, пр-т Вернадского 29, БЦ Лето',
    coordinates: {
      lat: 55.6838,
      lng: 37.5333,
    },
    workingHours: {
      'Пн-Пт': {
        open: '8:00',
        close: '22:00',
      },
      'Сб-Вс': {
        open: '9:00',
        close: '22:30',
      },
    },
    imageUrl: '/assets/images/location-lumiere.jpg',
  },
  {
    id: '2',
    name: 'SURF COFFEE × CENTRE',
    address: 'Москва, ул. Тверская 6, ТЦ Галерея',
    coordinates: {
      lat: 55.7585,
      lng: 37.6065,
    },
    workingHours: {
      'Пн-Пт': {
        open: '8:00',
        close: '22:00',
      },
      'Сб-Вс': {
        open: '9:00',
        close: '23:00',
      },
    },
    imageUrl: '/assets/images/location-centre.jpg',
  },
  {
    id: '3',
    name: 'SURF COFFEE × КРАСНАЯ ПОЛЯНА',
    address: 'Красная Поляна, Горная ул. 18',
    coordinates: {
      lat: 43.6584,
      lng: 40.2562,
    },
    workingHours: {
      'Пн-Вс': {
        open: '8:00',
        close: '22:00',
      },
    },
    imageUrl: '/assets/images/location-krasnaya-polyana.jpg',
  },
  {
    id: '4',
    name: 'SURF COFFEE × ПАРК КУЛЬТУРЫ',
    address: 'Москва, ул. Крымский вал 9, Парк Горького',
    coordinates: {
      lat: 55.7315,
      lng: 37.6024,
    },
    workingHours: {
      'Пн-Вс': {
        open: '8:00',
        close: '23:00',
      },
    },
    imageUrl: '/assets/images/location-park.jpg',
  },
]; 