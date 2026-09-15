import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Check,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Download,
  PhoneCall,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/furnitureData';
import { InspirationRoom, FeaturedRoomProduct, INSPIRATION_ROOMS } from '../data/inspirationData';
import { getProductName } from '../utils/i18n';

interface ProjectDetailViewProps {
  room: InspirationRoom;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectRoom: (room: InspirationRoom) => void;
  currentLanguage: 'EN' | 'VI';
  onOpenConsultation?: () => void;
  onOpenCatalogDownload?: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  room,
  onBack,
  onSelectProduct,
  onSelectRoom,
  currentLanguage,
  onOpenConsultation,
  onOpenCatalogDownload,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll to top when room changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [room.id]);

  const t = {
    VI: {
      backToList: 'Tất cả không gian',
      exploreSpace: 'Xem chi tiết',
      shareTooltip: 'Đã sao chép liên kết dự án',
      furnitureInProject: 'ĐỒ RỜI TRONG DỰ ÁN',
      materialsHeading:
        'Quý khách có thể lựa chọn đa dạng màu sắc và chất liệu khác. Để nhận thông tin chi tiết và bảng mẫu vật liệu thực tế, vui lòng liên hệ chuyên viên của chúng tôi.',
      contactConcierge: 'Liên hệ chuyên viên tư vấn',
      recommendedSpaces: 'KHÔNG GIAN GỢI Ý TƯƠNG TỰ',
      enlargeView: 'Phóng to ảnh',
      prevSpace: 'Không gian trước',
      nextSpace: 'Không gian tiếp theo',
      categoryLiving: 'Phòng khách',
      categoryOffice: 'Phòng làm việc',
      categoryBedroom: 'Phòng ngủ',
      categoryDining: 'Phòng ăn',
      inspectPiece: 'Xem chi tiết sản phẩm',
      bespokeTurnkey: 'B+ON Bespoke Atelier',
      requestConsultation: 'Tư vấn không gian này',
      downloadCatalog: 'Tải catalogue dự án',
    },
    EN: {
      backToList: 'All spaces',
      exploreSpace: 'Explore space',
      shareTooltip: 'Project link copied to clipboard',
      furnitureInProject: 'FURNITURE IN PROJECT',
      materialsHeading:
        'You can select other colors and bespoke materials. For detailed information and swatch kits, contact our architectural concierge.',
      contactConcierge: 'Connect with concierge',
      recommendedSpaces: 'RECOMMENDED SPACES',
      enlargeView: 'Enlarge view',
      prevSpace: 'Previous space',
      nextSpace: 'Next space',
      categoryLiving: 'Living room',
      categoryOffice: 'Home Office',
      categoryBedroom: 'Bedroom',
      categoryDining: 'Dining room',
      inspectPiece: 'Inspect piece',
      bespokeTurnkey: 'B+ON Bespoke Atelier',
      requestConsultation: 'Consult on this space',
      downloadCatalog: 'Download Catalog',
    },
  }[currentLanguage];

  const categoryLabel = {
    'living-room': t.categoryLiving,
    cabinet: t.categoryOffice,
    bedroom: t.categoryBedroom,
    'dining-room': t.categoryDining,
  }[room.category] || t.categoryLiving;

  // Find next and previous rooms
  const allRooms = INSPIRATION_ROOMS;
  const currentIndex = allRooms.findIndex((r) => r.id === room.id);
  const prevRoom = allRooms[(currentIndex - 1 + allRooms.length) % allRooms.length];
  const nextRoom = allRooms[(currentIndex + 1) % allRooms.length];

  // Recommended rooms (excluding current room, matching same category first)
  const recommendedRooms = allRooms
    .filter((r) => r.id !== room.id)
    .sort((a, b) => {
      if (a.category === room.category && b.category !== room.category) return -1;
      if (a.category !== room.category && b.category === room.category) return 1;
      return 0;
    })
    .slice(0, 3);

  const handleShare = () => {
    const url = `https://bpluson.com/inspiration/room/${room.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Find real product from PRODUCTS
  const findProduct = (searchTerm: string): Product | undefined => {
    return (
      PRODUCTS.find(
        (p) =>
          p.id.toLowerCase() === searchTerm.toLowerCase() ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          searchTerm.toLowerCase().includes(p.name.toLowerCase())
      ) || PRODUCTS[0]
    );
  };

  // Titles & texts
  const displayTitle =
    currentLanguage === 'VI' ? room.titleVi : room.titleEn;

  const heroParagraphs =
    currentLanguage === 'VI'
      ? room.heroNarrativeVi || [room.descVi]
      : room.heroNarrativeEn || [room.descEn];

  const comprehensiveTitle =
    currentLanguage === 'VI'
      ? room.comprehensiveTitleVi || 'Hoàn thiện nội thất dự án tổng thể với đồ rời B+ON'
      : room.comprehensiveTitleEn || 'Comprehensive Hotel & Residence Furnishing with B+ON';

  const comprehensiveParagraphs =
    currentLanguage === 'VI'
      ? room.comprehensiveDescVi || [
          'Không gian nội thất bắt đầu từ ấn tượng thị giác đầu tiên và lan tỏa qua từng khu vực mà gia chủ và khách lưu trú trải nghiệm. Thiết kế nội thất đóng vai trò then chốt trong việc duy trì cảm xúc sang trọng và phục vụ đa dạng nhu cầu tiếp đón.',
          'Tại B+ON, quý khách có thể lựa chọn đồ rời cho từng khu vực độc lập hoặc đồng bộ cho toàn bộ dự án. Sau khi duyệt phương án bản vẽ, chúng tôi tùy chỉnh thông số kỹ thuật, trực tiếp chế tác theo đơn đặt hàng, vận chuyển và lắp đặt hoàn thiện tại công trình.',
        ]
      : room.comprehensiveDescEn || [
          'Project furnishing starts with the first impression and resonates throughout every zone where guests spend time. It is vital that the interior sustains this refined atmosphere and accommodates various architectural scenarios.',
          'At B+ON, bespoke furniture can be curated for individual zones or multi-space environments. Following approval, we adapt bespoke solutions, manufacture custom furniture, deliver, and install on-site.',
        ];

  // Products featured in this room
  const detailedProductsList: FeaturedRoomProduct[] =
    room.detailedProducts && room.detailedProducts.length > 0
      ? room.detailedProducts
      : (room.featuredProducts || ['Virgola Modular Sofa', 'Pianta Armchair', 'Invito Coffee Table']).map(
          (name, idx) => {
            const matched = findProduct(name);
            return {
              id: `prod-${idx}`,
              name: matched?.name || name,
              nameVi: matched?.nameVi || name,
              nameEn: matched?.nameEn || name,
              shade: 'B+ON bespoke shade',
              shadeVi: 'Sắc thái B+ON Bespoke',
              shadeEn: 'B+ON Bespoke shade',
              image: matched?.images[0] || room.image,
              sku: matched?.sku || `BON-${idx + 1}`,
              dimensions: matched ? `${matched.dimensions.width} × ${matched.dimensions.depth} × ${matched.dimensions.height} cm` : 'Tùy chỉnh theo yêu cầu',
              productSlug: matched?.id,
            };
          }
        );

  return (
    <div id="project-detail-page" className="w-full bg-[#141414] text-[#e8e8e8] font-manrope pt-[58px] sm:pt-[68px] lg:pt-[104px] pb-28">
      {/* 1. Top Sub-Navigation Bar matching fiftyfourms.com */}
      <div className="w-full border-b border-[#242424] bg-[#161616]/90 backdrop-blur-md sticky top-[58px] sm:top-[68px] lg:top-[104px] z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 h-14 md:h-16 flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-[#a0a0a0] hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
            <span className="font-medium">{t.backToList}</span>
          </button>

          {/* Center Category Badge */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#202020] border border-[#333] text-[11px] uppercase tracking-[0.16em] text-[#aeb8c2] font-medium">
              {categoryLabel}
            </span>
            <span className="text-xs text-[#666] truncate max-w-xs md:max-w-md">
              bpluson.com/inspiration/room/{room.slug}
            </span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Prev / Next */}
            <button
              onClick={() => onSelectRoom(prevRoom)}
              className="p-2 rounded-full hover:bg-[#252525] text-[#999] hover:text-white transition-colors cursor-pointer"
              title={t.prevSpace}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectRoom(nextRoom)}
              className="p-2 rounded-full hover:bg-[#252525] text-[#999] hover:text-white transition-colors cursor-pointer"
              title={t.nextSpace}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Share button */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-[#252525] text-[#999] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                title="Share"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>

              {copied && (
                <span className="absolute top-full right-0 mt-2 px-2.5 py-1 bg-white text-black text-[10px] font-medium tracking-wide uppercase rounded shadow-lg whitespace-nowrap z-50">
                  {t.shareTooltip}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-8 md:pt-14 space-y-20 md:space-y-28">
        {/* 2. Hero Section: 12-columns grid (Left Col 5: Photo, Right Col 7: Emblem + Title + Narrative) */}
        <section className="relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Col 5: Master Room Image */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                <img
                  src={room.image}
                  alt={displayTitle}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Lightbox / Zoom CTA */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t.enlargeView}</span>
                </button>
              </div>
            </div>

            {/* Right Col 7: Brand Emblem + H1 + Narrative Paragraphs */}
            <div className="lg:col-span-7 relative order-1 lg:order-2 flex flex-col justify-center items-center text-center px-2 sm:px-6 lg:px-8">
              {/* Background ambient radial glow matching fiftyfourms.com */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 bg-center bg-no-repeat [mask-image:radial-gradient(50%_50%_at_50%_50%,#fff_10%,transparent_100%)]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #aeb8c2 0%, transparent 70%)',
                }}
              />

              {/* B+ON Monogram Emblem */}
              <div className="mb-6 md:mb-8 flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#444] bg-[#1a1a1a] flex items-center justify-center text-[#d0d0d0] shadow-inner">
                  <span className="font-philosopher text-base font-light tracking-widest text-[#aeb8c2]">B+</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#777] mt-2 font-medium">B+ON</span>
              </div>

              {/* Main Title H1 */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light text-white font-philosopher uppercase leading-tight tracking-[0.04em] max-w-2xl mb-6 md:mb-8">
                {displayTitle}
              </h1>

              {/* Architectural Narrative Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base md:text-[1.05rem] text-[#9e9e9e] font-light leading-relaxed max-w-2xl">
                {heroParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Quick action buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {onOpenConsultation && (
                  <button
                    onClick={onOpenConsultation}
                    className="px-8 py-3 bg-[#aeb8c2] hover:bg-white text-[#141414] font-medium text-xs uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(174,184,194,0.3)] cursor-pointer"
                  >
                    {t.requestConsultation}
                  </button>
                )}
                {onOpenCatalogDownload && (
                  <button
                    onClick={onOpenCatalogDownload}
                    className="px-6 py-3 border border-[#444] hover:border-white text-[#d0d0d0] hover:text-white text-xs uppercase tracking-[0.16em] rounded-full transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.downloadCatalog}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Section: Comprehensive Turnkey Architectural Furnishing (Giải pháp nội thất tổng thể) */}
        <section className="w-full relative">
          <div className="rounded-2xl md:rounded-[1.75rem] bg-[#181818] border border-[#2c2c2c] p-6 sm:p-10 md:p-14 lg:p-16 text-center max-w-5xl mx-auto shadow-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#222] border border-[#383838] text-[#aeb8c2] text-[10px] uppercase tracking-[0.25em] font-medium rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.bespokeTurnkey}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white font-philosopher uppercase tracking-wide max-w-3xl mx-auto">
              {comprehensiveTitle}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm md:text-base text-[#a0a0a0] font-light leading-relaxed max-w-3xl mx-auto text-center">
              {comprehensiveParagraphs.map((para, cIdx) => (
                <p key={cIdx}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Section: FURNITURE IN THIS SPACE (NỘI THẤT TRONG KHÔNG GIAN NÀY) */}
        <section className="w-full space-y-8 md:space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white font-philosopher uppercase tracking-[0.08em]">
              {t.furnitureInProject}
            </h2>
            <div className="w-12 h-0.5 bg-[#aeb8c2]/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {detailedProductsList.map((prod, idx) => {
              const matchedFurniture = findProduct(prod.productSlug || prod.name);
              const prodDisplayName =
                currentLanguage === 'VI'
                  ? prod.nameVi || prod.name
                  : prod.nameEn || prod.name;
              const shadeDisplay =
                currentLanguage === 'VI'
                  ? prod.shadeVi || prod.shade
                  : prod.shadeEn || prod.shade;

              return (
                <div
                  key={prod.id || idx}
                  className="flex flex-col gap-4 group cursor-pointer"
                  onClick={() => {
                    if (matchedFurniture) {
                      onSelectProduct(matchedFurniture);
                    }
                  }}
                >
                  {/* Photo container: square aspect-ratio, rounded-[1.75rem], scale hover */}
                  <div className="relative w-full aspect-square rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] group-hover:border-[#4a4a4a] transition-colors shadow-lg">
                    <img
                      src={prod.image}
                      alt={prodDisplayName}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                    />

                    {/* Quick view overlay tag */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider text-white border border-white/10 flex items-center gap-1.5 font-medium">
                        <span>{t.inspectPiece}</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Text details matching fiftyfourms.com */}
                  <div className="text-center space-y-1">
                    <p className="text-base sm:text-lg font-normal text-white font-philosopher uppercase tracking-wide group-hover:text-[#aeb8c2] transition-colors">
                      {prodDisplayName}
                    </p>
                    <p className="text-xs sm:text-sm text-[#888] font-light italic">
                      {shadeDisplay}
                    </p>
                    {prod.dimensions && (
                      <p className="text-[11px] text-[#666] tracking-wider uppercase">
                        {prod.sku ? `${prod.sku} • ` : ''}
                        {prod.dimensions}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Section: Bespoke Swatches & Consultation CTA (Tùy chọn màu sắc & vật liệu riêng) */}
        <section className="w-full max-w-4xl mx-auto">
          <div className="rounded-2xl md:rounded-[1.75rem] bg-gradient-to-b from-[#1e1e1e] to-[#161616] border border-[#333] p-8 sm:p-12 md:p-14 text-center space-y-6 shadow-2xl">
            <h2 className="text-base sm:text-lg md:text-xl font-light text-[#f0f0f0] font-philosopher leading-relaxed max-w-2xl mx-auto">
              {t.materialsHeading}
            </h2>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-8 sm:px-10 py-3.5 md:py-4 bg-white hover:bg-[#aeb8c2] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                {t.contactConcierge}
              </button>
            )}
          </div>
        </section>

        {/* 6. Section: RECOMMENDED SPACES (KHÔNG GIAN GỢI Ý KHÁC) */}
        <section className="w-full space-y-8 md:space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white font-philosopher uppercase tracking-wide">
              {t.recommendedSpaces}
            </h2>
            <button
              onClick={onBack}
              className="text-xs uppercase tracking-[0.16em] text-[#aeb8c2] hover:text-white transition-colors"
            >
              {t.backToList} →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recommendedRooms.map((recRoom) => {
              const recTitle =
                currentLanguage === 'VI' ? recRoom.titleVi : recRoom.titleEn;

              return (
                <div
                  key={recRoom.id}
                  className="flex flex-col gap-3 group cursor-pointer"
                  onClick={() => onSelectRoom(recRoom)}
                >
                  <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-xl">
                    <img
                      src={recRoom.image}
                      alt={recTitle}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#d0d0d0] rounded-full border border-white/10 font-medium">
                        {recRoom.category === 'living-room' && (currentLanguage === 'VI' ? 'Phòng khách' : 'Living room')}
                        {recRoom.category === 'cabinet' && (currentLanguage === 'VI' ? 'Phòng làm việc' : 'Home Office')}
                        {recRoom.category === 'bedroom' && (currentLanguage === 'VI' ? 'Phòng ngủ' : 'Bedroom')}
                        {recRoom.category === 'dining-room' && (currentLanguage === 'VI' ? 'Phòng ăn' : 'Dining room')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs sm:text-sm font-light text-[#e0e0e0] font-philosopher uppercase tracking-wide truncate group-hover:text-[#aeb8c2] transition-colors">
                      {recTitle}
                    </p>
                    <span className="text-xs text-[#aeb8c2] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 7. Fullscreen Lightbox Zoom */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={room.image}
            alt={displayTitle}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
