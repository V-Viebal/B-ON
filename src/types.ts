export type AppLanguage = 'VI' | 'EN';

export type PageType = 
  | 'home' 
  | 'catalog' 
  | 'in-stock' 
  | 'about' 
  | 'interiors' 
  | 'blog' 
  | 'designers' 
  | 'materials' 
  | 'contacts'
  | 'product-detail'
  | 'admin';

export type MainCategory = 'all' | 'upholstered' | 'cabinet' | 'in-stock' | 'by-rooms';

export type SubCategory = 
  | 'all'
  | 'sofas'
  | 'beds'
  | 'armchairs'
  | 'chairs'
  | 'banquettes'
  | 'couches'
  | 'poufs'
  | 'dining-tables'
  | 'coffee-tables'
  | 'consoles'
  | 'bedside-tables'
  | 'sideboards'
  | 'tv-stands'
  | 'dressing-tables'
  | 'desks'
  | 'accessories';

export type RoomType = 'all' | 'living-room' | 'dining-room' | 'bedroom' | 'office' | 'lounge';

export interface FinishOption {
  id: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  category: 'upholstery' | 'wood' | 'metal' | 'marble';
  colorHex: string;
  textureLabel: string;
  textureLabelVi?: string;
}

export interface ProductDimensions {
  width: number;
  depth: number;
  height: number;
  seatHeight?: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  italianName?: string;
  sku: string;
  category: 'upholstered' | 'cabinet';
  subcategory: SubCategory;
  rooms: RoomType[];
  collection: string;
  tagline: string;
  taglineVi?: string;
  taglineEn?: string;
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
  designPhilosophy: string;
  designPhilosophyVi?: string;
  designPhilosophyEn?: string;
  dimensions: ProductDimensions;
  weightApprox?: string;
  images: string[];
  materialsDescription: string;
  materialsDescriptionVi?: string;
  materialsDescriptionEn?: string;
  defaultFinishes: {
    upholstery?: string;
    wood?: string;
    metal?: string;
    marble?: string;
  };
  availableFinishes: {
    upholstery?: FinishOption[];
    wood?: FinishOption[];
    metal?: FinishOption[];
    marble?: FinishOption[];
  };
  model3d: {
    available: boolean;
    formats: ('3ds Max' | 'Corona' | 'V-Ray' | 'OBJ' | 'FBX' | 'Revit')[];
    fileSize: string;
    polyCount: string;
  };
  studia54Project?: {
    projectName: string;
    location: string;
  };
  isNew?: boolean;
  isBestseller?: boolean;
  inStock?: boolean;
  shade?: string;
  shadeVi?: string;
  priceRub?: number;
  priceVnd?: number;
  priceFormatted?: string;
  priceFormattedVi?: string;
  priceFormattedEn?: string;
  colorSwatches?: ProductColorSwatch[];
  heroImage?: string;
  videoUrl?: string;
  pdfUrl?: string;
  model3dUrl?: string;
  arModelIos?: string;
  arModelAndroid?: string;
  leadTime?: string;
  leadTimeVi?: string;
  sizeVariants?: Array<{
    id: string;
    label: string;
    dimensions: string;
    sku?: string;
    priceRub?: number;
    priceVnd?: number;
    priceFormatted?: string;
  }>;
  editorial?: {
    styleTitle?: string;
    styleTitleVi?: string;
    styleDesc?: string;
    styleDescVi?: string;
    styleImage?: string;
    inspirationTitle?: string;
    inspirationTitleVi?: string;
    inspirationDesc?: string;
    inspirationDescVi?: string;
    inspirationImage?: string;
    detailTitle?: string;
    detailTitleVi?: string;
    detailCard1?: string;
    detailCard1Vi?: string;
    detailCard2?: string;
    detailCard2Vi?: string;
    detailImage?: string;
    investmentTitle?: string;
    investmentTitleVi?: string;
    investmentDesc?: string;
    investmentDescVi?: string;
    investmentImage?: string;
  };
}

export interface ProductColorSwatch {
  id: string;
  name: string;
  shadeLabel: string;
  shadeLabelVi?: string;
  colorHex: string;
  image?: string;
  priceFormatted?: string;
}

export interface InteriorProject {
  id: string;
  title: string;
  titleVi?: string;
  titleEn?: string;
  location: string;
  locationVi?: string;
  locationEn?: string;
  year: string;
  type: string;
  typeVi?: string;
  typeEn?: string;
  area: string;
  roomCategory?: 'living-room' | 'bedroom' | 'dining-room' | 'office' | 'lounge';
  coverImage: string;
  galleryImages?: string[];
  description: string;
  descriptionVi?: string;
  descriptionEn?: string;
  furnitureUsed: string[]; // Product names or IDs
}

export interface ShowroomLocation {
  id: string;
  city: string;
  cityVi?: string;
  cityEn?: string;
  title: string;
  titleVi?: string;
  titleEn?: string;
  address: string;
  addressVi?: string;
  addressEn?: string;
  schedule: string;
  scheduleVi?: string;
  scheduleEn?: string;
  phone: string;
  email: string;
  image: string;
  isFlagship?: boolean;
}

export interface WishlistItem {
  product: Product;
  selectedFinishes: {
    upholstery?: string;
    wood?: string;
    metal?: string;
    marble?: string;
  };
  quantity: number;
  addedAt: string;
  notes?: string;
}
