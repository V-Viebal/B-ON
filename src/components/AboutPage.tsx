import React, { useState, useEffect } from 'react';
import { PageType, MainCategory, AppLanguage } from '../types';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface AboutPageProps {
  currentLanguage: AppLanguage;
  onNavigatePage: (page: PageType, cat?: MainCategory) => void;
  onOpenConsultation?: () => void;
  onOpenCatalogDownload?: () => void;
}

interface TimelineItem {
  year: string;
  image: string;
  mobileImage: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '2019',
    image: 'https://media.fiftyfourms.com/ru_2019_1x_207df8cbed.webp',
    mobileImage: 'https://media.fiftyfourms.com/ru_768_2019_1x_a41f806109.webp',
    titleVi: 'Hợp tác phát triển với nhà máy Medea (Ý)',
    titleEn: 'Collaboration with Medea Factory (Italy)',
    descVi: 'Khởi đầu với việc phát triển bộ sưu tập độc quyền cho nhà máy Medea danh tiếng tại Ý, tạo dựng uy tín quốc tế.',
    descEn: 'Development of an exclusive furniture collection for the prestigious Italian Medea factory, presented across European markets.',
  },
  {
    year: '2021',
    image: 'https://media.fiftyfourms.com/ru_2021_1x_d70c2999b3.webp',
    mobileImage: 'https://media.fiftyfourms.com/ru_768_2021_1x_ffdfffe98c.webp',
    titleVi: 'Khánh thành xưởng chế tác 2.000 m²',
    titleEn: 'Launch of 2,000 m² Manufacture',
    descVi: 'Thành lập tổ hợp sản xuất khép kín hiện đại tại Saint Petersburg, kiểm soát 100% chất lượng và thời gian chế tác.',
    descEn: 'Launch of an in-house full-cycle high-tech manufacturing atelier in Saint Petersburg, ensuring uncompromising quality control.',
  },
  {
    year: '2022',
    image: 'https://media.fiftyfourms.com/ru_2022_1x_a30f96a8fa.webp',
    mobileImage: 'https://media.fiftyfourms.com/ru_768_2022_1x_d724408322.webp',
    titleVi: 'Mở rộng bộ sưu tập nội thất đỉnh cao',
    titleEn: 'Expansion of Signature Collections',
    descVi: 'Ra mắt các dòng sofa modular, giường bọc da và bàn tủ gỗ veneer quý hiếm, định hình phong cách sống thượng lưu.',
    descEn: 'Creation of flagship upholstered and cabinet furniture lines using rare exotic veneers and full-grain Italian leather.',
  },
  {
    year: '2025',
    image: 'https://media.fiftyfourms.com/ru_2025_1x_cb395f5795.webp',
    mobileImage: 'https://media.fiftyfourms.com/ru_768_2025_1x_45b9d90d6f.webp',
    titleVi: 'Tỏa sáng tại ARTDOM & Triển lãm quốc tế',
    titleEn: 'International Showcases & ARTDOM',
    descVi: 'Trình diễn những thiết kế tiên phong tại triển lãm ARTDOM Moscow, nhận được sự tán thưởng từ giới kiến trúc sư toàn cầu.',
    descEn: 'Triumphant presence at top international design exhibitions including ARTDOM in Moscow, recognized by leading architects.',
  },
  {
    year: '2026',
    image: 'https://media.fiftyfourms.com/ru_2026_1x_921d523886.webp',
    mobileImage: 'https://media.fiftyfourms.com/ru_768_2026_1x_e65331f9e8.webp',
    titleVi: 'Định vị toàn cầu & Giải pháp độc quyền',
    titleEn: 'Global Recognition & Patented Innovations',
    descVi: 'Bảo hộ độc quyền thiết kế công nghiệp, cung cấp thư viện 3D cho dự án quốc tế và hệ thống chăm sóc khách hàng đặc quyền.',
    descEn: 'Patented structural solutions, precision 3D/BIM libraries for architects, and personalized white-glove concierge service worldwide.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  currentLanguage,
  onNavigatePage,
  onOpenConsultation,
  onOpenCatalogDownload,
}) => {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'designer',
    agree: true,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Auto timeline slide every 7 seconds if not manually interacted
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveYearIndex((prev) => (prev + 1) % TIMELINE_DATA.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeMilestone = TIMELINE_DATA[activeYearIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.agree) return;
    setFormSubmitted(true);
  };

  const isVi = currentLanguage === 'VI';

  return (
    <div className="w-full font-manrope bg-[#181818] text-[#e8e8e8] min-h-screen selection:bg-[#aeb8c2] selection:text-[#181818]">
      {/* ======================================================== */}
      {/* SECTION 0: HERO WITH BACKGROUND VIDEO & BRAND LOGO */}
      {/* ======================================================== */}
      <section
        id="about-hero"
        className="w-full mx-auto relative min-h-screen mt-[-74px] md:mt-[-102px] max-w-full overflow-hidden flex flex-col justify-end before:content-[''] before:absolute before:bottom-[-1px] before:left-0 before:z-[5] before:w-full before:h-[55vh] before:bg-gradient-to-b before:from-transparent before:via-[#181818]/60 before:to-[#181818] before:pointer-events-none"
      >
        {/* Background Video & Fallback Poster */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            poster="https://media.fiftyfourms.com/web_logo_off_1080_1b0c933560.jpg"
            className="w-full h-full object-cover opacity-90 scale-105 transition-opacity duration-1000"
          >
            <source
              src="https://media.fiftyfourms.com/web_logo_off_1080_5d6a037eb8.mp4"
              type="video/mp4"
            />
          </video>

          {/* Fallback image if video takes a moment */}
          <div
            className={`absolute inset-0 bg-[#181818] transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <img
              src="https://media.fiftyfourms.com/web_logo_off_1080_1b0c933560.jpg"
              alt="Bpluson Atelier"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Radial vignette */}
          <div className="absolute inset-0 bg-black/35 backdrop-brightness-[0.88]" />
        </div>

        {/* Floating Back Badge (FiftyFourms style) */}
        <div className="absolute top-[90px] md:top-[120px] left-5 md:left-12 z-20">
          <button
            onClick={() => onNavigatePage('home')}
            className="group flex cursor-pointer items-center rounded-full gap-2 py-2.5 pr-4 pl-3 bg-[#1F1F1F]/70 text-[#e8e8e8] hover:text-[#aeb8c2] hover:bg-[#1F1F1F] transition-all duration-200 backdrop-blur-md border border-white/10 text-xs tracking-wider uppercase font-medium"
            aria-label={isVi ? 'Về trang chủ' : 'Back to Home'}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#aeb8c2]" />
            <span>{isVi ? 'Trang chủ' : 'Home'}</span>
          </button>
        </div>

        {/* Hero Bottom Content */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-5 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-6 items-end">
            <div className="lg:col-span-12">
              <h1 className="sr-only">B+ON — About Brand and Manufacture</h1>
              <div className="max-w-[320px] md:max-w-[380px] mb-5">
                <img
                  src="/bon-logo.png"
                  alt="B+ON"
                  className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg lg:text-[1.25rem] font-light leading-relaxed text-[#e8e8e8] max-w-[680px]">
                <span className="text-[#aeb8c2] font-normal">
                  {isVi ? 'B+ON từ B+Furniture' : 'B+ON by B+Furniture'}
                </span>{' '}
                {isVi
                  ? '— thương hiệu nội thất cao cấp từ Studia 54, được kiến tạo trên nền tảng công nghệ Ý và bàn tay thủ công tinh xảo bậc thầy.'
                  : '— luxury designer furniture brand by Studia 54, created on Italian craft technologies and bespoke mastery.'}
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <button
                onClick={() => onNavigatePage('catalog')}
                className="w-full sm:w-auto px-8 py-3.5 border-2 border-[#aeb8c2] bg-[#aeb8c2] text-[#181818] hover:bg-transparent hover:text-white hover:border-white rounded-full text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(174,184,194,0.3)] cursor-pointer text-center"
              >
                {isVi ? 'Xem catalog sản phẩm' : 'Explore Catalog'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 1: OUR JOURNEY */}
      {/* ======================================================== */}
      <section
        id="our-path"
        className="w-full mx-auto px-5 md:px-8 lg:px-12 max-w-[1920px] py-16 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Atelier Photography Card */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl md:rounded-[1.5rem] lg:rounded-[1.75rem] relative h-full overflow-hidden aspect-square w-full shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 group">
              <img
                src="https://cdn.fiftyfourms.com/photo_1_aff59cda9a.webp"
                alt="Bpluson Master Craftsmanship"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs tracking-widest text-[#aeb8c2] uppercase">
                <span>Saint Petersburg Manufacture</span>
                <span>Est. 2019</span>
              </div>
            </div>
          </div>

          {/* Our Journey Narrative Card */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="rounded-2xl md:rounded-[1.5rem] lg:rounded-[1.75rem] relative w-full h-full bg-[#1f1f1f] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-12 border border-white/5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-normal text-[#aeb8c2] mb-6 tracking-wide uppercase">
                  {isVi ? 'HÀNH TRÌNH CỦA CHÚNG TÔI' : 'OUR JOURNEY'}
                </h2>

                <div className="space-y-6 text-sm sm:text-base lg:text-[1.05rem] font-light leading-relaxed text-[#e8e8e8]">
                  <p>
                    {isVi ? (
                      <>
                        Hành trình của chúng tôi khởi đầu từ việc phát triển bộ sưu tập cho{' '}
                        <span className="text-[#aeb8c2] font-medium">
                          nhà máy Medea danh tiếng của Ý —
                        </span>{' '}
                        bộ sưu tập vẫn đang hiện diện và được ưa chuộng tại thị trường Ý. Kinh nghiệm quý giá này trở thành nền tảng vững chắc để chúng tôi mở{' '}
                        <span className="text-[#aeb8c2] font-medium">
                          xưởng chế tác riêng quy mô 2.000 m²
                        </span>{' '}
                        tại Saint Petersburg, nơi chúng tôi trực tiếp kiểm soát chất lượng và tiến độ sản xuất hoàn hảo.
                      </>
                    ) : (
                      <>
                        Our journey began with developing an exclusive collection for the{' '}
                        <span className="text-[#aeb8c2] font-medium">
                          Italian Medea factory —
                        </span>{' '}
                        which is still proudly featured in European luxury markets. This rich expertise became the cornerstone for launching our{' '}
                        <span className="text-[#aeb8c2] font-medium">
                          own 2,000 m² high-tech manufacture
                        </span>{' '}
                        in Saint Petersburg, where we meticulously control every stage of quality and production timing.
                      </>
                    )}
                  </p>

                  <p>
                    {isVi ? (
                      <>
                        Ngày nay, có{' '}
                        <span className="text-[#aeb8c2] font-medium">
                          hơn 100 nghệ nhân bậc thầy và nhà thiết kế
                        </span>
                        , bao gồm các chuyên gia công nghệ từ Ý, cùng cống hiến cho từng sản phẩm. Chúng tôi kết hợp trường phái sản xuất tinh hoa nước Ý với ngôn ngữ thiết kế đương đại độc bản, tạo tác nội thất thủ công từ những vật liệu thượng hạng nhất.
                      </>
                    ) : (
                      <>
                        Today, over{' '}
                        <span className="text-[#aeb8c2] font-medium">
                          100 master artisans and visionary designers
                        </span>
                        , including Italian technical specialists, craft every piece. We united the Italian production school with signature architectural design, handcrafting furniture from the finest premium materials.
                      </>
                    )}
                  </p>

                  <p>
                    {isVi ? (
                      <>
                        Các bộ sưu tập của B+ON thường xuyên được vinh danh{' '}
                        <span className="text-[#aeb8c2] font-medium">
                          tại các triển lãm quốc tế danh giá
                        </span>
                        , tiêu biểu là triển lãm kiến trúc ARTDOM tại Moscow.
                      </>
                    ) : (
                      <>
                        Our collections are regularly showcased{' '}
                        <span className="text-[#aeb8c2] font-medium">
                          at leading international design exhibitions
                        </span>
                        , including ARTDOM in Moscow.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Bottom detail row */}
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#aeb8c2] animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-[#aeb8c2]">
                    Studia 54 Luxury Bureau
                  </span>
                </div>
                <button
                  onClick={() => onNavigatePage('interiors')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-[#aeb8c2] transition-colors cursor-pointer"
                >
                  <span>{isVi ? 'Xem dự án nội thất' : 'Furniture in Projects'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Artisans Showcase Dual Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-2xl lg:rounded-[1.75rem] overflow-hidden relative aspect-[16/9] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 group">
            <img
              src="https://cdn.fiftyfourms.com/photo_2_8702a093e9.webp"
              alt="Precision Hand Craft"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-6 right-6">
              <p className="text-xs uppercase tracking-widest text-[#aeb8c2] font-medium mb-1">
                {isVi ? 'Quy trình thủ công' : 'Masterful Tailoring & Craft'}
              </p>
              <p className="text-sm font-light text-white">
                {isVi
                  ? 'Đường nét chỉ may và chuẩn xác từng đường cong'
                  : 'Impeccable seams and precision Italian leather upholstery'}
              </p>
            </div>
          </div>

          <div className="rounded-2xl lg:rounded-[1.75rem] overflow-hidden relative aspect-[16/9] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 group">
            <img
              src="https://cdn.fiftyfourms.com/photo_3_6eed2dff71.webp"
              alt="Master Joinery and Assembly"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-6 right-6">
              <p className="text-xs uppercase tracking-widest text-[#aeb8c2] font-medium mb-1">
                {isVi ? 'Xử lý bề mặt hoàn thiện' : 'Precision Finishing & Joinery'}
              </p>
              <p className="text-sm font-light text-white">
                {isVi
                  ? 'Gỗ veneer quý và chi tiết kim loại gia công riêng'
                  : 'Rare exotic veneers and seamless architectural joinery'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: 2 000 M² MANUFACTURE & 4 KEY CRAFT PILLARS */}
      {/* ======================================================== */}
      <section
        id="manufacture-features"
        className="w-full mx-auto px-5 md:px-8 lg:px-12 max-w-[1920px] py-16 lg:py-24"
      >
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 items-center mb-12">
          <div className="md:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal uppercase tracking-wide text-white leading-tight mb-3">
              <span className="text-[#aeb8c2]">2 000 M²</span>{' '}
              {isVi ? 'XƯỞNG CHẾ TÁC' : 'MANUFACTURE ATELIER'}
            </h2>
            <p className="text-base sm:text-lg text-[#aeb8c2] font-light">
              {isVi
                ? 'Công nghệ Ý đỉnh cao, thiết kế kiến trúc độc bản'
                : 'Italian technologies, visionary architectural design'}
            </p>
          </div>

          <div className="md:col-span-7 flex justify-center md:justify-end">
            <div className="relative max-w-[560px] filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <img
                src="https://cdn.fiftyfourms.com/photo_4_blossom_0bc003668e.webp"
                alt="Bpluson Atelier Sofa Craft"
                className="w-full h-auto object-contain scale-105"
              />
            </div>
          </div>
        </div>

        {/* 4 Craft Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-6 lg:p-8 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col justify-between min-h-[260px] lg:min-h-[312px] group hover:border-[#aeb8c2]/40 transition-all duration-300">
            <div>
              <h3 className="text-base lg:text-lg font-heading text-[#aeb8c2] uppercase tracking-wide mb-3">
                {isVi ? '100+ nghệ nhân & nhà thiết kế' : '100+ Artisans & Designers'}
              </h3>
              <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                {isVi
                  ? 'Đội ngũ chuyên gia tài năng với sự tham gia của các kỹ sư công nghệ Ý kiểm soát chất lượng qua từng công đoạn thủ công.'
                  : 'A multidisciplinary team with Italian technologists ensuring uncompromising quality through meticulous handcraft.'}
              </p>
            </div>
            <div className="flex justify-end pt-4">
              <img
                src="https://cdn.fiftyfourms.com/icon_1_d3b9baf6f6.webp"
                alt={isVi ? '100+ nghệ nhân' : '100+ Artisans'}
                className="h-12 lg:h-16 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-6 lg:p-8 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col justify-between min-h-[260px] lg:min-h-[312px] group hover:border-[#aeb8c2]/40 transition-all duration-300">
            <div>
              <h3 className="text-base lg:text-lg font-heading text-[#aeb8c2] uppercase tracking-wide mb-3">
                {isVi ? 'Chế tác thủ công bậc thầy' : 'Master Handcraft'}
              </h3>
              <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                {isVi
                  ? 'Cắt may tỉ mỉ, kỹ thuật bọc da nệm chính xác, mài nhẵn từng góc cạnh và hoàn thiện tinh xảo từng chi tiết.'
                  : 'Precise tailoring, hand-tensioned upholstery, delicate sanding and bespoke finishing for every single component.'}
              </p>
            </div>
            <div className="flex justify-end pt-4">
              <img
                src="https://cdn.fiftyfourms.com/icon_2_e5b39be09a.webp"
                alt={isVi ? 'Chế tác thủ công' : 'Master Handcraft'}
                className="h-12 lg:h-16 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-6 lg:p-8 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col justify-between min-h-[260px] lg:min-h-[312px] group hover:border-[#aeb8c2]/40 transition-all duration-300">
            <div>
              <h3 className="text-base lg:text-lg font-heading text-[#aeb8c2] uppercase tracking-wide mb-3">
                {isVi ? 'Vật liệu thượng hạng' : 'Premium Materials'}
              </h3>
              <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                {isVi
                  ? 'Vải dệt Ý, da tự nhiên, các loại gỗ veneer quý hiếm — Walnut Root, Macassar, Eucalyptus — kiến tạo đẳng cấp và độ bền thế kỷ.'
                  : 'Italian textiles, plush velour, natural leather, and rare exotic veneers — Walnut Root, Macassar, Eucalyptus, Anigre.'}
              </p>
            </div>
            <div className="flex justify-end pt-4">
              <img
                src="https://cdn.fiftyfourms.com/icon_3_606de1f912.webp"
                alt={isVi ? 'Vật liệu thượng hạng' : 'Premium Materials'}
                className="h-12 lg:h-16 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-6 lg:p-8 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col justify-between min-h-[260px] lg:min-h-[312px] group hover:border-[#aeb8c2]/40 transition-all duration-300">
            <div>
              <h3 className="text-base lg:text-lg font-heading text-[#aeb8c2] uppercase tracking-wide mb-3">
                {isVi ? 'Nhanh gấp 3 lần nước Ý' : '3x Faster than Italy'}
              </h3>
              <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                {isVi
                  ? 'Từ thời điểm xác nhận đơn đặt hàng đến khi bàn giao tận nơi — trung bình chỉ 3 tháng thay vì 9 tháng từ châu Âu.'
                  : 'From order placement to white-glove delivery — average 3 months instead of 9 months standard European wait times.'}
              </p>
            </div>
            <div className="flex justify-end pt-4">
              <img
                src="https://cdn.fiftyfourms.com/icon_4_aa285e2cbb.webp"
                alt={isVi ? 'Nhanh hơn Ý' : 'Faster delivery'}
                className="h-12 lg:h-16 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: INTERACTIVE MILESTONE TIMELINE (2019-2026) */}
      {/* ======================================================== */}
      <section
        id="interactive-timeline"
        className="w-full mx-auto px-5 md:px-8 lg:px-12 max-w-[1920px] py-16 lg:py-24"
      >
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#aeb8c2] font-medium block mb-2">
              {isVi ? 'DÒNG THỜI GIAN PHÁT TRIỂN' : 'CHRONOLOGY OF INNOVATION'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-white uppercase tracking-wide">
              {isVi ? 'DẤU ẤN LỊCH SỬ THƯƠNG HIỆU' : 'KEY MILESTONES OF B+ON®'}
            </h2>
          </div>

          {/* Prev/Next arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActiveYearIndex((prev) =>
                  prev === 0 ? TIMELINE_DATA.length - 1 : prev - 1
                )
              }
              className="w-10 h-10 rounded-full border border-white/10 bg-[#1f1f1f] text-white hover:text-[#aeb8c2] hover:border-[#aeb8c2] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setActiveYearIndex((prev) => (prev + 1) % TIMELINE_DATA.length)
              }
              className="w-10 h-10 rounded-full border border-white/10 bg-[#1f1f1f] text-white hover:text-[#aeb8c2] hover:border-[#aeb8c2] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next milestone"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Vertical Year Selector (Desktop) / Horizontal (Mobile) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-4 lg:p-6 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 h-full flex flex-row lg:flex-col justify-between overflow-x-auto lg:overflow-visible gap-2 scrollbar-none">
              {TIMELINE_DATA.map((item, index) => {
                const isActive = index === activeYearIndex;
                return (
                  <button
                    key={item.year}
                    onClick={() => setActiveYearIndex(index)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-left cursor-pointer flex-shrink-0 ${
                      isActive
                        ? 'bg-[#181818] border border-[#aeb8c2]/50 shadow-md text-white'
                        : 'text-[#868686] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full transition-all ${
                          isActive
                            ? 'bg-[#aeb8c2] ring-4 ring-[#aeb8c2]/20 scale-125'
                            : 'bg-[#555]'
                        }`}
                      />
                      <span className="text-lg lg:text-xl font-heading font-medium tracking-wide">
                        {item.year}
                      </span>
                    </div>

                    <span
                      className={`hidden lg:block text-xs uppercase tracking-wider ${
                        isActive ? 'text-[#aeb8c2] font-medium' : 'text-transparent'
                      }`}
                    >
                      {isActive ? (isVi ? 'Đang chọn' : 'Active') : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Big Banner Display */}
          <div className="lg:col-span-9">
            <div className="rounded-2xl lg:rounded-[1.75rem] overflow-hidden relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 bg-[#1f1f1f] group">
              <img
                key={activeMilestone.image}
                src={activeMilestone.image}
                alt={`Bpluson ${activeMilestone.year}`}
                className="w-full h-full object-cover transition-opacity duration-700 animate-in fade-in zoom-in-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Milestone Details Overlay */}
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-10 lg:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="max-w-[620px]">
                  <span className="text-xs uppercase tracking-widest text-[#aeb8c2] font-semibold bg-[#181818]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 inline-block mb-2">
                    {activeMilestone.year}
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-heading text-white font-normal mb-2">
                    {isVi ? activeMilestone.titleVi : activeMilestone.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                    {isVi ? activeMilestone.descVi : activeMilestone.descEn}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span className="text-xs tracking-widest text-[#aeb8c2] uppercase font-mono">
                    {activeYearIndex + 1} / {TIMELINE_DATA.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: OUR PHILOSOPHY */}
      {/* ======================================================== */}
      <section
        id="our-philosophy"
        className="w-full mx-auto px-5 md:px-8 lg:px-12 max-w-[1920px] py-16 lg:py-24"
      >
        <div className="rounded-2xl md:rounded-[1.5rem] lg:rounded-[1.75rem] relative w-full overflow-hidden bg-[#1f1f1f] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 p-6 sm:p-10 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-normal uppercase tracking-wide text-white leading-tight mb-6">
                {isVi ? 'TRIẾT LÝ CỦA CHÚNG TÔI — ' : 'OUR PHILOSOPHY — '}
                <span className="text-[#aeb8c2] block sm:inline">
                  B+ON® {isVi ? 'ĐỊNH HÌNH KHÔNG GIAN' : 'SHAPES THE SPACE'}
                </span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg font-light leading-relaxed text-[#d4d4d4] mb-8">
                {isVi ? (
                  <>
                    Chúng tôi tạo nên các bộ sưu tập nội thất dành cho những ai tìm kiếm dịch vụ hoàn mỹ, tiêu chuẩn khắt khe và sự tiện nghi đỉnh cao. Nhờ ngôn ngữ thiết kế gắn kết và thẩm mỹ tinh tế, từng món đồ{' '}
                    <span className="text-[#aeb8c2] font-medium">
                      kết hợp hài hòa với nhau và hòa quyện hữu cơ vào bất kỳ không gian nội thất sang trọng nào.
                    </span>
                  </>
                ) : (
                  <>
                    We create furniture collections for those accustomed to exceptional service, uncompromising standards, and peak comfort. With cohesive aesthetic language, every item{' '}
                    <span className="text-[#aeb8c2] font-medium">
                      harmonizes seamlessly together and integrates naturally into any refined architectural interior.
                    </span>
                  </>
                )}
              </p>

              <button
                onClick={() => onNavigatePage('interiors')}
                className="w-full sm:w-auto px-8 py-3.5 border-2 border-[#aeb8c2] bg-[#aeb8c2] text-[#181818] hover:bg-transparent hover:text-white hover:border-white rounded-full text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(174,184,194,0.3)] cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>{isVi ? 'Xem nội thất trong dự án' : 'Explore in Interiors'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl lg:rounded-[1.5rem] overflow-hidden relative aspect-[4/3] shadow-2xl border border-white/5 group">
                <img
                  src="https://cdn.fiftyfourms.com/photo_5_f88cb63d41.webp"
                  alt="B+ON Interior Architecture"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-[#aeb8c2] tracking-wider uppercase">
                  <span>Architecture by Studia 54</span>
                  <span>Living & Dining Concepts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: PREMIUM CONCIERGE SERVICE */}
      {/* ======================================================== */}
      <section
        id="premium-service"
        className="w-full mx-auto px-5 md:px-8 lg:px-12 max-w-[1920px] py-16 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Large Service Banner */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl md:rounded-[1.5rem] lg:rounded-[1.75rem] w-full h-full overflow-hidden relative shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col justify-between p-6 sm:p-10 lg:p-12 min-h-[420px] lg:min-h-[580px]">
              {/* Background image */}
              <img
                src="https://cdn.fiftyfourms.com/photo_6_b158c0f7b6.webp"
                alt="B+ON Service"
                className="absolute inset-0 w-full h-full object-cover object-bottom -z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-[#181818]/20 -z-10" />

              <div>
                <span className="text-xs uppercase tracking-widest text-[#aeb8c2] font-medium block mb-3">
                  {isVi ? 'ĐẶC QUYỀN CHUYÊN BIỆT' : 'EXCLUSIVE SERVICE'}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-normal text-white uppercase tracking-wide leading-tight max-w-[480px]">
                  {isVi
                    ? 'DỊCH VỤ ĐẲNG CẤP DÀNH CHO KHÁCH HÀNG & KIẾN TRÚC SƯ'
                    : 'PREMIUM CONCIERGE SERVICE FOR OUR CLIENTS AND DESIGNERS'}
                </h2>
              </div>

              <div>
                <button
                  onClick={() => {
                    if (onOpenConsultation) {
                      onOpenConsultation();
                    } else {
                      onNavigatePage('designers');
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 border-2 border-[#aeb8c2] bg-[#aeb8c2] text-[#181818] hover:bg-transparent hover:text-white hover:border-white rounded-full text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(174,184,194,0.3)] cursor-pointer text-center"
                >
                  {isVi ? 'Chi tiết dành cho nhà thiết kế' : 'More Details for Designers'}
                </button>
              </div>
            </div>
          </div>

          {/* Right 4 Service Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Service 1 */}
            <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-6 lg:p-7 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col justify-between min-h-[220px] lg:min-h-[270px] group hover:border-[#aeb8c2]/40 transition-all duration-300">
              <div>
                <h3 className="text-sm lg:text-base font-heading text-[#aeb8c2] uppercase tracking-wide mb-2">
                  {isVi ? 'QUẢN LÝ DỰ ÁN RIÊNG' : 'PERSONAL CONCIERGE'}
                </h3>
                <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                  {isVi
                    ? 'Đồng hành cùng quý khách ở từng giai đoạn — từ chọn mẫu đến dịch vụ hậu mãi chu đáo.'
                    : 'Dedicated support at every phase — from custom configuration and 3D modeling to white-glove delivery and after-sales service.'}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <img
                  src="https://cdn.fiftyfourms.com/icon_5_421dc352aa.webp"
                  alt="Personal concierge"
                  className="h-10 lg:h-14 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Service 2 */}
            <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-6 lg:p-7 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col justify-between min-h-[220px] lg:min-h-[270px] group hover:border-[#aeb8c2]/40 transition-all duration-300">
              <div>
                <h3 className="text-sm lg:text-base font-heading text-[#aeb8c2] uppercase tracking-wide mb-2">
                  {isVi ? 'MÔ HÌNH 3D CHUẨN XÁC' : '3D ARCHITECTURAL MODELS'}
                </h3>
                <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                  {isVi
                    ? 'Cung cấp thư viện mô hình 3D chuẩn xác từng milimet cho KTS và NTK nội thất tích hợp vào dự án.'
                    : 'Millimeter-accurate 3D models and BIM files for seamless integration into your interior design projects.'}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <img
                  src="https://cdn.fiftyfourms.com/icon_6_892c1b06ee.webp"
                  alt="3D models"
                  className="h-10 lg:h-14 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Service 3 */}
            <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-6 lg:p-7 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col justify-between min-h-[220px] lg:min-h-[270px] group hover:border-[#aeb8c2]/40 transition-all duration-300">
              <div>
                <h3 className="text-sm lg:text-base font-heading text-[#aeb8c2] uppercase tracking-wide mb-2">
                  {isVi ? '100% GIAO HÀNG ĐÚNG TIẾN ĐỘ' : '100% ON-TIME SHIPMENT'}
                </h3>
                <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                  {isVi
                    ? 'Tuân thủ nghiêm ngặt tiến độ bàn giao cam kết để hiện thực hóa dự án nội thất thành công.'
                    : 'Strict adherence to project schedules, ensuring reliable realization of your interior deadlines.'}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <img
                  src="https://cdn.fiftyfourms.com/icon_7_5a9fe976c3.webp"
                  alt="On-time delivery"
                  className="h-10 lg:h-14 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Service 4 */}
            <div className="rounded-2xl lg:rounded-[1.75rem] bg-[#1f1f1f] p-6 lg:p-7 shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5 relative flex flex-col justify-between min-h-[220px] lg:min-h-[270px] group hover:border-[#aeb8c2]/40 transition-all duration-300">
              <div>
                <h3 className="text-sm lg:text-base font-heading text-[#aeb8c2] uppercase tracking-wide mb-2">
                  {isVi ? 'GIẢI PHÁP ĐƯỢC BẢO HỘ ĐỘC QUYỀN' : 'PATENTED STRUCTURAL SOLUTIONS'}
                </h3>
                <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed">
                  {isVi
                    ? 'Tất cả sản phẩm đều được đăng ký bảo hộ bằng sáng chế, bảo chứng cho sự độc bản và chất lượng trường tồn.'
                    : 'All proprietary designs and engineering joints are protected by international patents, guaranteeing originality and durability.'}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <img
                  src="https://cdn.fiftyfourms.com/icon_8_6af3eee866.webp"
                  alt="Patents"
                  className="h-10 lg:h-14 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: COOPERATION INQUIRY */}
      {/* ======================================================== */}
      <section
        id="cooperation-form"
        className="w-full mx-auto px-5 md:px-8 lg:px-12 max-w-[1920px] py-16 lg:py-24"
      >
        <div className="rounded-2xl md:rounded-[1.5rem] lg:rounded-[1.75rem] relative w-full overflow-hidden bg-[#1f1f1f] shadow-[0px_7px_30px_0px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Left Photo */}
            <div className="hidden md:block md:col-span-5 lg:col-span-6 relative min-h-[480px]">
              <img
                src="https://cdn.fiftyfourms.com/photo_7_f436ae8303.webp"
                alt="Cooperation with Bpluson"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1f1f1f]/50" />
            </div>

            {/* Right Form */}
            <div className="md:col-span-7 lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
              {formSubmitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-[#aeb8c2]/20 border border-[#aeb8c2] text-[#aeb8c2] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading text-white uppercase tracking-wide mb-3">
                    {isVi ? 'GỬI YÊU CẦU THÀNH CÔNG!' : 'THANK YOU FOR YOUR REQUEST!'}
                  </h3>
                  <p className="text-sm text-[#aeb8c2] max-w-[420px] mx-auto mb-8 font-light leading-relaxed">
                    {isVi
                      ? 'Chuyên viên quản lý dự án sẽ liên hệ với bạn trong vòng 15 phút để thảo luận chi tiết và gửi bộ tài liệu độc quyền.'
                      : 'Our project manager will contact you within 15 minutes to discuss partnership opportunities and send exclusive portfolios.'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                      href="https://t.me/bpluson"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-[#27A7E7]/20 border border-[#27A7E7] text-white hover:bg-[#27A7E7] transition-colors text-xs uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </a>
                    <a
                      href="tel:+84931100377"
                      className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-colors text-xs uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>+84 931100377</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-heading font-normal uppercase tracking-wide text-white mb-2">
                      {isVi ? 'ĐĂNG KÝ HỢP TÁC' : 'PARTNERSHIP APPLICATION'}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#868686] font-light">
                      {isVi
                        ? 'Điền thông tin để thảo luận về cơ hội hợp tác và nhận các chính sách ưu đãi dành riêng cho bạn.'
                        : 'Complete the form to explore bespoke collaboration opportunities and designer privileges.'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={isVi ? 'Họ và tên của bạn' : 'Your Full Name'}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-[#454545] py-3 text-base text-[#e8e8e8] placeholder-[#767676] outline-none focus:border-[#aeb8c2] transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        placeholder={
                          isVi ? 'Số điện thoại (+84...)' : 'Phone number (+1... / +44...)'
                        }
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-[#454545] py-3 text-base text-[#e8e8e8] placeholder-[#767676] outline-none focus:border-[#aeb8c2] transition-colors"
                      />
                    </div>

                    {/* Role Selector */}
                    <div className="pt-2">
                      <label className="text-xs uppercase tracking-wider text-[#868686] block mb-2 font-medium">
                        {isVi ? 'Bạn là' : 'You are a'}
                      </label>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {[
                          { id: 'designer', labelVi: 'Nhà thiết kế', labelEn: 'Interior Designer' },
                          { id: 'architect', labelVi: 'Kiến trúc sư', labelEn: 'Architect' },
                          { id: 'client', labelVi: 'Khách hàng', labelEn: 'Private Client' },
                        ].map((role) => (
                          <button
                            type="button"
                            key={role.id}
                            onClick={() =>
                              setFormData({ ...formData, role: role.id })
                            }
                            className={`py-2 px-3 rounded-lg border transition-all text-center cursor-pointer ${
                              formData.role === role.id
                                ? 'border-[#aeb8c2] bg-[#aeb8c2]/10 text-white font-medium'
                                : 'border-[#353535] text-[#868686] hover:text-white'
                            }`}
                          >
                            {isVi ? role.labelVi : role.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Consent checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="agree-checkbox"
                        checked={formData.agree}
                        onChange={(e) =>
                          setFormData({ ...formData, agree: e.target.checked })
                        }
                        className="mt-1 h-4 w-4 rounded border-[#454545] accent-[#aeb8c2] cursor-pointer"
                      />
                      <label
                        htmlFor="agree-checkbox"
                        className="text-[11px] text-[#868686] leading-relaxed cursor-pointer"
                      >
                        {isVi ? (
                          <>
                            Tôi đồng ý cho phép xử lý dữ liệu cá nhân theo{' '}
                            <span className="text-[#aeb8c2] underline">
                              Chính sách bảo mật
                            </span>{' '}
                            của B+ON và cam kết thông tin cung cấp là chính xác.
                          </>
                        ) : (
                          <>
                            I consent to the processing of personal data in accordance with the{' '}
                            <span className="text-[#aeb8c2] underline">
                              Privacy Policy
                            </span>
                            .
                          </>
                        )}
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.name || !formData.phone || !formData.agree}
                      className={`w-full py-3.5 rounded-full text-xs uppercase font-medium tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                        formData.name && formData.phone && formData.agree
                          ? 'border-2 border-[#aeb8c2] bg-[#aeb8c2] text-[#181818] hover:bg-transparent hover:text-white hover:border-white shadow-[0_4px_20px_rgba(174,184,194,0.3)]'
                          : 'border border-[#353535] bg-[#252525] text-[#666] cursor-not-allowed'
                      }`}
                    >
                      {isVi
                        ? 'Gửi yêu cầu hợp tác'
                        : 'Submit Partnership Request'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
