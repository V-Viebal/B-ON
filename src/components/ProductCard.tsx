import React, { useState } from 'react';
import { Heart, ChevronLeft } from 'lucide-react';
import { Product, AppLanguage } from '../types';
import { getProductName } from '../utils/i18n';
import { parseAndFormatVND } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenCustomizerWithProduct?: (product: Product) => void;
  currentLanguage: AppLanguage;
  isFirstCardWithBack?: boolean;
  onNavigateBackAll?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onToggleWishlist,
  isWishlisted,
  currentLanguage,
  isFirstCardWithBack,
  onNavigateBackAll,
}) => {
  const lang: AppLanguage = currentLanguage;
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState<number>(0);

  const displayName = getProductName(product, lang);

  // Derive swatches
  const swatches = product.colorSwatches && product.colorSwatches.length > 0
    ? product.colorSwatches
    : [
        {
          id: 'swatch-1',
          name: product.defaultFinishes?.wood || product.defaultFinishes?.upholstery || 'Default Shade',
          shadeLabel: product.shade || (lang === 'VI' ? 'sắc màu Tiêu Chuẩn' : 'Classic shade'),
          shadeLabelVi: product.shadeVi || 'sắc màu Tiêu Chuẩn',
          colorHex: '#3d2516',
          priceFormatted: product.priceFormatted || (lang === 'VI' ? 'từ 182.000.000 VNĐ' : 'from 182,000,000 VNĐ'),
        },
        {
          id: 'swatch-2',
          name: 'Mist Tone',
          shadeLabel: lang === 'VI' ? 'sắc màu Mist Nude' : 'Mist shade',
          shadeLabelVi: 'sắc màu Mist Nude',
          colorHex: '#d8c5b2',
          priceFormatted: product.priceFormatted || (lang === 'VI' ? 'từ 190.000.000 VNĐ' : 'from 190,000,000 VNĐ'),
        },
        {
          id: 'swatch-3',
          name: 'Florentine Shadow',
          shadeLabel: lang === 'VI' ? 'sắc màu Florentine' : 'Florentine shade',
          shadeLabelVi: 'sắc màu Florentine',
          colorHex: '#424d3f',
          priceFormatted: product.priceFormatted || (lang === 'VI' ? 'từ 198.000.000 VNĐ' : 'from 198,000,000 VNĐ'),
        },
      ];

  const currentSwatch = swatches[selectedSwatchIndex] || swatches[0];

  const currentShadeLabel = lang === 'VI'
    ? (currentSwatch?.shadeLabelVi || currentSwatch?.shadeLabel || product.shadeVi || product.shade || 'sắc màu Hoàn thiện')
    : (currentSwatch?.shadeLabel || product.shade || 'Natural shade');

  const rawPrice = currentSwatch?.priceFormatted || product.priceFormatted;
  const currentPriceLabel = parseAndFormatVND(rawPrice, lang);
  const activeImage = currentSwatch?.image || product.images[0];

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer select-none flex flex-col text-left"
    >
      {/* Freestanding Rounded Image Container */}
      <div className="relative aspect-square w-full rounded-[26px] sm:rounded-[28px] overflow-hidden bg-[#181818]">
        <img
          src={activeImage}
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* FiftyFourms Floating `< All furniture` Pill on Top-Left (when applicable) */}
        {isFirstCardWithBack && onNavigateBackAll && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigateBackAll();
            }}
            className="absolute top-3.5 left-3.5 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#262626]/80 hover:bg-[#333333] backdrop-blur-md border border-white/10 text-[#d8d8d8] hover:text-white text-[11.5px] font-normal tracking-wide transition-all shadow-lg cursor-pointer"
            title={lang === 'VI' ? 'Quay lại tất cả nội thất' : 'Back to all furniture'}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{lang === 'VI' ? 'Tất cả nội thất' : 'All furniture'}</span>
          </button>
        )}

        {/* Wishlist Button (Discreet in Top-Right) */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full transition-all z-10 ${
            isWishlisted
              ? 'bg-white text-black shadow-md opacity-100'
              : 'bg-[#181818]/60 backdrop-blur-md text-[#999999] hover:text-white hover:bg-[#181818]/90 opacity-0 group-hover:opacity-100'
          }`}
          title={isWishlisted ? (lang === 'VI' ? 'Bỏ yêu thích' : 'Remove wishlist') : (lang === 'VI' ? 'Yêu thích' : 'Add to wishlist')}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Information Stack Below Image */}
      <div className="mt-3.5 flex flex-col">
        {/* Line 1: Product Name */}
        <h3 className="text-[15px] sm:text-[16px] text-[#e0e0e0] font-normal leading-snug tracking-tight group-hover:text-white transition-colors">
          {displayName}
        </h3>

        {/* Line 2: Shade Subtitle */}
        <p className="text-[13.5px] sm:text-[14px] text-[#9b9b9b] font-light leading-snug tracking-tight mt-0.5">
          {currentShadeLabel}
        </p>

        {/* Line 3: Price */}
        <p className="text-[13px] sm:text-[13.5px] text-[#8e8e8e] font-light mt-2.5 sm:mt-3 tracking-normal">
          {currentPriceLabel}
        </p>

        {/* Line 4: Color Swatches Row */}
        {swatches.length > 0 && (
          <div
            className="flex items-center gap-2 mt-2 sm:mt-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            {swatches.map((swatch, idx) => {
              const isSelected = selectedSwatchIndex === idx;
              return (
                <button
                  key={swatch.id || idx}
                  type="button"
                  onClick={() => setSelectedSwatchIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-150 relative cursor-pointer ${
                    isSelected
                      ? 'ring-1 ring-white ring-offset-2 ring-offset-[#141414] scale-105'
                      : 'opacity-80 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: swatch.colorHex }}
                  title={swatch.name || (lang === 'VI' ? swatch.shadeLabelVi : swatch.shadeLabel)}
                  aria-label={swatch.name || swatch.shadeLabel}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
