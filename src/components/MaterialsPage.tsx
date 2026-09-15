import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Box,
  X,
  ChevronRight,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/furnitureData';

interface MaterialsPageProps {
  currentLanguage: 'VI' | 'EN';
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  onOpenConsultation?: () => void;
  onNavigatePage?: (page: string) => void;
  onOpenCatalogDownload?: () => void;
}

export interface MaterialCategoryItem {
  id: string;
  slug: string;
  nameEn: string;
  nameVi: string;
  taglineEn: string;
  taglineVi: string;
  descEn: string;
  descVi: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  originEn: string;
  originVi: string;
  compositionEn: string;
  compositionVi: string;
  durabilityEn: string;
  durabilityVi: string;
  tactileEn: string;
  tactileVi: string;
  swatches: {
    nameEn: string;
    nameVi: string;
    hex: string;
    code: string;
  }[];
  compatibleProducts: string[];
}

export const BON_MATERIALS: MaterialCategoryItem[] = [
  {
    id: 'mat-leather',
    slug: 'leather',
    nameEn: 'Leather',
    nameVi: 'Da Tự Nhiên',
    taglineEn: '100% full-grain Italian leather in whole hides',
    taglineVi: '100% da bò tự nhiên nguyên tấm nhập khẩu Ý',
    descEn:
      'We work with genuine leather in full hides, preserving the natural beauty of the material and achieving a flawless tailored fit on the furniture. This leather features a delicate grain texture and retains its pristine look throughout years of use.',
    descVi:
      'Chúng tôi làm việc với da bò tự nhiên nguyên tấm, giữ trọn vẹn vẻ đẹp nguyên bản và đảm bảo phom dáng ôm khít hoàn mỹ trên từng sản phẩm. Chất da mềm mịn, thoáng khí tự nhiên và giữ được vẻ sang trọng theo thời gian.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_Kozha_26b8a56804.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_kozha_2c5e390173.webp',
    alt: 'Leather material sample',
    originEn: 'Santa Croce sull’Arno, Tuscany, Italy',
    originVi: 'Vùng thuộc da Tuscany, Ý',
    compositionEn: '100% Genuine Full-Grain Bullhide',
    compositionVi: '100% Da bò đực tự nhiên thượng hạng',
    durabilityEn: 'Natural patina aging, scratch resistant semi-aniline finish',
    durabilityVi: 'Càng dùng càng mềm bóng, phủ bảo vệ semi-aniline chống trầy',
    tactileEn: 'Supple, warm to the touch, delicate micro-grain',
    tactileVi: 'Mềm mướt, ấm áp khi chạm vào, vân hạt mịn màng',
    swatches: [
      { nameEn: 'Nero Black', nameVi: 'Đen Nero', hex: '#1c1c1c', code: 'LEA-01' },
      { nameEn: 'Vintage Cognac', nameVi: 'Nâu Rượu Cognac', hex: '#6e3e1e', code: 'LEA-02' },
      { nameEn: 'Crema Sand', nameVi: 'Cát Trắng Crema', hex: '#d6cbba', code: 'LEA-03' },
      { nameEn: 'Cioccolato', nameVi: 'Nâu Sô-cô-la', hex: '#3d261d', code: 'LEA-04' },
      { nameEn: 'Taupe Muted', nameVi: 'Xám Khói Taupe', hex: '#776d64', code: 'LEA-05' },
    ],
    compatibleProducts: ['Vida Linea Bed', 'Eden Modular Sofa (370x290)', 'Metis Lounge Chairs'],
  },
  {
    id: 'mat-gozhka',
    slug: 'gozhka',
    nameEn: 'Matting',
    nameVi: 'Vải Rogozhka',
    taglineEn: 'Dense architectural basket weave with structural resilience',
    taglineVi: 'Dệt đan thô chữ thập bền bỉ, chuẩn phom kiến trúc',
    descEn:
      'Rogozhka (matting) is celebrated for its distinctive basket weave and exceptional durability. The fabric holds its shape reliably, resists stretching, and creates a cozy atmosphere of understated European luxury.',
    descVi:
      'Vải dệt thô Rogozhka nổi tiếng với cấu trúc dệt đan chữ thập chắc chắn và độ bền vượt trội. Bề mặt vải giữ phom dáng chuẩn xác, chống bai dão và mang đến cảm giác mộc mạc mà đẳng cấp.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_Rogozhka_2184c5a45b.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_rogozhka_61a912ae42.webp',
    alt: 'Gunny / tweed material sample',
    originEn: 'Flanders, Belgium & Lombardy, Italy',
    originVi: 'Vùng Flanders, Bỉ & Lombardy, Ý',
    compositionEn: '80% Polyester, 15% Cotton, 5% Linen',
    compositionVi: '80% Polyester, 15% Cotton, 5% Lanh tự nhiên',
    durabilityEn: '65 000 Martindale rub cycles',
    durabilityVi: '65.000 chu kỳ mài mòn Martindale',
    tactileEn: 'Textured structural relief, dry crisp touch',
    tactileVi: 'Vân sợi dệt nổi, cảm giác chạm khô thoáng tự nhiên',
    swatches: [
      { nameEn: 'Oatmeal Natural', nameVi: 'Yến Mạch Mộc', hex: '#d7cebf', code: 'ROG-01' },
      { nameEn: 'Graphite Weave', nameVi: 'Graphite Đan Sợi', hex: '#444444', code: 'ROG-02' },
      { nameEn: 'Sand Dune', nameVi: 'Cát Sa Mạc', hex: '#c0b19b', code: 'ROG-03' },
      { nameEn: 'Slate Blue', nameVi: 'Xanh Xám Slate', hex: '#58626c', code: 'ROG-04' },
    ],
    compatibleProducts: ['Lares Modular Sofa', 'Virgola Curved Sofa'],
  },
  {
    id: 'mat-chenille',
    slug: 'chenille',
    nameEn: 'Chenille',
    nameVi: 'Vải Chenille',
    taglineEn: 'Plush tufted yarn with subtle iridescent luster',
    taglineVi: 'Sợi tơ êm mượt với hiệu ứng ánh nhung mờ tinh tế',
    descEn:
      'Chenille blends the luxurious plushness of tufted yarn with remarkable durability. Its velvety textured surface and subtle iridescent sheen add depth, volume, and comforting warmth to upholstered pieces.',
    descVi:
      'Vải dệt Chenille kết hợp hoàn hảo giữa độ êm mịn của sợi lông tơ và khả năng chịu mài mòn cao. Hiệu ứng ánh nhung mờ tinh tế giúp tạo chiều sâu thị giác và cảm giác êm ái tuyệt đối.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_shenill_67360c91e1.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_shenill_b18f436cc5.webp',
    alt: 'Chenille material sample',
    originEn: 'Biella Textile Atelier, Italy',
    originVi: 'Xưởng dệt Biella, Ý',
    compositionEn: '55% Acrylic, 45% Polyester Chenille Yarn',
    compositionVi: '55% Acrylic, 45% Polyester sợi Chenille dệt kim',
    durabilityEn: '80 000 Martindale rub cycles',
    durabilityVi: '80.000 chu kỳ mài mòn Martindale',
    tactileEn: 'Velvety soft, plush volume, warm tactile envelope',
    tactileVi: 'Mềm như nhung, độ bồng bềnh dày dặn, ấm cúng',
    swatches: [
      { nameEn: 'Champagne Silk', nameVi: 'Sâm-panh Tơ Lụa', hex: '#ddd4c3', code: 'CHE-01' },
      { nameEn: 'Warm Truffle', nameVi: 'Nấm Truffle Ấm', hex: '#877a6f', code: 'CHE-02' },
      { nameEn: 'Forest Moss', nameVi: 'Rêu Rừng Sâu', hex: '#485545', code: 'CHE-03' },
      { nameEn: 'Midnight Shadow', nameVi: 'Bóng Đêm Midnight', hex: '#222938', code: 'CHE-04' },
    ],
    compatibleProducts: ['Virgola Curved Sofa', 'Zephyrus Armchair'],
  },
  {
    id: 'mat-velours',
    slug: 'velours',
    nameEn: 'Velours',
    nameVi: 'Nhung Velours',
    taglineEn: 'Aristocratic deep pile and poetic play of light & shadow',
    taglineVi: 'Tuyết nhung dày mượt, bắt sáng sống động theo góc nhìn',
    descEn:
      'Velours features a dense, silky pile and a rich interplay of light and shadow. Tactilely irresistible, practical to maintain, it infuses the interior with an expressive aristocratic presence.',
    descVi:
      'Nhung Velours sở hữu lớp tuyết dày mượt mà và hiệu ứng bắt sáng sống động theo từng góc nhìn. Chất liệu quý phái, êm ái khi tiếp xúc và mang đậm tinh thần thẩm mỹ vương giả.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_velyur_55a3306299.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_velyur_ce9f40e596.webp',
    alt: 'Velour material sample',
    originEn: 'Como & Milan, Italy',
    originVi: 'Vùng Como & Milan, Ý',
    compositionEn: '100% Micro-PES Velvet with Teflon repellant',
    compositionVi: '100% Micro-PES kháng nước công nghệ Teflon',
    durabilityEn: '100 000 Martindale rub cycles',
    durabilityVi: '100.000 chu kỳ mài mòn Martindale',
    tactileEn: 'Deep plush velvet, silky direction-shifting pile',
    tactileVi: 'Lớp nhung dày mịn màng, đổi sắc óng ả theo chiều vuốt',
    swatches: [
      { nameEn: 'Imperial Emerald', nameVi: 'Ngọc Lục Bảo', hex: '#1b382b', code: 'VEL-01' },
      { nameEn: 'Silver Mist', nameVi: 'Bạc Khói Mờ', hex: '#a6abb4', code: 'VEL-02' },
      { nameEn: 'Burgundy Crimson', nameVi: 'Đỏ Rượu Vang', hex: '#521f28', code: 'VEL-03' },
      { nameEn: 'Deep Obsidian', nameVi: 'Đen Obsidian', hex: '#161719', code: 'VEL-04' },
    ],
    compatibleProducts: ['Zephyrus Armchair', 'Lares Modular Sofa', 'Metis Lounge Chairs'],
  },
  {
    id: 'mat-boucle',
    slug: 'boucle',
    nameEn: 'Bouclé',
    nameVi: 'Vải Nỉ Bouclé',
    taglineEn: 'Tactile high-loft looped texture, architectural cloud comfort',
    taglineVi: 'Sợi hạt nổi bồng bềnh tự nhiên, xu hướng nội thất thế giới',
    descEn:
      'The defining hallmark of bouclé is its lively, textural organic surface. It enriches sculptural silhouettes, making furniture intriguing from every perspective. The high-loft looped texture hides minor everyday traces, perfectly combining high fashion and effortless living.',
    descVi:
      'Đặc trưng nổi bật của vải Bouclé là bề mặt hạt nổi sống động và tự nhiên. Chất liệu tôn vinh các đường cong điêu khắc của nội thất, đem lại sự êm ái như mây và khả năng che giấu nếp gấp hoàn hảo.',
    desktopSrc: 'https://media.fiftyfourms.com/BUKLE_1_7ff219b2e6.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_bukle_4de72b7a97.webp',
    alt: 'Boucle material sample',
    originEn: 'Biella, Piedmont, Italy',
    originVi: 'Vùng Biella, Piedmont, Ý',
    compositionEn: '65% Virgin Merino Wool, 35% Cotton loops',
    compositionVi: '65% Len cừu Merino nguyên chất, 35% Sợi bông hạt',
    durabilityEn: '90 000 Martindale rub cycles',
    durabilityVi: '90.000 chu kỳ mài mòn Martindale',
    tactileEn: 'Curled 3D cloud-like loops, cozy and breathable',
    tactileVi: 'Hạt xoắn 3D bồng bềnh, êm ái tựa mây trời',
    swatches: [
      { nameEn: 'Ivory Cloud', nameVi: 'Mây Trắng Ngà', hex: '#ede9e1', code: 'BOU-01' },
      { nameEn: 'Warm Sand', nameVi: 'Cát Ấm Tự Nhiên', hex: '#d4cbbe', code: 'BOU-02' },
      { nameEn: 'Pebble Gray', nameVi: 'Xám Đá Cuội', hex: '#a49f97', code: 'BOU-03' },
      { nameEn: 'Camel Dune', nameVi: 'Lạc Đà Camel', hex: '#b5926c', code: 'BOU-04' },
    ],
    compatibleProducts: ['Lares Modular Sofa', 'Virgola Curved Sofa', 'Zephyrus Armchair'],
  },
  {
    id: 'mat-suede',
    slug: 'suede',
    nameEn: 'Suede',
    nameVi: 'Da Lộn Suede',
    taglineEn: 'Velvety buffed nap with expressive shaded writing effect',
    taglineVi: 'Bề mặt tuyết tơ mịn màng, hiệu ứng đổi màu theo nét vuốt',
    descEn:
      'Genuine suede offers a delicate velvety nap with an exquisite writing effect. It delivers unparalleled tactile warmth, breathes naturally, and provides an extraordinary sense of bespoke comfort.',
    descVi:
      'Da lộn tự nhiên mang bề mặt tuyết mịn như nhung với hiệu ứng đổi sắc khi vuốt nhẹ. Chất da thoáng khí, giữ nhiệt tốt và đem lại trải nghiệm tiếp xúc êm ái bậc nhất.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_zamsha_fe2286dc29.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_zamsha_cb76f34052.webp',
    alt: 'Suede material sample',
    originEn: 'Vicenza Leather District, Italy',
    originVi: 'Khu vực Vicenza, Ý',
    compositionEn: 'Buffed Top-Grain Calfskin Suede',
    compositionVi: 'Da bê tự nhiên mài tuyết cao cấp',
    durabilityEn: 'Hydrophobic Scotchgard fluoropolymer treatment',
    durabilityVi: 'Xử lý kháng nước và chống bám bẩn Scotchgard',
    tactileEn: 'Peach-skin softness, delicate writing brush effect',
    tactileVi: 'Mịn như vỏ quả đào, chuyển màu sáng tối theo chiều vuốt',
    swatches: [
      { nameEn: 'Cashmere Taupe', nameVi: 'Taupe Lông Dê', hex: '#877c72', code: 'SUE-01' },
      { nameEn: 'Dark Espresso', nameVi: 'Cà Phê Espresso', hex: '#3d2e26', code: 'SUE-02' },
      { nameEn: 'Warm Amber', nameVi: 'Hổ Phách Ánh Đồng', hex: '#99633e', code: 'SUE-03' },
      { nameEn: 'Ash Charcoal', nameVi: 'Than Tro Khói', hex: '#5c5b5a', code: 'SUE-04' },
    ],
    compatibleProducts: ['Vida Linea Bed', 'Eden Modular Sofa (370x290)'],
  },
  {
    id: 'mat-eco-leather',
    slug: 'eco-leather',
    nameEn: 'Eco-Leather',
    nameVi: 'Da Sinh Thái',
    taglineEn: 'Microporous breathable polyurethane with extreme wear resilience',
    taglineVi: 'Cấu trúc vi lỗ thoáng khí, kháng ẩm mốc và siêu bền màu',
    descEn:
      'Next-generation luxury eco-leather featuring a breathable microporous matrix. Hypoallergenic, exceptionally abrasion and fade resistant, it is easy to care for and retains supple elasticity for decades.',
    descVi:
      'Da sinh thái cao cấp với cấu trúc vi lỗ thoáng khí thế hệ mới. Kháng khuẩn, không mùi, chống nứt nẻ và chống bám bẩn ưu việt, thân thiện với môi trường và bền bỉ.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_ekokozha_5b5d230cd4.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_ekokozha_0ecc9befcc.webp',
    alt: 'Eco-leather material sample',
    originEn: 'Bavaria, Germany & Italy',
    originVi: 'Bavaria, Đức & Ý',
    compositionEn: 'High-Density Microfiber Base & PU Surface',
    compositionVi: 'Lõi sợi Microfiber mật độ cao phủ PU sinh thái',
    durabilityEn: '120 000 Martindale rub cycles, UV & stain immune',
    durabilityVi: '120.000 chu kỳ mài mòn, chống tia UV và chống ố',
    tactileEn: 'Smooth satin finish, supple leather grain feel',
    tactileVi: 'Mịn màng mờ satin, độ đàn hồi như da thật',
    swatches: [
      { nameEn: 'Pure Chalk', nameVi: 'Phấn Trắng Mờ', hex: '#e9e8e4', code: 'ECO-01' },
      { nameEn: 'Mocha Mousse', nameVi: 'Mousse Mocha', hex: '#5f4f46', code: 'ECO-02' },
      { nameEn: 'Graphite Stealth', nameVi: 'Graphite Nhám', hex: '#2e2f32', code: 'ECO-03' },
      { nameEn: 'Rich Tobacco', nameVi: 'Nâu Thuốc Lá', hex: '#543c2f', code: 'ECO-04' },
    ],
    compatibleProducts: ['Estro Armchair', 'Horizon Credenza'],
  },
  {
    id: 'mat-enamel',
    slug: 'enamel',
    nameEn: 'Enamel',
    nameVi: 'Sơn Mài Enamel',
    taglineEn: 'Flawless 7-layer Italian lacquering with intermediate polishing',
    taglineVi: 'Sơn mài men sứ Ý 7 lớp, bề mặt mịn màng không tì vết',
    descEn:
      'Multi-layered Italian enamel lacquering with intermediate hand-sanding between each coat. Ensures glass-smooth surfaces, robust protection against moisture and UV, with deep satin-matte or piano-gloss depth.',
    descVi:
      'Lớp phủ sơn mài men sứ Ý nhiều lớp với công đoạn mài thủ công khắt khe giữa từng lớp sơn. Tạo nên bề mặt mịn màng như gương, chống ẩm, chống ố vàng và mang lại độ bóng sâu thẳm.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_emal_17650d9474.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_emal_29aa08ebbe.webp',
    alt: 'Italian enamel material sample',
    originEn: 'Pesaro & Brianza, Italy',
    originVi: 'Vùng Pesaro & Brianza, Ý',
    compositionEn: '7-Layer Polyurethane Enamel with Anti-Scratch Finish',
    compositionVi: 'Sơn men PU 7 lớp phủ bóng nano chống xước',
    durabilityEn: 'Impermeable to moisture, UV non-yellowing',
    durabilityVi: 'Chống ẩm tuyệt đối, chống ố vàng bởi tia UV',
    tactileEn: 'Silk-smooth ceramic touch, deep light absorption',
    tactileVi: 'Mát lạnh như gốm sứ men, độ lì sâu tinh tế',
    swatches: [
      { nameEn: 'Satin Alabaster', nameVi: 'Trắng Sứ Alabaster', hex: '#f0ece5', code: 'ENM-01' },
      { nameEn: 'Deep Bronze Pearl', nameVi: 'Đồng Ánh Ngọc Trai', hex: '#3f3731', code: 'ENM-02' },
      { nameEn: 'Piano Jet Black', nameVi: 'Đen Piano Bóng Gương', hex: '#101012', code: 'ENM-03' },
      { nameEn: 'Cashmere Grey', nameVi: 'Xám Lông Cashmere', hex: '#938e87', code: 'ENM-04' },
    ],
    compatibleProducts: ['Onda TV Stand', 'Woodwell Coffee Table', 'Horizon Credenza'],
  },
  {
    id: 'mat-veneer',
    slug: 'veneer',
    nameEn: 'Veneer',
    nameVi: 'Gỗ Lạng Veneer Quý',
    taglineEn: 'One-of-a-kind organic grain figures of the rarest timbers',
    taglineVi: 'Độc bản vân gỗ quý tự nhiên: Óc chó nu, bạch đàn hun khói, mun sọc',
    descEn:
      'Unlike monolithic uniform surfaces, natural wood veneer preserves the organic wonder of living timber. No two grain figures can ever be identical, transforming each furniture piece into a one-of-a-kind art object.',
    descVi:
      'Khác với các vật liệu công nghiệp, veneer gỗ quý tự nhiên lưu giữ vân gỗ độc bản của thiên nhiên. Những đường vân cuộn sóng và nu mắt gỗ không thể lặp lại, biến mỗi tác phẩm thành một phiên bản giới hạn.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_shpon_d381e10fca.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_shpon_0e08c6ba39.webp',
    alt: 'Natural veneer material sample',
    originEn: 'Bavaria (Germany), Spain & Indonesia',
    originVi: 'Bavaria (Đức), Tây Ban Nha & Indonesia',
    compositionEn: '0.6 mm Radial & Burl Cut Natural Timber Veneer',
    compositionVi: 'Veneer gỗ tự nhiên lạng 0.6mm vân nu và vân sọc',
    durabilityEn: 'Hand-rubbed Italian organic oils & polyurethane sealant',
    durabilityVi: 'Dưỡng dầu hữu cơ Ý chải tay và phủ bảo vệ chống cong vênh',
    tactileEn: 'Silky open-pore grain, organic warmth of live timber',
    tactileVi: 'Vân gỗ mở mộc mạc, chạm vào cảm nhận sự ấm áp của gỗ sống',
    swatches: [
      { nameEn: 'Burled Walnut Root', nameVi: 'Gỗ Óc Chó Nu Chun', hex: '#4a3525', code: 'VEN-01' },
      { nameEn: 'Smoked Eucalyptus', nameVi: 'Bạch Đàn Hun Khói', hex: '#3b3735', code: 'VEN-02' },
      { nameEn: 'Macassar Ebony', nameVi: 'Mun Sọc Macassar', hex: '#251b14', code: 'VEN-03' },
      { nameEn: 'Bleached Oak', nameVi: 'Sồi Trắng Bắc Âu', hex: '#ad9b84', code: 'VEN-04' },
    ],
    compatibleProducts: ['Astor Dining Table', 'Sinfonia Bedside Table', 'Woodsmoke TV Unit'],
  },
  {
    id: 'mat-stone',
    slug: 'stone',
    nameEn: 'Quartz & Stone',
    nameVi: 'Đá Thạch Anh & Cẩm Thạch',
    taglineEn: 'Sculptural monumentality immune to scratches, heat and stains',
    taglineVi: 'Vẻ đẹp điêu khắc kỳ vĩ, chống trầy xước và chống thấm ố vĩnh viễn',
    descEn:
      'Quartz agglomerate and natural Italian marbles merge sculptural monumentality with uncompromising resilience. Non-porous and diamond-polished, they resist stains, scratching, and heat effortlessly.',
    descVi:
      'Đá thạch anh nhân tạo và đá cẩm thạch tự nhiên nguyên khối kết hợp giữa vẻ đẹp điêu khắc tráng lệ và độ bền trường tồn. Chống thấm ố, chống trầy xước và chịu nhiệt độ cao tuyệt đối.',
    desktopSrc: 'https://media.fiftyfourms.com/Desktop_kvarcz_0f42fe7316.webp',
    mobileSrc: 'https://media.fiftyfourms.com/mobile_kvarcz_d6eb4c9d1e.webp',
    alt: 'Quartz and marble material sample',
    originEn: 'Carrara (Italy), Basque Country (Spain) & Brazil',
    originVi: 'Carrara (Ý), Xứ Basque (Tây Ban Nha) & Brazil',
    compositionEn: '93% Pure Natural Quartz Crystals & Italian Marble',
    compositionVi: '93% Tinh thể thạch anh tự nhiên & Đá marble nguyên khối',
    durabilityEn: 'Mohs scale 7 hardness, completely non-porous (<0.02%)',
    durabilityVi: 'Độ cứng Mohs cấp 7, độ hút nước <0.02% không ố màu',
    tactileEn: 'Diamond-polished, cool substantial monolithic density',
    tactileVi: 'Mài bóng kim cương, mát lạnh, đầm chắc nguyên khối',
    swatches: [
      { nameEn: 'Calacatta Viola', nameVi: 'Cẩm Thạch Calacatta Viola', hex: '#d8cfcf', code: 'STN-01' },
      { nameEn: 'Nero Marquina', nameVi: 'Đá Đen Nero Marquina', hex: '#1c1b1d', code: 'STN-02' },
      { nameEn: 'Patagonia Quartzite', nameVi: 'Thạch Anh Patagonia Xuyên Sáng', hex: '#c7bca9', code: 'STN-03' },
      { nameEn: 'Statuario Gold', nameVi: 'Statuario Chỉ Vàng', hex: '#f2eee7', code: 'STN-04' },
    ],
    compatibleProducts: ['Astor Dining Table', 'Horizon Credenza', 'Woodwell Coffee Table'],
  },
];

