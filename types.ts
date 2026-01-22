export enum Category {
  HISTORY = 'Tarih',
  CULTURE = 'Kültür',
  NATURE = 'Doğa',
  FOOD = 'Lezzet'
}

export interface ContentItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  bgColor: string; // Tailwind class
  textColor: string; // Tailwind class
  badgeColor: string; // Tailwind class
  lat: number;
  lng: number;
}