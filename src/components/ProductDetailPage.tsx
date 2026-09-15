import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Box,
  Download,
  Camera,
  Check,
  ChevronDown,
  Sparkles,
  Shield,
  Layers,
  Clock,
  PhoneCall,
  X,
  Maximize2,
  ExternalLink,
  Info,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { Product, AppLanguage, ProductColorSwatch } from '../types';
import { PRODUCTS } from '../data/furnitureData';
import { getProductName, getProductDescription } from '../utils/i18n';
import { parseAndFormatVND, formatVND } from '../utils/currency';

interface ProductDetailPageProps {
  product: Product;
  onBackToCatalog: (subcat?: string, mainCat?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  currentLanguage: AppLanguage;
  onOpenConsultationWithProduct: (product: Product, sizeLabel?: string, swatchName?: string) => void;
  onOpenCustomizer?: (product: Product) => void;
  onSelectRelatedProduct?: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToCatalog,
  onToggleWishlist,
  isWishlisted,
  currentLanguage,
  onOpenConsultationWithProduct,
  onOpenCustomizer,
  onSelectRelatedProduct,
}) => {
  const lang = currentLanguage;

  // Media items (Video + Images)
  const isArtistry = product.id.includes('artistry');
  const videoUrl = product.videoUrl || (isArtistry ? 'https://cdn.fiftyfourms.com/ARTISTRY_2_5157ed9ff7.mp4' : undefined);

  interface MediaItem {
    type: 'video' | 'image';
    url: string;
    thumb?: string;
  }

  const mediaItems: MediaItem[] = [];
  if (videoUrl) {
    mediaItems.push({
      type: 'video',
      url: videoUrl,
      thumb: product.images[0] || 'https://media.fiftyfourms.com/Artistry_34_spruce_podsvetka_ee61e7d46e.webp',
    });
  }
  product.images.forEach((img) => {
    mediaItems.push({
      type: 'image',
      url: img,
      thumb: img,
    });
  });

  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Video state & controls for main media
  const galleryVideoRef = useRef<HTMLVideoElement>(null);
  const [isGalleryVideoPlaying, setIsGalleryVideoPlaying] = useState(true);
  const [isGalleryVideoMuted, setIsGalleryVideoMuted] = useState(true);

  // Manufacture video in lower section
  const atelierVideoRef = useRef<HTMLVideoElement>(null);
  const [isAtelierVideoPlaying, setIsAtelierVideoPlaying] = useState(true);
  const [isAtelierVideoMuted, setIsAtelierVideoMuted] = useState(true);

  // Size variants - dynamically calculated for any product
  const defaultCalculatedSizes = useMemo(() => {
    const d = product.dimensions;
    const baseW = d.width;
    const baseD = d.depth;
    const baseH = d.height;
    const basePriceVnd = product.priceVnd || (product.priceRub ? Math.round(product.priceRub * 280 / 1000) * 1000 : undefined);
    const xlPriceVnd = basePriceVnd ? Math.round(basePriceVnd * 1.15 / 1000) * 1000 : undefined;

    return [
      {
        id: `size-${baseW}x${baseD}`,
        label: `${baseW}×${baseD}`,
        dimensions: `${baseW} × ${baseD} × ${baseH} cm`,
        sku: product.sku,
        priceRub: product.priceRub,
        priceVnd: basePriceVnd,
        priceFormatted: parseAndFormatVND(product.priceFormatted || basePriceVnd, lang),
      },
      {
        id: `size-${Math.round(baseW * 1.15)}x${baseD}`,
        label: `${Math.round(baseW * 1.15)}×${baseD}`,
        dimensions: `${Math.round(baseW * 1.15)} × ${baseD} × ${baseH} cm`,
        sku: `${product.sku}-XL`,
        priceRub: product.priceRub ? Math.round(product.priceRub * 1.15) : undefined,
        priceVnd: xlPriceVnd,
        priceFormatted: xlPriceVnd
          ? `${formatVND(xlPriceVnd, { showPrefix: true, lang })} (Grand)`
          : (product.priceFormatted ? `${parseAndFormatVND(product.priceFormatted, lang)} (Grand)` : (lang === 'VI' ? 'Giá liên hệ' : 'Price on inquiry')),
      },
    ];
  }, [product, lang]);

  const sizeVariants =
    product.sizeVariants && product.sizeVariants.length > 0
      ? product.sizeVariants
      : defaultCalculatedSizes;

  const [selectedSizeId, setSelectedSizeId] = useState<string>(sizeVariants[0]?.id || 'default');
  const activeSize = sizeVariants.find((s) => s.id === selectedSizeId) || sizeVariants[0];

  // Color Swatches - dynamically calculated for any product
  const defaultCalculatedSwatches: ProductColorSwatch[] = useMemo(() => {
    return [
      {
        id: `swatch-${product.id}-original`,
        name: product.shade || (lang === 'VI' ? 'Sắc thái nguyên bản' : 'Original Finish'),
        shadeLabel: product.shade || 'Original finish',
        shadeLabelVi: product.shadeVi || product.shade || 'Sắc thái nguyên bản',
        colorHex: '#383634',
        image: product.images[0],
        priceFormatted: product.priceFormatted,
      },
      {
        id: `swatch-${product.id}-taupe`,
        name: 'Tuscan Taupe',
        shadeLabel: 'Tuscan Taupe',
        shadeLabelVi: 'Nâu hạt dẻ Tuscany',
        colorHex: '#8e847c',
        image: product.images[1] || product.images[0],
        priceFormatted: product.priceFormatted,
      },
      {
        id: `swatch-${product.id}-graphite`,
        name: 'Graphite Slate',
        shadeLabel: 'Graphite Slate',
        shadeLabelVi: 'Xám than chì Graphite',
        colorHex: '#25262a',
        image: product.images[2] || product.images[0],
        priceFormatted: product.priceFormatted,
      },
      {
        id: `swatch-${product.id}-ivory`,
        name: 'Ivory Mist',
        shadeLabel: 'Ivory Mist',
        shadeLabelVi: 'Trắng kem Ivory',
        colorHex: '#e5e1d8',
        image: product.images[3] || product.images[0],
        priceFormatted: product.priceFormatted,
      },
    ];
  }, [product, lang]);

  const swatches: ProductColorSwatch[] =
    product.colorSwatches && product.colorSwatches.length > 0
      ? product.colorSwatches
      : defaultCalculatedSwatches;

  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState<number>(0);
  const activeSwatch = swatches[selectedSwatchIdx] || swatches[0];

  // Accordions state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    specs: true,
    care: false,
    delivery: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Modals
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [isAllSwatchesModalOpen, setIsAllSwatchesModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Hotspots state
  interface RoomHotspot {
    id: string;
    title: { VI: string; EN: string };
    price: string;
    image: string;
    x: number; // percentage
    y: number; // percentage
    productSku: string;
  }

  const roomHotspots: RoomHotspot[] = useMemo(() => {
    return [
      {
        id: `hs-${product.id}`,
        title: {
          VI: lang === 'VI' && product.nameVi ? product.nameVi : product.name,
          EN: product.nameEn || product.name,
        },
        price: parseAndFormatVND(product.priceFormatted, lang),
        image: product.images[0],
        x: 52,
        y: 56,
        productSku: product.sku,
      },
      {
        id: 'hs-companion-1',
        title: {
          VI: 'Đôn đệm bọc da cao cấp B+ON',
          EN: 'B+ON Leather Companion Pouf',
        },
        price: lang === 'VI' ? '51.800.000 VNĐ' : '51,800,000 VNĐ',
        image: 'https://cdn.fiftyfourms.com/Ambitus2400_F_tkach_leather_tortora_ba41c54bcb.webp',
        x: 31,
        y: 68,
        productSku: 'B-PF1',
      },
      {
        id: 'hs-companion-2',
        title: {
          VI: 'Đèn sàn kiến trúc B+ON Atelier',
          EN: 'B+ON Architectural Floor Lamp',
        },
        price: lang === 'VI' ? '33.600.000 VNĐ' : '33,600,000 VNĐ',
        image: 'https://cdn.fiftyfourms.com/Artistry_web_ver3_420b2feab8.webp',
        x: 77,
        y: 42,
        productSku: 'B-LP1',
      },
    ];
  }, [product, lang]);

  const [activeHotspot, setActiveHotspot] = useState<RoomHotspot | null>(roomHotspots[0]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadPdf = () => {
    if (product.pdfUrl) {
      window.open(product.pdfUrl, '_blank');
    } else {
      window.open('https://cdn.fiftyfourms.com/PS_Artistry_09eac8a743.pdf', '_blank');
    }
  };

  const activeMedia = mediaItems[activeMediaIdx] || mediaItems[0];
  const currentDisplayImage =
    activeMedia?.type === 'image'
      ? activeMedia.url
      : activeSwatch?.image || product.images[0];

  // Subcategory human labels (plural sentence case matching FiftyFourMS official site)
  const subcategoryLabels: Record<string, { VI: string; EN: string }> = {
    'bedside-tables': { VI: 'Tủ đầu giường', EN: 'Bedside tables' },
    beds: { VI: 'Giường ngủ', EN: 'Beds' },
    sofas: { VI: 'Sofa', EN: 'Sofas' },
    'coffee-tables': { VI: 'Bàn trà', EN: 'Coffee tables' },
    'dining-tables': { VI: 'Bàn ăn', EN: 'Dining tables' },
    armchairs: { VI: 'Ghế bành', EN: 'Armchairs' },
    consoles: { VI: 'Bàn console', EN: 'Consoles' },
    sideboards: { VI: 'Tủ buffet', EN: 'Sideboards' },
    'tv-stands': { VI: 'Kệ TV', EN: 'TV stands' },
    'dressing-tables': { VI: 'Bàn trang điểm', EN: 'Dressing tables' },
    desks: { VI: 'Bàn làm việc', EN: 'Desks' },
    chairs: { VI: 'Ghế ăn', EN: 'Chairs' },
    banquettes: { VI: 'Ghế băng dài', EN: 'Banquettes' },
    couches: { VI: 'Ghế lounger', EN: 'Couches' },
    poufs: { VI: 'Đôn ngồi', EN: 'Poufs' },
  };

  const productName = lang === 'VI' && product.nameVi ? product.nameVi : product.name;

  const subcatName =
    subcategoryLabels[product.subcategory]?.[lang] ||
    (lang === 'VI' ? 'Nội thất B+ON' : 'B+ON Furniture');

  // Top Panoramic Banner Slides
  const getBannerSlides = (): string[] => {
    if (product.id.includes('artistry') || product.sku === 'AT1A1') {
      return [
        'https://cdn.fiftyfourms.com/Artistry_F_spruce_fd157be931.webp',
        'https://media.fiftyfourms.com/Artistry_web_1_98c95d5c6c.webp',
        'https://cdn.fiftyfourms.com/Artistry_web_ver3_420b2feab8.webp',
        'https://cdn.fiftyfourms.com/Artistry_web_2_bb79544541.webp',
        'https://cdn.fiftyfourms.com/68_Fadeeva_1_8004c2b8b8.webp',
        'https://media.fiftyfourms.com/Artistry_34_spruce_podsvetka_ee61e7d46e.webp',
      ];
    }
    const list: string[] = [];
    if (product.heroImage) list.push(product.heroImage);
    if (product.editorial?.styleImage && !list.includes(product.editorial.styleImage)) {
      list.push(product.editorial.styleImage);
    }
    if (product.editorial?.inspirationImage && !list.includes(product.editorial.inspirationImage)) {
      list.push(product.editorial.inspirationImage);
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    if (list.length === 0) {
      list.push('https://media.fiftyfourms.com/photo_1_1_1af374055f.webp');
    }
    return list;
  };

  const bannerSlides = getBannerSlides();
  const [activeBannerSlide, setActiveBannerSlide] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  useEffect(() => {
    if (bannerSlides.length <= 1 || isBannerHovered) return;
    const timer = setInterval(() => {
      setActiveBannerSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [bannerSlides.length, isBannerHovered]);

  const handlePrevBannerSlide = () => {
    setActiveBannerSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const handleNextBannerSlide = () => {
    setActiveBannerSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const handleScrollToProductDetails = () => {
    const el = document.getElementById('product-configuration-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#e5e5e5] font-manrope selection:bg-[#444] selection:text-white pt-0 pb-24">
      {/* ======================================================== */}
      {/* HERO BANNER SLIDER (Panoramic Architectural Carousel) */}
      {/* Matches user screenshot image.png format */}
      {/* ======================================================== */}
      <section
        className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[84vh] min-h-[520px] max-h-[860px] overflow-hidden bg-[#0d0d0d] select-none group"
        onMouseEnter={() => setIsBannerHovered(true)}
        onMouseLeave={() => setIsBannerHovered(false)}
      >
        {/* Banner Images Carousel */}
        {bannerSlides.map((slideUrl, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeBannerSlide === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={slideUrl}
              alt={`${product.name} panoramic slide ${idx + 1}`}
              className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                activeBannerSlide === idx ? 'scale-105' : 'scale-100'
              }`}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Top Vignette Overlay (Protects Header text contrast) */}
        <div className="absolute inset-x-0 top-0 h-44 sm:h-56 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

        {/* Bottom Vignette Overlay (Smooth transition into product section) */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent pointer-events-none z-10" />

        {/* Top-Left Back Pill Button ("< Dressing tables" / "< Tủ buffet") with generous spacing below header */}
        <div className="absolute top-[84px] sm:top-[96px] lg:top-[144px] xl:top-[152px] left-4 sm:left-8 lg:left-12 z-20">
          <button
            id="back-to-category-pill-btn"
            onClick={() => onBackToCatalog(product.subcategory, product.mainCategory)}
            className="inline-flex items-center gap-2 sm:gap-2.5 text-[14px] sm:text-[15px] font-manrope font-normal text-white bg-[#555555]/95 hover:bg-[#636363] active:bg-[#4a4a4a] backdrop-blur-md px-5 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-md select-none active:scale-[0.98]"
            title={lang === 'VI' ? `Quay lại ${subcatName}` : `Back to ${subcatName}`}
          >
            <ChevronLeft className="w-4 h-4 text-white stroke-[1.75]" />
            <span className="leading-none">{subcatName}</span>
          </button>
        </div>

        {/* Slide Previous / Next Arrows */}
        {bannerSlides.length > 1 && (
          <>
            <button
              onClick={handlePrevBannerSlide}
              aria-label="Previous slide"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/85 border border-white/15 hover:border-white/40 text-white/85 hover:text-white flex items-center justify-center backdrop-blur-md transition-all sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNextBannerSlide}
              aria-label="Next slide"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/85 border border-white/15 hover:border-white/40 text-white/85 hover:text-white flex items-center justify-center backdrop-blur-md transition-all sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Bottom-Center Down Chevron (as circled in user screenshot) */}
        <button
          onClick={handleScrollToProductDetails}
          aria-label="Scroll to product details"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer group"
          title={lang === 'VI' ? 'Cuộn xem thông số chi tiết' : 'Scroll to details'}
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </section>

      {/* SECTION: Main Product Configuration & Gallery */}
      <section id="product-configuration-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Gallery (Thumbnails + Main Media Stage) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical / Horizontal Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[580px] scrollbar-none shrink-0">
              {mediaItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIdx(idx)}
                  className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    activeMediaIdx === idx
                      ? 'border-white ring-1 ring-white/60'
                      : 'border-[#2a2a2a] opacity-60 hover:opacity-100 hover:border-[#555]'
                  }`}
                >
                  <img
                    src={item.thumb || item.url}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                        <Play className="w-3 h-3 text-black fill-black ml-0.5" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Main Stage */}
            <div className="relative flex-1 aspect-square sm:aspect-[4/4.2] bg-[#161616] rounded-2xl overflow-hidden border border-[#222222] group">
              {activeMedia?.type === 'video' ? (
                <div className="relative w-full h-full">
                  <video
                    ref={galleryVideoRef}
                    src={activeMedia.url}
                    poster={activeMedia.thumb}
                    autoPlay
                    loop
                    muted={isGalleryVideoMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Video Controls */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-10">
                    <button
                      onClick={() => {
                        if (!galleryVideoRef.current) return;
                        if (galleryVideoRef.current.paused) {
                          galleryVideoRef.current.play();
                          setIsGalleryVideoPlaying(true);
                        } else {
                          galleryVideoRef.current.pause();
                          setIsGalleryVideoPlaying(false);
                        }
                      }}
                      className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    >
                      {isGalleryVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    </button>
                    <button
                      onClick={() => {
                        if (!galleryVideoRef.current) return;
                        galleryVideoRef.current.muted = !galleryVideoRef.current.muted;
                        setIsGalleryVideoMuted(galleryVideoRef.current.muted);
                      }}
                      className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    >
                      {isGalleryVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={currentDisplayImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
              )}

              {/* Lightbox / Zoom Trigger */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white/80 hover:text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                title={lang === 'VI' ? 'Xem toàn màn hình' : 'Fullscreen view'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="text-[10px] font-manrope tracking-[0.2em] uppercase bg-white/15 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full font-medium">
                  {lang === 'VI' && product.shadeVi ? product.shadeVi : (product.shade || 'FLORENTINE GREEN')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs, Sizing, Pricing & Actions */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Brand Logo & Design Studio */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <img
                src="/bon-logo.png"
                alt="B+ON"
                className="h-6 w-auto object-contain opacity-90"
              />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8e8e93] font-mono">
                Studia 54 Design
              </span>
            </div>

            {/* ID & Subcategory */}
            <div className="flex items-center justify-between text-xs font-manrope text-[#868686] mb-2 tracking-[0.18em] uppercase">
              <span>ID: {activeSize?.sku || product.sku}</span>
              <span className="text-[#a0a0a0]">{subcatName}</span>
            </div>

            {/* Product Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-philosopher uppercase tracking-[0.08em] sm:tracking-[0.12em] text-white font-normal leading-tight mb-4">
              {lang === 'VI' && product.nameVi ? product.nameVi : product.name}
            </h2>

            {/* Price Section */}
            <div className="mb-6 pb-6 border-b border-[#262626]">
              <span className="text-xs font-manrope tracking-[0.18em] uppercase text-[#868686] block mb-1 font-light">
                {lang === 'VI' ? 'Giá tham khảo' : 'Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-manrope font-light text-white tracking-wide">
                  {parseAndFormatVND(activeSize?.priceFormatted || product.priceFormatted, lang)}
                </span>
              </div>
              <p className="text-xs font-manrope text-[#767676] mt-1.5 font-light">
                {lang === 'VI'
                  ? '* Mức giá trên là giá ước tính, chưa bao gồm các tùy chọn hoàn thiện đặc biệt.'
                  : '* This price is approximate and is not final.'}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-5">
              <span className="text-xs font-manrope uppercase tracking-[0.18em] text-[#868686] block mb-2.5 font-light">
                {lang === 'VI' ? 'Kích thước (D x R x C)' : 'Dimensions (W x D x H)'}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {sizeVariants.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSizeId(s.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-manrope font-medium tracking-[0.12em] uppercase transition-all cursor-pointer ${
                      selectedSizeId === s.id
                        ? 'border border-white text-white bg-[#262626] shadow-sm'
                        : 'border border-[#333333] text-[#888888] hover:border-[#666666] hover:text-white bg-[#161616]'
                    }`}
                  >
                    <span>{s.dimensions || s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Swatch & Color Finishes */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-manrope uppercase tracking-[0.18em] text-[#868686] mb-3 font-light">
                <span>
                  {lang === 'VI' ? 'Sắc màu bề mặt:' : 'Material & Shade:'}
                </span>
                <span className="text-white font-medium">
                  {lang === 'VI'
                    ? (activeSwatch?.shadeLabelVi || activeSwatch?.name)
                    : (activeSwatch?.shadeLabel || activeSwatch?.name)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {swatches.slice(0, 4).map((swatch, idx) => (
                  <button
                    key={swatch.id}
                    onClick={() => {
                      setSelectedSwatchIdx(idx);
                      if (swatch.image) {
                        const existingImgIdx = mediaItems.findIndex((m) => m.url === swatch.image);
                        if (existingImgIdx !== -1) {
                          setActiveMediaIdx(existingImgIdx);
                        }
                      }
                    }}
                    className={`relative w-11 h-11 rounded-full overflow-hidden transition-all cursor-pointer ${
                      selectedSwatchIdx === idx
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#111] scale-105'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    title={lang === 'VI' && swatch.shadeLabelVi ? swatch.shadeLabelVi : (swatch.shadeLabel || swatch.name)}
                  >
                    <span
                      className="absolute inset-0 w-full h-full block"
                      style={{ backgroundColor: swatch.colorHex }}
                    />
                    {swatch.image && (
                      <img
                        src={swatch.image}
                        alt={swatch.name}
                        className="w-full h-full object-cover relative z-10 opacity-90"
                      />
                    )}
                  </button>
                ))}

                {/* +20 Swatches Button */}
                <button
                  onClick={() => setIsAllSwatchesModalOpen(true)}
                  className="h-11 px-3.5 rounded-full border border-[#333] hover:border-[#666] bg-[#1a1a1a] text-xs font-manrope text-[#aaa] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  title={lang === 'VI' ? 'Xem tất cả mẫu màu' : 'View all swatches'}
                >
                  <span>+20</span>
                </button>
              </div>
            </div>

            {/* Action 1: Add to Cart / Consultation (Rounded Full) */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() =>
                  onOpenConsultationWithProduct(
                    product,
                    activeSize?.label,
                    lang === 'VI' ? (activeSwatch?.shadeLabelVi || activeSwatch?.name) : (activeSwatch?.shadeLabel || activeSwatch?.name)
                  )
                }
                className="w-full py-4 rounded-full bg-white hover:bg-[#d8d8d8] text-black text-xs sm:text-sm font-manrope font-semibold uppercase tracking-[0.16em] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>{lang === 'VI' ? 'THÊM VÀO GIỎ HÀNG / ĐẶT HÀNG' : 'ADD TO CART / ORDER'}</span>
              </button>

              {/* Bespoke notice */}
              <div className="text-[11px] font-manrope text-[#868686] flex items-center justify-center gap-2 text-center pt-1 font-light">
                <Clock className="w-3.5 h-3.5 text-[#a0a0a0] shrink-0" />
                <span>
                  {lang === 'VI'
                    ? 'Sản xuất theo đơn đặt hàng tại xưởng St. Petersburg. Thời gian bàn giao: 60 ngày.'
                    : 'Custom made to order at our St. Petersburg atelier. Production time: 60 days.'}
                </span>
              </div>
            </div>

            {/* Action Row 2: 3D, PDF, AR (Rounded Full) */}
            <div className="grid grid-cols-3 gap-2.5 mb-8">
              <button
                onClick={() => setIs3DModalOpen(true)}
                className="py-2.5 px-3 rounded-full border border-[#2e2e2e] hover:border-[#555] bg-[#161616] hover:bg-[#1f1f1f] text-xs font-manrope text-[#bbb] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Box className="w-3.5 h-3.5" />
                <span className="truncate">{lang === 'VI' ? 'TẢI FILE 3D' : '3D MODEL'}</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                className="py-2.5 px-3 rounded-full border border-[#2e2e2e] hover:border-[#555] bg-[#161616] hover:bg-[#1f1f1f] text-xs font-manrope text-[#bbb] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="truncate">PDF ⤓</span>
              </button>

              <button
                onClick={() => setIsARModalOpen(true)}
                className="py-2.5 px-3 rounded-full border border-[#2e2e2e] hover:border-[#555] bg-[#161616] hover:bg-[#1f1f1f] text-xs font-manrope text-[#bbb] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="truncate">{lang === 'VI' ? 'AR (3D)' : 'TRY IN AR'}</span>
              </button>
            </div>

            {/* Accordions: Specs, Materials & Care, Delivery */}
            <div className="border-t border-[#262626] divide-y divide-[#262626]">
              {/* SPECIFICATIONS */}
              <div>
                <button
                  onClick={() => toggleAccordion('specs')}
                  className="w-full py-4.5 flex items-center justify-between text-xs sm:text-[13px] font-manrope tracking-[0.18em] uppercase text-[#e0e0e0] hover:text-white transition-colors font-medium cursor-pointer"
                >
                  <span>{lang === 'VI' ? 'THÔNG TIN KỸ THUẬT' : 'SPECIFICATIONS'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordions.specs ? 'rotate-180 text-white' : 'text-[#767676]'
                    }`}
                  />
                </button>
                {openAccordions.specs && (
                  <div className="pb-5 text-xs sm:text-[13px] font-manrope text-[#969696] space-y-2.5 font-light">
                    <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                      <span className="text-[#767676]">{lang === 'VI' ? 'Kích thước (D x R x C):' : 'Dimensions (L x W x H):'}</span>
                      <span className="text-white font-mono">{activeSize?.dimensions || `${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height} cm`}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                      <span className="text-[#767676]">{lang === 'VI' ? 'Vật liệu chế tác:' : 'Materials:'}</span>
                      <span className="text-white text-right max-w-[60%]">
                        {product.materials && product.materials.length > 0
                          ? product.materials.join(', ')
                          : (lang === 'VI'
                            ? 'Da bò tự nhiên Ý / Gỗ sồi quý / Kim loại mạ PVD'
                            : 'Italian natural leather / Fine wood veneer / PVD metal')}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                      <span className="text-[#767676]">{lang === 'VI' ? 'Sắc thái & Hoàn thiện:' : 'Shade & Finish:'}</span>
                      <span className="text-white text-right">
                        {product.shadeVi && lang === 'VI' ? product.shadeVi : product.shade || activeSwatch?.name || (lang === 'VI' ? 'Tiêu chuẩn thủ công B+ON' : 'B+ON craft standard')}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                      <span className="text-[#767676]">{lang === 'VI' ? 'Tiêu chuẩn hoàn thiện:' : 'Assembly standard:'}</span>
                      <span className="text-white">{lang === 'VI' ? 'Chuẩn kỹ thuật B+ON' : 'B+ON Atelier Standard'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#767676]">{lang === 'VI' ? 'Tuổi thọ sử dụng:' : 'Service life:'}</span>
                      <span className="text-white font-mono">{lang === 'VI' ? '20 năm' : '20 years'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* MATERIALS & CARE */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-4.5 flex items-center justify-between text-xs sm:text-[13px] font-manrope tracking-[0.18em] uppercase text-[#e0e0e0] hover:text-white transition-colors font-medium cursor-pointer"
                >
                  <span>{lang === 'VI' ? 'VẬT LIỆU & BẢO QUẢN' : 'MATERIALS & CARE'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordions.care ? 'rotate-180 text-white' : 'text-[#767676]'
                    }`}
                  />
                </button>
                {openAccordions.care && (
                  <div className="pb-5 text-xs sm:text-[13px] font-manrope text-[#969696] space-y-2 leading-relaxed font-light">
                    <p>
                      {lang === 'VI'
                        ? 'Vật liệu tự nhiên cao cấp được xử lý chống ẩm và kháng bụi chuyên sâu theo công nghệ Châu Âu. Vệ sinh định kỳ bằng khăn mềm sạch, tránh các chất tẩy rửa có tính kiềm mạnh.'
                        : 'Premium natural materials treated with hydrophobic and anti-dust nano-coatings. Clean periodically with a soft dry cloth and neutral care agents.'}
                    </p>
                    <p>
                      {lang === 'VI'
                        ? 'Bảo quản sản phẩm trong không gian thông thoáng, nhiệt độ phòng tiêu chuẩn để giữ trọn vẹn kết cấu da, vân gỗ và độ bóng kim loại vĩnh cửu.'
                        : 'Maintain in climate-controlled spaces to preserve authentic texture, leather elasticity, and pristine architectural luster.'}
                    </p>
                  </div>
                )}
              </div>

              {/* DELIVERY & ASSEMBLY */}
              <div>
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full py-4.5 flex items-center justify-between text-xs sm:text-[13px] font-manrope tracking-[0.18em] uppercase text-[#e0e0e0] hover:text-white transition-colors font-medium cursor-pointer"
                >
                  <span>{lang === 'VI' ? 'GIAO HÀNG & LẮP ĐẶT' : 'DELIVERY & ASSEMBLY'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordions.delivery ? 'rotate-180 text-white' : 'text-[#767676]'
                    }`}
                  />
                </button>
                {openAccordions.delivery && (
                  <div className="pb-5 text-xs sm:text-[13px] font-manrope text-[#969696] space-y-2.5 leading-relaxed font-light">
                    <p>
                      {lang === 'VI'
                        ? 'Đóng kiện gỗ chuyên dụng chống sốc đạt chuẩn xuất khẩu Châu Âu (White-Glove Delivery).'
                        : 'Delivered in reinforced bespoke wooden export crating with white-glove setup and positioning.'}
                    </p>
                    <p>
                      {lang === 'VI'
                        ? 'Đội ngũ kỹ thuật viên B+ON trực tiếp vận chuyển, căn chỉnh cân bằng tuyệt đối và bàn giao hoàn thiện tại công trình.'
                        : 'Trained B+ON engineers handle on-site assembly, leveling calibration, and white-glove handover.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PROMOTIONAL BANNER: Furniture in Stock -20% Off */}
        <div className="mt-16 bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <h3 className="text-xl sm:text-2xl font-philosopher text-white font-normal tracking-wide">
              {lang === 'VI'
                ? 'Nội thất B+ON sẵn sàng tại kho ưu đãi -20%'
                : 'B+ON furniture in stock -20% off'}
            </h3>
            <p className="text-xs sm:text-[13px] font-manrope text-[#969696] leading-relaxed font-light">
              {lang === 'VI'
                ? 'Màu sắc hoặc cấu hình thực tế của sản phẩm có thể khác biệt nhẹ so với hình ảnh hiển thị trên website. Một số mẫu có sẵn với số lượng giới hạn. Điều khoản ưu đãi áp dụng theo từng đợt sản xuất. Quý khách vui lòng liên hệ chuyên viên để xác nhận thiết kế hiện hữu và giá tốt nhất.'
                : 'The actual color or configuration of the item may differ from the one shown in the photos on the website. Some models are available in multiple copies. Special terms apply to the price listed. Please contact our manager to confirm the current design, quantity, and final price.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenConsultationWithProduct(product, 'Stock Promo', 'In-stock -20%')}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#d0d0d0] text-black text-xs font-manrope font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer"
              >
                {lang === 'VI' ? 'Liên hệ chuyên viên' : 'CONTACT THE MANAGER'}
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 lg:w-96 h-48 sm:h-56 rounded-xl overflow-hidden shrink-0 border border-[#2a2a2a]">
            <img
              src="https://cdn.fiftyfourms.com/Elephant_17_d41edd2ac7.webp"
              alt="In stock furniture"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* SECTION 0: The aesthetics of a premium piece in details (Vẻ đẹp kiệt tác trong từng chi tiết) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="md:col-span-6">
            <div className="aspect-[4/5] rounded-[1.75rem] overflow-hidden border border-[#262626] bg-[#161616]">
              <img
                src={product.editorial?.detailImage || product.images[1] || product.images[0] || 'https://cdn.fiftyfourms.com/68_Fadeeva_1_8004c2b8b8.webp'}
                alt={`${productName} in detail`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center space-y-6 md:pl-4">
            <div className="h-10 flex items-center justify-start">
              <img
                src="/bon-logo.png"
                alt="B+ON"
                className="h-8 w-auto object-contain opacity-90"
              />
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-philosopher text-white font-normal tracking-wide leading-tight">
              {lang === 'VI'
                ? 'Vẻ đẹp kiệt tác trong từng chi tiết'
                : 'The aesthetics of a premium piece in details'}
            </h3>

            <p className="text-xs sm:text-sm font-manrope text-[#969696] leading-relaxed font-light tracking-wide">
              {product.editorial?.detailDescription?.[lang] ||
                (lang === 'VI'
                  ? `Công năng tiện nghi được tối ưu hóa trên tuyệt phẩm ${productName}, cùng vẻ đẹp hiện diện ở mọi góc nhìn: trong từng đường nét chuẩn mực, sự hòa quyện giữa các chất liệu thượng hạng và chiều sâu nghệ thuật tinh tế của không gian sống.`
                  : `Functionality is flawlessly calibrated in the ${productName}, where refined proportions, tactile harmony of noble materials, and artisanal mastery reign supreme.`)}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: From concept to realization (Từ ý tưởng đến hiện thực) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="md:col-span-6 space-y-6 md:pr-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-philosopher text-white font-normal tracking-wide leading-tight">
              {lang === 'VI' ? 'Từ ý tưởng đến hiện thực' : 'From concept to realization'}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-manrope text-[#969696] leading-relaxed font-light tracking-wide">
              <p>
                {lang === 'VI'
                  ? `Mẫu thử đầu tiên của ${productName} đã trải qua hàng chục giai đoạn tinh chỉnh khắt khe – từ ý tưởng hình học không gian nguyên bản đến việc căn chỉnh từng điểm chịu lực ẩn và tuyển chọn những dải vật liệu cao cấp nhất.`
                  : `The initial prototype of ${productName} underwent dozens of rigorous refinement stages — from its architectural geometry to structural calibration and selecting exquisite finishes.`}
              </p>
              <p>
                {lang === 'VI'
                  ? 'Kết quả là, thông qua kỹ nghệ thủ công cẩn trọng, B+ON tạo nên một chuẩn mực thẩm mỹ thanh thoát, tôn vinh nét quyến rũ kiêu sa và bản sắc độc bản của gia chủ.'
                  : 'Through meticulous handcrafting, B+ON manifests timeless sculptural elegance, underscoring the authentic prestige of luxury interior design.'}
              </p>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-[#262626] bg-[#161616]">
              <img
                src={product.editorial?.conceptImage || product.images[2] || product.images[0] || 'https://cdn.fiftyfourms.com/1_artistry_7d3accfb32.webp'}
                alt="From idea to realization"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Premium materials and flawless quality (Vật liệu thượng hạng và chất lượng) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="md:col-span-6">
            <div className="aspect-[4/4.5] rounded-[1.75rem] overflow-hidden border border-[#262626] bg-[#161616]">
              <img
                src={product.editorial?.materialsImage || product.images[3] || product.images[0] || 'https://cdn.fiftyfourms.com/Artistry_web_1_98c95d5c6c.webp'}
                alt="Premium materials and flawless quality"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-6 md:pl-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-philosopher text-white font-normal tracking-wide leading-tight">
              {lang === 'VI'
                ? 'Vật liệu thượng hạng và chất lượng không tì vết'
                : 'Premium materials and flawless quality'}
            </h3>

            <p className="text-xs sm:text-sm font-manrope text-[#969696] leading-relaxed font-light tracking-wide">
              {lang === 'VI'
                ? `Phương pháp xử lý thủ công cùng sự bảo tồn kỹ lưỡng vân tự nhiên mang lại cho ${productName} ánh sáng sang trọng và độ bền vĩnh cửu. Phụ kiện cấu trúc tinh vi cùng độ êm ái tuyệt đối biến trải nghiệm sử dụng hàng ngày thành nghi thức nghệ thuật đích thực.`
                : `Masterful surface processing and careful preservation of natural textures lend the ${productName} unmatched luster and longevity, turning everyday living into a ritual of genuine pleasure.`}
            </p>

            <div className="pt-2">
              <button
                onClick={() =>
                  onOpenConsultationWithProduct(
                    product,
                    activeSize?.label,
                    lang === 'VI' ? (activeSwatch?.shadeLabelVi || activeSwatch?.name) : (activeSwatch?.shadeLabel || activeSwatch?.name)
                  )
                }
                className="px-8 py-3.5 rounded-full bg-white hover:bg-[#d0d0d0] text-black text-xs font-manrope font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer"
              >
                {lang === 'VI' ? `ĐẶT HÀNG ${productName.toUpperCase()}` : `ORDER ${productName.toUpperCase()}`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Italian traditions and global recognition (Truyền thống Ý & Danh tiếng) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="md:col-span-6 space-y-6 md:pr-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-philosopher text-white font-normal tracking-wide leading-tight">
              {lang === 'VI'
                ? 'Truyền thống Ý & Danh tiếng Quốc tế'
                : 'Italian traditions and global recognition'}
            </h3>

            <p className="text-xs sm:text-sm font-manrope text-[#969696] leading-relaxed font-light tracking-wide">
              {lang === 'VI'
                ? 'Chúng tôi thiết lập mối quan hệ hợp tác thành công với các xưởng sản xuất nội thất Ý, được đánh giá cao tại triển lãm danh giá thế giới Salone del Mobile ở Milan, và các tuyệt tác B+ON tự hào hiện diện trong các dinh thự thượng lưu khắp năm châu.'
                : 'We established successful collaboration with Italian furniture ateliers, earned high acclaim at the prestigious Salone del Mobile in Milan, and our pieces now grace private residences and luxury apartments worldwide.'}
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-[#262626] bg-[#161616]">
              <img
                src={product.editorial?.traditionImage || product.images[1] || product.images[0] || 'https://cdn.fiftyfourms.com/Artistry_web_ver3_420b2feab8.webp'}
                alt="Italian traditions and global recognition"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Uncompromising handcrafted quality (Chất lượng thủ công không thỏa hiệp) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="md:col-span-6">
            <div className="aspect-[4/4.5] rounded-[1.75rem] overflow-hidden border border-[#262626] bg-[#161616]">
              <img
                src={product.editorial?.craftImage || product.images[2] || product.images[0] || 'https://cdn.fiftyfourms.com/Artistry_web_2_bb79544541.webp'}
                alt="Uncompromising handcrafted quality"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-6 md:pl-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-philosopher text-white font-normal tracking-wide leading-tight">
              {lang === 'VI'
                ? 'Chất lượng thủ công không thỏa hiệp'
                : 'Uncompromising handcrafted quality'}
            </h3>

            <p className="text-xs sm:text-sm font-manrope text-[#969696] leading-relaxed font-light tracking-wide">
              {lang === 'VI'
                ? 'Chúng tôi tự tay căn chỉnh từng đường kim mũi chỉ, kiểm soát chất lượng qua từng bước và ứng dụng dây chuyền công nghệ chuẩn Ý, mang đến cho bạn tiêu chuẩn hoàn thiện đỉnh cao của Châu Âu mà không cần chờ đợi vận chuyển dài ngày.'
                : 'We calibrate stitches by hand, meticulously monitor every stage of craftsmanship, and utilize Italian technologies to guarantee pristine European quality without lengthy international transit delays.'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: We took care of everything (Chúng tôi chăm chút mọi chi tiết) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <h4 className="text-xl sm:text-2xl font-philosopher text-white font-normal mb-8 max-w-2xl tracking-wide">
          {lang === 'VI'
            ? `Chúng tôi chăm chút mọi chi tiết để bạn an tâm tận hưởng ${productName}`
            : 'We took care of everything so you can enjoy choosing the perfect piece'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01 */}
          <div className="bg-[#181818] border border-[#262626] rounded-2xl p-7 space-y-4 hover:border-[#444] transition-all">
            <span className="text-xs font-mono text-[#666] block tracking-widest">01</span>
            <h5 className="text-xs font-manrope font-semibold uppercase tracking-[0.16em] text-white leading-snug">
              {lang === 'VI' ? 'CHUYÊN GIA TƯ VẤN NỘI THẤT CÁ NHÂN' : 'PERSONAL INTERIOR EXPERT'}
            </h5>
            <p className="text-xs font-manrope text-[#868686] leading-relaxed font-light">
              {lang === 'VI'
                ? 'Đồng hành cùng quý khách từ bước chọn mẫu da, phối hợp mặt đá đến khâu bàn giao và dịch vụ sau bán hàng.'
                : 'We support you every step of the way, from furniture selection to after-sales service.'}
            </p>
          </div>

          {/* Card 02 */}
          <div className="bg-[#181818] border border-[#262626] rounded-2xl p-7 space-y-4 hover:border-[#444] transition-all">
            <span className="text-xs font-mono text-[#666] block tracking-widest">02</span>
            <h5 className="text-xs font-manrope font-semibold uppercase tracking-[0.16em] text-white leading-snug">
              {lang === 'VI'
                ? 'XƯỞNG SẢN XUẤT 2000 M² TẠI ST. PETERSBURG'
                : 'OWN PRODUCTION 2,000 M² IN ST. PETERSBURG'}
            </h5>
            <p className="text-xs font-manrope text-[#868686] leading-relaxed font-light">
              {lang === 'VI'
                ? 'Dây chuyền máy móc và thiết bị công nghệ hiện đại nhập khẩu đồng bộ từ Ý.'
                : 'Modern technologies and precision Italian manufacturing equipment.'}
            </p>
          </div>

          {/* Card 03 */}
          <div className="bg-[#181818] border border-[#262626] rounded-2xl p-7 space-y-4 hover:border-[#444] transition-all">
            <span className="text-xs font-mono text-[#666] block tracking-widest">03</span>
            <h5 className="text-xs font-manrope font-semibold uppercase tracking-[0.16em] text-white leading-snug">
              {lang === 'VI' ? 'SHOWROOM 700 M² TRUNG TÂM MOSCOW' : '700 M² SHOWROOM IN CENTRAL MOSCOW'}
            </h5>
            <p className="text-xs font-manrope text-[#868686] leading-relaxed font-light">
              {lang === 'VI'
                ? 'Không gian trưng bày thực tế để quý khách trực tiếp chiêm ngưỡng bộ sưu tập và kiểm chứng độ hoàn mỹ.'
                : 'In our flagship showroom, you can experience the furniture collection in person and verify the level of craftsmanship.'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Hotspots Room Visualizer "In the interior" / "Trong không gian nội thất" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="space-y-4 mb-8">
          <span className="text-xs font-manrope text-[#868686] tracking-[0.2em] uppercase font-light">
            {lang === 'VI' ? 'KHÔNG GIAN NỘI THẤT' : 'IN THE INTERIOR'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-philosopher text-white font-normal tracking-wide">
            {lang === 'VI' ? 'Khám phá sự kết hợp trong không gian thực tế' : 'Explore in Architectural Setting'}
          </h3>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#262626] bg-[#141414] aspect-[16/9] sm:aspect-[16/9]">
          <img
            src={product.editorial?.interiorImage || product.heroImage || product.images[0] || 'https://cdn.fiftyfourms.com/Arty_image_51968ab1a2.webp'}
            alt={`${productName} in real interior`}
            className="w-full h-full object-cover"
          />

          {/* Hotspots overlay */}
          {roomHotspots.map((hs) => {
            const isSelected = activeHotspot?.id === hs.id;
            return (
              <div
                key={hs.id}
                className="absolute z-20"
                style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
              >
                {/* Hotspot Pin */}
                <button
                  onClick={() => setActiveHotspot(hs)}
                  className="relative -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer"
                  title={hs.title[lang === 'VI' ? 'VI' : 'EN']}
                >
                  <span className="absolute -inset-2 rounded-full bg-white/30 animate-ping opacity-60" />
                  <span className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center text-white border transition-all ${
                    isSelected
                      ? 'bg-white text-black border-white ring-4 ring-white/30 scale-110'
                      : 'bg-black/60 border-white/60 hover:bg-black hover:border-white'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* Popover Card */}
                {isSelected && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 sm:translate-x-4 sm:-top-16 z-30 w-64 bg-[#181818]/95 backdrop-blur-md border border-[#333] rounded-xl p-3 shadow-2xl animate-in fade-in zoom-in-95 pointer-events-auto">
                    <div className="flex gap-3 items-center">
                      <img
                        src={hs.image}
                        alt={hs.title[lang === 'VI' ? 'VI' : 'EN']}
                        className="w-14 h-14 rounded-lg object-cover border border-[#333] shrink-0"
                      />
                      <div className="min-w-0">
                        <h6 className="text-xs text-white font-medium truncate">
                          {hs.title[lang === 'VI' ? 'VI' : 'EN']}
                        </h6>
                        <span className="text-xs text-[#aaa] font-mono block mt-0.5">
                          {hs.price}
                        </span>
                        <button
                          onClick={() => {
                            if (hs.productSku === product.sku || hs.id.includes(product.id)) {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                              onBackToCatalog();
                            }
                          }}
                          className="text-[10px] font-manrope text-white underline hover:text-[#bbb] mt-1 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>{lang === 'VI' ? 'Xem chi tiết' : 'View details'}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onBackToCatalog}
            className="px-8 py-3.5 rounded-full border border-[#333] hover:border-white text-xs font-manrope tracking-[0.16em] uppercase text-[#ccc] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === 'VI' ? 'XEM TOÀN BỘ CATALOGUE' : 'VIEW FULL CATALOG'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* SECTION 7: Matching Suite / You May Also Like */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-manrope uppercase tracking-[0.2em] text-[#868686] block mb-1">
              {lang === 'VI' ? 'Bộ sưu tập đồng bộ' : 'Curated Suite'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-philosopher text-white font-normal tracking-wide">
              {lang === 'VI' ? 'Vẻ đẹp kết nối trong không gian' : 'You May Also Like'}
            </h3>
          </div>
          <button
            onClick={onBackToCatalog}
            className="text-xs font-manrope tracking-[0.16em] uppercase text-[#a0a0a0] hover:text-white transition-colors hidden sm:flex items-center gap-1 cursor-pointer"
          >
            <span>{lang === 'VI' ? 'Xem tất cả' : 'All pieces'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectRelatedProduct?.(item)}
                className="group bg-[#161616] border border-[#262626] hover:border-[#444] rounded-2xl p-4 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111] mb-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.isBestseller && (
                    <span className="absolute top-3 left-3 text-[9px] font-manrope uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                      Signature
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-manrope text-[#777] uppercase tracking-wider block mb-1">
                      {subcategoryLabels[item.subcategory]?.[lang] || item.subcategory}
                    </span>
                    <h4 className="text-base font-philosopher text-white font-normal group-hover:text-[#eee] transition-colors leading-snug">
                      {lang === 'VI' && item.nameVi ? item.nameVi : item.name}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#222] flex items-center justify-between">
                    <span className="text-xs font-mono text-[#aaa]">
                      {parseAndFormatVND(item.priceFormatted, lang)}
                    </span>
                    <span className="text-xs text-white group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* MODAL 1: 3D Model Download Specs */}
      {is3DModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#181818] border border-[#333] rounded-2xl p-6 shadow-2xl text-[#eee] font-manrope">
            <button
              onClick={() => setIs3DModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#222] hover:bg-[#333] text-[#aaa] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Box className="w-5 h-5 text-[#aeb8c2]" />
              </div>
              <div>
                <h4 className="text-base font-philosopher text-white tracking-wide">
                  {lang === 'VI' ? 'Tệp Mô hình 3D' : '3D CAD & BIM Assets'}
                </h4>
                <span className="text-xs text-[#888] font-mono">{product.sku}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-[#121212] p-4 rounded-xl border border-[#262626] mb-5">
              <div className="flex justify-between">
                <span className="text-[#888]">{lang === 'VI' ? 'Định dạng hỗ trợ' : 'Formats'}:</span>
                <span className="text-white font-medium">3ds Max, Corona, V-Ray, OBJ, FBX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">{lang === 'VI' ? 'Dung lượng tệp' : 'File size'}:</span>
                <span className="text-white font-mono">{product.model3d?.fileSize || '48 MB'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">{lang === 'VI' ? 'Số lượng polygon' : 'Poly count'}:</span>
                <span className="text-white font-mono">{product.model3d?.polyCount || '138k'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={product.model3dUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-white text-black hover:bg-[#ddd] text-xs font-semibold uppercase tracking-[0.16em] text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'VI' ? 'Tải xuống gói tệp (.ZIP)' : 'Download Package (.ZIP)'}</span>
              </a>
              {onOpenCustomizer && (
                <button
                  onClick={() => {
                    setIs3DModalOpen(false);
                    onOpenCustomizer(product);
                  }}
                  className="w-full py-3 rounded-full border border-[#3a3a3a] hover:border-[#666] text-xs text-[#ccc] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#aeb8c2]" />
                  <span>{lang === 'VI' ? 'Mở Trình phối cảnh 3D trực tuyến' : 'Open 3D Configurator'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AR / Try in your Interior (QR Code & QuickLook) */}
      {isARModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#181818] border border-[#333] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#eee] font-manrope">
            <button
              onClick={() => setIsARModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#222] hover:bg-[#333] text-[#aaa] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mx-auto">
                <Camera className="w-6 h-6 text-[#aeb8c2]" />
              </div>
              <h4 className="text-xl font-philosopher text-white font-normal tracking-wide">
                {lang === 'VI' ? 'Xem thực tế ảo tăng cường (AR)' : 'Try in Your Interior'}
              </h4>
              <p className="text-xs sm:text-[13px] text-[#969696] max-w-sm mx-auto leading-relaxed font-light">
                {lang === 'VI'
                  ? 'Ướm sản phẩm trực tiếp vào không gian phòng của bạn với tỷ lệ thực 1:1 qua camera điện thoại.'
                  : 'Place this piece directly in your room at true 1:1 architectural scale using mobile AR.'}
              </p>
            </div>

            <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 flex flex-col items-center justify-center gap-4 mb-6">
              <div className="w-36 h-36 bg-white p-2.5 rounded-xl shadow-lg flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    product.arModelIos || window.location.href
                  )}`}
                  alt="QR Code for AR"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-[#868686] text-center font-mono">
                {lang === 'VI' ? 'Quét mã bằng camera điện thoại iOS / Android' : 'Scan with your smartphone camera'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={product.arModelIos || 'https://cdn.fiftyfourms.com/AR_Artistry_6ddcdf0bdb.usdz'}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-3 rounded-full border border-[#333] hover:border-white text-xs font-medium uppercase tracking-[0.14em] text-center text-[#ddd] hover:text-white transition-colors cursor-pointer"
              >
                Apple QuickLook (.USDZ)
              </a>
              <a
                href={product.arModelAndroid || 'https://cdn.fiftyfourms.com/AR_Artistry_68daffde50.glb'}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-3 rounded-full border border-[#333] hover:border-white text-xs font-medium uppercase tracking-[0.14em] text-center text-[#ddd] hover:text-white transition-colors cursor-pointer"
              >
                Google SceneViewer (.GLB)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: +20 Swatches Palette */}
      {isAllSwatchesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#181818] border border-[#333] rounded-2xl p-6 shadow-2xl flex flex-col text-[#eee] font-manrope">
            <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
              <div>
                <h4 className="text-lg font-philosopher text-white tracking-wide font-normal">
                  {lang === 'VI' ? 'Bảng màu & Vật liệu hoàn thiện' : 'Material & Finish Palette'}
                </h4>
                <p className="text-xs text-[#888] font-light">
                  {lang === 'VI' ? 'Bộ sưu tập vật liệu & hoàn thiện chuẩn Ý B+ON' : 'B+ON Atelier Italian Finishes'}
                </p>
              </div>
              <button
                onClick={() => setIsAllSwatchesModalOpen(false)}
                className="p-1.5 rounded-full bg-[#222] hover:bg-[#333] text-[#aaa] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto py-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {swatches.map((swatch, idx) => (
                <button
                  key={swatch.id}
                  onClick={() => {
                    setSelectedSwatchIdx(idx);
                    setIsAllSwatchesModalOpen(false);
                    if (swatch.image) {
                      const existingImgIdx = mediaItems.findIndex((m) => m.url === swatch.image);
                      if (existingImgIdx !== -1) {
                        setActiveMediaIdx(existingImgIdx);
                      }
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    selectedSwatchIdx === idx
                      ? 'border-white bg-[#242424]'
                      : 'border-[#2a2a2a] hover:border-[#555] bg-[#141414]'
                  }`}
                >
                  <span
                    className="w-9 h-9 rounded-full shrink-0 border border-black/30 shadow-sm"
                    style={{ backgroundColor: swatch.colorHex }}
                  />
                  <div className="overflow-hidden">
                    <span className="text-xs text-white block truncate font-medium">
                      {lang === 'VI' && swatch.shadeLabelVi ? swatch.shadeLabelVi : swatch.name}
                    </span>
                    <span className="text-xs text-[#777] block font-mono">
                      {parseAndFormatVND(swatch.priceFormatted, lang)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={currentDisplayImage}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
