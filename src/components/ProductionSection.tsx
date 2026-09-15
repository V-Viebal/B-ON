import React, { useState } from 'react';
import { ArrowRight, Download, Check, Sparkles } from 'lucide-react';
import { MainCategory } from '../types';

interface ProductionSectionProps {
  currentLanguage: 'VI' | 'EN';
  onOpenConsultation: () => void;
  onOpenCatalogDownload: () => void;
  onSelectCategory: (cat: MainCategory) => void;
  onNavigateSection: (id: string) => void;
}

export const ProductionSection: React.FC<ProductionSectionProps> = ({
  currentLanguage,
  onOpenConsultation,
  onOpenCatalogDownload,
  onSelectCategory,
  onNavigateSection,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);

  const t = {
    VI: {
      mfgTitle: '2 000 M² XƯỞNG SẢN XUẤT',
      mfgSubtitle: 'Công nghệ Ý, thiết kế kiến trúc chuẩn mực',
      mfgBtn: 'NHẬN TƯ VẤN TỪ CHUYÊN VIÊN',
      mfgCard1Title: '100+ nghệ nhân và nhà thiết kế',
      mfgCard1Desc: 'Đội ngũ chuyên gia tài năng kết hợp giữa kỹ sư công nghệ Ý và các KTS hàng đầu',
      mfgCard2Title: 'Hoàn thiện thủ công',
      mfgCard2Desc: 'Cắt may da tỉ mỉ, căng bọc nệm chính xác, mài bóng và phủ hoàn thiện tinh xảo',
      mfgCard3Title: 'Vật liệu thượng hạng',
      mfgCard3Desc: 'Vải dệt Ý, da nubuck, da bò thuộc tự nhiên, gỗ veneer quý — Walnut Root, Macassar, Eucalyptus',
      mfgCard4Title: 'Thiết kế độc quyền & Bằng sáng chế',
      mfgCard4Desc: 'Các mẫu sản phẩm của thương hiệu đều được đăng ký bảo hộ độc quyền kiểu dáng công nghiệp',

      serviceTag: 'DỊCH VỤ ĐẲNG CẤP THƯỢNG LƯU',
      serviceTitle: 'NHANH GẤP 3 LẦN TỪ Ý',
      serviceSubtitle: 'Từ lúc đặt hàng đến khi bàn giao — trung bình 3 tháng, thay vì 9 tháng',
      serviceCard1Title: 'Quản lý dự án riêng biệt',
      serviceCard1Desc: 'Đồng hành cùng quý khách từng giai đoạn — từ chọn mẫu đến dịch vụ bảo hành',
      serviceCard2Title: '100% giao hàng đúng tiến độ',
      serviceCard2Desc: 'Tuân thủ nghiêm ngặt tiến độ bàn giao cho công trình nội thất',
      serviceCard3Title: 'Thư viện 3D chất lượng cao',
      serviceCard3Desc: 'Cung cấp file 3D chính xác từng milimet cho bản vẽ thiết kế của KTS',
      serviceCard4Title: 'Giải pháp đã cấp bằng sáng chế',
      serviceCard4Desc: 'Bảo chứng chất lượng bền vững và đẳng cấp thẩm mỹ độc bản',

      bannerTitle: 'CƠ HỘI ĐẶT HÀNG TRONG THÁNG',
      bannerSub: 'Đặt sản xuất ngay để nhận bàn giao nội thất trước Tết.',
      bannerPhonePlaceholder: '+84 (___) ___-___',
      bannerSend: 'Gửi yêu cầu',
      bannerSuccess: 'Đã nhận yêu cầu! Quản lý sẽ liên hệ trong 15 phút.',

      styleTitle: 'KHÁM PHÁ PHONG CÁCH NỘI THẤT',
      styleDesc: 'B+ON — thương hiệu kết hợp chuẩn mực kỹ thuật Ý và tinh hoa thiết kế hiện đại',
      styleStatNum: '98%',
      styleStatText: 'khách hàng sẵn sàng giới thiệu cho bạn bè',
      downloadBtn: 'TẢI CATALOGUE',

      trustHeadline: 'ĐỐI TÁC TIN CẬY TRỌN ĐỜI',
      trust1: 'LÀM VIỆC TRỰC TIẾP KHÔNG QUA TRUNG GIAN',
      trust2: 'GIÁ GỐC TỪ NHÀ SẢN XUẤT',
      trust3: 'BẢO HÀNH CHÍNH HÃNG TIÊU CHUẨN CAO',
      trust4: 'CHỊU TRÁCH NHIỆM 100% TRONG QUÁ TRÌNH VẬN CHUYỂN',
      trust5: 'KIỂM SOÁT CHẤT LƯỢNG NGHIÊM NGẶT TẠI XƯỞNG',

      spaceTitle: 'B+ON® KIẾN TẠO KHÔNG GIAN',
      spaceSub: 'Tạo nên các bộ sưu tập cho những chủ nhân quen thuộc với chuẩn mực hoàn hảo và sự tiện nghi đỉnh cao',
      col1: 'Bộ sưu tập Sofa Module',
      col2: 'BỘ SƯU TẬP BÀN ĂN CAO CẤP',
      col3: 'BỘ SƯU TẬP BÀN TRÀ SANG TRỌNG',
    },
    EN: {
      mfgTitle: '2,000 M² MANUFACTURE',
      mfgSubtitle: 'Italian technology, bespoke design',
      mfgBtn: 'REQUEST SPECIALIST CONSULTATION',
      mfgCard1Title: '100+ craftsmen & designers',
      mfgCard1Desc: 'Talented team of professionals, including Italian engineers and visionary interior architects',
      mfgCard2Title: 'Artisanal handcraft',
      mfgCard2Desc: 'Precision pattern cutting, upholstery tensioning, manual polishing, and fine finishing',
      mfgCard3Title: 'Rare premium materials',
      mfgCard3Desc: 'Italian fabrics, nubuck, full-grain leather, exotic veneers — Walnut Root, Macassar, Eucalyptus',
      mfgCard4Title: 'Iconic design & patents',
      mfgCard4Desc: 'All signature pieces are internationally patented and engineered for superior comfort',

      serviceTag: 'PREMIUM LEVEL OF SERVICE',
      serviceTitle: '3X FASTER THAN ITALY',
      serviceSubtitle: 'From order placement to white-glove delivery — on average 3 months instead of 9',
      serviceCard1Title: 'Dedicated personal manager',
      serviceCard1Desc: 'Accompaniment at every single step — from furniture curation to after-sales care',
      serviceCard2Title: '100% delivered strictly on time',
      serviceCard2Desc: 'Precise adherence to completion timelines required for your turnkey project',
      serviceCard3Title: 'Architectural 3D models',
      serviceCard3Desc: 'Exact 1:1 digital assets for seamless integration into your interior renderings',
      serviceCard4Title: 'Patented engineering solutions',
      serviceCard4Desc: 'Protecting exclusivity and ensuring enduring structural integrity',

      bannerTitle: 'SEASONAL BOOKING WINDOW',
      bannerSub: 'Place your order now for white-glove delivery before the holidays.',
      bannerPhonePlaceholder: '+1 (___) ___-____',
      bannerSend: 'Submit',
      bannerSuccess: 'Request received! A personal specialist will call within 15 minutes.',

      styleTitle: 'DISCOVER THE SIGNATURE STYLE',
      styleDesc: 'B+ON — a luxury brand fusing Italian manufacturing pedigree and iconic modern aesthetics',
      styleStatNum: '98%',
      styleStatText: 'of our private clients recommend us',
      downloadBtn: 'DOWNLOAD CATALOG',

      trustHeadline: 'YOUR LIFELONG PARTNERS',
      trust1: 'DIRECT WORK WITHOUT INTERMEDIARIES',
      trust2: 'FACTORY-DIRECT VALUE',
      trust3: 'OFFICIAL LIFETIME WARRANTY COMMITMENT',
      trust4: '100% CARRIER LIABILITY & INSURANCE',
      trust5: 'FULL QUALITY CONTROL AT OUR PROPRIETARY FACILITY',

      spaceTitle: 'B+ON® SHAPES THE SPACE',
      spaceSub: 'Creating signature collections for those accustomed to impeccable service and refined living standards',
      col1: 'Modular Sofa Collection',
      col2: 'MONUMENTAL DINING TABLES',
      col3: 'SCULPTURAL COFFEE TABLES',
    },
  }[currentLanguage];

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setPhoneSubmitted(true);
    setTimeout(() => {
      setPhoneNumber('');
    }, 4000);
  };

  return (
    <div className="w-full bg-[#181818] text-[#e8e8e8] font-manrope selection:bg-[#aeb8c2] selection:text-[#181818]">
      {/* SECTION 2: 2,000 M² MANUFACTURE ATELIER (XƯỞNG CHẾ TÁC 2.000 M²) */}
      <section
        id="manufacture"
        className="w-full py-16 md:py-24 border-b border-[#353535]"
      >
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#353535]/60">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.04em] uppercase text-white font-philosopher">
                {t.mfgTitle}
              </h2>
              <p className="text-sm md:text-base text-[#969696] font-light mt-2">
                {t.mfgSubtitle}
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="px-6 py-3.5 bg-transparent border border-[#454545] hover:border-[#aeb8c2] text-[#e8e8e8] hover:text-[#aeb8c2] text-xs uppercase tracking-[0.18em] transition-colors self-start lg:self-auto flex items-center gap-2"
            >
              <span>{t.mfgBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Big Photo & 4 Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 items-center">
            {/* Left Big Photo */}
            <div className="lg:col-span-6 overflow-hidden bg-[#1f1f1f] border border-[#353535]">
              <img
                src="https://cdn.fiftyfourms.com/Frame_542_5798bd2578.webp"
                alt="B+ON Manufacture"
                className="w-full h-[380px] sm:h-[480px] lg:h-[560px] object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Right 4 Cards Grid with Real Icons */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#1f1f1f] p-6 sm:p-7 border border-[#353535] space-y-4 hover:border-[#454545] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_1_d917460f5a.webp"
                    alt="Craftsmen"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white tracking-wide">
                  {t.mfgCard1Title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#969696] font-light leading-relaxed">
                  {t.mfgCard1Desc}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#1f1f1f] p-6 sm:p-7 border border-[#353535] space-y-4 hover:border-[#454545] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_2_a60680316c.webp"
                    alt="Handcraft"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white tracking-wide">
                  {t.mfgCard2Title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#969696] font-light leading-relaxed">
                  {t.mfgCard2Desc}
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#1f1f1f] p-6 sm:p-7 border border-[#353535] space-y-4 hover:border-[#454545] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_3_76658e4328.webp"
                    alt="Materials"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white tracking-wide">
                  {t.mfgCard3Title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#969696] font-light leading-relaxed">
                  {t.mfgCard3Desc}
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#1f1f1f] p-6 sm:p-7 border border-[#353535] space-y-4 hover:border-[#454545] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_4_12fbc5c075.webp"
                    alt="Patents"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white tracking-wide">
                  {t.mfgCard4Title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#969696] font-light leading-relaxed">
                  {t.mfgCard4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 3X FASTER THAN IMPORTING (TIẾN ĐỘ NHANH GẤP 3 LẦN NHẬP KHẨU) */}
      <section className="w-full py-16 md:py-24 border-b border-[#353535]">
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
          {/* Header */}
          <div className="pb-12 border-b border-[#353535]/60">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#aeb8c2] font-semibold">
              {t.serviceTag}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.04em] uppercase text-white font-philosopher mt-2">
              {t.serviceTitle}
            </h2>
            <p className="text-sm md:text-base text-[#969696] font-light mt-2">
              {t.serviceSubtitle}
            </p>
          </div>

          {/* Big Photo & 4 Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 items-center">
            {/* Left 4 Cards Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
              {/* Card 1 */}
              <div className="bg-[#1f1f1f] p-6 sm:p-7 border border-[#353535] space-y-4 hover:border-[#454545] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_11_9d50fccd9a.webp"
                    alt="Manager"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white tracking-wide">
                  {t.serviceCard1Title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#969696] font-light leading-relaxed">
                  {t.serviceCard1Desc}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#1f1f1f] p-6 sm:p-7 border border-[#353535] space-y-4 hover:border-[#454545] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_10_c93d8483de.webp"
                    alt="On Time"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white tracking-wide">
                  {t.serviceCard2Title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#969696] font-light leading-relaxed">
                  {t.serviceCard2Desc}
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#1f1f1f] p-6 sm:p-7 border border-[#353535] space-y-4 hover:border-[#454545] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_13_233c4d845f.webp"
                    alt="3D Models"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white tracking-wide">
                  {t.serviceCard3Title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#969696] font-light leading-relaxed">
                  {t.serviceCard3Desc}
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#1f1f1f] p-6 sm:p-7 border border-[#353535] space-y-4 hover:border-[#454545] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_12_2da40dcad3.webp"
                    alt="Solutions"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white tracking-wide">
                  {t.serviceCard4Title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#969696] font-light leading-relaxed">
                  {t.serviceCard4Desc}
                </p>
              </div>
            </div>

            {/* Right Big Photo */}
            <div className="lg:col-span-6 overflow-hidden bg-[#1f1f1f] border border-[#353535] order-1 lg:order-2">
              <img
                src="https://cdn.fiftyfourms.com/1920_1440_1024_BIG_SMALL_CARDS_1674bf3ce0.webp"
                alt="B+ON Service Delivery"
                className="w-full h-[380px] sm:h-[480px] lg:h-[560px] object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SEASONAL BANNER */}
      <section className="w-full py-12 md:py-16 border-b border-[#353535] bg-[#1a1a1a]">
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1f1f1f] border border-[#353535] p-6 md:p-10 lg:p-12">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#aeb8c2] font-semibold">
                B+ON Priority
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light uppercase text-white font-philosopher leading-tight">
                {t.bannerTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#b6b6b6] font-light">
                {t.bannerSub}
              </p>

              {phoneSubmitted ? (
                <div className="flex items-center gap-2 text-sm text-[#aeb8c2] pt-2">
                  <Check className="w-4 h-4" />
                  <span>{t.bannerSuccess}</span>
                </div>
              ) : (
                <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row gap-3 pt-3 max-w-lg">
                  <input
                    type="tel"
                    placeholder={t.bannerPhonePlaceholder}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 bg-[#181818] border border-[#353535] focus:border-[#aeb8c2] text-white text-sm outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3 bg-[#e8e8e8] text-[#181818] hover:bg-white font-medium text-xs uppercase tracking-[0.2em] transition-all shrink-0"
                  >
                    {t.bannerSend}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 overflow-hidden">
              <img
                src="https://media.fiftyfourms.com/1_d8c65ddc25.webp"
                alt="Exclusive Furniture"
                className="w-full h-[260px] md:h-[320px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DISCOVER THE B+ON STYLE (KHÁM PHÁ PHONG CÁCH B+ON) */}
      <section className="w-full py-16 md:py-24 border-b border-[#353535]">
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <img
                src="/bon-logo.png"
                alt="B+ON"
                className="h-7 w-auto object-contain opacity-90"
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.04em] uppercase text-white font-philosopher">
                {t.styleTitle}
              </h2>
              <p className="text-sm md:text-base text-[#969696] font-light leading-relaxed max-w-xl">
                {t.styleDesc}
              </p>

              {/* Big Stat Block */}
              <div className="pt-4 pb-2 flex items-baseline gap-4">
                <span className="text-5xl md:text-6xl lg:text-7xl font-light text-white font-philosopher">
                  {t.styleStatNum}
                </span>
                <span className="text-sm md:text-base text-[#b6b6b6] max-w-xs font-light">
                  {t.styleStatText}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenCatalogDownload}
                  className="px-7 py-3.5 border border-[#353535] hover:border-[#aeb8c2] bg-[#1f1f1f] text-white hover:text-[#aeb8c2] text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#aeb8c2]" />
                  <span>{t.downloadBtn}</span>
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-6 overflow-hidden bg-[#1f1f1f] border border-[#353535]">
              <img
                src="https://cdn.fiftyfourms.com/small_photo_3_9a66e7df3b.webp"
                alt="B+ON Interior Style"
                className="w-full h-[380px] sm:h-[480px] object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: YOUR PARTNERS FOREVER (ĐỐI TÁC TIN CẬY DÀI LÂU) */}
      <section className="w-full py-16 md:py-24 border-b border-[#353535] bg-[#181818]">
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
          <div className="pb-10 border-b border-[#353535]/60 flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-white font-philosopher">
              {t.trustHeadline}
            </h3>
            <span className="text-xs uppercase tracking-[0.2em] text-[#aeb8c2]">B+ON Guarantee</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 pt-10">
            {/* Trust 1 */}
            <div className="bg-[#1f1f1f] p-6 border border-[#353535] flex flex-col justify-between space-y-4 hover:border-[#454545] transition-colors min-h-[190px]">
              <img
                src="https://cdn.fiftyfourms.com/icon_6_fbdd778129.webp"
                alt="No Intermediaries"
                className="w-9 h-9 object-contain"
              />
              <p className="text-xs md:text-sm font-light uppercase tracking-wider text-[#dcdcdc] leading-relaxed">
                {t.trust1}
              </p>
            </div>

            {/* Trust 2 */}
            <div className="bg-[#1f1f1f] p-6 border border-[#353535] flex flex-col justify-between space-y-4 hover:border-[#454545] transition-colors min-h-[190px]">
              <img
                src="https://cdn.fiftyfourms.com/icon_7_4bba7fe8f4.webp"
                alt="Manufacturer Prices"
                className="w-9 h-9 object-contain"
              />
              <p className="text-xs md:text-sm font-light uppercase tracking-wider text-[#dcdcdc] leading-relaxed">
                {t.trust2}
              </p>
            </div>

            {/* Trust 3 */}
            <div className="bg-[#1f1f1f] p-6 border border-[#353535] flex flex-col justify-between space-y-4 hover:border-[#454545] transition-colors min-h-[190px]">
              <img
                src="https://cdn.fiftyfourms.com/icon_5_00c854bc7d.webp"
                alt="Official Warranty"
                className="w-9 h-9 object-contain"
              />
              <p className="text-xs md:text-sm font-light uppercase tracking-wider text-[#dcdcdc] leading-relaxed">
                {t.trust3}
              </p>
            </div>

            {/* Trust 4 */}
            <div className="bg-[#1f1f1f] p-6 border border-[#353535] flex flex-col justify-between space-y-4 hover:border-[#454545] transition-colors min-h-[190px]">
              <img
                src="https://cdn.fiftyfourms.com/icon_8_dbac77febe.webp"
                alt="Delivery Liability"
                className="w-9 h-9 object-contain"
              />
              <p className="text-xs md:text-sm font-light uppercase tracking-wider text-[#dcdcdc] leading-relaxed">
                {t.trust4}
              </p>
            </div>

            {/* Trust 5 */}
            <div className="bg-[#1f1f1f] p-6 border border-[#353535] flex flex-col justify-between space-y-4 hover:border-[#454545] transition-colors min-h-[190px]">
              <img
                src="https://cdn.fiftyfourms.com/icon_9_ce1d5328ea.webp"
                alt="Factory Quality"
                className="w-9 h-9 object-contain"
              />
              <p className="text-xs md:text-sm font-light uppercase tracking-wider text-[#dcdcdc] leading-relaxed">
                {t.trust5}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: B+ON SHAPES THE ARCHITECTURAL SPACE (B+ON ĐỊNH HÌNH KHÔNG GIAN) */}
      <section className="w-full py-16 md:py-24 border-b border-[#353535]">
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
          <div className="pb-12 border-b border-[#353535]/60">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.04em] uppercase text-white font-philosopher">
              {t.spaceTitle}
            </h2>
            <p className="text-sm md:text-base text-[#969696] font-light mt-2 max-w-2xl">
              {t.spaceSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-12">
            {/* Collection 1: Sofas */}
            <div
              onClick={() => {
                onSelectCategory('upholstered');
                onNavigateSection('catalog');
              }}
              className="group cursor-pointer bg-[#1f1f1f] border border-[#353535] overflow-hidden"
            >
              <div className="h-[360px] md:h-[420px] overflow-hidden">
                <img
                  src="https://cdn.fiftyfourms.com/photo_5_dfff0627e6.webp"
                  alt={t.col1}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex items-center justify-between border-t border-[#353535]">
                <h4 className="text-sm md:text-base font-medium text-white uppercase tracking-wider group-hover:text-[#aeb8c2] transition-colors">
                  {t.col1}
                </h4>
                <ArrowRight className="w-4 h-4 text-[#868686] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Collection 2: Dining Tables */}
            <div
              onClick={() => {
                onSelectCategory('cabinet');
                onNavigateSection('catalog');
              }}
              className="group cursor-pointer bg-[#1f1f1f] border border-[#353535] overflow-hidden"
            >
              <div className="h-[360px] md:h-[420px] overflow-hidden">
                <img
                  src="https://cdn.fiftyfourms.com/photo_6_77c6a9d44b.webp"
                  alt={t.col2}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex items-center justify-between border-t border-[#353535]">
                <h4 className="text-sm md:text-base font-medium text-white uppercase tracking-wider group-hover:text-[#aeb8c2] transition-colors">
                  {t.col2}
                </h4>
                <ArrowRight className="w-4 h-4 text-[#868686] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Collection 3: Coffee Tables */}
            <div
              onClick={() => {
                onSelectCategory('cabinet');
                onNavigateSection('catalog');
              }}
              className="group cursor-pointer bg-[#1f1f1f] border border-[#353535] overflow-hidden"
            >
              <div className="h-[360px] md:h-[420px] overflow-hidden">
                <img
                  src="https://cdn.fiftyfourms.com/photo_7_e16cd8a6b8.webp"
                  alt={t.col3}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex items-center justify-between border-t border-[#353535]">
                <h4 className="text-sm md:text-base font-medium text-white uppercase tracking-wider group-hover:text-[#aeb8c2] transition-colors">
                  {t.col3}
                </h4>
                <ArrowRight className="w-4 h-4 text-[#868686] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
