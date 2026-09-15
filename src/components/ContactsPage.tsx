import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  Plus,
  Minus,
  Send,
  Check,
  X,
  Compass,
} from 'lucide-react';

interface ContactsPageProps {
  currentLanguage: 'VI' | 'EN';
  onNavigatePage?: (page: string) => void;
  onOpenConsultation?: () => void;
}

interface LocationMapProps {
  city: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lat, lng]
  mapLink: string;
  currentLanguage: 'VI' | 'EN';
}

const LocationMap: React.FC<LocationMapProps> = ({
  city,
  name,
  address,
  coordinates,
  mapLink,
  currentLanguage,
}) => {
  const [zoom, setZoom] = useState(15);
  const [isCopied, setIsCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const t = {
    VI: {
      openMap: 'Mở trên bản đồ',
      zoomIn: 'Phóng to',
      zoomOut: 'Thu nhỏ',
      copied: 'Đã sao chép địa chỉ',
      copy: 'Sao chép địa chỉ',
    },
    EN: {
      openMap: 'Open on map',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      copied: 'Address copied',
      copy: 'Copy address',
    },
  }[currentLanguage];

  // Google Maps widget embed for 68 Nguyễn Huệ, Phường Sài Gòn
  const mapEmbedUrl = `https://maps.google.com/maps?q=68+Nguy%E1%BB%85n+Hu%E1%BB%87,+Ph%C6%B0%E1%BB%9Dng+S%C3%A0i+G%C3%B2n&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-full min-h-[380px] rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-[#111] border border-[#2e2e2e] shadow-inner group">
      {/* Map Iframe with dark filter */}
      <iframe
        title={`Map of ${name}`}
        src={mapEmbedUrl}
        className="w-full h-full border-0 filter contrast-[1.08] brightness-[0.88] invert-[0.9] hue-rotate-[180deg]"
        loading="lazy"
      />

      {/* Subtle top/bottom dark gradient overlays to blend seamlessly into FiftyFourms dark theme */}
      <div className="absolute inset-0 pointer-events-none border border-[#333]/50 rounded-2xl md:rounded-[1.5rem]" />

      {/* Floating interactive controls (FiftyFourms style) */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <div className="flex flex-col rounded-xl overflow-hidden bg-[#1f1f1f]/90 backdrop-blur-md border border-white/10 shadow-xl">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(z + 1, 18))}
            aria-label={t.zoomIn}
            className="w-9 h-9 flex items-center justify-center text-[#dcdcdc] hover:text-white hover:bg-white/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-white/10 w-full" />
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(z - 1, 12))}
            aria-label={t.zoomOut}
            className="w-9 h-9 flex items-center justify-center text-[#dcdcdc] hover:text-white hover:bg-white/10 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-[#1f1f1f]/90 hover:bg-white text-[#dcdcdc] hover:text-black backdrop-blur-md border border-white/10 shadow-xl text-[11px] font-mono tracking-wider uppercase flex items-center gap-1.5 transition-all duration-200"
        >
          <span>{t.openMap}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Bottom badge with coordinates */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-[#181818]/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#a0a0a0] flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{coordinates[0].toFixed(6)}° N, {coordinates[1].toFixed(6)}° E</span>
        </div>
      </div>
    </div>
  );
};

export const ContactsPage: React.FC<ContactsPageProps> = ({
  currentLanguage,
  onNavigatePage,
  onOpenConsultation,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const t = {
    VI: {
      backHome: 'Trang chủ',
      heroTitle: 'LIÊN HỆ',
      heroSubtitle: 'Trực tiếp trải nghiệm không gian sống thượng lưu tại hệ thống showroom của chúng tôi',
      
      // Showroom 1
      moscowTitle: 'SHOWROOM FLAGSHIP BPLUSON TẠI SÀI GÒN',
      moscowAddressLabel: 'ĐỊA CHỈ',
      moscowAddress: '68 NGUYỄN HUỆ, PHƯỜNG SÀI GÒN',
      moscowHoursLabel: 'THỜI GIAN LÀM VIỆC',
      moscowWeekdays: 'Thứ 2 – Thứ 6',
      moscowWeekdaysTime: '09:00 – 21:00',
      moscowWeekend: 'Thứ 7 – Chủ Nhật',
      moscowWeekendTime: '09:00 – 21:00',
      moscowDirections: 'Chỉ đường trên bản đồ',
      
      // Studio / Atelier
      spbTitle: 'XƯỞNG CHẾ TÁC & STUDIO THIẾT KẾ BPLUSON',
      spbAddressLabel: 'ĐỊA CHỈ',
      spbAddress: '68 NGUYỄN HUỆ, PHƯỜNG SÀI GÒN',
      spbAppointmentNote: '(Theo lịch hẹn trước)',
      spbHoursLabel: 'THỜI GIAN LÀM VIỆC',
      spbWeekdays: 'Thứ 2 – Thứ 6',
      spbWeekdaysTime: '09:00 – 20:00',
      spbWeekend: 'Thứ 7 – Chủ Nhật',
      spbWeekendTime: 'Theo lịch hẹn',
      spbDirections: 'Chỉ đường trên bản đồ',
      
      // Contact details
      contactTitle: 'LIÊN HỆ VỚI CHÚNG TÔI.',
      contactSubtitle: 'CHÚNG TÔI RẤT HÂN HẠNH ĐƯỢC GIẢI ĐÁP CÁC CÂU HỎI VÀ HỖ TRỢ BẠN LỰA CHỌN NỘI THẤT',
      phone: '+84 931100377',
      email: 'SALES@BPLUSON.COM',
      writeUsBtn: 'GỬI TIN NHẮN CHO CHÚNG TÔI',
      
      // Socials
      socialsTitle: 'THEO DÕI CHÚNG TÔI',
      socialsSubtitle: 'TRÊN CÁC MẠNG XÃ HỘI',
      instagram: 'INSTAGRAM.COM/BPLUSON',
      telegram: 'TELEGRAM.ORG/BPLUSON',
      youtube: 'YOUTUBE.COM/BPLUSON',
      
      // Modal
      modalTitle: 'GỬI THÔNG ĐIỆP HOẶC YÊU CẦU TƯ VẤN',
      modalDesc: 'Vui lòng để lại thông tin, đội ngũ Concierge của Bpluson sẽ liên hệ lại với bạn trong vòng 15 phút.',
      namePlaceholder: 'Họ và tên của bạn *',
      phonePlaceholder: 'Số điện thoại / Zalo / WhatsApp *',
      emailPlaceholder: 'Địa chỉ Email *',
      messagePlaceholder: 'Nội dung câu hỏi hoặc yêu cầu tư vấn',
      submitBtn: 'GỬI YÊU CẦU',
      successTitle: 'Yêu cầu đã được gửi thành công!',
      successDesc: 'Cảm ơn bạn. Chuyên viên tư vấn của Bpluson sẽ kết nối trực tiếp trong thời gian sớm nhất.',
      closeBtn: 'Đóng',
    },
    EN: {
      backHome: 'Home',
      heroTitle: 'CONTACTS',
      heroSubtitle: 'Experience iconic architectural furniture in person at our dedicated flagship spaces',
      
      // Showroom 1
      moscowTitle: 'BPLUSON FLAGSHIP SHOWROOM IN SAIGON',
      moscowAddressLabel: 'ADDRESS',
      moscowAddress: '68 NGUYEN HUE, SAIGON WARD',
      moscowHoursLabel: 'WORKING HOURS',
      moscowWeekdays: 'Mon – Fri',
      moscowWeekdaysTime: '09:00 – 21:00',
      moscowWeekend: 'Sat – Sun',
      moscowWeekendTime: '09:00 – 21:00',
      moscowDirections: 'Directions on map',
      
      // Studio / Atelier
      spbTitle: 'BPLUSON DESIGN ATELIER & STUDIO',
      spbAddressLabel: 'ADDRESS',
      spbAddress: '68 NGUYEN HUE, SAIGON WARD',
      spbAppointmentNote: '(By appointment only)',
      spbHoursLabel: 'WORKING HOURS',
      spbWeekdays: 'Mon – Fri',
      spbWeekdaysTime: '09:00 – 20:00',
      spbWeekend: 'Sat – Sun',
      spbWeekendTime: 'By appointment',
      spbDirections: 'Directions on map',
      
      // Contact details
      contactTitle: 'GET IN TOUCH WITH US.',
      contactSubtitle: 'WE ARE DELIGHTED TO ANSWER YOUR QUESTIONS AND ASSIST WITH FURNITURE SELECTION',
      phone: '+84 931100377',
      email: 'SALES@BPLUSON.COM',
      writeUsBtn: 'WRITE TO US',
      
      // Socials
      socialsTitle: 'FOLLOW US',
      socialsSubtitle: 'ON SOCIAL MEDIA',
      instagram: 'INSTAGRAM.COM/BPLUSON',
      telegram: 'TELEGRAM.ORG/BPLUSON',
      youtube: 'YOUTUBE.COM/BPLUSON',
      
      // Modal
      modalTitle: 'SEND INQUIRY OR CONCIERGE REQUEST',
      modalDesc: 'Leave your details below and a Bpluson private furniture advisor will respond within 15 minutes.',
      namePlaceholder: 'Your Full Name *',
      phonePlaceholder: 'Phone / WhatsApp / Telegram *',
      emailPlaceholder: 'Email Address *',
      messagePlaceholder: 'Questions or models of interest',
      submitBtn: 'SEND INQUIRY',
      successTitle: 'Inquiry Sent Successfully!',
      successDesc: 'Thank you. A Bpluson client manager will connect with you shortly.',
      closeBtn: 'Close',
    },
  }[currentLanguage];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setModalOpen(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 3000);
    }, 600);
  };

  return (
    <div
      id="contacts-page"
      className="w-full bg-[#141414] text-[#e8e8e8] font-manrope pb-24 selection:bg-[#fff] selection:text-[#000]"
    >
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB & WRAPPER */}
      {/* Consistent top spacing as requested across matching pages */}
      {/* ========================================================================= */}
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px] pt-44 sm:pt-52 lg:pt-56">
        
        {/* Breadcrumb pill button (FiftyFourms style) */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => onNavigatePage ? onNavigatePage('home') : window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex cursor-pointer items-center rounded-full gap-2 py-2.5 pr-5 pl-4 bg-[#1F1F1F66] text-[#b4b4b4] hover:text-white hover:bg-[#282828] transition-all duration-200 backdrop-blur-[6px] border border-white/5 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="text-xs uppercase tracking-wider font-medium">{t.backHome}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 0: INTRO HERO BANNER (shared.intro-section) */}
        {/* ========================================================================= */}
        <div className="relative w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden mb-8 md:mb-12 bg-[#181818] border border-[#262626] shadow-2xl">
          {/* FiftyFourms Hero Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[32/11] max-h-[580px] overflow-hidden">
            <picture className="w-full h-full">
              <source
                media="(max-width: 767px)"
                srcSet="https://media.fiftyfourms.com/mobile_5ef8ae7f8d.webp"
              />
              <img
                src="https://media.fiftyfourms.com/desktop_a729305dc4.webp"
                alt="B+ON Flagship Showroom"
                className="w-full h-full object-cover object-center"
              />
            </picture>

            {/* Dark gradient overlay matching fiftyfourms */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/70 via-transparent to-transparent" />

            {/* Hero Text Title */}
            <div className="absolute bottom-6 sm:bottom-10 md:bottom-14 left-6 sm:left-10 md:left-14 z-10 max-w-2xl space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src="/bon-logo.png"
                  alt="B+ON"
                  className="h-6 sm:h-7 w-auto object-contain opacity-95"
                />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#a0a0a0] font-mono block">
                  ARCHITECTURE & DESIGN
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white font-philosopher uppercase tracking-[0.03em] drop-shadow-md">
                {t.heroTitle}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-[#c0c0c0] font-light mt-3 max-w-xl leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: MOSCOW SHOWROOM (SHOWROOM TẠI MOSCOW) */}
        {/* ========================================================================= */}
        <section className="relative w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden mb-8 md:mb-12 bg-[#181818] border border-[#262626] p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                {/* Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white font-philosopher uppercase tracking-wide mb-8 lg:mb-12">
                  {t.moscowTitle}
                </h2>

                <ul className="flex flex-col gap-8 sm:gap-10">
                  {/* Address */}
                  <li className="flex gap-4 sm:gap-5 items-start">
                    <div className="flex justify-center shrink-0 items-center w-10 h-10 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md">
                      <img
                        src="https://media.fiftyfourms.com/Icon_Adres_b71ea337ea.svg"
                        alt="Address"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs sm:text-sm font-light text-[#8e8e8e] uppercase tracking-[0.15em]">
                        {t.moscowAddressLabel}
                      </span>
                      <a
                        href="https://maps.google.com/?q=68+Nguy%E1%BB%85n+Hu%E1%BB%87,+Ph%C6%B0%E1%BB%9Dng+S%C3%A0i+G%C3%B2n"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base md:text-lg font-light text-white uppercase hover:text-[#dcdcdc] transition-colors leading-snug group flex items-center gap-1.5"
                      >
                        <span>{t.moscowAddress}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                      </a>
                    </div>
                  </li>

                  {/* Working Hours */}
                  <li className="flex gap-4 sm:gap-5 items-start">
                    <div className="flex justify-center shrink-0 items-center w-10 h-10 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md">
                      <img
                        src="https://media.fiftyfourms.com/Icon_Vremya_8de54a6da6.svg"
                        alt="Working hours"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <span className="text-xs sm:text-sm font-light text-[#8e8e8e] uppercase tracking-[0.15em]">
                        {t.moscowHoursLabel}
                      </span>
                      <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-[#c0c0c0] font-light">
                        <li className="flex items-center gap-4">
                          <span className="w-24 text-[#888]">{t.moscowWeekdays}</span>
                          <span className="font-mono text-white font-medium">{t.moscowWeekdaysTime}</span>
                        </li>
                        <li className="flex items-center gap-4">
                          <span className="w-24 text-[#888]">{t.moscowWeekend}</span>
                          <span className="font-mono text-white font-medium">{t.moscowWeekendTime}</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Action Link */}
              <div className="pt-8 sm:pt-10 flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=68+Nguy%E1%BB%85n+Hu%E1%BB%87,+Ph%C6%B0%E1%BB%9Dng+S%C3%A0i+G%C3%B2n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#dcdcdc] text-xs uppercase tracking-[0.15em] font-medium transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>{t.moscowDirections}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-[#444] hover:border-white text-xs uppercase tracking-[0.15em] font-medium transition-all"
                >
                  {t.writeUsBtn}
                </button>
              </div>
            </div>

            {/* Right Map Column */}
            <div className="lg:col-span-7 h-[400px] sm:h-[480px] lg:h-[520px]">
              <LocationMap
                city="Saigon"
                name="Bpluson Flagship Showroom"
                address={t.moscowAddress}
                coordinates={[10.7743, 106.7032]}
                mapLink="https://maps.google.com/?q=68+Nguy%E1%BB%85n+Hu%E1%BB%87,+Ph%C6%B0%E1%BB%9Dng+S%C3%A0i+G%C3%B2n"
                currentLanguage={currentLanguage}
              />
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: SAINT PETERSBURG OFFICE (VĂN PHÒNG TẠI SAINT PETERSBURG) */}
        {/* ========================================================================= */}
        <section className="relative w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden mb-8 md:mb-12 bg-[#181818] border border-[#262626] p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                {/* Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white font-philosopher uppercase tracking-wide mb-8 lg:mb-12">
                  {t.spbTitle}
                </h2>

                <ul className="flex flex-col gap-8 sm:gap-10">
                  {/* Address */}
                  <li className="flex gap-4 sm:gap-5 items-start">
                    <div className="flex justify-center shrink-0 items-center w-10 h-10 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md">
                      <img
                        src="https://media.fiftyfourms.com/Icon_Adres_b71ea337ea.svg"
                        alt="Address"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs sm:text-sm font-light text-[#8e8e8e] uppercase tracking-[0.15em]">
                        {t.spbAddressLabel}
                      </span>
                      <a
                        href="https://maps.google.com/?q=68+Nguy%E1%BB%85n+Hu%E1%BB%87,+Ph%C6%B0%E1%BB%9Dng+S%C3%A0i+G%C3%B2n"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base md:text-lg font-light text-white uppercase hover:text-[#dcdcdc] transition-colors leading-snug group flex items-center gap-1.5"
                      >
                        <span>{t.spbAddress}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                      </a>
                      <span className="text-xs text-[#8e8e8e] font-light italic">
                        {t.spbAppointmentNote}
                      </span>
                    </div>
                  </li>

                  {/* Working Hours */}
                  <li className="flex gap-4 sm:gap-5 items-start">
                    <div className="flex justify-center shrink-0 items-center w-10 h-10 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md">
                      <img
                        src="https://media.fiftyfourms.com/Icon_Vremya_8de54a6da6.svg"
                        alt="Working hours"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <span className="text-xs sm:text-sm font-light text-[#8e8e8e] uppercase tracking-[0.15em]">
                        {t.spbHoursLabel}
                      </span>
                      <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-[#c0c0c0] font-light">
                        <li className="flex items-center gap-4">
                          <span className="w-24 text-[#888]">{t.spbWeekdays}</span>
                          <span className="font-mono text-white font-medium">{t.spbWeekdaysTime}</span>
                        </li>
                        <li className="flex items-center gap-4">
                          <span className="w-24 text-[#888]">{t.spbWeekend}</span>
                          <span className="font-mono text-[#888] italic">{t.spbWeekendTime}</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Action Link */}
              <div className="pt-8 sm:pt-10 flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=68+Nguy%E1%BB%85n+Hu%E1%BB%87,+Ph%C6%B0%E1%BB%9Dng+S%C3%A0i+G%C3%B2n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#dcdcdc] text-xs uppercase tracking-[0.15em] font-medium transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>{t.spbDirections}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-[#444] hover:border-white text-xs uppercase tracking-[0.15em] font-medium transition-all"
                >
                  {t.writeUsBtn}
                </button>
              </div>
            </div>

            {/* Right Map Column */}
            <div className="lg:col-span-7 h-[400px] sm:h-[480px] lg:h-[520px]">
              <LocationMap
                city="Saigon"
                name="Bpluson Design Atelier & Studio"
                address={t.spbAddress}
                coordinates={[10.7743, 106.7032]}
                mapLink="https://maps.google.com/?q=68+Nguy%E1%BB%85n+Hu%E1%BB%87,+Ph%C6%B0%E1%BB%9Dng+S%C3%A0i+G%C3%B2n"
                currentLanguage={currentLanguage}
              />
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: CONTACT CHANNELS & SOCIAL NETWORKS */}
        {/* ========================================================================= */}
        <section className="relative w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-[#181818] border border-[#262626] p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left: Contact Channels */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="flex flex-col gap-6 sm:gap-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-light text-white font-philosopher uppercase tracking-wide leading-snug">
                    {t.contactTitle}{' '}
                    <span className="text-[#aeb8c2] font-normal">
                      {t.contactSubtitle}
                    </span>
                  </h3>
                </div>

                {/* Direct Contact Links */}
                <ul className="flex flex-col gap-5 sm:gap-6">
                  {/* Phone */}
                  <li className="flex items-center gap-4 sm:gap-5 group">
                    <div className="flex justify-center shrink-0 items-center w-11 h-11 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md group-hover:border-white/20 transition-colors">
                      <img
                        src="https://media.fiftyfourms.com/Icon_Telefon_01e7b3cf4e.svg"
                        alt="Phone"
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <a
                        href="tel:+84931100377"
                        className="text-base sm:text-lg font-light text-white hover:text-[#dcdcdc] uppercase font-mono tracking-wider transition-colors"
                      >
                        {t.phone}
                      </a>
                    </div>
                  </li>

                  {/* Email */}
                  <li className="flex items-center gap-4 sm:gap-5 group">
                    <div className="flex justify-center shrink-0 items-center w-11 h-11 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md group-hover:border-white/20 transition-colors">
                      <img
                        src="https://media.fiftyfourms.com/Icon_Pochta_7657b5ce84.svg"
                        alt="Email"
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <a
                        href="mailto:sales@bpluson.com"
                        className="text-base sm:text-lg font-light text-white hover:text-[#dcdcdc] uppercase tracking-wider font-mono transition-colors"
                      >
                        {t.email}
                      </a>
                    </div>
                  </li>
                </ul>

                {/* "Write to us" Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-[#dcdcdc] text-xs font-medium uppercase tracking-[0.2em] transition-all duration-200 shadow-xl cursor-pointer"
                  >
                    {t.writeUsBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Social Media Links (FiftyFourms original icons) */}
            <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-between">
              <div className="flex flex-col gap-6 sm:gap-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-light text-white font-philosopher uppercase tracking-wide leading-snug">
                    {t.socialsTitle}{' '}
                    <span className="text-[#aeb8c2] font-normal">
                      {t.socialsSubtitle}
                    </span>
                  </h3>
                </div>

                <ul className="flex flex-col gap-4 sm:gap-5">
                  {/* Instagram */}
                  <li className="flex items-center gap-4 sm:gap-5 group">
                    <div className="flex justify-center shrink-0 items-center w-11 h-11 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md group-hover:border-white/20 transition-colors">
                      <img
                        src="https://media.fiftyfourms.com/instagram_274f8a91f0.svg"
                        alt="Instagram"
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <a
                        href="https://instagram.com/bpluson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm md:text-base font-light text-white hover:text-[#dcdcdc] uppercase tracking-wider font-mono transition-colors flex items-center gap-1.5"
                      >
                        <span>{t.instagram}</span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                      </a>
                    </div>
                  </li>

                  {/* Telegram */}
                  <li className="flex items-center gap-4 sm:gap-5 group">
                    <div className="flex justify-center shrink-0 items-center w-11 h-11 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md group-hover:border-white/20 transition-colors">
                      <img
                        src="https://media.fiftyfourms.com/tg_logo_8a417aa76e.svg"
                        alt="Telegram"
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <a
                        href="https://t.me/bpluson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm md:text-base font-light text-white hover:text-[#dcdcdc] uppercase tracking-wider font-mono transition-colors flex items-center gap-1.5"
                      >
                        <span>{t.telegram}</span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                      </a>
                    </div>
                  </li>

                  {/* YouTube */}
                  <li className="flex items-center gap-4 sm:gap-5 group">
                    <div className="flex justify-center shrink-0 items-center w-11 h-11 sm:w-12 sm:h-12 p-2.5 sm:p-3 rounded-full bg-[#202020] border border-white/5 shadow-md group-hover:border-white/20 transition-colors">
                      <img
                        src="https://media.fiftyfourms.com/yutub_f57aeb33d3.svg"
                        alt="YouTube"
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <a
                        href="https://youtube.com/@bpluson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm md:text-base font-light text-white hover:text-[#dcdcdc] uppercase tracking-wider font-mono transition-colors flex items-center gap-1.5"
                      >
                        <span>{t.youtube}</span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                      </a>
                    </div>
                  </li>
                </ul>

                <p className="text-[11px] text-[#777] font-light leading-relaxed pt-2">
                  B+ON® Architectural Furniture Atelier. {currentLanguage === 'VI' ? 'Mọi quyền được bảo lưu. Độc quyền hình ảnh kiến trúc, bản vẽ kết cấu và giải pháp không gian.' : 'All rights reserved. Exclusive rights to visual renders, structural engineering, and spatial solutions.'}
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* CONCIERGE & INQUIRY MODAL (Gửi yêu cầu tư vấn) */}
      {/* ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#1a1a1a] border border-[#333] p-6 sm:p-8 text-white shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#888] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <img
                  src="/bon-logo.png"
                  alt="B+ON"
                  className="h-6 w-auto object-contain mb-5 brightness-110"
                />
                <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-light font-philosopher uppercase tracking-wide mb-2">
                  {t.successTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#a0a0a0] max-w-sm">
                  {t.successDesc}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/bon-logo.png"
                    alt="B+ON"
                    className="h-6.5 w-auto object-contain brightness-110"
                  />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8e8e8e] font-mono border-l border-[#353535] pl-3 py-0.5">
                    CONCIERGE
                  </span>
                </div>
                <h3 className="text-xl font-light font-philosopher uppercase tracking-wide mb-2">
                  {t.modalTitle}
                </h3>
                <p className="text-xs text-[#a0a0a0] mb-6 font-light leading-relaxed">
                  {t.modalDesc}
                </p>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className="w-full bg-[#222] border border-[#353535] focus:border-white rounded-xl px-4 py-3 text-sm text-white placeholder-[#777] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.phonePlaceholder}
                      className="w-full bg-[#222] border border-[#353535] focus:border-white rounded-xl px-4 py-3 text-sm text-white placeholder-[#777] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.emailPlaceholder}
                      className="w-full bg-[#222] border border-[#353535] focus:border-white rounded-xl px-4 py-3 text-sm text-white placeholder-[#777] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.messagePlaceholder}
                      className="w-full bg-[#222] border border-[#353535] focus:border-white rounded-xl px-4 py-3 text-sm text-white placeholder-[#777] outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-4 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      {formLoading ? '...' : t.submitBtn}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
