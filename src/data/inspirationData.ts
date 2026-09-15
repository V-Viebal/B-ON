// B+ON Official Inspiration Dataset - fiftyfourms.com/inspiration
// 60 Real Realized & Concept Projects with verified CDN images

export interface FeaturedRoomProduct {
  id: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  shade: string;
  shadeVi?: string;
  shadeEn?: string;
  image: string;
  sku?: string;
  dimensions?: string;
  productSlug?: string;
}

export interface InspirationRoom {
  id: string;
  slug: string;
  category: 'living-room' | 'bedroom' | 'cabinet' | 'dining-room';
  image: string;
  titleEn: string;
  titleVi: string;
  descEn: string;
  descVi: string;
  featuredProducts?: string[];
  heroNarrativeEn?: string[];
  heroNarrativeVi?: string[];
  comprehensiveTitleEn?: string;
  comprehensiveTitleVi?: string;
  comprehensiveDescEn?: string[];
  comprehensiveDescVi?: string[];
  detailedProducts?: FeaturedRoomProduct[];
}

export const INSPIRATION_ROOMS: InspirationRoom[] = [
  {
    "id": "dining-table-set-with-chairs-luxury-dining-room-furniture",
    "slug": "dining-table-set-with-chairs-luxury-dining-room-furniture",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/Frame_7657_1_8906345064.webp",
    "titleEn": "Dining Table Set Chairs Luxury Dining Room Furniture",
    "titleVi": "Không gian phòng ăn — Dining Table Set Chairs Luxury Dining Room Furniture",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "spacious-living-room-with-sofa-and-armchairs-from-luxury-brand-fiftyfourms",
    "slug": "spacious-living-room-with-sofa-and-armchairs-from-luxury-brand-fiftyfourms",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/6_49b7845bcc.webp",
    "titleEn": "Spacious Living Room Sofa Armchairs Luxury Brand Bpluson",
    "titleVi": "Không gian phòng khách — Spacious Living Room Sofa Armchairs Luxury Brand Bpluson",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "interior-of-luxury-hotel-lobby-with-fiftyfourms-furniture",
    "slug": "interior-of-luxury-hotel-lobby-with-fiftyfourms-furniture",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/5_874bc6118b.webp",
    "titleEn": "Interior of luxury landscape hotel lobby with B+ON furniture",
    "titleVi": "Nội thất sảnh khách sạn cảnh quan cao cấp với đồ rời B+ON",
    "descEn": "Immerse yourself in the atmosphere of a luxury landscape hotel, where B+ON furniture becomes part of a tranquil dialogue with nature. The Virgola sofa, inspired by the infinity symbol, sets a soft rhythm for the space, while the Pianta armchair with its accent leather backrest continues the composition by the panoramic window, creating a serene sanctuary for relaxation and contemplation.",
    "descVi": "Đắm mình vào bầu không khí của khách sạn cảnh quan đẳng cấp, nơi đồ rời B+ON hòa nhập vào cuộc đối thoại tĩnh lặng cùng thiên nhiên. Bộ sofa Virgola lấy cảm hứng từ biểu tượng vô cực định hình nhịp điệu mềm mại cho không gian, kết hợp cùng ghế bành Pianta với điểm nhấn lưng da cao cấp bên khung cửa sổ panorama, tạo nên điểm dừng chân hoàn hảo để thư giãn và ngắm nhìn cảnh sắc.",
    "heroNarrativeEn": [
      "Immerse yourself in the atmosphere of a luxury landscape hotel, where B+ON furniture becomes part of a tranquil dialogue with nature.",
      "The Virgola sofa, inspired by the infinity symbol, sets a soft rhythm for the space, while the Pianta armchair with its accent leather backrest continues the composition by the panoramic window, creating a serene sanctuary for relaxation and contemplation."
    ],
    "heroNarrativeVi": [
      "Đắm mình vào bầu không khí của khách sạn cảnh quan đẳng cấp, nơi đồ rời B+ON hòa nhập vào cuộc đối thoại tĩnh lặng cùng thiên nhiên.",
      "Bộ sofa Virgola, lấy cảm hứng từ biểu tượng vô cực, định hình nhịp điệu mềm mại cho không gian; trong khi ghế bành Pianta với điểm nhấn lưng da cao cấp tiếp nối bố cục hoàn mỹ bên ô cửa kính panorama rộng lớn, tạo nên góc nghỉ ngơi và chiêm ngưỡng thư thái."
    ],
    "comprehensiveTitleEn": "Comprehensive Hotel Furnishing with B+ON",
    "comprehensiveTitleVi": "Hoàn thiện nội thất dự án tổng thể với đồ rời B+ON",
    "comprehensiveDescEn": [
      "Hotel furnishing starts with the first impression and resonates throughout every zone where guests spend time. The lobby is the pivotal space through which visitors absorb the ambiance of the hotel within their first minutes. Here it is especially vital that the interior sustains this refined atmosphere and accommodates various hospitality scenarios.",
      "At B+ON, furniture can be selected both for individual zones and multi-space environments. For the lobby, we curate a cohesive composition facilitating welcoming and lounge experiences. Following approval, we adapt bespoke solutions, manufacture custom furniture, deliver, and install on-site."
    ],
    "comprehensiveDescVi": [
      "Không gian khách sạn bắt đầu từ ấn tượng thị giác đầu tiên và lan tỏa qua từng khu vực mà du khách trải nghiệm. Sảnh chính là nơi du khách cảm nhận trọn vẹn tinh thần và đẳng cấp của khách sạn ngay từ những giây phút đầu tiên. Tại đây, thiết kế nội thất đóng vai trò then chốt trong việc duy trì cảm xúc sang trọng và phục vụ đa dạng nhu cầu tiếp đón.",
      "Tại B+ON, quý khách có thể lựa chọn đồ rời cho từng khu vực độc lập hoặc đồng bộ cho toàn bộ dự án. Đối với sảnh đón, chúng tôi thiết kế bố cục thống nhất, mang lại sự tiện nghi và ấm cúng cho việc gặp gỡ và tiếp đón. Sau khi duyệt phương án, chúng tôi tùy chỉnh thông số kỹ thuật, trực tiếp sản xuất theo đơn đặt hàng, vận chuyển và lắp đặt hoàn thiện tại công trình."
    ],
    "featuredProducts": [
      "Virgola Modular Sofa",
      "Pianta Armchair",
      "Invito (M) Coffee Table"
    ],
    "detailedProducts": [
      {
        "id": "sofa-virgola-silver-drop",
        "name": "Virgola Sofa",
        "nameVi": "Sofa Virgola",
        "nameEn": "Virgola Sofa",
        "shade": "Silver Drop shade",
        "shadeVi": "Sắc thái Silver Drop",
        "shadeEn": "Silver Drop shade",
        "image": "https://cdn.fiftyfourms.com/virgola_L_F_gemma115_d8bfd058c7.webp",
        "sku": "SL1B1",
        "dimensions": "344 × 133 × 87 cm",
        "productSlug": "sofa-virgola"
      },
      {
        "id": "armchair-pianta-caramel-amber",
        "name": "Pianta Armchair",
        "nameVi": "Ghế bành Pianta",
        "nameEn": "Pianta Armchair",
        "shade": "Caramel Amber shade",
        "shadeVi": "Sắc thái Caramel Amber",
        "shadeEn": "Caramel Amber shade",
        "image": "https://cdn.fiftyfourms.com/Pianta_Cam_001_F_White_L_Tortora_fb5641830c.webp",
        "sku": "AA1A1",
        "dimensions": "85 × 84 × 75 cm",
        "productSlug": "armchair-pianta"
      },
      {
        "id": "coffee-table-invito-m-twilight-grey",
        "name": "Invito Coffee Table (M)",
        "nameVi": "Bàn trà salon Invito (M)",
        "nameEn": "Invito Coffee Table (M)",
        "shade": "Twilight Grey shade",
        "shadeVi": "Sắc thái Twilight Grey",
        "shadeEn": "Twilight Grey shade",
        "image": "https://cdn.fiftyfourms.com/Invito_M_001_Grey_7430daa113.webp",
        "sku": "MT6B1",
        "dimensions": "140 × 140 × 30 cm",
        "productSlug": "coffee-table-invito"
      }
    ]
  },
  {
    "id": "designer-lounge-area-with-elite-furniture-by-fiftyfourms",
    "slug": "designer-lounge-area-with-elite-furniture-by-fiftyfourms",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/4_8e15fe527e.webp",
    "titleEn": "Designer Lounge Area Elite Furniture Bpluson",
    "titleVi": "Không gian phòng khách — Designer Lounge Area Elite Furniture Bpluson",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "bedroom-furniture-set-dressing-table-with-elegant-stool",
    "slug": "bedroom-furniture-set-dressing-table-with-elegant-stool",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/image_221_608723bc72.webp",
    "titleEn": "Bedroom Furniture Set Dressing Table Elegant Stool",
    "titleVi": "Không gian phòng ngủ — Bedroom Furniture Set Dressing Table Elegant Stool",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "aesthetics-of-success-exclusive-luxury-office-interior",
    "slug": "aesthetics-of-success-exclusive-luxury-office-interior",
    "category": "cabinet",
    "image": "https://cdn.fiftyfourms.com/Frame_7641_1_5582041a6e.webp",
    "titleEn": "Aesthetics Success Exclusive Luxury Office Interior",
    "titleVi": "Không gian phòng làm việc — Aesthetics Success Exclusive Luxury Office Interior",
    "descEn": "B+ON curated architectural composition for home office. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng làm việc thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "bedroom-interior-with-color-accents-by-fiftyfourms",
    "slug": "bedroom-interior-with-color-accents-by-fiftyfourms",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/fifty_50_plumera_deluxe_drum_balance_no_logo_1_879fcd42f6.webp",
    "titleEn": "Bedroom Interior Color Accents Bpluson",
    "titleVi": "Không gian phòng ngủ — Bedroom Interior Color Accents Bpluson",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "spacious-bedroom-with-premium-furniture",
    "slug": "spacious-bedroom-with-premium-furniture",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/f4_1_2793521b59.webp",
    "titleEn": "Spacious Bedroom Premium Furniture",
    "titleVi": "Không gian phòng ngủ — Spacious Bedroom Premium Furniture",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "fiftyfourms-furniture-set-for-cozy-dining-room",
    "slug": "fiftyfourms-furniture-set-for-cozy-dining-room",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/Fityform_22_33_1_ee5198dbe7.webp",
    "titleEn": "Bpluson Furniture Set Cozy Dining Room",
    "titleVi": "Không gian phòng ăn — Bpluson Furniture Set Cozy Dining Room",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "premium-english-style-living-room-with-fiftyfourms-furniture",
    "slug": "premium-english-style-living-room-with-fiftyfourms-furniture",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/91_Semiganovskiy_2_b97ce1299c.webp",
    "titleEn": "Premium English Style Living Room Bpluson Furniture",
    "titleVi": "Không gian phòng khách — Premium English Style Living Room Bpluson Furniture",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "Interior-of-the-relaxation-area-with-an-exclusive-Blossom-table",
    "slug": "Interior-of-the-relaxation-area-with-an-exclusive-Blossom-table",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/311d827e_4fb6_4036_b02d_a25acba0aaef_c7bb80a43d.webp",
    "titleEn": "Interior Relaxation Area Exclusive Blossom Table",
    "titleVi": "Không gian phòng khách — Interior Relaxation Area Exclusive Blossom Table",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "Designer-bedroom-in-deep-blue-tones-with-an-accent-bed",
    "slug": "Designer-bedroom-in-deep-blue-tones-with-an-accent-bed",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/cad773a3_9b7b_4aa1_b833_f684a45933bf_d938b71a31.webp",
    "titleEn": "Designer Bedroom Deep Blue Tones Accent Bed",
    "titleVi": "Không gian phòng ngủ — Designer Bedroom Deep Blue Tones Accent Bed",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "Premium-furniture-sophistication-and-comfort-from-B+ON",
    "slug": "Premium-furniture-sophistication-and-comfort-from-B+ON",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/72_Zhurbina_0e404208c3.webp",
    "titleEn": "Premium Furniture Sophistication Comfort Bpluson",
    "titleVi": "Không gian phòng khách — Premium Furniture Sophistication Comfort Bpluson",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "Elegant-Rotatus-armchairs-in-harmony-with-the-forest-landscape",
    "slug": "Elegant-Rotatus-armchairs-in-harmony-with-the-forest-landscape",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/78e65c06_8fb8_4518_8a8b_dc0d4df36e75_6a97501c54.webp",
    "titleEn": "Elegant Rotatus Armchairs Harmony Forest Landscape",
    "titleVi": "Không gian phòng khách — Elegant Rotatus Armchairs Harmony Forest Landscape",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "The-art-of-comfort-a-furniture-set-for-a-premium-living-room",
    "slug": "The-art-of-comfort-a-furniture-set-for-a-premium-living-room",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/81_Fadeeva_3c0d3b2e45.webp",
    "titleEn": "Art Comfort Furniture Set Premium Living Room",
    "titleVi": "Không gian phòng khách — Art Comfort Furniture Set Premium Living Room",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "A-cozy-seating-area-with-a-harmonious-Balance-bench",
    "slug": "A-cozy-seating-area-with-a-harmonious-Balance-bench",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/master_bedrom_005_Fadeeva_1_2_908342ceec.webp",
    "titleEn": "Cozy Seating Area Harmonious Balance Bench",
    "titleVi": "Không gian phòng khách — Cozy Seating Area Harmonious Balance Bench",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "luksovaya-mebel-dlya-kabineta-rukovoditelya-v-temnykh-tonah",
    "slug": "luksovaya-mebel-dlya-kabineta-rukovoditelya-v-temnykh-tonah",
    "category": "cabinet",
    "image": "https://cdn.fiftyfourms.com/24_3352a91b6c.webp",
    "titleEn": "Luksovaya Mebel Dlya Kabineta Rukovoditelya V Temnykh Tonah",
    "titleVi": "Không gian phòng làm việc — Luksovaya Mebel Dlya Kabineta Rukovoditelya V Temnykh Tonah",
    "descEn": "B+ON curated architectural composition for home office. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng làm việc thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "interier-svetloy-gostinoi-s-dizaynerskimi-zhurnalnymi-stolikami-ot-fiftyfourms",
    "slug": "interier-svetloy-gostinoi-s-dizaynerskimi-zhurnalnymi-stolikami-ot-fiftyfourms",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/Frame_599_7a95ae5857.webp",
    "titleEn": "Interier Svetloy Gostinoi S Dizaynerskimi Zhurnalnymi Stolikami Ot Bpluson",
    "titleVi": "Không gian phòng ăn — Interier Svetloy Gostinoi S Dizaynerskimi Zhurnalnymi Stolikami Ot Bpluson",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "uyutnii-interier-gostinoi-s-kreslami-i-stolikom-premium-klassa",
    "slug": "uyutnii-interier-gostinoi-s-kreslami-i-stolikom-premium-klassa",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/1_Post_Light_Mix_Interactive_vosstanovleno_72365175e2.webp",
    "titleEn": "Uyutnii Interier Gostinoi S Kreslami I Stolikom Premium Klassa",
    "titleVi": "Không gian phòng ăn — Uyutnii Interier Gostinoi S Kreslami I Stolikom Premium Klassa",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "spalnya-v-bezhevykh-tonah-s-krovatiyu-iz-veloura",
    "slug": "spalnya-v-bezhevykh-tonah-s-krovatiyu-iz-veloura",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/image_197_1_a5fc69b51a.webp",
    "titleEn": "Spalnya V Bezhevykh Tonah S Krovatiyu Iz Veloura",
    "titleVi": "Không gian phòng ngủ — Spalnya V Bezhevykh Tonah S Krovatiyu Iz Veloura",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "premium-sofa-with-leather-inserts-in-the-living-room",
    "slug": "premium-sofa-with-leather-inserts-in-the-living-room",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/Divan_002_1_1_e2d56dc7e2.webp",
    "titleEn": "Premium Sofa Leather Inserts Living Room",
    "titleVi": "Không gian phòng khách — Premium Sofa Leather Inserts Living Room",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "flower-shaped-bedside-table-in-a-luxury-bedroom",
    "slug": "flower-shaped-bedside-table-in-a-luxury-bedroom",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/Finalcubo11_cc5e3ff771.webp",
    "titleEn": "Flower Shaped Bedside Table Luxury Bedroom",
    "titleVi": "Không gian phòng ngủ — Flower Shaped Bedside Table Luxury Bedroom",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "tualetnii-stolik-dlya-makiyazha-s-assimetrichnim-zerkalom",
    "slug": "tualetnii-stolik-dlya-makiyazha-s-assimetrichnim-zerkalom",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/Lumen_Glow_1_9da75e731e.webp",
    "titleEn": "Tualetnii Stolik Dlya Makiyazha S Assimetrichnim Zerkalom",
    "titleVi": "Không gian phòng ăn — Tualetnii Stolik Dlya Makiyazha S Assimetrichnim Zerkalom",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "uyutnaya-gostinaya-s-dizaynerskim-modulnym-divanom-premium-klassa",
    "slug": "uyutnaya-gostinaya-s-dizaynerskim-modulnym-divanom-premium-klassa",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/Frame_596_605f79adb2.webp",
    "titleEn": "Uyutnaya Gostinaya S Dizaynerskim Modulnym Divanom Premium Klassa",
    "titleVi": "Không gian phòng khách — Uyutnaya Gostinaya S Dizaynerskim Modulnym Divanom Premium Klassa",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "zona-s-tualetnym-stolikom-klassa-lux-ot-B+ON",
    "slug": "zona-s-tualetnym-stolikom-klassa-lux-ot-B+ON",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/Coppelius_4_1_692b6d2501.webp",
    "titleEn": "Zona S Tualetnym Stolikom Klassa Lux Ot Bpluson",
    "titleVi": "Không gian phòng ăn — Zona S Tualetnym Stolikom Klassa Lux Ot Bpluson",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "elitnaya-krovat-s-balkami-v-vide-kuba",
    "slug": "elitnaya-krovat-s-balkami-v-vide-kuba",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/74_Malyavko_1_acb73df08d.webp",
    "titleEn": "Elitnaya Krovat S Balkami V Vide Kuba",
    "titleVi": "Không gian phòng ngủ — Elitnaya Krovat S Balkami V Vide Kuba",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "obedennaya-zona-s-dizaynerskoi-mebeliyu-klassa-luxe",
    "slug": "obedennaya-zona-s-dizaynerskoi-mebeliyu-klassa-luxe",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/11_Malyavko_1_5bbf5e0455.webp",
    "titleEn": "Obedennaya Zona S Dizaynerskoi Mebeliyu Klassa Luxe",
    "titleVi": "Không gian phòng ăn — Obedennaya Zona S Dizaynerskoi Mebeliyu Klassa Luxe",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "bolshaya-roskoshnaya-spalnya-s-dizaynerskoi-krovatiyu",
    "slug": "bolshaya-roskoshnaya-spalnya-s-dizaynerskoi-krovatiyu",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/562_2_9_Master_Bedroom_001_No_Logo_Savin_1_5515a9a435.webp",
    "titleEn": "Bolshaya Roskoshnaya Spalnya S Dizaynerskoi Krovatiyu",
    "titleVi": "Không gian phòng ngủ — Bolshaya Roskoshnaya Spalnya S Dizaynerskoi Krovatiyu",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "interior-gostinoy-v-tropicheskom-stile",
    "slug": "interior-gostinoy-v-tropicheskom-stile",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/IMG_9826_90d673ba5c.webp",
    "titleEn": "Interior Gostinoy V Tropicheskom Stile",
    "titleVi": "Không gian phòng khách — Interior Gostinoy V Tropicheskom Stile",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "gostinaya-v-temhykh-tonah-s-divanom-ambitus",
    "slug": "gostinaya-v-temhykh-tonah-s-divanom-ambitus",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/IMG_9822_18cd0b9341.webp",
    "titleEn": "Gostinaya V Temhykh Tonah S Divanom Ambitus",
    "titleVi": "Không gian phòng khách — Gostinaya V Temhykh Tonah S Divanom Ambitus",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "tualetny-stolik-premium-klassa-s-zerkalom-i-lakonichnym-pufom",
    "slug": "tualetny-stolik-premium-klassa-s-zerkalom-i-lakonichnym-pufom",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/IMG_9823_38daee59c4.webp",
    "titleEn": "Tualetny Stolik Premium Klassa S Zerkalom I Lakonichnym Pufom",
    "titleVi": "Không gian phòng ăn — Tualetny Stolik Premium Klassa S Zerkalom I Lakonichnym Pufom",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "premium-sofa-for-a-luxurious-view-living-room",
    "slug": "premium-sofa-for-a-luxurious-view-living-room",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/IMG_9824_010a197067.webp",
    "titleEn": "Premium Sofa Luxurious View Living Room",
    "titleVi": "Không gian phòng khách — Premium Sofa Luxurious View Living Room",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "designer-mirror-with-backlight-for-hallway",
    "slug": "designer-mirror-with-backlight-for-hallway",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/IMG_9825_730c0ad81e.webp",
    "titleEn": "Designer Mirror Backlight Hallway",
    "titleVi": "Không gian phòng khách — Designer Mirror Backlight Hallway",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "mebel-premium-klassa-dlya-gostinoi-roskosh-v-kazhdoi-detali",
    "slug": "mebel-premium-klassa-dlya-gostinoi-roskosh-v-kazhdoi-detali",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/Store_bedroom_2_002_1_e0dfe3854a.webp",
    "titleEn": "Mebel Premium Klassa Dlya Gostinoi Roskosh V Kazhdoi Detali",
    "titleVi": "Không gian phòng khách — Mebel Premium Klassa Dlya Gostinoi Roskosh V Kazhdoi Detali",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "design-spalni-v-svetlykh-tonah-s-luksovoy-mebeliu",
    "slug": "design-spalni-v-svetlykh-tonah-s-luksovoy-mebeliu",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/87_88_002_Fadeeva_2_74551e2fed.webp",
    "titleEn": "Design Spalni V Svetlykh Tonah S Luksovoy Mebeliu",
    "titleVi": "Không gian phòng ngủ — Design Spalni V Svetlykh Tonah S Luksovoy Mebeliu",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "designer-sofa-with-coffee-tables-for-living-room",
    "slug": "designer-sofa-with-coffee-tables-for-living-room",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/537_1_02_1_03_Hall_003_zamena_no_logo_191814039a.webp",
    "titleEn": "Designer Sofa Coffee Tables Living Room",
    "titleVi": "Không gian phòng khách — Designer Sofa Coffee Tables Living Room",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "designer-dining-table-with-velour-and-leather-chairs",
    "slug": "designer-dining-table-with-velour-and-leather-chairs",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/22_Malyavko_77d5a06b98.webp",
    "titleEn": "Designer Dining Table Velour Leather Chairs",
    "titleVi": "Không gian phòng ăn — Designer Dining Table Velour Leather Chairs",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "deluxe-velour-bed-with-bedsidet-table-and-banquette",
    "slug": "deluxe-velour-bed-with-bedsidet-table-and-banquette",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/30_Subbotin_386663e58c.webp",
    "titleEn": "Deluxe Velour Bed Bedsidet Table Banquette",
    "titleVi": "Không gian phòng ngủ — Deluxe Velour Bed Bedsidet Table Banquette",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "luxury-dressing-table-with-soft-velour-pouf",
    "slug": "luxury-dressing-table-with-soft-velour-pouf",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/68_Fadeeva_1_8004c2b8b8.webp",
    "titleEn": "Luxury Dressing Table Soft Velour Pouf",
    "titleVi": "Không gian phòng ngủ — Luxury Dressing Table Soft Velour Pouf",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "premium-dining-table-in-precious-veneer",
    "slug": "premium-dining-table-in-precious-veneer",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/9_Komarov_9477522dcd.webp",
    "titleEn": "Premium Dining Table Precious Veneer",
    "titleVi": "Không gian phòng ăn — Premium Dining Table Precious Veneer",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "statement-bed-in-the-interior-of-luxury-bedroom",
    "slug": "statement-bed-in-the-interior-of-luxury-bedroom",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/6_Zhurbina_c00145815f.webp",
    "titleEn": "Statement Bed Interior Luxury Bedroom",
    "titleVi": "Không gian phòng ngủ — Statement Bed Interior Luxury Bedroom",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "cozy-lounge-zone-with-exclusive-coffee-tables-Elemento",
    "slug": "cozy-lounge-zone-with-exclusive-coffee-tables-Elemento",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/Bez_imeni_26_1_491c1c7900.webp",
    "titleEn": "Cozy Lounge Zone Exclusive Coffee Tables Elemento",
    "titleVi": "Không gian phòng khách — Cozy Lounge Zone Exclusive Coffee Tables Elemento",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "dressing-room-with-elegant-boucle-daybed",
    "slug": "dressing-room-with-elegant-boucle-daybed",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/54_Fadeeva_2_d7971b6acf.webp",
    "titleEn": "Dressing Room Elegant Boucle Daybed",
    "titleVi": "Không gian phòng ngủ — Dressing Room Elegant Boucle Daybed",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "living-room-with-premium-furniture",
    "slug": "living-room-with-premium-furniture",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/23345450_1_9932e5bebc.webp",
    "titleEn": "Living Room Premium Furniture",
    "titleVi": "Không gian phòng khách — Living Room Premium Furniture",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "luxury-bed-with-designer-headboard",
    "slug": "luxury-bed-with-designer-headboard",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/tehnicheskoe_zadanie_22_kopiya_bb87bfb694.webp",
    "titleEn": "Luxury Bed Designer Headboard",
    "titleVi": "Không gian phòng ngủ — Luxury Bed Designer Headboard",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "premium-furniture-for-the-office-interior",
    "slug": "premium-furniture-for-the-office-interior",
    "category": "cabinet",
    "image": "https://cdn.fiftyfourms.com/78_Komarov_versiya_2_cdd170a3f3.webp",
    "titleEn": "Premium Furniture Office Interior",
    "titleVi": "Không gian phòng làm việc — Premium Furniture Office Interior",
    "descEn": "B+ON curated architectural composition for home office. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng làm việc thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "premium-sideboard-and-mirror-made-of-italian-materials",
    "slug": "premium-sideboard-and-mirror-made-of-italian-materials",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/Istra_Fadeeva_2_46754a2f3e.webp",
    "titleEn": "Premium Sideboard Mirror Made Italian Materials",
    "titleVi": "Không gian phòng khách — Premium Sideboard Mirror Made Italian Materials",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "cozy-bedroom-with-high-designer-luxury-bed",
    "slug": "cozy-bedroom-with-high-designer-luxury-bed",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/75_Khizhnyak_cf0f464b43.webp",
    "titleEn": "Cozy Bedroom High Designer Luxury Bed",
    "titleVi": "Không gian phòng ngủ — Cozy Bedroom High Designer Luxury Bed",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "premium-dining-room-furniture-set",
    "slug": "premium-dining-room-furniture-set",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/79_Malyavko_93e23883d2.webp",
    "titleEn": "Premium Dining Room Furniture Set",
    "titleVi": "Không gian phòng ăn — Premium Dining Room Furniture Set",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "spacious-living-room-in-dark-colors",
    "slug": "spacious-living-room-in-dark-colors",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/71_Subbotin_dd94ceed26.webp",
    "titleEn": "Spacious Living Room Dark Colors",
    "titleVi": "Không gian phòng khách — Spacious Living Room Dark Colors",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "luxe-dressing-table-artistry-for-a-bedroom",
    "slug": "luxe-dressing-table-artistry-for-a-bedroom",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/Store_bedroom_1_002_c517c5e58c.webp",
    "titleEn": "Luxe Dressing Table Artistry Bedroom",
    "titleVi": "Không gian phòng ngủ — Luxe Dressing Table Artistry Bedroom",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "premium-interior-furniture-in-pastel-colors",
    "slug": "premium-interior-furniture-in-pastel-colors",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/tehnicheskoe_zadanie_33_fb0d7ad296.webp",
    "titleEn": "Premium Interior Furniture Pastel Colors",
    "titleVi": "Không gian phòng khách — Premium Interior Furniture Pastel Colors",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "elite-office-desk-for-CEO",
    "slug": "elite-office-desk-for-CEO",
    "category": "cabinet",
    "image": "https://cdn.fiftyfourms.com/TZ_kristina_5_kopiya_05697f03a5.webp",
    "titleEn": "Elite Office Desk Ceo",
    "titleVi": "Không gian phòng làm việc — Elite Office Desk Ceo",
    "descEn": "B+ON curated architectural composition for home office. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng làm việc thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "premium-modular-sofa-in-the-apartments-interior",
    "slug": "premium-modular-sofa-in-the-apartments-interior",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/3_4_32aa28c4ce.webp",
    "titleEn": "Premium Modular Sofa Apartments Interior",
    "titleVi": "Không gian phòng khách — Premium Modular Sofa Apartments Interior",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "elite-sue-sideboard-in-the-interior",
    "slug": "elite-sue-sideboard-in-the-interior",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/87_88_001_Fadeeva_7a672ceb6c.webp",
    "titleEn": "Elite Sue Sideboard Interior",
    "titleVi": "Không gian phòng khách — Elite Sue Sideboard Interior",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "designer-dining-room-with-elite-dining-table-Fusion",
    "slug": "designer-dining-room-with-elite-dining-table-Fusion",
    "category": "dining-room",
    "image": "https://cdn.fiftyfourms.com/FF_Kiev_003_no_logo_Vorozhishcheva_1_c5b52d0717.webp",
    "titleEn": "Designer Dining Room Elite Dining Table Fusion",
    "titleVi": "Không gian phòng ăn — Designer Dining Room Elite Dining Table Fusion",
    "descEn": "B+ON curated architectural composition for dining room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ăn thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "modern-luxury-stylish-bed-with-a-voluminous-headboard",
    "slug": "modern-luxury-stylish-bed-with-a-voluminous-headboard",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/tehnicheskoe_zadanie_25_kopiya_b4dae286e9.webp",
    "titleEn": "Modern Luxury Stylish Bed Voluminous Headboard",
    "titleVi": "Không gian phòng ngủ — Modern Luxury Stylish Bed Voluminous Headboard",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "designer-living-room-with-luxury-furniture",
    "slug": "designer-living-room-with-luxury-furniture",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/Fiftyfourms_001_no_logo_1_4f975a2a54.webp",
    "titleEn": "Designer Living Room Luxury Furniture",
    "titleVi": "Không gian phòng khách — Designer Living Room Luxury Furniture",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  },
  {
    "id": "luxury-leather-and-boucle-interior-chairs",
    "slug": "luxury-leather-and-boucle-interior-chairs",
    "category": "living-room",
    "image": "https://cdn.fiftyfourms.com/tehnicheskoe_zadanie_29_78559c7afc.webp",
    "titleEn": "Luxury Leather Boucle Interior Chairs",
    "titleVi": "Không gian phòng khách — Luxury Leather Boucle Interior Chairs",
    "descEn": "B+ON curated architectural composition for living room. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng khách thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ]
  },
  {
    "id": "set-of-furniture-for-a-luxurious-bedroom-in-pastel-colors",
    "slug": "set-of-furniture-for-a-luxurious-bedroom-in-pastel-colors",
    "category": "bedroom",
    "image": "https://cdn.fiftyfourms.com/514_23_Bedroom_001_No_Logo_Komarov_32b82928b7.webp",
    "titleEn": "Set Furniture Luxurious Bedroom Pastel Colors",
    "titleVi": "Không gian phòng ngủ — Set Furniture Luxurious Bedroom Pastel Colors",
    "descEn": "B+ON curated architectural composition for bedroom. Featuring signature handcrafted bespoke furniture in rare timbers, Tuscan leather, and brushed metals.",
    "descVi": "Không gian phòng ngủ thiết kế theo phong cách B+ON. Điểm nhấn là các tuyệt tác đồ rời thủ công từ gỗ quý, da bò Ý nguyên tấm và kim loại chải satin.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair",
      "Ambitus Modular Sofa"
    ]
  }
];
