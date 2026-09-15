import React, { useState } from 'react';
import { Sliders, Sparkles, Check, Download, Box, Layers, RotateCcw, Heart, SunMedium, Moon } from 'lucide-react';
import { Product, FinishOption, AppLanguage } from '../types';
import { FINISH_SWATCHES, PRODUCTS } from '../data/furnitureData';
import { getProductName, getFinishName } from '../utils/i18n';

interface ConfiguratorSectionProps {
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  currentLanguage: 'VI' | 'EN';
}

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({
  onToggleWishlist,
  isWishlisted,
  currentLanguage,
}) => {
  // Configurable models
  const configurableProducts = PRODUCTS.slice(0, 4);
  const [selectedProduct, setSelectedProduct] = useState<Product>(configurableProducts[0]);

  // Selected finish options
  const [upholstery, setUpholstery] = useState<FinishOption>(
    FINISH_SWATCHES['boucle-ivory'] || Object.values(FINISH_SWATCHES)[0]
  );
  const [metal, setMetal] = useState<FinishOption>(
    FINISH_SWATCHES['metal-champagne'] || Object.values(FINISH_SWATCHES)[0]
  );
  const [wood, setWood] = useState<FinishOption>(
    FINISH_SWATCHES['wood-walnut'] || Object.values(FINISH_SWATCHES)[0]
  );
  const [marble, setMarble] = useState<FinishOption>(
    FINISH_SWATCHES['marble-calacatta'] || Object.values(FINISH_SWATCHES)[0]
  );

  const [lightingMode, setLightingMode] = useState<'warm' | 'cool'>('warm');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const t = {
    VI: {
      badge: 'Trình Phối Màu & Vật Liệu 3D',
      title: 'Studio Tùy Biến Vật Liệu Độc Bản',
      subtitle:
        'Trực tiếp phối hợp giữa các dòng da Ý cao cấp, đá marble tự nhiên và kim loại mạ PVD do các kiến trúc sư tuyển chọn.',
      selectModel: 'Chọn sản phẩm mẫu',
      upholsteryTitle: 'Vải bọc / Da tự nhiên',
      metalTitle: 'Chân kim loại & Viền mạ',
      woodTitle: 'Gỗ tự nhiên & Veneer',
      marbleTitle: 'Mặt đá Marble / Thạch anh',
      specsTitle: 'Thông số cấu hình tùy biến',
      lightingWarm: 'Ánh sáng vàng ấm 2700K',
      lightingCool: 'Ánh sáng ban ngày 4000K',
      downloadSpec: 'Xuất hồ sơ vật liệu (PDF)',
      requestQuote: 'Yêu cầu báo giá sản xuất riêng',
      addedWishlist: 'Đã lưu cấu hình vào dự án',
      addToWishlist: 'Lưu cấu hình vào Dự Án',
      leadTimeLabel: 'Thời gian chế tác',
      leadTimeVal: '6–8 Tuần',
      collectionLabel: 'Bộ sưu tập',
      hardwareMetalLabel: 'Kim loại',
      upholsteryLabel: 'Chất liệu bọc',
      pdfSuccess: 'Đã xuất file thông số kỹ thuật PDF thành công!',
    },
    EN: {
      badge: 'Interactive 3D Configurator',
      title: 'Bespoke Material Studio',
      subtitle:
        'Experiment with authentic European finishes, rare marbles, and hand-rubbed metals curated by architects.',
      selectModel: 'Select Object',
      upholsteryTitle: 'Upholstery / Textile & Leather',
      metalTitle: 'Metal Plinth & Structural Trim',
      woodTitle: 'Veneer & Hardwood Finish',
      marbleTitle: 'Natural Marble / Stone Surface',
      specsTitle: 'Custom Configuration Specs',
      lightingWarm: 'Warm 2700K Ambience',
      lightingCool: 'Architectural Daylight 4000K',
      downloadSpec: 'Export Configured Spec (PDF)',
      requestQuote: 'Inquire Custom Production',
      addedWishlist: 'Added Configuration to Project',
      addToWishlist: 'Save Configuration to Project Board',
      leadTimeLabel: 'Lead Time',
      leadTimeVal: '6–8 Weeks',
      collectionLabel: 'Collection',
      hardwareMetalLabel: 'Hardware Metal',
      upholsteryLabel: 'Upholstery',
      pdfSuccess: 'Configured Spec Sheet PDF Generated Successfully!',
    },
  }[currentLanguage];

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <section id="customizer" className="py-24 bg-[#141414] border-t border-b border-[#2d2d2d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1f1f] border border-[#353535] text-[#aeb8c2] text-[10px] uppercase tracking-[0.25em] font-medium">
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.03em] text-white font-philosopher">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#969696] font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Model Selector Ribbon */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-10">
          {configurableProducts.map((prod) => {
            const isSelected = selectedProduct?.id === prod.id;
            return (
              <button
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`px-4 py-2.5 border text-xs uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#e8e8e8] text-[#181818] font-semibold border-[#e8e8e8]'
                    : 'bg-[#1f1f1f] text-[#868686] hover:text-white border-[#353535]'
                }`}
              >
                <span>{getProductName(prod, currentLanguage)}</span>
              </button>
            );
          })}
        </div>

        {/* Main Configurator Canvas & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Showcase Stage (Col 7) */}
          <div className="lg:col-span-7 bg-[#181818] border border-[#353535] p-6 sm:p-8 space-y-6">
            {/* Visual Preview Stage */}
            <div
              className={`relative aspect-[16/10] w-full overflow-hidden border border-[#353535] transition-all duration-700 ${
                lightingMode === 'warm'
                  ? 'bg-gradient-to-b from-[#22201c] to-[#141414]'
                  : 'bg-gradient-to-b from-[#1b1e22] to-[#141414]'
              }`}
            >
              <img
                src={selectedProduct.images[0]}
                alt={getProductName(selectedProduct, currentLanguage)}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Lighting Mode Selector Badge */}
              <div className="absolute top-4 left-4 flex items-center bg-[#181818]/90 backdrop-blur-md p-1 border border-[#353535]">
                <button
                  onClick={() => setLightingMode('warm')}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    lightingMode === 'warm' ? 'bg-[#aeb8c2] text-[#181818] font-bold' : 'text-[#868686]'
                  }`}
                >
                  <SunMedium className="w-3 h-3" />
                  <span>2700K</span>
                </button>
                <button
                  onClick={() => setLightingMode('cool')}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    lightingMode === 'cool' ? 'bg-[#aeb8c2] text-[#181818] font-bold' : 'text-[#868686]'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  <span>4000K</span>
                </button>
              </div>

              {/* Live Spec Overlay Chip */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#181818]/90 backdrop-blur-md border border-[#353535] p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: upholstery.colorHex }}
                  />
                  <span className="text-white font-medium">{getFinishName(upholstery, currentLanguage)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: metal.colorHex }}
                  />
                  <span className="text-[#dcdcdc]">{getFinishName(metal, currentLanguage)}</span>
                </div>

                <div className="font-mono text-[11px] text-[#868686]">
                  {selectedProduct.dimensions.width} × {selectedProduct.dimensions.depth} cm
                </div>
              </div>
            </div>

            {/* Configured Summary Spec Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 bg-[#141414] border border-[#353535]">
                <span className="text-[10px] text-[#868686] uppercase block">{t.collectionLabel}</span>
                <span className="text-white font-philosopher">{selectedProduct.collection}</span>
              </div>
              <div className="p-3 bg-[#141414] border border-[#353535]">
                <span className="text-[10px] text-[#868686] uppercase block">{t.upholsteryLabel}</span>
                <span className="text-[#aeb8c2] truncate block">{getFinishName(upholstery, currentLanguage)}</span>
              </div>
              <div className="p-3 bg-[#141414] border border-[#353535]">
                <span className="text-[10px] text-[#868686] uppercase block">{t.hardwareMetalLabel}</span>
                <span className="text-white truncate block">{getFinishName(metal, currentLanguage)}</span>
              </div>
              <div className="p-3 bg-[#141414] border border-[#353535]">
                <span className="text-[10px] text-[#868686] uppercase block">{t.leadTimeLabel}</span>
                <span className="text-white">{t.leadTimeVal}</span>
              </div>
            </div>
          </div>

          {/* Material Palette Controls (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upholstery Selection */}
            <div className="bg-[#181818] border border-[#353535] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-white font-medium flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#aeb8c2]" />
                  {t.upholsteryTitle}
                </span>
                <span className="text-[11px] text-[#aeb8c2]">{upholstery?.textureLabel}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  FINISH_SWATCHES['boucle-ivory'],
                  FINISH_SWATCHES['nubuck-taupe'],
                  FINISH_SWATCHES['leather-cognac'],
                  FINISH_SWATCHES['leather-graphite'],
                  FINISH_SWATCHES['velvet-emerald'],
                ].filter((s): s is FinishOption => Boolean(s && s.id)).map((swatch) => (
                  <button
                    key={swatch.id}
                    onClick={() => setUpholstery(swatch)}
                    className={`p-2 border text-left flex items-center gap-2.5 transition-all ${
                      upholstery?.id === swatch.id
                        ? 'bg-[#252525] border-[#aeb8c2] text-white'
                        : 'bg-[#1f1f1f] border-[#353535] text-[#969696] hover:border-[#454545]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/40 shrink-0"
                      style={{ backgroundColor: swatch.colorHex }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium text-white truncate">{getFinishName(swatch, currentLanguage)}</p>
                      <p className="text-[9px] text-[#767676] truncate">{swatch.textureLabel}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Trim Selection */}
            <div className="bg-[#181818] border border-[#353535] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-white font-medium flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#aeb8c2]" />
                  {t.metalTitle}
                </span>
                <span className="text-[11px] text-[#aeb8c2]">{metal?.textureLabel}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {[
                  FINISH_SWATCHES['metal-champagne'],
                  FINISH_SWATCHES['metal-titanium'],
                  FINISH_SWATCHES['metal-gunmetal'],
                ].filter((s): s is FinishOption => Boolean(s && s.id)).map((swatch) => (
                  <button
                    key={swatch.id}
                    onClick={() => setMetal(swatch)}
                    className={`p-2.5 border text-center flex flex-col items-center gap-1.5 transition-all ${
                      metal?.id === swatch.id
                        ? 'bg-[#252525] border-[#aeb8c2] text-white'
                        : 'bg-[#1f1f1f] border-[#353535] text-[#969696] hover:border-[#454545]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/50 shadow-md"
                      style={{ backgroundColor: swatch.colorHex }}
                    />
                    <p className="text-[10px] font-medium text-white truncate w-full">{getFinishName(swatch, currentLanguage)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Wood or Stone Secondary Selection */}
            <div className="bg-[#181818] border border-[#353535] p-5 space-y-3">
              <span className="text-xs uppercase tracking-wider text-white font-medium block">
                {selectedProduct?.category === 'cabinet' ? t.marbleTitle : t.woodTitle}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {(selectedProduct?.category === 'cabinet'
                  ? [
                      FINISH_SWATCHES['marble-calacatta'],
                      FINISH_SWATCHES['marble-nero'],
                      FINISH_SWATCHES['marble-patagonia'],
                    ]
                  : [
                      FINISH_SWATCHES['wood-walnut'],
                      FINISH_SWATCHES['wood-smoked-oak'],
                      FINISH_SWATCHES['wood-ebonized-ash'],
                      FINISH_SWATCHES['wood-eucalyptus'],
                      FINISH_SWATCHES['wood-eben'],
                    ]
                ).filter((s): s is FinishOption => Boolean(s && s.id)).map((swatch) => (
                  <button
                    key={swatch.id}
                    onClick={() => (selectedProduct?.category === 'cabinet' ? setMarble(swatch) : setWood(swatch))}
                    className={`p-2 border text-center flex flex-col items-center gap-1.5 transition-all ${
                      (selectedProduct?.category === 'cabinet' ? marble?.id : wood?.id) === swatch.id
                        ? 'bg-[#252525] border-[#aeb8c2] text-white'
                        : 'bg-[#1f1f1f] border-[#353535] text-[#969696] hover:border-[#454545]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/50"
                      style={{ backgroundColor: swatch.colorHex }}
                    />
                    <p className="text-[10px] font-medium text-white truncate w-full">{getFinishName(swatch, currentLanguage)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              {downloadSuccess && (
                <div className="p-2.5 bg-[#1f2922] border border-[#2d5c38] text-green-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>{t.pdfSuccess}</span>
                </div>
              )}

              <button
                onClick={() => onToggleWishlist(selectedProduct)}
                className={`w-full py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-[#252525] text-[#aeb8c2] border border-[#aeb8c2]'
                    : 'bg-[#aeb8c2] hover:bg-white text-[#181818]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? t.addedWishlist : t.addToWishlist}</span>
              </button>

              <button
                onClick={handleExport}
                className="w-full py-3 px-4 bg-[#1f1f1f] hover:bg-[#252525] border border-[#353535] text-xs uppercase tracking-widest text-white transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#aeb8c2]" />
                <span>{t.downloadSpec}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
