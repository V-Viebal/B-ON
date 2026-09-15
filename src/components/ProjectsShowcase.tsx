import React, { useState } from 'react';
import {
  Sparkles,
  Share2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  PhoneCall,
  Download,
  Layers,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/furnitureData';
import { INSPIRATION_ROOMS, InspirationRoom } from '../data/inspirationData';
import { getProductName } from '../utils/i18n';
import { ProjectDetailView } from './ProjectDetailView';

interface ProjectsShowcaseProps {
  onSelectProduct: (product: Product) => void;
  currentLanguage: 'EN' | 'VI';
  onOpenConsultation?: () => void;
  onOpenCatalogDownload?: () => void;
  initialRoomSlug?: string;
}

type FilterCategory = 'all' | 'living-room' | 'cabinet' | 'bedroom' | 'dining-room';

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  onSelectProduct,
  currentLanguage,
  onOpenConsultation,
  onOpenCatalogDownload,
  initialRoomSlug,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedRoom, setSelectedRoom] = useState<InspirationRoom | null>(() => {
    if (initialRoomSlug) {
      return INSPIRATION_ROOMS.find((r) => r.slug === initialRoomSlug) || null;
    }
    return null;
  });
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const t = {
    VI: {
      badge: 'Nguồn Cảm Hứng B+ON',
      title: 'NGUỒN CẢM HỨNG CHO KHÔNG GIAN NỘI THẤT',
      subtitle:
        'Chúng tôi tuyển tập những nguồn cảm hứng nội thất với các tuyệt tác đồ rời B+ON. Sản phẩm của chúng tôi hiện diện trong những dự án danh giá khắp thế giới: từ các dinh thự xa hoa tại Moscow, Saint Petersburg đến các khách sạn nghỉ dưỡng đẳng cấp tại Courchevel và Tokyo.',
      allRooms: 'Tất cả không gian',
      livingRoom: 'Phòng khách',
      cabinet: 'Phòng làm việc',
      bedroom: 'Phòng ngủ',
      diningRoom: 'Phòng ăn',
      details: 'Xem chi tiết',
      shareTooltip: 'Đã sao chép liên kết không gian',
      modalBadge: 'Không gian tiêu biểu B+ON',
      featuredFurniture: 'Đồ rời trong không gian này',
      consultationCTA: 'Tư vấn thiết kế cho không gian này',
      downloadCatalog: 'Tải catalogue toàn bộ sản phẩm',
      viewProduct: 'Xem sản phẩm',
      nextSpace: 'Không gian tiếp theo',
      prevSpace: 'Không gian trước',
      close: 'Đóng',
    },
    EN: {
      badge: 'B+ON Curated Inspirations',
      title: 'INSPIRATION FOR YOUR INTERIOR',
      subtitle:
        'We have curated sources of interior inspiration featuring B+ON bespoke furniture. Our pieces grace world-class residences globally: from luxury estates in Moscow and St. Petersburg to prestigious retreats in Courchevel and Tokyo.',
      allRooms: 'All spaces',
      livingRoom: 'Living room',
      cabinet: 'Home Office',
      bedroom: 'Bedroom',
      diningRoom: 'Dining room',
      details: 'Explore Space',
      shareTooltip: 'Link copied to clipboard',
      modalBadge: 'B+ON Realized Space',
      featuredFurniture: 'Furniture featured in this space',
      consultationCTA: 'Request consultation for this project',
      downloadCatalog: 'Download Complete Product Catalog',
      viewProduct: 'Inspect Piece',
      nextSpace: 'Next Space',
      prevSpace: 'Previous Space',
      close: 'Close',
    },
  }[currentLanguage];

  // Filter items
  const filteredRooms = INSPIRATION_ROOMS.filter((room) => {
    if (activeCategory === 'all') return true;
    return room.category === activeCategory;
  });

  const categories: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: t.allRooms, count: INSPIRATION_ROOMS.length },
    {
      id: 'living-room',
      label: t.livingRoom,
      count: INSPIRATION_ROOMS.filter((r) => r.category === 'living-room').length,
    },
    {
      id: 'cabinet',
      label: t.cabinet,
      count: INSPIRATION_ROOMS.filter((r) => r.category === 'cabinet').length,
    },
    {
      id: 'bedroom',
      label: t.bedroom,
      count: INSPIRATION_ROOMS.filter((r) => r.category === 'bedroom').length,
    },
    {
      id: 'dining-room',
      label: t.diningRoom,
      count: INSPIRATION_ROOMS.filter((r) => r.category === 'dining-room').length,
    },
  ];

  const handleShare = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://bpluson.com/inspiration/room/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedSlug(slug);
    setTimeout(() => {
      setCopiedSlug((prev) => (prev === slug ? null : prev));
    }, 2500);
  };

  const navigateRoom = (direction: 'next' | 'prev') => {
    if (!selectedRoom) return;
    const currentIndex = filteredRooms.findIndex((r) => r.id === selectedRoom.id);
    if (currentIndex === -1) return;
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % filteredRooms.length
        : (currentIndex - 1 + filteredRooms.length) % filteredRooms.length;
    setSelectedRoom(filteredRooms[newIndex]);
  };

  // Find real product objects for featured products
  const getProductForName = (name: string): Product | undefined => {
    return PRODUCTS.find((p) =>
      p.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(p.name.toLowerCase())
    ) || PRODUCTS[0];
  };

  // If a room is selected, render the dedicated full ProjectDetailView page matching fiftyfourms.com/inspiration/room/...
  if (selectedRoom) {
    return (
      <ProjectDetailView
        room={selectedRoom}
        onBack={() => setSelectedRoom(null)}
        onSelectProduct={onSelectProduct}
        onSelectRoom={(newRoom) => setSelectedRoom(newRoom)}
        currentLanguage={currentLanguage}
        onOpenConsultation={onOpenConsultation}
        onOpenCatalogDownload={onOpenCatalogDownload}
      />
    );
  }

  // Find featured hotel lobby room for banner spotlight
  const hotelLobbyRoom = INSPIRATION_ROOMS.find(
    (r) => r.slug === 'interior-of-luxury-hotel-lobby-with-fiftyfourms-furniture'
  );

  return (
    <div id="inspiration-page" className="w-full bg-[#141414] text-[#e8e8e8] font-manrope pb-24">
      {/* 1. Header / Intro matching fiftyfourms.com/inspiration */}
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px] pt-44 sm:pt-52 lg:pt-56">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.06em] text-white font-philosopher uppercase leading-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#9e9e9e] font-light leading-relaxed max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 2. Filter Pills row (fiftyfourms style) */}
        <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-4 md:pb-6 scrollbar-none mb-10 md:mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.14em] transition-all cursor-pointer border ${
                  isActive
                    ? 'border-[#aeb8c2] bg-[#aeb8c2] text-[#141414] shadow-[0_4px_16px_rgba(174,184,194,0.25)]'
                    : 'border-transparent bg-[#1e1e1e] text-[#a0a0a0] hover:text-white hover:bg-[#282828]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-2 text-[10px] ${isActive ? 'text-[#333]' : 'text-[#666]'}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Cards Grid: 5-columns layout matching fiftyfourms.com/inspiration */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
          {filteredRooms.map((room) => {
            const isCopied = copiedSlug === room.slug;
            const displayTitle = currentLanguage === 'VI' ? room.titleVi : room.titleEn;

            return (
              <div
                key={room.id}
                className="flex flex-col gap-2.5 sm:gap-3 group cursor-pointer"
                onClick={() => setSelectedRoom(room)}
              >
                {/* Photo container: aspect-[4/5], rounded corners, hover scale */}
                <div className="relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl lg:rounded-[1.25rem] overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                  <img
                    src={room.image}
                    alt={displayTitle}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                  />

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Category Chip in corner */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5">
                    <span className="px-2 sm:px-2.5 py-0.5 bg-black/65 backdrop-blur-md text-[9px] sm:text-[10px] uppercase tracking-wider text-[#d0d0d0] rounded-full border border-white/10 font-medium">
                      {room.category === 'living-room' && (currentLanguage === 'VI' ? 'Phòng khách' : 'Living room')}
                      {room.category === 'cabinet' && (currentLanguage === 'VI' ? 'Phòng làm việc' : 'Home Office')}
                      {room.category === 'bedroom' && (currentLanguage === 'VI' ? 'Phòng ngủ' : 'Bedroom')}
                      {room.category === 'dining-room' && (currentLanguage === 'VI' ? 'Phòng ăn' : 'Dining room')}
                    </span>
                  </div>

                  {/* Zoom hint on hover */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Row: "Xem chi tiết" / "Explore Space" link + Share button */}
                <div className="w-full flex items-center justify-between pt-0.5 px-0.5 text-xs text-[#999]">
                  <div className="flex items-center gap-1.5 group/btn">
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#e0e0e0] font-medium group-hover/btn:text-[#aeb8c2] group-hover:text-[#aeb8c2] transition-colors border-b border-transparent group-hover/btn:border-[#aeb8c2]">
                      {t.details}
                    </span>
                    <span className="text-xs text-[#aeb8c2] transition-transform group-hover/btn:translate-x-1 duration-200">
                      →
                    </span>
                  </div>

                  {/* Share button */}
                  <div className="relative">
                    <button
                      onClick={(e) => handleShare(room.slug, e)}
                      className="p-1.5 rounded-full text-[#888] hover:text-white hover:bg-[#222] transition-colors cursor-pointer"
                      title="Share link"
                      aria-label="Share room"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {isCopied && (
                      <span className="absolute bottom-full right-0 mb-2 px-2 py-0.5 bg-white text-black text-[9px] font-medium tracking-wide uppercase rounded shadow-lg whitespace-nowrap z-30">
                        {t.shareTooltip}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-gradient-to-r from-[#181818] to-[#1f1f1f] border border-[#303030] rounded-2xl md:rounded-[1.75rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#aeb8c2] font-semibold">
              Studia 54 Bespoke Atelier
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-white font-philosopher uppercase">
              {currentLanguage === 'VI'
                ? 'Hiện thực hóa không gian sống hoàn mỹ cùng chúng tôi'
                : 'Bring your luxury architectural vision to reality'}
            </h3>
            <p className="text-xs sm:text-sm text-[#8f8f8f] max-w-xl">
              {currentLanguage === 'VI'
                ? 'Đội ngũ chuyên gia kiến trúc B+ON sẵn sàng tư vấn lựa chọn đồ rời, tùy chỉnh kích thước theo bản vẽ mặt bằng và gửi trọn bộ mẫu vật liệu thực tế.'
                : 'B+ON architectural concierges are available to assist with custom parametric sizing, 3D shop drawings, and tailored finishes.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#aeb8c2] hover:bg-white text-[#141414] font-medium text-xs uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(174,184,194,0.3)] cursor-pointer text-center"
              >
                {t.consultationCTA}
              </button>
            )}
            {onOpenCatalogDownload && (
              <button
                onClick={onOpenCatalogDownload}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#444] hover:border-white text-[#d0d0d0] hover:text-white text-xs uppercase tracking-[0.16em] rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadCatalog}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
