import React, { useState } from 'react';
import { Product, PageType, MainCategory } from '../types';
import { SCRAPED_PRODUCTS } from '../data/allScrapedProducts';

interface HomePremiumFurnitureSectionProps {
  currentLanguage: 'VI' | 'EN';
  onNavigatePage: (page: PageType, category?: MainCategory) => void;
  onSelectProduct?: (product: Product) => void;
}

interface SwatchItem {
  id: string;
  nameEn: string;
  nameVi: string;
  colorHex: string;
  image: string;
  hoverImage?: string;
  priceFormatted: string;
  priceFormattedVi: string;
}

export const HomePremiumFurnitureSection: React.FC<HomePremiumFurnitureSectionProps> = ({
  currentLanguage,
  onNavigatePage,
  onSelectProduct,
}) => {
  // Swatch datasets for the 3 featured products
  const blossomSwatches: SwatchItem[] = [
    {
      id: 'blackberry',
      nameEn: 'shade Royal Amaranth',
      nameVi: 'sắc thái Royal Amaranth',
      colorHex: '#4a041f',
      image: 'https://cdn.fiftyfourms.com/Blossom500_F_blackberry_e688766fa5.webp',
      hoverImage: 'https://cdn.fiftyfourms.com/Blossom500_CU_blackberry_a911e5930e.webp',
      priceFormatted: 'from 87,894,000 VNĐ',
      priceFormattedVi: 'từ 87.894.000 VNĐ',
    },
    {
      id: 'moro',
      nameEn: 'shade Chestnut Caramel',
      nameVi: 'sắc thái Chestnut Caramel',
      colorHex: '#41260f',
      image: 'https://cdn.fiftyfourms.com/Blossom500_F_moro_863795f07a.webp',
      hoverImage: 'https://cdn.fiftyfourms.com/Blossom500_CU_moro_237fdc1309.webp',
      priceFormatted: 'from 87,894,000 VNĐ',
      priceFormattedVi: 'từ 87.894.000 VNĐ',
    },
    {
      id: 'spruce',
      nameEn: 'shade Florentine Green',
      nameVi: 'sắc thái Florentine Green',
      colorHex: '#8f956f',
      image: 'https://cdn.fiftyfourms.com/Blossom500_F_spruce_b479e3eb61.webp',
      hoverImage: 'https://cdn.fiftyfourms.com/Blossom500_CU_spruce_c14284c088.webp',
      priceFormatted: 'from 87,894,000 VNĐ',
      priceFormattedVi: 'từ 87.894.000 VNĐ',
    },
    {
      id: 'lavanda',
      nameEn: 'shade Amethyst Depth',
      nameVi: 'sắc thái Amethyst Depth',
      colorHex: '#372e4f',
      image: 'https://cdn.fiftyfourms.com/Blossom500_F_lavanda_6094408a0e.webp',
      hoverImage: 'https://cdn.fiftyfourms.com/Blossom500_CU_lavanda_a30c902ced.webp',
      priceFormatted: 'from 87,894,000 VNĐ',
      priceFormattedVi: 'từ 87.894.000 VNĐ',
    },
  ];

  const artistrySwatches: SwatchItem[] = [
    {
      id: 'spruce',
      nameEn: 'Florentine green shade',
      nameVi: 'sắc thái Florentine green',
      colorHex: '#8F956F',
      image: 'https://media.fiftyfourms.com/Artistry_34_spruce_podsvetka_ee61e7d46e.webp',
      hoverImage: 'https://cdn.fiftyfourms.com/Artistry_CUF_spruce_e4a4cb8163.webp',
      priceFormatted: 'from 245,308,000 VNĐ',
      priceFormattedVi: 'từ 245.308.000 VNĐ',
    },
    {
      id: 'moro',
      nameEn: 'Chestnut Caramel shade',
      nameVi: 'sắc thái Chestnut Caramel',
      colorHex: '#41260f',
      image: 'https://media.fiftyfourms.com/Artistry_34_moro_podsvetka_72888e988e.webp',
      hoverImage: 'https://media.fiftyfourms.com/Artistry_34_moro_podsvetka_72888e988e.webp',
      priceFormatted: 'from 245,308,000 VNĐ',
      priceFormattedVi: 'từ 245.308.000 VNĐ',
    },
    {
      id: 'lavanda',
      nameEn: 'Amethyst Depth shade',
      nameVi: 'sắc thái Amethyst Depth',
      colorHex: '#372e4f',
      image: 'https://media.fiftyfourms.com/Artistry_34_lavanda_podsvetka_33d20b0c18.webp',
      hoverImage: 'https://media.fiftyfourms.com/Artistry_34_lavanda_podsvetka_33d20b0c18.webp',
      priceFormatted: 'from 245,308,000 VNĐ',
      priceFormattedVi: 'từ 245.308.000 VNĐ',
    },
    {
      id: 'blackberry',
      nameEn: 'Royal Amaranth shade',
      nameVi: 'sắc thái Royal Amaranth',
      colorHex: '#4a041f',
      image: 'https://media.fiftyfourms.com/Artistry_34_blackberry_podsvetka_1784609741.webp',
      hoverImage: 'https://media.fiftyfourms.com/Artistry_34_blackberry_podsvetka_1784609741.webp',
      priceFormatted: 'from 245,308,000 VNĐ',
      priceFormattedVi: 'từ 245.308.000 VNĐ',
    },
  ];

  const edenSwatches: SwatchItem[] = [
    {
      id: 'crystal-mist',
      nameEn: 'Crystal Mist shade',
      nameVi: 'sắc thái Crystal Mist',
      colorHex: '#888787',
      image: 'https://cdn.fiftyfourms.com/Cam_001_sj1_idol20_Square_a97685f71d.webp',
      hoverImage: 'https://cdn.fiftyfourms.com/Cam_007_sj1_idol20_37cf9aec5f.webp',
      priceFormatted: 'from 314,023,000 VNĐ',
      priceFormattedVi: 'từ 314.023.000 VNĐ',
    },
    {
      id: 'moro',
      nameEn: 'Caramel Amber shade',
      nameVi: 'sắc thái Caramel Amber',
      colorHex: '#41260f',
      image: 'https://cdn.fiftyfourms.com/Cam_001_sj2_moro_Square_733379e2e4.webp',
      hoverImage: 'https://cdn.fiftyfourms.com/Cam_001_sj2_moro_Square_733379e2e4.webp',
      priceFormatted: 'from 314,023,000 VNĐ',
      priceFormattedVi: 'từ 314.023.000 VNĐ',
    },
  ];

  // Active swatch states
  const [selectedBlossomIndex, setSelectedBlossomIndex] = useState(0);
  const [selectedArtistryIndex, setSelectedArtistryIndex] = useState(0);
  const [selectedEdenIndex, setSelectedEdenIndex] = useState(0);

  // Hover states for secondary perspective
  const [isBlossomHovered, setIsBlossomHovered] = useState(false);
  const [isArtistryHovered, setIsArtistryHovered] = useState(false);
  const [isEdenHovered, setIsEdenHovered] = useState(false);

  const activeBlossom = blossomSwatches[selectedBlossomIndex];
  const activeArtistry = artistrySwatches[selectedArtistryIndex];
  const activeEden = edenSwatches[selectedEdenIndex];

  // Product models from database for clicking
  const blossomProduct = SCRAPED_PRODUCTS.find((p) => p.id === 'coffee-table-blossom');
  const artistryProduct = SCRAPED_PRODUCTS.find((p) => p.id === 'dressing-table-artistry');
  const edenProduct = SCRAPED_PRODUCTS.find((p) => p.id === 'modular-sofa-eden');

  const handleProductClick = (product?: Product, defaultId?: string) => {
    if (product && onSelectProduct) {
      onSelectProduct(product);
    } else if (defaultId) {
      const found = SCRAPED_PRODUCTS.find((p) => p.id === defaultId);
      if (found && onSelectProduct) {
        onSelectProduct(found);
      } else {
        onNavigatePage('catalog');
      }
    } else {
      onNavigatePage('catalog');
    }
  };

  return (
    <section className="w-full mx-auto px-5 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] relative py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-8 lg:gap-y-6">
        
        {/* ======================================================== */}
        {/* COLUMN 1 (LEFT): LARGE FEATURED CARD - BLOSSOM TABLE     */}
        {/* ======================================================== */}
        <div className="col-span-1 md:col-span-1 lg:col-span-6 flex flex-col">
          <div
            onClick={() => handleProductClick(blossomProduct, 'coffee-table-blossom')}
            onMouseEnter={() => setIsBlossomHovered(true)}
            onMouseLeave={() => setIsBlossomHovered(false)}
            className="group cursor-pointer block aspect-square rounded-2xl md:rounded-3xl xl:rounded-[1.75rem] overflow-hidden bg-[#161616] relative mb-4 border border-[#272727] transition-all duration-500 hover:border-[#3d3d3d]"
          >
            {/* Primary & Hover Image Transition */}
            <div className="relative w-full h-full">
              <img
                src={activeBlossom.image}
                alt="Blossom Coffee Table (S)"
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                  isBlossomHovered && activeBlossom.hoverImage
                    ? 'opacity-0 scale-105'
                    : 'opacity-100 scale-100'
                }`}
                loading="lazy"
              />
              {activeBlossom.hoverImage && (
                <img
                  src={activeBlossom.hoverImage}
                  alt="Blossom Coffee Table (S) Close Up"
                  className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-out ${
                    isBlossomHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  loading="lazy"
                />
              )}
            </div>
          </div>

          {/* Product Meta Info */}
          <div
            onClick={() => handleProductClick(blossomProduct, 'coffee-table-blossom')}
            className="cursor-pointer mb-1.5"
          >
            <h4 className="text-sm md:text-base font-normal text-white hover:text-[#c4a97d] transition-colors leading-snug">
              {currentLanguage === 'VI' ? 'Bàn trà Blossom (S)' : 'Blossom Coffee Table (S)'}
            </h4>
            <p className="text-xs md:text-sm text-[#8e8e8e] font-light leading-snug">
              {currentLanguage === 'VI' ? activeBlossom.nameVi : activeBlossom.nameEn}
            </p>
          </div>

          {/* Price */}
          <div className="text-xs md:text-sm text-[#cfcfcf] font-light mb-3">
            {currentLanguage === 'VI' ? activeBlossom.priceFormattedVi : activeBlossom.priceFormatted}
          </div>

          {/* Swatches Selector */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {blossomSwatches.map((swatch, idx) => {
              const isSelected = selectedBlossomIndex === idx;
              return (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBlossomIndex(idx);
                  }}
                  title={swatch.nameEn}
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'border border-white' : 'border border-transparent hover:border-white/40'
                  }`}
                >
                  <span
                    className={`block rounded-full transition-transform duration-300 ${
                      isSelected ? 'w-2.5 h-2.5' : 'w-3 h-3'
                    }`}
                    style={{ backgroundColor: swatch.colorHex }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* COLUMN 2 (RIGHT): TEXT BANNER + 2 LOWER PRODUCT CARDS    */}
        {/* ======================================================== */}
        <div className="col-span-1 md:col-span-1 lg:col-span-6 flex flex-col justify-between gap-6">
          
          {/* Top: PREMIUM FURNITURE Banner Card */}
          <div className="rounded-2xl md:rounded-3xl xl:rounded-[1.75rem] bg-[#1e1e1e] border border-[#2d2d2d] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.4)] p-6 sm:p-8 lg:p-8 xl:p-10 flex flex-col justify-between flex-1 min-h-[220px]">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-[1.85rem] font-normal uppercase text-white tracking-wider font-philosopher mb-3 sm:mb-4">
                {currentLanguage === 'VI' ? 'NỘI THẤT CAO CẤP' : 'PREMIUM FURNITURE'}
              </h3>
              <p className="text-xs sm:text-sm text-[#b0b0b0] font-light leading-relaxed">
                {currentLanguage === 'VI'
                  ? 'Trong các bộ sưu tập của FiftyFourms, thiết kế Nga độc bản mang một ý nghĩa mới nhờ các công nghệ Ý mà chúng tôi tiếp thu khi làm việc cùng một trong những xưởng sản xuất danh tiếng hàng đầu nước Ý. Kinh nghiệm này hiện được áp dụng tại xưởng chế tác của chúng tôi, kiến tạo nên những tuyệt phẩm nội thất đáp ứng gu thẩm mỹ của những khách hàng khắt khe nhất.'
                  : "In the FiftyFourms collections , unique Russian design takes on a new meaning thanks to Italian technologies we adopted while working with one of Italy's finest factories. This experience is now applied to our production facility in Russia, where we create furniture that satisfies the tastes of even the most discerning customers."}
              </p>
            </div>

            <div className="pt-5 sm:pt-6">
              <button
                type="button"
                onClick={() => onNavigatePage('catalog')}
                className="inline-flex items-center justify-center rounded-full border border-white/45 px-7 py-2.5 text-xs uppercase tracking-[0.16em] text-white hover:border-white hover:bg-white hover:text-black transition-all duration-300 font-medium cursor-pointer"
              >
                {currentLanguage === 'VI' ? 'BỘ SƯU TẬP BÁN CHẠY' : 'OUR BESTSELLERS'}
              </button>
            </div>
          </div>

          {/* Bottom: 2 Products Side by Side */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            
            {/* Sub-Card 1: Artistry Vanity */}
            <div className="flex flex-col">
              <div
                onClick={() => handleProductClick(artistryProduct, 'dressing-table-artistry')}
                onMouseEnter={() => setIsArtistryHovered(true)}
                onMouseLeave={() => setIsArtistryHovered(false)}
                className="group cursor-pointer block aspect-square rounded-2xl md:rounded-3xl xl:rounded-[1.75rem] overflow-hidden bg-[#161616] relative mb-3 sm:mb-4 border border-[#272727] transition-all duration-500 hover:border-[#3d3d3d]"
              >
                <div className="relative w-full h-full">
                  <img
                    src={activeArtistry.image}
                    alt="Artistry Vanity"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      isArtistryHovered && activeArtistry.hoverImage
                        ? 'opacity-0 scale-105'
                        : 'opacity-100 scale-100'
                    }`}
                    loading="lazy"
                  />
                  {activeArtistry.hoverImage && (
                    <img
                      src={activeArtistry.hoverImage}
                      alt="Artistry Vanity Detail"
                      className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-out ${
                        isArtistryHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>

              {/* Meta */}
              <div
                onClick={() => handleProductClick(artistryProduct, 'dressing-table-artistry')}
                className="cursor-pointer mb-1 min-h-[36px]"
              >
                <h4 className="text-xs sm:text-sm font-normal text-white hover:text-[#c4a97d] transition-colors leading-snug line-clamp-1">
                  {currentLanguage === 'VI' ? 'Bàn trang điểm Artistry' : 'Artistry Vanity'}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#8e8e8e] font-light leading-snug line-clamp-1">
                  {currentLanguage === 'VI' ? activeArtistry.nameVi : activeArtistry.nameEn}
                </p>
              </div>

              {/* Price */}
              <div className="text-[11px] sm:text-xs text-[#cfcfcf] font-light mb-2.5">
                {currentLanguage === 'VI' ? activeArtistry.priceFormattedVi : activeArtistry.priceFormatted}
              </div>

              {/* Swatches */}
              <div className="flex items-center gap-2 flex-wrap">
                {artistrySwatches.map((swatch, idx) => {
                  const isSelected = selectedArtistryIndex === idx;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArtistryIndex(idx);
                      }}
                      title={swatch.nameEn}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'border border-white' : 'border border-transparent hover:border-white/40'
                      }`}
                    >
                      <span
                        className={`block rounded-full transition-transform duration-300 ${
                          isSelected ? 'w-2.5 h-2.5' : 'w-3 h-3'
                        }`}
                        style={{ backgroundColor: swatch.colorHex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Card 2: Eden Modular Sofa */}
            <div className="flex flex-col">
              <div
                onClick={() => handleProductClick(edenProduct, 'modular-sofa-eden')}
                onMouseEnter={() => setIsEdenHovered(true)}
                onMouseLeave={() => setIsEdenHovered(false)}
                className="group cursor-pointer block aspect-square rounded-2xl md:rounded-3xl xl:rounded-[1.75rem] overflow-hidden bg-[#161616] relative mb-3 sm:mb-4 border border-[#272727] transition-all duration-500 hover:border-[#3d3d3d]"
              >
                <div className="relative w-full h-full">
                  <img
                    src={activeEden.image}
                    alt="Eden modular sofa (370x290)"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      isEdenHovered && activeEden.hoverImage
                        ? 'opacity-0 scale-105'
                        : 'opacity-100 scale-100'
                    }`}
                    loading="lazy"
                  />
                  {activeEden.hoverImage && (
                    <img
                      src={activeEden.hoverImage}
                      alt="Eden modular sofa Detail"
                      className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-out ${
                        isEdenHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>

              {/* Meta */}
              <div
                onClick={() => handleProductClick(edenProduct, 'modular-sofa-eden')}
                className="cursor-pointer mb-1 min-h-[36px]"
              >
                <h4 className="text-xs sm:text-sm font-normal text-white hover:text-[#c4a97d] transition-colors leading-snug line-clamp-1">
                  {currentLanguage === 'VI' ? 'Sofa module Eden (370x290)' : 'Eden modular sofa (370x290)'}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#8e8e8e] font-light leading-snug line-clamp-1">
                  {currentLanguage === 'VI' ? activeEden.nameVi : activeEden.nameEn}
                </p>
              </div>

              {/* Price */}
              <div className="text-[11px] sm:text-xs text-[#cfcfcf] font-light mb-2.5">
                {currentLanguage === 'VI' ? activeEden.priceFormattedVi : activeEden.priceFormatted}
              </div>

              {/* Swatches */}
              <div className="flex items-center gap-2 flex-wrap">
                {edenSwatches.map((swatch, idx) => {
                  const isSelected = selectedEdenIndex === idx;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEdenIndex(idx);
                      }}
                      title={swatch.nameEn}
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'border border-white' : 'border border-transparent hover:border-white/40'
                      }`}
                    >
                      <span
                        className={`block rounded-full transition-transform duration-300 ${
                          isSelected ? 'w-2.5 h-2.5' : 'w-3 h-3'
                        }`}
                        style={{ backgroundColor: swatch.colorHex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
