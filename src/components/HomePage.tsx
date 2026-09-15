import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Download, Send, Phone, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { MainCategory, PageType, Product } from '../types';
import { HomePremiumFurnitureSection } from './HomePremiumFurnitureSection';

interface HomePageProps {
  currentLanguage: 'VI' | 'EN';
  onNavigatePage: (page: PageType, category?: MainCategory) => void;
  onOpenConsultation: () => void;
  onOpenCatalogDownload: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLanguage,
  onNavigatePage,
  onOpenConsultation,
  onOpenCatalogDownload,
  onSelectProduct,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Form in Section 4
  const [formData, setFormData] = useState({ name: '', phone: '', consent: true });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Guarantee video auto-plays smoothly across browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback handled gracefully
      });
    }
  }, []);

  const handleSubmitSeasonOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError(
        currentLanguage === 'VI'
          ? 'Vui lòng nhập tên và số điện thoại'
          : 'Please enter your name and phone number'
      );
      return;
    }
    if (!formData.consent) {
      setFormError(
        currentLanguage === 'VI'
          ? 'Vui lòng đồng ý với điều khoản xử lý dữ liệu'
          : 'Please consent to data processing'
      );
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const t = {
    VI: {
      heroTag: 'B+ON TỪ B+FURNITURE — STUDIA 54',
      heroDesc:
        'B+ON từ B+Furniture — thương hiệu nội thất cao cấp sáng lập bởi văn phòng kiến trúc danh tiếng Studia 54. Nền tảng của các bộ sưu tập là công nghệ Ý, chất lượng hoàn thiện không tì vết cùng thiết kế độc bản được hoàn thiện tỉ mỉ bằng thủ công.',
      viewCatalog: 'XEM CATALOG',
      // Section 1
      manufTitle: '2 000 M² XƯỞNG CHẾ TÁC',
      manufSubtitle: 'Kỹ nghệ Ý, thiết kế bản sắc kiến trúc',
      getConsultation: 'NHẬN TƯ VẤN QUẢN LÝ',
      pillar1Title: '100+ nghệ nhân & nhà thiết kế',
      pillar1Desc: 'Đội ngũ chuyên gia tài năng gồm các kỹ sư công nghệ và nhà thiết kế Ý',
      pillar2Title: 'Chế tác thủ công',
      pillar2Desc: 'Cắt may da và vải chuẩn xác, bọc nệm thủ công, mài bóng và hoàn thiện tỉ mỉ',
      pillar3Title: 'Vật liệu thượng hạng',
      pillar3Desc: 'Vải cao cấp Ý, nubuck, da tự nhiên, veneer quý hiếm — Walnut Root, Macassar, Eucalyptus, Anigre',
      pillar4Title: 'Thiết kế độc bản & Bằng sáng chế',
      pillar4Desc: 'Mọi tác phẩm của thương hiệu đều được đăng ký bảo hộ độc quyền',
      // Section 2: Service
      serviceHeader: 'DỊCH VỤ ĐẲNG CẤP THƯỢNG LƯU',
      fasterTitle: 'NHANH GẤP 3 LẦN NƯỚC Ý',
      fasterDesc: 'Từ lúc đặt hàng tới bàn giao — trung bình 3 tháng, thay vì 9 tháng',
      serv1Title: 'Quản lý dự án riêng',
      serv1Desc: 'Đồng hành cùng bạn ở mọi giai đoạn — từ lựa chọn cấu hình đến hậu mãi chu đáo',
      serv2Title: '100% giao hàng đúng hẹn',
      serv2Desc: 'Cam kết tiến độ bàn giao nghiêm ngặt cho dự án của bạn',
      serv3Title: 'Thư viện mô hình 3D',
      serv3Desc: 'Cung cấp file 3D độ chính xác cao để tích hợp trực tiếp vào bản vẽ kiến trúc',
      serv4Title: 'Giải pháp có bằng sáng chế',
      serv4Desc: 'Tất cả sản phẩm đều được cấp bằng sáng chế, đảm bảo tính độc bản và chất lượng trường tồn',
      // Section 3: Seasonal Campaign
      seasonTitle: 'THÁNG 9 — CƠ HỘI ĐẶT HÀNG',
      seasonDesc: 'Đặt hàng nội thất ngay hôm nay để nhận nhà hoàn thiện trước Tết và Năm mới.',
      namePlaceholder: 'Họ và tên',
      phonePlaceholder: '+84 912 345 678',
      consentText: 'Tôi đồng ý xử lý dữ liệu cá nhân theo Quy định bảo mật.',
      submitBtn: 'GỬI YÊU CẦU',
      thankYouMsg: 'Cảm ơn bạn! Quản lý dự án của B+ON sẽ liên hệ lại trong vòng 15 phút.',
      // Section 4: Style & Download
      discoverTitle: 'KHÁM PHÁ PHONG CÁCH B+ON®',
      discoverDesc: 'B+ON — thương hiệu kết hợp kỹ nghệ đỉnh cao của Ý và phong cách thiết kế độc bản.',
      statNumber: '98%',
      statLabel: 'khách hàng và kiến trúc sư hài lòng giới thiệu chúng tôi',
      downloadBtn: 'TẢI CATALOG',
      // Section 5: Direct guarantees
      noIntermediaries: 'CHÚNG TÔI TRỰC TIẾP CHẾ TÁC — KHÔNG QUA TRUNG GIAN',
      guar1: 'GIÁ TRỰC TIẾP TỪ XƯỞNG',
      guar2: 'CHÍNH SÁCH BẢO HÀNH CHÍNH HÃNG',
      guar3: '100% TRÁCH NHIỆM BẢO HIỂM VẬN CHUYỂN',
      guar4: 'KIỂM SOÁT CHẤT LƯỢNG NGHIÊM NGẶT TẠI XƯỞNG RIÊNG',
      partnersForever: 'ĐỐI TÁC TIN CẬY TRƯỜNG TỒN',
      // Section 6: Shapes space
      shapesSpaceTitle: 'B+ON® ĐỊNH HÌNH KHÔNG GIAN SỐNG',
      shapesSpaceDesc:
        'Kiến tạo các bộ sưu tập cho những ai quen với dịch vụ hoàn mỹ, tiêu chuẩn cao nhất và sự tiện nghi tột bậc',
      collecSofas: 'Bộ sưu tập sofa module',
      collecDining: 'Bộ sưu tập bàn ăn',
      collecCoffee: 'Bộ sưu tập bàn trà & bàn phụ',
    },
    EN: {
      heroTag: 'RUSSIAN PREMIUM FURNITURE BRAND BY STUDIA 54',
      heroDesc:
        'Russian premium furniture brand founded by internationally renowned architectural bureau Studia 54. At the core of the collections are Italian technologies, impeccable craftsmanship, and signature design perfected by hand.',
      viewCatalog: 'VIEW CATALOG',
      // Section 1
      manufTitle: '2 000 M² MANUFACTURE',
      manufSubtitle: 'Italian technologies, Russian design',
      getConsultation: 'REQUEST CONSULTATION',
      pillar1Title: '100+ masters and designers',
      pillar1Desc: 'Talented team of professionals, including Italian technologists and designers',
      pillar2Title: 'Handcrafted perfection',
      pillar2Desc: 'Precise cutting and sewing, tensioning of materials, grinding and fine finishing',
      pillar3Title: 'Premium materials',
      pillar3Desc: 'Italian fabrics, nubuck, natural leather, rare veneers — Walnut Root, Macassar, Eucalyptus, Anigre',
      pillar4Title: 'Signature design & patents',
      pillar4Desc: 'All creations of our brand are patented, ensuring uniqueness and consistent quality',
      // Section 2: Service
      serviceHeader: 'PREMIUM SERVICE LEVEL',
      fasterTitle: '3X FASTER THAN ITALY',
      fasterDesc: 'From your order to delivery — an average of 3 months instead of 9',
      serv1Title: 'Personal manager',
      serv1Desc: 'Accompanying you at every stage — from furniture selection to after-sales care',
      serv2Title: '100% on-time dispatch',
      serv2Desc: 'We adhere to deadlines essential for the successful completion of your project',
      serv3Title: '3D models library',
      serv3Desc: 'We provide precise 3D models for seamless integration into your design projects',
      serv4Title: 'Patented engineering',
      serv4Desc: 'All our pieces are patented, ensuring uniqueness and reliable enduring quality',
      // Section 3: Seasonal Campaign
      seasonTitle: 'SEPTEMBER — LAST CHANCE',
      seasonDesc: 'Order bespoke furniture now to receive it before the New Year holidays.',
      namePlaceholder: 'Full Name',
      phonePlaceholder: '+1 (555) 234-5678',
      consentText: 'I consent to the processing of personal data under Privacy Policy.',
      submitBtn: 'SEND REQUEST',
      thankYouMsg: 'Thank you! A B+ON personal manager will contact you within 15 minutes.',
      // Section 4: Style & Download
      discoverTitle: 'DISCOVER B+ON® STYLE',
      discoverDesc: 'B+ON — a brand uniting Italian quality and unique architectural design.',
      statNumber: '98%',
      statLabel: 'of clients and architects recommend us',
      downloadBtn: 'DOWNLOAD CATALOG',
      // Section 5: Direct guarantees
      noIntermediaries: 'DIRECT FACTORY — NO INTERMEDIARIES',
      guar1: 'DIRECT FACTORY PRICES',
      guar2: 'OFFICIAL FACTORY WARRANTY',
      guar3: '100% DELIVERY RESPONSIBILITY',
      guar4: 'QC CONTROLLED AT OUR OWN ATELIER',
      partnersForever: 'YOUR PARTNERS FOREVER',
      // Section 6: Shapes space
      shapesSpaceTitle: 'B+ON® SHAPES THE SPACE',
      shapesSpaceDesc:
        'We create collections for those accustomed to ideal service, high standards and the finest level of comfort',
      collecSofas: 'Modular Sofa Collection',
      collecDining: 'Dining Table Collection',
      collecCoffee: 'Coffee Table Collection',
    },
  }[currentLanguage];

  return (
    <div className="w-full bg-[#181818] text-white min-h-screen selection:bg-[#aeb8c2] selection:text-black">
      {/* ======================================================== */}
      {/* SECTION 0: FULLSCREEN HERO BANNER (fiftyfourms.com) */}
      {/* ======================================================== */}
      <section
        id="hero-section"
        className="w-full mx-auto relative h-screen mt-[-74px] md:mt-[-102px] px-0 xl:px-0 lg:px-0 md:px-0 max-w-full before:content-[''] before:absolute before:bottom-[-1px] before:left-0 before:z-[5] before:w-full before:h-[50vh] before:bg-gradient-to-b before:from-black/0 before:to-[#181818] before:pointer-events-none"
      >
        <div className="relative isolate w-full h-full overflow-hidden bg-black">
          {/* Authentic FiftyFourms Master Banner Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            poster="https://media.fiftyfourms.com/photo_1_1_1af374055f.webp"
            className="object-cover w-full h-full brightness-[0.82] contrast-[1.04]"
          >
            <source
              src="https://media.fiftyfourms.com/FF_WEBROLL_1080_2_47af644ded_1_253536a61d.mp4"
              type="video/mp4"
            />
            {/* Fallback image */}
            <picture className="block w-full h-full">
              <source media="(max-width: 768px)" srcSet="https://media.fiftyfourms.com/m_photo_1_1_2c89403b62.webp" />
              <img
                src="https://media.fiftyfourms.com/photo_1_1_1af374055f.webp"
                alt="B+ON Luxury Living"
                className="object-cover w-full h-full brightness-[0.78] contrast-[1.04]"
              />
            </picture>
          </video>

          {/* Sound Mute/Unmute toggle (luxury discreet design) */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-28 md:top-32 right-5 sm:right-8 z-20 p-2.5 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer shadow-lg"
            title={isMuted ? (currentLanguage === 'VI' ? 'Bật âm thanh' : 'Unmute audio') : (currentLanguage === 'VI' ? 'Tắt âm thanh' : 'Mute audio')}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Hero Overlay Content */}
        <div className="w-full mx-auto px-5 md:px-5 lg:px-12 xl:px-16 max-w-[1920px] absolute xl:bottom-12 lg:bottom-10 md:bottom-8 bottom-8 z-10 left-1/2 -translate-x-1/2">
          <div className="grid lg:gap-x-6 lg:grid-cols-12 md:gap-x-4 w-full md:grid-cols-2 grid-cols-1 gap-y-4">
            {/* Signature Logo Vector */}
            <div className="col-span-full mb-3">
              <img
                src="/bon-logo.png"
                alt="B+ON"
                className="w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] h-auto object-contain opacity-95 filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Description Text */}
            <div className="col-span-1 md:col-span-1 lg:col-span-6">
              <p className="text-sm md:text-base lg:text-[1.05rem] leading-relaxed text-[#c4c4c4] font-light font-manrope">
                <span className="text-white font-normal">
                  {currentLanguage === 'VI'
                    ? 'B+ON từ B+Furniture'
                    : 'B+ON by B+Furniture'}
                </span>
                {currentLanguage === 'VI'
                  ? ' — thương hiệu nội thất cao cấp sáng lập bởi văn phòng kiến trúc danh tiếng Studia 54. Trong từng bộ sưu tập là công nghệ Ý, chất lượng hoàn thiện không tì vết và thiết kế độc bản hoàn thiện thủ công.'
                  : ' — premium furniture brand founded by internationally renowned architectural bureau Studia 54. At the core of the collections are Italian technologies, impeccable craftsmanship, and signature design perfected by hand.'}
              </p>
            </div>

            {/* CTA Button */}
            <div className="col-span-full">
              <button
                onClick={() => onNavigatePage('catalog')}
                className="transition-all duration-300 w-full md:w-max cursor-pointer flex items-center justify-center text-center border-2 border-white bg-white text-[#181818] hover:bg-transparent hover:text-white rounded-full text-xs uppercase tracking-[0.18em] font-medium py-3 px-8 mt-4 shadow-2xl"
              >
                {t.viewCatalog}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 1: 2,000 M² MANUFACTURE ATELIER (Xưởng chế tác 2.000 m²) */}
      {/* ======================================================== */}
      <section className="w-full mx-auto px-5 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] relative py-16 md:py-24">
        <div className="flex flex-col relative md:mb-10 mb-8 md:grid md:grid-cols-10 lg:grid-cols-12 items-start">
          {/* Left Title & CTA */}
          <div className="z-10 md:col-span-4 lg:col-span-5 flex flex-col gap-4 max-w-md">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light tracking-wide text-white uppercase font-philosopher">
              <span className="text-[#aeb8c2]">2 000 M²</span> {currentLanguage === 'VI' ? 'XƯỞNG CHẾ TÁC' : 'MANUFACTURE'}
            </h2>
            <p className="text-sm sm:text-base text-[#9e9e9e] font-light uppercase tracking-wider">
              {t.manufSubtitle}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="transition-colors duration-300 w-full sm:w-max cursor-pointer flex items-center justify-center text-center border-2 border-[#aeb8c2] text-[#aeb8c2] hover:border-white hover:text-white rounded-full text-xs uppercase tracking-[0.18em] py-3 px-7 font-medium"
              >
                {t.getConsultation}
              </button>
            </div>
          </div>

          {/* Right Floating Sofa Blossom Atelier Render */}
          <div className="md:col-start-5 md:col-end-11 lg:col-start-6 lg:col-end-13 w-full mt-6 md:mt-0">
            <div className="relative filter-[drop-shadow(5px_-2px_13px_rgba(255,255,255,0.15))_drop-shadow(21px_-9px_23px_rgba(255,255,255,0.12))]">
              <img
                src="https://cdn.fiftyfourms.com/Frame_542_5798bd2578.webp"
                alt="B+ON Organic Curved Sofa Atelier"
                className="w-full h-auto object-contain scale-105 md:scale-100 transition-transform duration-700"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence Cards */}
        <div className="mt-8 md:mt-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Card 1 */}
            <li className="rounded-2xl p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.45)] border border-[#2d2d2d] flex flex-col justify-between min-h-[190px] lg:min-h-[240px]">
              <div>
                <img
                  src="https://cdn.fiftyfourms.com/icon_1_d917460f5a.webp"
                  alt="Bpluson icon"
                  className="w-9 h-9 object-contain mb-4 opacity-90"
                />
                <h3 className="text-base font-normal text-white mb-2 uppercase tracking-wide font-philosopher">
                  {t.pillar1Title}
                </h3>
              </div>
              <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                {t.pillar1Desc}
              </p>
            </li>

            {/* Card 2 */}
            <li className="rounded-2xl p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.45)] border border-[#2d2d2d] flex flex-col justify-between min-h-[190px] lg:min-h-[240px]">
              <div>
                <img
                  src="https://cdn.fiftyfourms.com/icon_2_a60680316c.webp"
                  alt="Bpluson icon"
                  className="w-9 h-9 object-contain mb-4 opacity-90"
                />
                <h3 className="text-base font-normal text-white mb-2 uppercase tracking-wide font-philosopher">
                  {t.pillar2Title}
                </h3>
              </div>
              <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                {t.pillar2Desc}
              </p>
            </li>

            {/* Card 3 */}
            <li className="rounded-2xl p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.45)] border border-[#2d2d2d] flex flex-col justify-between min-h-[190px] lg:min-h-[240px]">
              <div>
                <img
                  src="https://cdn.fiftyfourms.com/icon_3_76658e4328.webp"
                  alt="Bpluson icon"
                  className="w-9 h-9 object-contain mb-4 opacity-90"
                />
                <h3 className="text-base font-normal text-white mb-2 uppercase tracking-wide font-philosopher">
                  {t.pillar3Title}
                </h3>
              </div>
              <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                {t.pillar3Desc}
              </p>
            </li>

            {/* Card 4 */}
            <li className="rounded-2xl p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.45)] border border-[#2d2d2d] flex flex-col justify-between min-h-[190px] lg:min-h-[240px]">
              <div>
                <img
                  src="https://cdn.fiftyfourms.com/icon_4_12fbc5c075.webp"
                  alt="Bpluson icon"
                  className="w-9 h-9 object-contain mb-4 opacity-90"
                />
                <h3 className="text-base font-normal text-white mb-2 uppercase tracking-wide font-philosopher">
                  {t.pillar4Title}
                </h3>
              </div>
              <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                {t.pillar4Desc}
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 1.5: PREMIUM FURNITURE & BESTSELLERS (fiftyfourms) */}
      {/* ======================================================== */}
      <HomePremiumFurnitureSection
        currentLanguage={currentLanguage}
        onNavigatePage={onNavigatePage}
        onSelectProduct={onSelectProduct}
      />

      {/* ======================================================== */}
      {/* SECTION 2: LUXURY SERVICE LEVEL (Mức độ dịch vụ cao cấp) */}
      {/* ======================================================== */}
      <section className="w-full mx-auto px-5 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] relative py-12 md:py-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white text-center mb-8 md:mb-12 uppercase tracking-wide font-philosopher">
          {t.serviceHeader}
        </h2>

        <div className="grid lg:gap-x-6 lg:grid-cols-12 md:gap-x-4 w-full md:grid-cols-2 grid-cols-1 gap-y-4">
          {/* Big Featured Card: 3X FASTER THAN IMPORTS (Nhanh gấp 3 lần nhập khẩu) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden relative shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] flex flex-col justify-between p-6 md:p-8 min-h-[380px] md:min-h-[460px] lg:min-h-[520px] bg-[#1e1e1e] border border-[#2d2d2d]">
              {/* Background Art */}
              <img
                src="https://cdn.fiftyfourms.com/1920_1440_1024_BIG_SMALL_CARDS_1674bf3ce0.webp"
                alt="Production speed"
                className="object-cover absolute inset-0 w-full h-full -z-1 opacity-70 brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-3 max-w-lg">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#aeb8c2] font-medium">
                  {currentLanguage === 'VI' ? 'TỐC ĐỘ BÀN GIAO KỶ LỤC' : 'UNMATCHED TIMEFRAME'}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white uppercase font-philosopher leading-tight">
                  {t.fasterTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#cfcfcf] font-light leading-relaxed">
                  {t.fasterDesc}
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <button
                  onClick={() => onNavigatePage('about')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#aeb8c2] hover:text-white transition-colors"
                >
                  <span>{currentLanguage === 'VI' ? 'Khám phá xưởng' : 'Explore Atelier'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 4 Service Cards Grid */}
          <div className="col-span-1 md:col-span-2 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Service 1 */}
            <div className="rounded-2xl p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.45)] border border-[#2d2d2d] flex flex-col justify-between">
              <div>
                <img
                  src="https://cdn.fiftyfourms.com/icon_11_9d50fccd9a.webp"
                  alt="Personal manager"
                  className="w-8 h-8 object-contain mb-4 opacity-90"
                />
                <h4 className="text-base font-normal text-white mb-2 uppercase tracking-wide font-philosopher">
                  {t.serv1Title}
                </h4>
              </div>
              <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                {t.serv1Desc}
              </p>
            </div>

            {/* Service 2 */}
            <div className="rounded-2xl p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.45)] border border-[#2d2d2d] flex flex-col justify-between">
              <div>
                <img
                  src="https://cdn.fiftyfourms.com/icon_10_c93d8483de.webp"
                  alt="On-time dispatch"
                  className="w-8 h-8 object-contain mb-4 opacity-90"
                />
                <h4 className="text-base font-normal text-white mb-2 uppercase tracking-wide font-philosopher">
                  {t.serv2Title}
                </h4>
              </div>
              <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                {t.serv2Desc}
              </p>
            </div>

            {/* Service 3 */}
            <div className="rounded-2xl p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.45)] border border-[#2d2d2d] flex flex-col justify-between">
              <div>
                <img
                  src="https://cdn.fiftyfourms.com/icon_13_233c4d845f.webp"
                  alt="3D Models"
                  className="w-8 h-8 object-contain mb-4 opacity-90"
                />
                <h4 className="text-base font-normal text-white mb-2 uppercase tracking-wide font-philosopher">
                  {t.serv3Title}
                </h4>
              </div>
              <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                {t.serv3Desc}
              </p>
            </div>

            {/* Service 4 */}
            <div className="rounded-2xl p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.45)] border border-[#2d2d2d] flex flex-col justify-between">
              <div>
                <img
                  src="https://cdn.fiftyfourms.com/icon_12_2da40dcad3.webp"
                  alt="Patented solutions"
                  className="w-8 h-8 object-contain mb-4 opacity-90"
                />
                <h4 className="text-base font-normal text-white mb-2 uppercase tracking-wide font-philosopher">
                  {t.serv4Title}
                </h4>
              </div>
              <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                {t.serv4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: SEASONAL PRODUCTION SLOTS (Đăng ký sản xuất theo mùa) */}
      {/* ======================================================== */}
      <section className="w-full mx-auto px-5 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] relative py-12 md:py-20">
        <div className="rounded-2xl md:rounded-3xl relative w-full overflow-hidden bg-[#212121] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-[#2e2e2e]">
          {/* Background Atmospheric Room */}
          <div className="relative block h-full w-full min-h-[540px] md:min-h-[620px]">
            <img
              src="https://media.fiftyfourms.com/1_d8c65ddc25.webp"
              alt="Seasonal Order Interior"
              className="object-cover w-full h-full absolute inset-0 brightness-[0.45] contrast-[1.05]"
            />
          </div>

          {/* Floating Frosted Glass Form Card */}
          <div className="rounded-2xl overflow-hidden bg-black/80 backdrop-blur-md border border-[#363636] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.6)] w-[92%] sm:w-10/12 max-w-[480px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 sm:p-8 md:p-10 text-center">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white uppercase tracking-wide font-philosopher mb-2">
                {t.seasonTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#a4a4a4] font-light leading-relaxed">
                {t.seasonDesc}
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-8 space-y-4 animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-[#aeb8c2] mx-auto" />
                <p className="text-sm text-white font-medium">{t.thankYouMsg}</p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', phone: '', consent: true });
                  }}
                  className="text-xs text-[#aeb8c2] hover:underline uppercase tracking-wider mt-2"
                >
                  {currentLanguage === 'VI' ? 'Gửi yêu cầu khác' : 'Submit another request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitSeasonOrder} className="space-y-4 text-left">
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-transparent border-b border-[#444] py-3 text-sm text-white placeholder-[#777] focus:border-[#aeb8c2] outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.phonePlaceholder}
                    className="w-full bg-transparent border-b border-[#444] py-3 text-sm text-white placeholder-[#777] focus:border-[#aeb8c2] outline-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="consent-check"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded accent-[#aeb8c2] cursor-pointer"
                  />
                  <label htmlFor="consent-check" className="text-[11px] text-[#888] leading-tight cursor-pointer">
                    {t.consentText}
                  </label>
                </div>

                {formError && (
                  <p className="text-xs text-rose-400 pt-1">{formError}</p>
                )}

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-full bg-white text-black hover:bg-[#d5d5d5] text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-lg cursor-pointer"
                  >
                    {t.submitBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: DISCOVER THE B+ON STYLE (Khám phá phong cách B+ON) */}
      {/* ======================================================== */}
      <section className="w-full mx-auto px-5 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] relative py-12 md:py-16">
        <div className="rounded-2xl md:rounded-3xl relative w-full overflow-hidden bg-[#212121] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-[#2d2d2d] p-6 sm:p-10 md:p-12 lg:p-14">
          <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 items-center gap-8 lg:gap-12">
            {/* Left Texts & 98% Rating */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white uppercase tracking-wide font-philosopher leading-tight flex flex-wrap items-center gap-x-3.5 gap-y-2">
                <span>{currentLanguage === 'VI' ? 'KHÁM PHÁ PHONG CÁCH' : 'DISCOVER'}</span>
                <img
                  src="/bon-logo.png"
                  alt="B+ON"
                  className="h-7 sm:h-8 lg:h-9 w-auto object-contain inline-block my-auto brightness-110"
                />
                {currentLanguage === 'EN' && <span>STYLE</span>}
              </h2>
              <p className="text-sm sm:text-base text-[#9e9e9e] font-light leading-relaxed max-w-lg">
                {t.discoverDesc}
              </p>

              <div className="pt-2">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-philosopher">
                  {t.statNumber}
                </div>
                <div className="text-xs sm:text-sm text-[#8a8a8a] uppercase tracking-wider font-light mt-1">
                  {t.statLabel}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenCatalogDownload}
                  className="transition-colors duration-300 w-full sm:w-max cursor-pointer flex items-center justify-center gap-2 border-2 border-white bg-white text-black hover:bg-transparent hover:text-white rounded-full text-xs uppercase tracking-[0.18em] py-3 px-8 font-medium shadow-xl"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadBtn}</span>
                </button>
              </div>
            </div>

            {/* Right Catalog Visual */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <img
                src="https://cdn.fiftyfourms.com/small_photo_3_9a66e7df3b.webp"
                alt="Bpluson Catalogs"
                className="w-full max-w-[480px] h-auto object-contain rounded-xl filter-[drop-shadow(0_15px_30px_rgba(0,0,0,0.6))]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: DIRECT ATELIER GUARANTEES (Cam kết trực tiếp từ xưởng) */}
      {/* ======================================================== */}
      <section className="w-full mx-auto px-5 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] relative py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: 5 Guarantee Cards */}
          <div className="flex flex-col gap-3.5 sm:gap-4 justify-between">
            {/* Card 1 */}
            <div className="rounded-[18px] lg:rounded-[22px] p-4 sm:p-5 lg:p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.50)] border border-[#2e2e2e] flex items-center gap-4 sm:gap-6">
              <img
                src="https://cdn.fiftyfourms.com/icon_6_fbdd778129.webp"
                alt="Direct"
                className="w-8 sm:w-10 lg:w-11 max-h-12 object-contain shrink-0 drop-shadow-md"
              />
              <div className="text-xs sm:text-sm lg:text-[15px] leading-snug font-normal text-white uppercase tracking-wider font-philosopher">
                {currentLanguage === 'VI' ? (
                  <>
                    CHÚNG TÔI TRỰC TIẾP CHẾ TÁC{' '}
                    <span className="text-[#aeb8c2]">KHÔNG QUA TRUNG GIAN</span>
                  </>
                ) : (
                  <>
                    WE OPERATE{' '}
                    <span className="text-[#aeb8c2]">WITHOUT MIDDLEMEN</span>
                  </>
                )}
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[18px] lg:rounded-[22px] p-4 sm:p-5 lg:p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.50)] border border-[#2e2e2e] flex items-center gap-4 sm:gap-6">
              <img
                src="https://cdn.fiftyfourms.com/icon_7_4bba7fe8f4.webp"
                alt="Factory prices"
                className="w-8 sm:w-10 lg:w-11 max-h-12 object-contain shrink-0 drop-shadow-md"
              />
              <div className="text-xs sm:text-sm lg:text-[15px] leading-snug font-normal text-white uppercase tracking-wider font-philosopher">
                {currentLanguage === 'VI' ? (
                  <>
                    <span className="text-[#aeb8c2]">GIÁ TRỰC TIẾP</span> TỪ XƯỞNG SẢN XUẤT
                  </>
                ) : (
                  <>
                    <span className="text-[#aeb8c2]">DIRECT FACTORY PRICING</span> FROM THE MANUFACTURER
                  </>
                )}
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-[18px] lg:rounded-[22px] p-4 sm:p-5 lg:p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.50)] border border-[#2e2e2e] flex items-center gap-4 sm:gap-6">
              <img
                src="https://cdn.fiftyfourms.com/icon_5_00c854bc7d.webp"
                alt="Official warranty"
                className="w-8 sm:w-10 lg:w-11 max-h-12 object-contain shrink-0 drop-shadow-md"
              />
              <div className="text-xs sm:text-sm lg:text-[15px] leading-snug font-normal text-white uppercase tracking-wider font-philosopher">
                {currentLanguage === 'VI' ? (
                  <>
                    CAM KẾT CHÍNH SÁCH{' '}
                    <span className="text-[#aeb8c2]">BẢO HÀNH CHÍNH HÃNG</span>
                  </>
                ) : (
                  <>
                    WE OFFER AN OFFICIAL{' '}
                    <span className="text-[#aeb8c2]">MANUFACTURER WARRANTY</span>
                  </>
                )}
              </div>
            </div>

            {/* Card 4 */}
            <div className="rounded-[18px] lg:rounded-[22px] p-4 sm:p-5 lg:p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.50)] border border-[#2e2e2e] flex items-center gap-4 sm:gap-6">
              <img
                src="https://cdn.fiftyfourms.com/icon_8_dbac77febe.webp"
                alt="100% Delivery responsibility"
                className="w-8 sm:w-10 lg:w-11 max-h-12 object-contain shrink-0 drop-shadow-md"
              />
              <div className="text-xs sm:text-sm lg:text-[15px] leading-snug font-normal text-white uppercase tracking-wider font-philosopher">
                {currentLanguage === 'VI' ? (
                  <>
                    CHÚNG TÔI CHỊU{' '}
                    <span className="text-[#aeb8c2]">100% TRÁCH NHIỆM</span> VẬN CHUYỂN
                  </>
                ) : (
                  <>
                    WE TAKE{' '}
                    <span className="text-[#aeb8c2]">100% RESPONSIBILITY</span> FOR DELIVERY
                  </>
                )}
              </div>
            </div>

            {/* Card 5 */}
            <div className="rounded-[18px] lg:rounded-[22px] p-4 sm:p-5 lg:p-6 bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.50)] border border-[#2e2e2e] flex items-center gap-4 sm:gap-6">
              <img
                src="https://cdn.fiftyfourms.com/icon_9_ce1d5328ea.webp"
                alt="QC Control"
                className="w-8 sm:w-10 lg:w-11 max-h-12 object-contain shrink-0 drop-shadow-md"
              />
              <div className="text-xs sm:text-sm lg:text-[15px] leading-snug font-normal text-white uppercase tracking-wider font-philosopher">
                {currentLanguage === 'VI' ? (
                  <>
                    <span className="text-[#aeb8c2]">KIỂM SOÁT CHẤT LƯỢNG</span> SẢN PHẨM TẠI XƯỞNG RIÊNG
                  </>
                ) : (
                  <>
                    <span className="text-[#aeb8c2]">RIGOROUS QUALITY CONTROL</span> IN OUR OWN PRODUCTION
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: "YOUR PARTNERS FOREVER" Photo Container */}
          <div className="relative w-full rounded-[18px] lg:rounded-[22px] overflow-hidden shadow-[0_7px_30px_0_rgba(0,0,0,0.50)] border border-[#2e2e2e] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-end">
            <img
              src="https://cdn.fiftyfourms.com/photo_8_e6d33dd38f.webp"
              alt="Your Partners Forever"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent min-[990px]:bg-[linear-gradient(109deg,rgba(0,0,0,0)_35%,rgba(0,0,0,0.85)_75%)] pointer-events-none" />

            {/* Bottom-right text & buttons */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col items-end text-right">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white uppercase tracking-[0.15em] font-philosopher drop-shadow-xl mb-4">
                {t.partnersForever}
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-end">
                {/* Telegram */}
                <a
                  href="https://t.me/bpluson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-colors"
                  title="Telegram"
                >
                  <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
                </a>
                {/* Consultation / Chat */}
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Chat"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/84931100377"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-colors"
                  title="WhatsApp"
                >
                  <Phone className="w-4 h-4" />
                </a>
                {/* Select furniture button */}
                <button
                  type="button"
                  onClick={() => onNavigatePage('catalog')}
                  className="px-4 py-2 rounded-full bg-[#1b1b1b]/90 hover:bg-black border border-white/30 text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer shadow-lg ml-1"
                >
                  {currentLanguage === 'VI' ? 'Chọn nội thất' : 'Select furniture'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: B+ON SHAPES THE SPACE (B+ON định hình không gian) */}
      {/* ======================================================== */}
      <section className="w-full mx-auto px-5 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] relative py-12 md:py-20">
        <div className="bg-[#212121] shadow-[0_7px_30px_0_rgba(0,0,0,0.5)] rounded-2xl md:rounded-3xl py-10 md:py-16 px-6 sm:px-10 md:px-14 text-center border border-[#2d2d2d]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white uppercase tracking-wide font-philosopher flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2">
            <img
              src="/bon-logo.png"
              alt="B+ON"
              className="h-7 sm:h-8 lg:h-9 w-auto object-contain inline-block my-auto brightness-110"
            />
            <span>{currentLanguage === 'VI' ? 'ĐỊNH HÌNH KHÔNG GIAN SỐNG' : 'SHAPES THE LIVING SPACE'}</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#9e9e9e] font-light uppercase tracking-wider mt-3 max-w-2xl mx-auto mb-10 md:mb-14">
            {t.shapesSpaceDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Collection 1: Sofas */}
            <div className="flex flex-col items-center gap-5">
              <div
                onClick={() => onNavigatePage('catalog', 'soft')}
                className="relative block rounded-2xl overflow-hidden shadow-[0_7px_30px_rgba(0,0,0,0.5)] cursor-pointer group w-full aspect-square bg-[#1a1a1a]"
              >
                <img
                  src="https://cdn.fiftyfourms.com/photo_5_dfff0627e6.webp"
                  alt="Bpluson Modular Sofas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <button
                type="button"
                onClick={() => onNavigatePage('catalog', 'soft')}
                className="transition-colors duration-300 cursor-pointer flex items-center justify-center text-center border-2 border-[#aeb8c2] text-[#aeb8c2] hover:border-white hover:text-white rounded-full text-xs uppercase tracking-[0.15em] py-2.5 px-6 whitespace-nowrap"
              >
                {t.collecSofas}
              </button>
            </div>

            {/* Collection 2: Dining Tables */}
            <div className="flex flex-col items-center gap-5">
              <div
                onClick={() => onNavigatePage('catalog', 'cabinet')}
                className="relative block rounded-2xl overflow-hidden shadow-[0_7px_30px_rgba(0,0,0,0.5)] cursor-pointer group w-full aspect-square bg-[#1a1a1a]"
              >
                <img
                  src="https://cdn.fiftyfourms.com/photo_6_77c6a9d44b.webp"
                  alt="Bpluson Dining Tables"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <button
                type="button"
                onClick={() => onNavigatePage('catalog', 'cabinet')}
                className="transition-colors duration-300 cursor-pointer flex items-center justify-center text-center border-2 border-[#aeb8c2] text-[#aeb8c2] hover:border-white hover:text-white rounded-full text-xs uppercase tracking-[0.15em] py-2.5 px-6 whitespace-nowrap"
              >
                {t.collecDining}
              </button>
            </div>

            {/* Collection 3: Coffee Tables */}
            <div className="flex flex-col items-center gap-5">
              <div
                onClick={() => onNavigatePage('catalog', 'cabinet')}
                className="relative block rounded-2xl overflow-hidden shadow-[0_7px_30px_rgba(0,0,0,0.5)] cursor-pointer group w-full aspect-square bg-[#1a1a1a]"
              >
                <img
                  src="https://cdn.fiftyfourms.com/photo_7_e16cd8a6b8.webp"
                  alt="Bpluson Coffee Tables"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <button
                type="button"
                onClick={() => onNavigatePage('catalog', 'cabinet')}
                className="transition-colors duration-300 cursor-pointer flex items-center justify-center text-center border-2 border-[#aeb8c2] text-[#aeb8c2] hover:border-white hover:text-white rounded-full text-xs uppercase tracking-[0.15em] py-2.5 px-6 whitespace-nowrap"
              >
                {t.collecCoffee}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
