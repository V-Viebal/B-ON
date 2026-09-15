import React, { useState } from 'react';
import { X, Heart, Download, Box, Check, Ruler, Sparkles, Share2, Layers, Maximize2 } from 'lucide-react';
import { Product, FinishOption, AppLanguage } from '../types';
import { FINISH_SWATCHES } from '../data/furnitureData';
import { getProductName, getProductDescription, getFinishName } from '../utils/i18n';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenCustomizerWithProduct: (product: Product) => void;
  currentLanguage: 'VI' | 'EN';
  onViewFullPage?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onToggleWishlist,
  isWishlisted,
  onOpenCustomizerWithProduct,
  currentLanguage,
  onViewFullPage,
}) => {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedFinishes, setSelectedFinishes] = useState<{
    upholstery?: string;
    wood?: string;
    metal?: string;
    marble?: string;
  }>(product.defaultFinishes);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const t = {
    VI: {
      sku: 'Mã SP (SKU)',
      collection: 'Bộ sưu tập',
      dimensions: 'Kích thước kỹ thuật',
      materials: 'Vật liệu & Chế tác',
      designPhilosophy: 'Triết lý thiết kế',
      finishesTitle: 'Tùy chọn vật liệu & bề mặt',
      upholstery: 'Vải & Da bọc đệm',
      wood: 'Hoàn thiện gỗ tự nhiên',
      metal: 'Kim loại & Khung mạ',
      marble: 'Đá tự nhiên / Marble',
      download3D: 'Tải File 3D (.MAX, .OBJ)',
      downloadBIM: 'Tải Bản vẽ & Spec Sheet (PDF)',
      addToWishlist: 'Thêm vào Hồ sơ dự án',
      inWishlist: 'Đã lưu vào danh sách',
      openCustomizer: 'Mở Trình phối màu 3D',
      weight: 'Khối lượng ước tính',
      bespokeNote: 'Nhận tùy biến kích thước và lớp hoàn thiện riêng biệt theo hồ sơ thiết kế của kiến trúc sư.',
      width: 'Rộng',
      depth: 'Sâu',
      height: 'Cao',
      downloadSuccess: 'Đã tải thành công gói',
    },
    EN: {
      sku: 'SKU',
      collection: 'Collection',
      dimensions: 'Dimensions',
      materials: 'Materials & Craft',
      designPhilosophy: 'Design Philosophy',
      finishesTitle: 'Select Finishes & Swatches',
      upholstery: 'Upholstery',
      wood: 'Wood Finish',
      metal: 'Metal Accents',
      marble: 'Natural Stone / Marble',
      download3D: 'Download 3D Model',
      downloadBIM: 'Download Spec Sheet (PDF)',
      addToWishlist: 'Add to Project Wishlist',
      inWishlist: 'Added to Specifications',
      openCustomizer: 'Launch 3D Configurator',
      weight: 'Weight Approx.',
      bespokeNote: 'Bespoke custom dimensions and custom veneer finishes available on request for architectural projects.',
      width: 'Width',
      depth: 'Depth',
      height: 'Height',
      downloadSuccess: 'Downloaded successfully package',
    },
  }[currentLanguage];

  const handleSimulateDownload = (type: string) => {
    setDownloadSuccess(type);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const displayName = getProductName(product, currentLanguage);
  const displayDesc = getProductDescription(product, currentLanguage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="product-detail-modal-container"
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#181818] border border-[#353535] rounded-2xl shadow-2xl overflow-y-auto flex flex-col lg:flex-row text-[#e8e8e8]"
      >
        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {onViewFullPage && (
            <button
              onClick={() => {
                onClose();
                onViewFullPage(product);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f1f1f]/85 hover:bg-[#353535] border border-[#353535] rounded-full text-xs text-[#aeb8c2] hover:text-white transition-colors"
              title={currentLanguage === 'VI' ? 'Mở trang chi tiết đầy đủ' : 'Open full presentation page'}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase">
                {currentLanguage === 'VI' ? 'Toàn trang' : 'Full Page'}
              </span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 bg-[#1f1f1f]/80 hover:bg-[#353535] border border-[#353535] rounded-full text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Left: Gallery Column */}
        <div className="lg:w-1/2 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#353535] bg-[#141414]">
          <div className="space-y-4">
            {/* Primary View */}
            <div className="relative aspect-[4/3] w-full bg-[#181818] rounded-xl overflow-hidden border border-[#353535]">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={displayName}
                className="w-full h-full object-cover object-center"
              />

              {product.isNew && (
                <span className="absolute top-3 left-3 bg-[#aeb8c2] text-[#181818] text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full">
                  NEW
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIdx === i ? 'border-[#aeb8c2]' : 'border-[#353535] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3D Model Specs Box */}
          <div className="mt-6 p-4 bg-[#1f1f1f] border border-[#353535] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-[#aeb8c2] flex items-center gap-2 font-medium">
                <Box className="w-4 h-4" />
                3D CAD & BIM Architecture
              </span>
              <span className="text-[11px] font-mono text-[#868686]">{product.model3d.polyCount}</span>
            </div>
            <p className="text-[11px] text-[#969696]">
              Formats: {product.model3d.formats.join(', ')} ({product.model3d.fileSize})
            </p>

            <button
              onClick={() => handleSimulateDownload('3D Pack (.MAX/.OBJ/.FBX)')}
              className="w-full py-2.5 bg-[#252525] hover:bg-[#353535] border border-[#353535] text-xs uppercase tracking-widest text-[#e8e8e8] hover:text-white transition-colors flex items-center justify-center gap-2 rounded-full cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#aeb8c2]" />
              {t.download3D}
            </button>
          </div>
        </div>

        {/* Right: Info & Finishes Column */}
        <div className="lg:w-1/2 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#282828]">
                <img
                  src="/bon-logo.png"
                  alt="B+ON"
                  className="h-5 w-auto object-contain opacity-85"
                />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#868686] font-mono">
                  Studia 54 Design
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-[#868686] mb-1">
                <span>{product.collection}</span>
                <span className="font-mono text-[#767676]">{product.sku}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-[0.03em] text-white font-philosopher">
                {displayName}
              </h2>
              {product.italianName && (
                <p className="text-sm text-[#aeb8c2] italic font-serif mt-0.5">
                  {product.italianName}
                </p>
              )}
            </div>

            {/* Tagline & Description */}
            <p className="text-sm text-[#b6b6b6] leading-relaxed">
              {displayDesc}
            </p>

            {/* Design Philosophy */}
            <div className="p-3.5 bg-[#1f1f1f] border-l-2 border-[#aeb8c2] rounded-r-xs">
              <p className="text-[11px] uppercase tracking-wider text-[#aeb8c2] mb-1 font-semibold">
                {t.designPhilosophy}
              </p>
              <p className="text-xs text-[#969696] italic leading-relaxed">
                "{product.designPhilosophy}"
              </p>
            </div>

            {/* Technical Dimensions Table */}
            <div className="space-y-2 pt-2 border-t border-[#353535]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#969696]">
                <Ruler className="w-3.5 h-3.5 text-[#aeb8c2]" />
                <span>{t.dimensions}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-[#1f1f1f] p-2.5 rounded-xl border border-[#353535]">
                  <span className="text-[10px] text-[#868686] uppercase block">{t.width}</span>
                  <span className="font-mono text-white text-sm font-semibold">{product.dimensions.width} cm</span>
                </div>
                <div className="bg-[#1f1f1f] p-2.5 rounded-xl border border-[#353535]">
                  <span className="text-[10px] text-[#868686] uppercase block">{t.depth}</span>
                  <span className="font-mono text-white text-sm font-semibold">{product.dimensions.depth} cm</span>
                </div>
                <div className="bg-[#1f1f1f] p-2.5 rounded-xl border border-[#353535]">
                  <span className="text-[10px] text-[#868686] uppercase block">{t.height}</span>
                  <span className="font-mono text-white text-sm font-semibold">{product.dimensions.height} cm</span>
                </div>
              </div>
            </div>

            {/* Available Finishes Selector */}
            <div className="space-y-3 pt-2 border-t border-[#353535]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#e8e8e8] font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#aeb8c2]" />
                  {t.finishesTitle}
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomizerWithProduct(product);
                  }}
                  className="text-[11px] uppercase tracking-wider text-[#aeb8c2] hover:underline"
                >
                  {t.openCustomizer} →
                </button>
              </div>

              {/* Upholstery Finishes */}
              {product.availableFinishes.upholstery && product.availableFinishes.upholstery.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#868686] block">
                    {t.upholstery}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.availableFinishes.upholstery.filter((f): f is FinishOption => Boolean(f && f.id)).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFinishes((prev) => ({ ...prev, upholstery: f.id }))}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                          selectedFinishes.upholstery === f.id
                            ? 'border-[#aeb8c2] bg-[#252525] text-white'
                            : 'border-[#353535] text-[#969696] hover:border-[#454545]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/40 shrink-0"
                          style={{ backgroundColor: f.colorHex }}
                        />
                        <span className="text-[11px]">{getFinishName(f, currentLanguage)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Metal Finishes */}
              {product.availableFinishes.metal && product.availableFinishes.metal.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#868686] block">
                    {t.metal}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.availableFinishes.metal.filter((f): f is FinishOption => Boolean(f && f.id)).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFinishes((prev) => ({ ...prev, metal: f.id }))}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                          selectedFinishes.metal === f.id
                            ? 'border-[#aeb8c2] bg-[#252525] text-white'
                            : 'border-[#353535] text-[#969696] hover:border-[#454545]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/40 shrink-0"
                          style={{ backgroundColor: f.colorHex }}
                        />
                        <span className="text-[11px]">{getFinishName(f, currentLanguage)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bespoke Architectural note */}
            <p className="text-[11px] text-[#868686] italic leading-relaxed">
              {t.bespokeNote}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#353535] space-y-3">
            {downloadSuccess && (
              <div className="p-2.5 bg-[#1f2922] border border-[#2d5c38] text-green-300 text-xs rounded-lg flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-green-400" />
                <span>{t.downloadSuccess} {downloadSuccess}!</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleWishlist(product)}
                className={`flex-1 py-3.5 px-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-[#252525] text-[#aeb8c2] border border-[#aeb8c2]'
                    : 'bg-[#aeb8c2] hover:bg-white text-[#181818]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? t.inWishlist : t.addToWishlist}</span>
              </button>

              <button
                onClick={() => handleSimulateDownload('Technical Spec PDF')}
                className="py-3.5 px-4 bg-[#1f1f1f] hover:bg-[#252525] border border-[#353535] text-xs uppercase tracking-widest text-white transition-colors flex items-center justify-center gap-1.5 rounded-full"
                title="Download PDF Specification Sheet"
              >
                <Download className="w-4 h-4 text-[#aeb8c2]" />
                <span className="hidden sm:inline">Spec Sheet</span>
              </button>
            </div>

            {onViewFullPage && (
              <button
                onClick={() => {
                  onClose();
                  onViewFullPage(product);
                }}
                className="w-full py-3 bg-[#222222] hover:bg-[#2c2c2c] border border-[#353535] hover:border-[#aeb8c2] text-xs uppercase tracking-[0.2em] text-[#e0e0e0] hover:text-white transition-all flex items-center justify-center gap-2 rounded-full"
              >
                <Maximize2 className="w-4 h-4 text-[#aeb8c2]" />
                <span>{currentLanguage === 'VI' ? 'XEM TRANG CHI TIẾT ĐẦY ĐỦ' : 'VIEW FULL PRODUCT PAGE'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