export const MaterialsPage: React.FC<MaterialsPageProps> = ({
  currentLanguage,
  onSelectProduct,
  onToggleWishlist,
  isWishlisted,
  onOpenConsultation,
  onNavigatePage,
  onOpenCatalogDownload,
}) => {
  // Active modal or selected material
  const [activeMaterial, setActiveMaterial] = useState<MaterialCategoryItem | null>(null);
  const [showSampleBoxModal, setShowSampleBoxModal] = useState(false);

  // Sample Box Form
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formStudio, setFormStudio] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Smooth scroll to sample box section
  const scrollToSampleSection = () => {
    const el = document.getElementById('sample-box-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenConsultation) {
      onOpenConsultation();
    }
  };

  const handleSampleBoxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  // Translations matching fiftyfourms.com/materials
  const t = {
    EN: {
      backHome: 'Home',
      heroBadge: 'OUR MATERIALS',
      heroTitle: 'OUR MATERIALS',
      heroDesc:
        'Over the years of work, we have assembled our own library of materials, selecting only those suppliers and samples that meet our high quality standards.',
      selectMaterialBtn: 'SELECT MATERIAL',
      learnMore: 'Details',
      viewAllCatalog: 'VIEW CATALOG',
      detailsModalTitle: 'IN B+ON FURNITURE',
      originLabel: 'Provenance & Tannery',
      compositionLabel: 'Composition',
      durabilityLabel: 'Performance & Wear',
      tactileLabel: 'Tactile Sensation',
      swatchesTitle: 'CURATED PALETTE & FINISHES',
      usedInTitle: 'MODELS CRAFTED IN THIS MATERIAL',
      requestSampleBtn: 'REQUEST PHYSICAL SPECIMEN',
      exploreProductBtn: 'View Model',
      sampleBoxTitle: 'REQUEST ARCHITECTURAL SAMPLE KIT',
      sampleBoxDesc:
        'For Architects, Interior Designers, and Private Clients: Receive an authentic curated set of leather swatches, natural stone slices, and hand-rubbed veneers.',
      sampleBoxBtn: 'REQUEST SAMPLE KIT',
      formNamePlaceholder: 'Full Name *',
      formPhonePlaceholder: 'Phone number *',
      formEmailPlaceholder: 'Email address *',
      formStudioPlaceholder: 'Studio or Architecture brand',
      formAddressPlaceholder: 'Shipping address for sample box',
      formNotesPlaceholder: 'Project name or specific materials needed',
      formSubmitBtn: 'SUBMIT REQUEST FOR SAMPLE BOX',
      formSuccessTitle: 'Request Received!',
      formSuccessDesc:
        'Our materials concierge will contact you within 24 hours to arrange insured physical sample dispatch to your design office.',
      closeBtn: 'Close',
      configuratorTitle: 'INTERACTIVE 3D BESPOKE STUDIO',
      configuratorDesc:
        'Select iconic B+ON models and preview tactile materials, textures, and bespoke finishes in real time.',
    },
    VI: {
      backHome: 'Trang chủ',
      heroBadge: 'VẬT LIỆU CỦA CHÚNG TÔI',
      heroTitle: 'VẬT LIỆU CỦA CHÚNG TÔI',
      heroDesc:
        'Qua nhiều năm hoạt động, chúng tôi đã kiến tạo và tuyển chọn một thư viện vật liệu độc quyền, chỉ lựa chọn những nhà cung cấp và mẫu vật liệu đáp ứng tiêu chuẩn khắt khe nhất.',
      selectMaterialBtn: 'TƯ VẤN CHỌN VẬT LIỆU',
      learnMore: 'Xem chi tiết',
      viewAllCatalog: 'XEM CATALOGUE',
      detailsModalTitle: 'TRONG NỘI THẤT B+ON',
      originLabel: 'Xuất xứ & Xưởng thuộc',
      compositionLabel: 'Thành phần vật liệu',
      durabilityLabel: 'Độ bền & Đặc tính',
      tactileLabel: 'Cảm giác tiếp xúc',
      swatchesTitle: 'BẢNG MÀU & MẪU BỀ MẶT TUYỂN CHỌN',
      usedInTitle: 'SẢN PHẨM ỨNG DỤNG VẬT LIỆU NÀY',
      requestSampleBtn: 'YÊU CẦU MẪU VẬT LIỆU THỰC TẾ',
      exploreProductBtn: 'Xem sản phẩm',
      sampleBoxTitle: 'ĐĂNG KÝ NHẬN HỘP MẪU VẬT LIỆU THỰC TẾ (SAMPLE KIT)',
      sampleBoxDesc:
        'Dành cho các Kiến Trúc Sư, Nhà Thiết Kế và Khách Hàng Thượng Lưu: Nhận trọn bộ mẫu da thật, đá tự nhiên và veneer gỗ quý kèm hồ sơ chứng nhận gửi đến tận studio của bạn.',
      sampleBoxBtn: 'ĐĂNG KÝ HỘP MẪU',
      formNamePlaceholder: 'Họ và tên *',
      formPhonePlaceholder: 'Số điện thoại *',
      formEmailPlaceholder: 'Email công việc *',
      formStudioPlaceholder: 'Tên văn phòng / Studio kiến trúc',
      formAddressPlaceholder: 'Địa chỉ nhận hộp mẫu vật liệu',
      formNotesPlaceholder: 'Tên dự án hoặc các mẫu vật liệu quan tâm',
      formSubmitBtn: 'GỬI YÊU CẦU HỘP MẪU',
      formSuccessTitle: 'Đã gửi yêu cầu thành công!',
      formSuccessDesc:
        'Bộ phận Concierge Vật Liệu B+ON sẽ liên hệ xác nhận và điều phối chuyển phát hộp mẫu vật liệu đến văn phòng của bạn trong vòng 24 giờ.',
      closeBtn: 'Đóng',
      configuratorTitle: 'TRÌNH TÙY BIẾN VẬT LIỆU 3D TRỰC TUYẾN',
      configuratorDesc:
        'Chọn các phom dáng nội thất B+ON kinh điển và trực tiếp trải nghiệm sự kết hợp vật liệu thượng hạng trên mô hình 3D thực tế.',
    },
  }[currentLanguage];

  return (
    <div id="materials-page" className="w-full bg-[#141414] text-[#e8e8e8] font-manrope pb-24 selection:bg-[#fff] selection:text-[#000]">
      
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB & PAGE WRAPPER */}
      {/* With exact pt-44 sm:pt-52 lg:pt-56 preserving user requested spacing */}
      {/* ========================================================================= */}
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px] pt-44 sm:pt-52 lg:pt-56">
        
        {/* Breadcrumb pill button (fiftyfourms style) */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => onNavigatePage ? onNavigatePage('home') : (window.location.hash = '#home')}
            className="group inline-flex items-center gap-2 rounded-full py-2.5 px-4 bg-[#1F1F1F66] text-[#b0b0b0] hover:text-white hover:bg-[#282828] transition-all duration-200 backdrop-blur-md border border-[#2e2e2e] text-xs uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-current transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>{t.backHome}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO SECTION (fiftyfourms.com/materials#hero) */}
        {/* Exact background hero_materials_b_edac3fe0ff.webp + Title + Description + CTA */}
        {/* ========================================================================= */}
        <section id="hero" className="relative w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden border border-[#262626] bg-[#181818] mb-16 md:mb-24 shadow-2xl">
          
          {/* Hero Background image */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <img
              src="https://media.fiftyfourms.com/hero_materials_b_edac3fe0ff.webp"
              alt="B+ON Materials Background"
              className="w-full h-full object-cover object-right md:object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40" />
          </div>

          {/* Hero Content text */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24 max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/bon-logo.png"
                alt="B+ON"
                className="h-6 w-auto object-contain opacity-90"
              />
              <span className="text-xs uppercase tracking-[0.25em] text-[#a0a0a0] border-b border-[#a0a0a0]/40 pb-1">
                ATELIER ARCHIVE
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.06em] text-white font-philosopher uppercase leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-[#b8b8b8] font-light leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={scrollToSampleSection}
                className="px-6 sm:px-8 py-3 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                {t.selectMaterialBtn}
              </button>

              <button
                onClick={() => onNavigatePage ? onNavigatePage('catalog') : (window.location.hash = '#catalog')}
                className="px-6 sm:px-8 py-3 bg-transparent hover:bg-[#202020] text-white border border-[#404040] hover:border-[#606060] rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer"
              >
                {t.viewAllCatalog}
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SIGNATURE FIFTYFOURMS 10-MATERIALS SHOWCASE (#materials) */}
        {/* Horizontal fan-out accordion on desktop (flex-row aspect-182/500) */}
        {/* Vertical stacking cascade on mobile (aspect-335/130 with -mt-[15%]) */}
        {/* ========================================================================= */}
        <section id="materials" className="relative w-full mb-20 md:mb-28">
          
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#262626] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#888] block mb-1">
                COLLECTION OF 10 REFINED FINISHES
              </span>
              <h2 className="text-xl sm:text-2xl font-light text-white font-philosopher uppercase">
                {currentLanguage === 'VI' ? '10 Chất Liệu & Hoàn Thiện Tác Quyền' : '10 Signature Materials & Finishes'}
              </h2>
            </div>
            <span className="text-xs text-[#777] font-light italic">
              {currentLanguage === 'VI' ? '*Di chuột hoặc nhấn vào mẫu để khám phá chi tiết' : '*Hover or click any sample to explore in depth'}
            </span>
          </div>

          {/* Container holding the 10 materials */}
          <div className="w-full">
            <ul className="flex flex-col md:flex-row w-full gap-3 md:gap-2.5 lg:gap-3 xl:gap-3.5 overflow-hidden">
              {BON_MATERIALS.map((mat, index) => {
                const displayName = currentLanguage === 'VI' ? mat.nameVi : mat.nameEn;
                return (
                  <li
                    key={mat.id}
                    className="md:w-full md:h-full max-md:-mt-[10%] first:mt-0 transition-transform duration-300"
                    style={{ zIndex: index + 1 }}
                  >
                    <div className="group w-full">
                      <div
                        onClick={() => setActiveMaterial(mat)}
                        className="block rounded-[16px] relative aspect-[335/130] active:shadow-[5px_-3px_14px_-5px_rgba(174,184,194,0.8)] max-md:active:-translate-y-2 transition-all duration-500 md:aspect-[182/500] md:group-hover:-translate-y-[8%] md:duration-400 md:will-change-transform cursor-pointer overflow-hidden border border-[#2a2a2a] group-hover:border-[#555] shadow-xl bg-[#181818]"
                      >
                        {/* High desktop / mobile source picture */}
                        <picture className="w-full h-full">
                          <source media="(max-width: 767px)" srcSet={mat.mobileSrc} />
                          <img
                            src={mat.desktopSrc}
                            alt={mat.alt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </picture>

                        {/* FiftyFourms gradient overlay */}
                        <div className="absolute top-0 left-0 w-[55%] h-full bg-[linear-gradient(90deg,#181818cc_0%,rgba(24,24,24,0)_100%)] md:bg-[linear-gradient(180deg,rgba(24,24,24,0)_0%,#181818_100%)] md:w-full md:h-[70%] md:bottom-0 md:top-auto pointer-events-none" />

                        {/* Title & Learn More overlay */}
                        <div className="flex flex-col gap-1.5 absolute top-5 left-5 z-10 md:top-auto md:left-3 md:bottom-6 md:grid md:grid-cols-1 md:grid-rows-1 md:items-center xl:left-5">
                          {/* Name in uppercase */}
                          <div className="text-sm sm:text-base lg:text-lg font-light text-white font-philosopher uppercase md:col-start-1 md:row-start-1 md:group-hover:-translate-y-[calc(100%+8px)] md:transition-transform md:duration-400 md:will-change-transform drop-shadow-md">
                            <span>{displayName}</span>
                          </div>

                          {/* "Details / Xem chi tiết" link fading in on hover on desktop */}
                          <p className="font-light text-xs text-[#dcdcdc] underline underline-offset-4 md:col-start-1 md:row-start-1 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100 md:delay-100 md:will-change-[opacity] inline-flex items-center gap-1">
                            <span>{t.learnMore}</span>
                            <ChevronRight className="w-3 h-3" />
                          </p>
                        </div>

                        {/* Category index pill badge */}
                        <div className="absolute top-3 right-3 md:top-3 md:left-3 md:right-auto z-10">
                          <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] uppercase font-mono text-[#a0a0a0] border border-white/10">
                            0{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. MODAL: DETAILED MATERIAL INSPECTOR (Matching fiftyfourms.com/materials/[slug]) */}
        {/* ========================================================================= */}
        {activeMaterial && (
          <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-[#181818] border border-[#383838] max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-2xl md:rounded-[1.75rem] p-6 sm:p-10 relative space-y-8 text-[#dcdcdc] shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
              
              {/* Close button */}
              <button
                onClick={() => setActiveMaterial(null)}
                className="absolute top-5 right-5 text-[#888] hover:text-white p-2 rounded-full hover:bg-[#282828] transition-colors z-20 cursor-pointer"
                title={t.closeBtn}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Material Header Banner */}
              <div className="relative w-full rounded-xl overflow-hidden border border-[#2e2e2e] aspect-[21/9] sm:aspect-[24/9] bg-black">
                <img
                  src={activeMaterial.desktopSrc}
                  alt={activeMaterial.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6 sm:p-8">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] mb-1">
                      B+ON® MATERIAL LAB
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-philosopher uppercase leading-tight">
                      {currentLanguage === 'VI' ? activeMaterial.nameVi : activeMaterial.nameEn} {t.detailsModalTitle}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description & Story */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-[#c4c4c4] font-light leading-relaxed">
                  {currentLanguage === 'VI' ? activeMaterial.descVi : activeMaterial.descEn}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-t border-b border-[#2a2a2a] py-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">
                    {t.originLabel}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-light">
                    {currentLanguage === 'VI' ? activeMaterial.originVi : activeMaterial.originEn}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">
                    {t.compositionLabel}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-light">
                    {currentLanguage === 'VI' ? activeMaterial.compositionVi : activeMaterial.compositionEn}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">
                    {t.durabilityLabel}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-light">
                    {currentLanguage === 'VI' ? activeMaterial.durabilityVi : activeMaterial.durabilityEn}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">
                    {t.tactileLabel}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-light">
                    {currentLanguage === 'VI' ? activeMaterial.tactileVi : activeMaterial.tactileEn}
                  </span>
                </div>
              </div>

              {/* Swatches Palette */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#a0a0a0]">
                  {t.swatchesTitle}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeMaterial.swatches.map((sw, idx) => (
                    <div
                      key={idx}
                      className="bg-[#202020] border border-[#303030] rounded-xl p-3 flex items-center gap-3"
                    >
                      <span
                        className="w-7 h-7 rounded-full inline-block border border-white/20 shadow-inner flex-shrink-0"
                        style={{ backgroundColor: sw.hex }}
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs text-white font-medium truncate">
                          {currentLanguage === 'VI' ? sw.nameVi : sw.nameEn}
                        </div>
                        <div className="text-[10px] text-[#777] font-mono">{sw.code}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Furniture using this Material */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#a0a0a0]">
                  {t.usedInTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeMaterial.compatibleProducts.map((prodName, idx) => {
                    const matchedProd = PRODUCTS.find((p) =>
                      p.name.toLowerCase().includes(prodName.toLowerCase())
                    );
                    return (
                      <div
                        key={idx}
                        className="bg-[#202020] border border-[#2e2e2e] rounded-xl p-3 flex items-center justify-between hover:border-[#555] transition-colors"
                      >
                        <span className="text-xs text-white font-light truncate">{prodName}</span>
                        {matchedProd ? (
                          <button
                            onClick={() => {
                              setActiveMaterial(null);
                              onSelectProduct(matchedProd);
                            }}
                            className="text-[10px] text-[#dcdcdc] hover:text-white uppercase tracking-wider underline cursor-pointer"
                          >
                            {t.exploreProductBtn} →
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveMaterial(null);
                              if (onNavigatePage) onNavigatePage('catalog');
                            }}
                            className="text-[10px] text-[#888] hover:text-white uppercase tracking-wider cursor-pointer"
                          >
                            Catalogue →
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons inside modal */}
              <div className="pt-4 flex flex-wrap items-center justify-end gap-3 border-t border-[#262626]">
                <button
                  onClick={() => {
                    setActiveMaterial(null);
                    setShowSampleBoxModal(true);
                  }}
                  className="px-6 py-3 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                >
                  {t.requestSampleBtn}
                </button>
                <button
                  onClick={() => setActiveMaterial(null)}
                  className="px-6 py-3 bg-transparent hover:bg-[#252525] text-white border border-[#404040] rounded-full text-xs font-medium uppercase tracking-widest transition-all cursor-pointer"
                >
                  {t.closeBtn}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. REQUEST ARCHITECTURAL SAMPLE KIT SECTION (#sample-box-section) */}
        {/* Physical sample delivery box for architects & discerning homeowners */}
        {/* ========================================================================= */}
        <section id="sample-box-section" className="relative w-full mb-20 md:mb-28 scroll-mt-28">
          <div className="rounded-2xl md:rounded-[1.75rem] bg-[#181818] border border-[#262626] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Photo Container */}
              <div className="hidden lg:block lg:col-span-5 relative min-h-[500px]">
                <img
                  src="https://cdn.fiftyfourms.com/photo_4_f99ca99db2.webp"
                  alt="B+ON Materials Archive Sample Kit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-8 left-8 right-8 space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                    <Box className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>B+ON Atelier Physical Box</span>
                  </div>
                  <div className="text-lg font-light text-white font-philosopher">
                    10 Authentic Specimen Swatches & Verification Certs
                  </div>
                </div>
              </div>

              {/* Right Form Container */}
              <div className="col-span-1 lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
                <div className="space-y-3 mb-8">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a0a0a0]">
                    <Box className="w-3.5 h-3.5 text-[#a0a0a0]" />
                    <span>SAMPLE BOX FOR ARCHITECTS</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-philosopher uppercase tracking-[0.04em]">
                    {t.sampleBoxTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8e8e8e] font-light leading-relaxed">
                    {t.sampleBoxDesc}
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="bg-[#202020] border border-[#383838] p-6 sm:p-8 rounded-xl text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-950/60 border border-green-700/80 text-green-400 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-light text-white font-philosopher uppercase">
                      {t.formSuccessTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed max-w-md mx-auto">
                      {t.formSuccessDesc}
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormName('');
                        setFormPhone('');
                        setFormEmail('');
                        setFormStudio('');
                        setFormAddress('');
                        setFormNotes('');
                      }}
                      className="px-6 py-2.5 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSampleBoxSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder={t.formNamePlaceholder}
                          className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder={t.formPhonePlaceholder}
                          className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <input
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder={t.formEmailPlaceholder}
                          className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                        />
                      </div>

                      {/* Studio */}
                      <div>
                        <input
                          type="text"
                          value={formStudio}
                          onChange={(e) => setFormStudio(e.target.value)}
                          placeholder={t.formStudioPlaceholder}
                          className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <input
                        type="text"
                        value={formAddress}
                        onChange={(e) => setFormAddress(e.target.value)}
                        placeholder={t.formAddressPlaceholder}
                        className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <input
                        type="text"
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder={t.formNotesPlaceholder}
                        className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-4 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        {formLoading ? '...' : t.formSubmitBtn}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
