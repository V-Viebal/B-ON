export interface CollectionEdition {
  id: string;
  name: string;
  nameVi: string;
  pdfUrl: string;
  previewImage: string;
  perspectiveImages: string[];
  layoutImage: string;
  materialsImage: string;
  roomSize: string;
  productLineup: string[];
  palette: string[];
}

export interface FurnitureCollection {
  id: string;
  name: string;
  nameVi: string;
  eyebrow: string;
  description: string;
  descriptionVi: string;
  editions: CollectionEdition[];
}

// Source files supplied by the B+ON team. Each Linear colour story is kept as
// its own PDF so the collection menu can open the exact presentation deck.
export const COLLECTIONS: FurnitureCollection[] = [
  {
    id: 'linear',
    name: 'Linear',
    nameVi: 'Linear',
    eyebrow: 'LINEAR SOFA SYSTEM',
    description:
      'A modular sofa system presented through six tailored colour stories, balancing timeless geometry, Italian craftsmanship, and relaxed architectural comfort.',
    descriptionVi:
      'Hệ sofa module Linear được trình bày qua sáu câu chuyện màu sắc riêng, cân bằng hình học vượt thời gian, kỹ nghệ Ý và sự thoải mái mang tinh thần kiến trúc.',
    editions: [
      {
        id: 'autumn',
        name: 'Autumn',
        nameVi: 'Autumn',
        pdfUrl: '/collections/linear/linear-autumn.pdf',
        previewImage: '/collections/linear/linear-autumn-cover.png',
        perspectiveImages: [
          '/collections/linear/linear-autumn-perspective-1.jpg',
          '/collections/linear/linear-autumn-perspective-2.jpg',
        ],
        layoutImage: '/collections/linear/linear-autumn-layout.png',
        materialsImage: '/collections/linear/linear-autumn-materials.png',
        roomSize: '4.8 x 3.8 m',
        productLineup: [
          'Linear 06 x2',
          'Linear 02 x2',
          'Linear 08',
          'Moti Coffee Table',
          'Pisa Table',
        ],
        palette: ['Lumen Cinnamon', 'Carwyn Spice', 'Begonia', 'Cotto', 'Antic', 'Cognac'],
      },
      {
        id: 'stratum',
        name: 'Stratum',
        nameVi: 'Stratum',
        pdfUrl: '/collections/linear/linear-stratum.pdf',
        previewImage: '/collections/linear/linear-stratum-cover.png',
        perspectiveImages: [
          '/collections/linear/linear-stratum-perspective-1.jpg',
          '/collections/linear/linear-stratum-perspective-2.jpg',
        ],
        layoutImage: '/collections/linear/linear-stratum-layout.png',
        materialsImage: '/collections/linear/linear-stratum-materials.png',
        roomSize: '6.8 x 6.5 m',
        productLineup: [
          'Linear 04',
          'Linear 02',
          'Linear 06',
          'Linear 01',
          'Linear 08',
          'Ember Lounge Chair',
          'Akira A Table',
          'R Coffee Table',
        ],
        palette: ['Otter Carbon', 'Ashbury Jet'],
      },
      {
        id: 'terra',
        name: 'Terra',
        nameVi: 'Terra',
        pdfUrl: '/collections/linear/linear-terra.pdf',
        previewImage: '/collections/linear/linear-terra-cover.png',
        perspectiveImages: [
          '/collections/linear/linear-terra-perspective-1.jpg',
          '/collections/linear/linear-terra-perspective-2.jpg',
        ],
        layoutImage: '/collections/linear/linear-terra-layout.png',
        materialsImage: '/collections/linear/linear-terra-materials.png',
        roomSize: '6 x 4.5 m',
        productLineup: [
          'Linear 06 x2',
          'Linear 02',
          'Thomas 2 Lounge Chair',
          'Mala Coffee Table',
          'Nhi Binh Table',
        ],
        palette: [
          'Carwyn Mole',
          'Lumen Truffle',
          'Carwyn Truffle',
          'Brightwell Mocha',
          'Marrone',
          'Nocciola',
          'Malt',
          'Castagna',
        ],
      },
      {
        id: 'eclipse',
        name: 'Eclipse',
        nameVi: 'Eclipse',
        pdfUrl: '/collections/linear/linear-eclipse.pdf',
        previewImage: '/collections/linear/linear-eclipse-cover.png',
        perspectiveImages: [
          '/collections/linear/linear-eclipse-perspective-1.jpg',
          '/collections/linear/linear-eclipse-perspective-2.jpg',
        ],
        layoutImage: '/collections/linear/linear-eclipse-layout.png',
        materialsImage: '/collections/linear/linear-eclipse-materials.png',
        roomSize: '5.8 x 4.5 m',
        productLineup: [
          'Linear 10 x3',
          'Linear 04',
          'Linear 03',
          'Linear 02',
          'Trung A Side Table',
          'Trung B Side Table',
          'Eclipse Coffee Table',
        ],
        palette: [
          'Blake Smoke',
          'Lumen Carbon',
          'Carwyn Smoke',
          'Larne Charcoal',
          'Asfalto',
          'Moretto',
          'Testa-Moro',
          'Coffee',
        ],
      },
      {
        id: 'verdant',
        name: 'Verdant',
        nameVi: 'Verdant',
        pdfUrl: '/collections/linear/linear-verdant.pdf',
        previewImage: '/collections/linear/linear-verdant-cover.png',
        perspectiveImages: [
          '/collections/linear/linear-verdant-perspective-1.jpg',
          '/collections/linear/linear-verdant-perspective-2.jpg',
        ],
        layoutImage: '/collections/linear/linear-verdant-layout.png',
        materialsImage: '/collections/linear/linear-verdant-materials.png',
        roomSize: '5.6 x 5.3 m',
        productLineup: [
          'Linear 02',
          'Linear 06',
          'Linear 10 x2',
          'Samy Lounge Chair x2',
          'Mino Coffee Table',
          'Nhi Binh Table',
        ],
        palette: [
          'Brightwell Evergreen',
          'Carwyn Pine',
          'Mylo Evergreen',
          'Beck Emerald',
          'Colvert',
          'Abete',
          'Pino',
          'Verdone',
        ],
      },
      {
        id: 'jasmine',
        name: 'Jasmine',
        nameVi: 'Jasmine',
        pdfUrl: '/collections/linear/linear-jasmine.pdf',
        previewImage: '/collections/linear/linear-jasmine-cover.png',
        perspectiveImages: [
          '/collections/linear/linear-jasmine-perspective-1.jpg',
          '/collections/linear/linear-jasmine-perspective-2.jpg',
        ],
        layoutImage: '/collections/linear/linear-jasmine-layout.png',
        materialsImage: '/collections/linear/linear-jasmine-materials.png',
        roomSize: '5.8 x 5.5 m',
        productLineup: [
          'Linear 02',
          'Linear 04 x2',
          'Linear 03',
          'Linear 06 x2',
          'Nimbus Arm Chair',
          'Emerson A Table',
          'Nolan Table x2',
        ],
        palette: [
          'Brightwell Snow',
          'Mylo Snow',
          'Otter Parchment',
          'Lumen Snow',
          'Ghiaccio',
          'Avorio',
          'Gesso',
          'Latte',
        ],
      },
    ],
  },
];

export const COLLECTION_NAMES = COLLECTIONS.map((collection) => collection.name);
