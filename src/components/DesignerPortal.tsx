import React, { useState } from 'react';
import {
  Box,
  Download,
  Check,
  Search,
  Layers,
  ArrowLeft,
  X,
  Trophy,
  Calendar,
  Gift,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types';
import { getProductName } from '../utils/i18n';

interface DesignerPortalProps {
  products: Product[];
  currentLanguage: 'EN' | 'VI';
  onOpenCatalogDownload?: () => void;
  onNavigatePage?: (page: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const DesignerPortal: React.FC<DesignerPortalProps> = ({
  products,
  currentLanguage,
  onOpenCatalogDownload,
  onNavigatePage,
  onSelectProduct,
}) => {
  // States
  const [showCompetitionModal, setShowCompetitionModal] = useState(false);
  const [show3DLibraryModal, setShow3DLibraryModal] = useState(false);
  const [activeFormat, setActiveFormat] = useState<string>('all');
  const [search3D, setSearch3D] = useState('');
  const [downloadedItems, setDownloadedItems] = useState<Record<string, boolean>>({});

  // Partnership Application Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formStudio, setFormStudio] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Translations
  const t = {
    EN: {
      backHome: 'Home',
      heroBadge: 'FOR DESIGNERS & ARCHITECTS',
      heroTitle: 'FOR DESIGNERS & ARCHITECTS',
      heroDesc:
        'We are a premium designer furniture brand combining Italian craftsmanship and signature design by Studia 54. Partnering with architects and interior designers is one of our key strategic directions.',
      contactManagerBtn: 'CONTACT MANAGER',
      viewCatalogBtn: 'VIEW CATALOG',
      factoryStat: '2 000 M² MANUFACTURE',
      factoryDesc: 'Italian technologies, signature design',
      card1Title: '100+ artisans & designers in our team',
      card1Desc: 'A team of professionals including Italian technologists and product designers.',
      card2Title: 'Handcrafted mastership',
      card2Desc: 'Mastery of handcrafted workmanship felt in every finished piece.',
      card3Title: 'Premium materials',
      card3Desc: 'Italian fabrics, genuine leather, and rare wood veneers.',
      card4Title: 'Recognizable design & patents',
      card4Desc: 'Distinctive styling developed by Studia 54. Our furniture models are patented.',
      guaranteeTitle: 'WE GUARANTEE STABILITY & PROJECT PREDICTABILITY',
      guaranteeStat1Val: '98 OUT OF 100',
      guaranteeStat1Desc: 'of clients & partners recommend us*',
      guaranteeStat1Note: '*we regularly track the NPS satisfaction index',
      guaranteeStat2Val: '100%',
      guaranteeStat2Desc: 'of our furniture is delivered strictly on schedule',
      libraryTitle: '3D MODEL LIBRARY',
      libraryDesc:
        'Complete set of up-to-date 3D files and realistic textures for seamless work with visualizations and architectural renders.',
      download3dBtn: 'DOWNLOAD 3D MODELS',
      benefit1Title: 'Promotion of your projects',
      benefit1Desc:
        'We publish realized interiors of designers collaborating with us and amplify their recognition across our social channels.',
      benefit2Title: 'AR models in interior',
      benefit2Desc: 'We provide AR augmented reality tools for trying furniture directly in space.',
      benefit3Title: 'WE WORK WITH DESIGNERS AS PARTNERS',
      benefit3Desc:
        'We accompany each project at all stages from initial order specification to furniture delivery and white-glove assembly.',
      benefit4Title: 'Personal consultation & bespoke sizing',
      benefit4Desc:
        'We help compose a complete set for the interior, preserving the aesthetic styling and spatial proportions.',
      competitionTitle: 'PARTICIPATE IN THE DESIGNER COMPETITION AND WIN A MACBOOK AIR',
      competitionBtn: 'COMPETITION TERMS',
      socialTitle: 'FOLLOW US ON SOCIAL MEDIA',
      socialStatVal: '45 000+',
      socialStatDesc: 'people are inspired by our brand every day',
      formTitle: 'PARTNERSHIP APPLICATION',
      formDesc:
        'Fill out the form to discuss cooperation opportunities, exclusive trade commissions, and bespoke project terms.',
      formNamePlaceholder: 'Full Name *',
      formPhonePlaceholder: 'Phone number *',
      formEmailPlaceholder: 'Email address *',
      formStudioPlaceholder: 'Studio or Brand name',
      formSubmitBtn: 'SUBMIT PARTNERSHIP APPLICATION',
      formSuccessTitle: 'Thank you!',
      formSuccessDesc:
        'Your application has been received. Our dedicated trade manager will contact you shortly.',
      searchPlaceholder: 'Search 3D assets by name or collection...',
      formatAll: 'All Formats',
      materialsIncluded: '4K PBR Textures Included',
      downloadAssetBtn: 'Download 3D Asset',
      downloadCompletePack: 'Download Complete Library (ZIP)',
    },
    VI: {
      backHome: 'Trang chủ',
      heroBadge: 'DÀNH CHO KTS',
      heroTitle: 'DÀNH CHO CÁC NHÀ THIẾT KẾ & KTS',
      heroDesc:
        'Chúng tôi là thương hiệu nội thất cao cấp kết hợp chất lượng tiêu chuẩn Ý và thiết kế tác quyền của Studia 54. Một trong những định hướng trọng tâm của B+ON là đồng hành và hợp tác cùng các kiến trúc sư, nhà thiết kế nội thất.',
      contactManagerBtn: 'LIÊN HỆ QUẢN LÝ DỰ ÁN',
      viewCatalogBtn: 'XEM CATALOGUE',
      factoryStat: '2 000 M² NHÀ XƯỞNG',
      factoryDesc: 'Công nghệ Ý, thiết kế kiến trúc tác quyền',
      card1Title: '100+ nghệ nhân & nhà thiết kế trong đội ngũ',
      card1Desc: 'Đội ngũ chuyên nghiệp gồm các kỹ sư công nghệ Ý và nhà thiết kế sản phẩm của Studia 54.',
      card2Title: 'Chế tác thủ công tinh xảo',
      card2Desc: 'Nghệ thuật may đo và hoàn thiện thủ công tinh tế được cảm nhận rõ nét trong từng sản phẩm.',
      card3Title: 'Vật liệu thượng hạng',
      card3Desc: 'Vải bọc nhập khẩu Ý, da thuộc tự nhiên cao cấp, các loại veneer vân gỗ quý hiếm.',
      card4Title: 'Thiết kế nhận diện độc bản & Tác quyền',
      card4Desc: 'Phong cách thẩm mỹ độc quyền kiến tạo bởi Studia 54. Tất cả mẫu sản phẩm đều được bảo hộ tác quyền.',
      guaranteeTitle: 'CHÚNG TÔI CAM KẾT SỰ ỔN ĐỊNH & MINH BẠCH DỰ ÁN',
      guaranteeStat1Val: '98 TRÊN 100',
      guaranteeStat1Desc: 'khách hàng & đối tác sẵn sàng giới thiệu chúng tôi*',
      guaranteeStat1Note: '*chỉ số hài lòng NPS được đo lường định kỳ',
      guaranteeStat2Val: '100%',
      guaranteeStat2Desc: 'sản phẩm nội thất được bàn giao đúng tiến độ cam kết',
      libraryTitle: 'THƯ VIỆN MODEL 3D',
      libraryDesc:
        'Bộ sưu tập đầy đủ các file 3D chất lượng cao (3ds Max, Corona, V-Ray, SketchUp, Blender) và map texture thực tế giúp việc dựng phối cảnh trở nên nhanh chóng, chuẩn xác.',
      download3dBtn: 'TẢI THƯ VIỆN 3D',
      benefit1Title: 'Quảng bá dự án của bạn',
      benefit1Desc:
        'Chúng tôi xuất bản các dự án hoàn thiện của KTS hợp tác, gia tăng độ nhận diện thương hiệu cá nhân trên các kênh truyền thông triệu view của chúng tôi.',
      benefit2Title: 'Mô hình AR trong không gian',
      benefit2Desc: 'Cung cấp công cụ AR thực tế ảo tăng cường để ướm thử nội thất trực tiếp vào không gian thực của khách hàng.',
      benefit3Title: 'CHÚNG TÔI ĐỒNG HÀNH NHƯ ĐỐI TÁC CHIẾN LƯỢC',
      benefit3Desc:
        'Đồng hành và hỗ trợ chuyên sâu trên từng chặng của dự án: từ đặt hàng, tùy biến may đo đến xuất xưởng và lắp đặt hoàn thiện.',
      benefit4Title: 'Tư vấn kỹ thuật & May đo 1:1',
      benefit4Desc:
        'Hỗ trợ KTS lựa chọn cấu hình trọn bộ, giữ đúng tinh thần thiết kế và chuẩn tỷ lệ kích thước không gian.',
      competitionTitle: 'THAM GIA CUỘC THI THIẾT KẾ DÀNH CHO KTS & NHẬN MACBOOK AIR',
      competitionBtn: 'THỂ LỆ CUỘC THI',
      socialTitle: 'THEO DÕI CHÚNG TÔI TRÊN MẠNG XÃ HỘI',
      socialStatVal: '45 000+',
      socialStatDesc: 'kiến trúc sư & khách hàng tìm kiếm cảm hứng từ B+ON mỗi ngày',
      formTitle: 'ĐĂNG KÝ HỢP TÁC KTS',
      formDesc:
        'Điền thông tin để cùng thảo luận cơ hội hợp tác, nhận bảng chiết khấu dự án và catalogue vật liệu độc quyền.',
      formNamePlaceholder: 'Họ và tên *',
      formPhonePlaceholder: 'Số điện thoại *',
      formEmailPlaceholder: 'Email công việc *',
      formStudioPlaceholder: 'Tên văn phòng / Studio kiến trúc',
      formSubmitBtn: 'GỬI YÊU CẦU HỢP TÁC',
      formSuccessTitle: 'Cảm ơn bạn!',
      formSuccessDesc:
        'Thông tin hợp tác đã được gửi thành công. Quản lý phụ trách đối tác KTS của B+ON sẽ liên hệ với bạn trong thời gian sớm nhất.',
      searchPlaceholder: 'Tìm kiếm model theo tên hoặc bộ sưu tập...',
      formatAll: 'Tất cả định dạng',
      materialsIncluded: 'Bao gồm texture PBR 4K',
      downloadAssetBtn: 'Tải File 3D',
      downloadCompletePack: 'Tải Trọn Bộ Thư Viện (ZIP)',
    },
  }[currentLanguage];

  // Scroll smoothly to form
  const scrollToForm = () => {
    const el = document.getElementById('form-partnership');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  // 3D Model download handler
  const handleDownloadModel = (id: string, name: string) => {
    setDownloadedItems((prev) => ({ ...prev, [id]: true }));
    const dummyBlob = new Blob(
      [`B+ON 3D BIM MODEL ASSET\nProduct: ${name}\nCertified Studia 54 Spec.`],
      { type: 'application/octet-stream' }
    );
    const url = URL.createObjectURL(dummyBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BON_3D_${name.replace(/\s+/g, '_')}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filter 3D items for the browser
  const filteredProducts = products.filter((item) => {
    if (!item?.model3d) return false;
    const name = getProductName(item, currentLanguage).toLowerCase();
    const matchesSearch =
      !search3D ||
      name.includes(search3D.toLowerCase()) ||
      item.sku.toLowerCase().includes(search3D.toLowerCase());
    const matchesFormat =
      activeFormat === 'all' ||
      item.model3d.formats.some((f) => f.toLowerCase() === activeFormat.toLowerCase());
    return matchesSearch && matchesFormat;
  });

  return (
    <div id="designer-portal-page" className="w-full bg-[#141414] text-[#e8e8e8] font-manrope pb-24 selection:bg-[#fff] selection:text-[#000]">
      
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB & PAGE WRAPPER */}
      {/* With exact pt-44 sm:pt-52 lg:pt-56 preserving user requested spacing */}
      {/* ========================================================================= */}
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px] pt-44 sm:pt-52 lg:pt-56">
        
        {/* Breadcrumb pill button (fiftyfourms style: rounded-full, backdrop-blur) */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => onNavigatePage ? onNavigatePage('home') : (window.location.hash = '#home')}
            className="group inline-flex items-center gap-2 rounded-full py-2.5 px-4 bg-[#1F1F1F66] text-[#b0b0b0] hover:text-white hover:bg-[#282828] transition-all duration-200 backdrop-blur-md border border-[#2e2e2e] text-xs uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-current transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>{t.backHome}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO SECTION (fiftyfourms.com/designer) */}
        {/* Title, description, action buttons, hero visual */}
        {/* ========================================================================= */}
        <section className="relative w-full mb-16 md:mb-24">
          <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14 space-y-4">
            <div className="flex justify-center mb-2">
              <img
                src="/bon-logo.png"
                alt="B+ON"
                className="h-7 w-auto object-contain opacity-90"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.06em] text-white font-philosopher uppercase leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#a0a0a0] font-light leading-relaxed max-w-2xl mx-auto">
              {t.heroDesc}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={scrollToForm}
                className="px-6 sm:px-8 py-3 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                {t.contactManagerBtn}
              </button>
              <button
                onClick={() => onNavigatePage ? onNavigatePage('catalog') : (window.location.hash = '#catalog')}
                className="px-6 sm:px-8 py-3 bg-transparent hover:bg-[#202020] text-white border border-[#404040] hover:border-[#606060] rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer"
              >
                {t.viewCatalogBtn}
              </button>
            </div>
          </div>

          {/* Hero Image Container matching fiftyfourms */}
          <div className="relative w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden border border-[#262626] bg-[#181818] shadow-2xl">
            <picture>
              <source media="(max-width: 767px)" srcSet="https://media.fiftyfourms.com/m_photo_1_1x_3c91e43972.webp" />
              <img
                src="https://media.fiftyfourms.com/photo_1_dffec772bc.webp"
                alt="B+ON for Designers"
                className="w-full h-auto object-cover max-h-[640px] md:max-h-[760px]"
                loading="eager"
              />
            </picture>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2 000 M² MANUFACTURE & 4 ADVANTAGE CARDS */}
        {/* Exact fiftyfourms layout: left big text + right sofa render + 4 cards */}
        {/* ========================================================================= */}
        <section className="relative w-full mb-16 md:mb-24">
          
          {/* Top Banner Row: Headline & Sofa cutout */}
          <div className="relative flex flex-col md:grid md:grid-cols-12 items-center mb-10 md:mb-16 gap-6 md:gap-8 bg-gradient-to-b from-[#181818] to-[#141414] rounded-2xl md:rounded-[1.75rem] border border-[#262626] p-6 sm:p-10 lg:p-14 overflow-hidden">
            
            {/* Left text & button */}
            <div className="w-full md:col-span-5 lg:col-span-5 z-10 space-y-4 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light tracking-[0.06em] text-white font-philosopher uppercase leading-tight">
                {t.factoryStat}
              </h2>
              <p className="text-sm sm:text-base text-[#a0a0a0] font-light leading-relaxed">
                {t.factoryDesc}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('catalog') : (window.location.hash = '#catalog')}
                  className="px-6 py-2.5 bg-transparent hover:bg-white hover:text-black text-white border border-[#404040] hover:border-white rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{t.viewCatalogBtn}</span>
                </button>
              </div>
            </div>

            {/* Right cutout render (B+ON modular sofa 1_301de42563.webp) */}
            <div className="w-full md:col-span-7 lg:col-span-7 relative flex items-center justify-center">
              <div className="relative w-full max-w-[650px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                <img
                  src="https://cdn.fiftyfourms.com/1_301de42563.webp"
                  alt="B+ON Manufacture"
                  className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* 4 Feature Cards Row (100+ artisans, Handcraft, Materials, Patents) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.25rem] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 min-h-[260px] group">
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-light text-white font-philosopher leading-snug group-hover:text-white transition-colors">
                  {t.card1Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8e8e8e] font-light leading-relaxed">
                  {t.card1Desc}
                </p>
              </div>
              <div className="pt-4 flex justify-end">
                <img
                  src="https://cdn.fiftyfourms.com/icon_1_d917460f5a.webp"
                  alt="Craftsmen & Designers"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.25rem] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 min-h-[260px] group">
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-light text-white font-philosopher leading-snug group-hover:text-white transition-colors">
                  {t.card2Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8e8e8e] font-light leading-relaxed">
                  {t.card2Desc}
                </p>
              </div>
              <div className="pt-4 flex justify-end">
                <img
                  src="https://cdn.fiftyfourms.com/icon_2_7c1f46a4f0.png"
                  alt="Handmade"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.25rem] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 min-h-[260px] group">
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-light text-white font-philosopher leading-snug group-hover:text-white transition-colors">
                  {t.card3Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8e8e8e] font-light leading-relaxed">
                  {t.card3Desc}
                </p>
              </div>
              <div className="pt-4 flex justify-end">
                <img
                  src="https://cdn.fiftyfourms.com/icon_3_5fc3f33f42.png"
                  alt="Premium Materials"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.25rem] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 min-h-[260px] group">
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-light text-white font-philosopher leading-snug group-hover:text-white transition-colors">
                  {t.card4Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8e8e8e] font-light leading-relaxed">
                  {t.card4Desc}
                </p>
              </div>
              <div className="pt-4 flex justify-end">
                <img
                  src="https://cdn.fiftyfourms.com/icon_4_c255df2c41.png"
                  alt="Patented Design"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION: WE GUARANTEE STABILITY (CAM KẾT SỰ ỔN ĐỊNH & TIẾN ĐỘ) + VIDEO */}
        {/* FiftyFourms video + 98/100 and 100% stats */}
        {/* ========================================================================= */}
        <section className="relative w-full mb-16 md:mb-24">
          <div className="rounded-2xl md:rounded-[1.75rem] bg-[#181818] border border-[#262626] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left stats text */}
              <div className="lg:col-span-5 space-y-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-philosopher uppercase leading-tight tracking-[0.04em]">
                  {t.guaranteeTitle}
                </h2>

                <div className="space-y-6 pt-2">
                  {/* Stat 1 */}
                  <div className="space-y-1.5 border-l border-[#353535] pl-5">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-philosopher">
                      {t.guaranteeStat1Val}
                    </div>
                    <div className="text-xs sm:text-sm text-[#b0b0b0] font-light">
                      {t.guaranteeStat1Desc}
                    </div>
                    <div className="text-[11px] text-[#6b6b6b] italic">
                      {t.guaranteeStat1Note}
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="space-y-1.5 border-l border-[#353535] pl-5">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-philosopher">
                      {t.guaranteeStat2Val}
                    </div>
                    <div className="text-xs sm:text-sm text-[#b0b0b0] font-light">
                      {t.guaranteeStat2Desc}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right video player */}
              <div className="lg:col-span-7">
                <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden border border-[#303030] aspect-video bg-black shadow-2xl">
                  <video
                    src="https://cdn.fiftyfourms.com/GOST_GORIZ_ba1f28091a_6fa368e0f8.mp4"
                    poster="https://cdn.fiftyfourms.com/photo_3_1cc1d60029.webp"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SECTION: 3D MODEL LIBRARY & 4 PARTNER SERVICES */}
        {/* Left 3D card + Right 4 services cards (Promotion, AR, Partner, Bespoke) */}
        {/* ========================================================================= */}
        <section className="relative w-full mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: 3D Models Card */}
            <div className="lg:col-span-6 bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.75rem] p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden relative group">
              <div className="space-y-4 mb-6 z-10">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#a0a0a0]">
                  <Box className="w-3.5 h-3.5" />
                  <span>3ds Max / Corona / V-Ray / Revit / SketchUp</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-philosopher uppercase leading-tight">
                  {t.libraryTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#8e8e8e] font-light leading-relaxed max-w-lg">
                  {t.libraryDesc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setShow3DLibraryModal(true)}
                    className="px-6 py-3 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer inline-flex items-center gap-2 shadow-md hover:scale-[1.02]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.download3dBtn}</span>
                  </button>
                </div>
              </div>

              {/* 3D Visual Preview */}
              <div className="relative w-full mt-4 rounded-xl overflow-hidden border border-[#282828]">
                <img
                  src="https://cdn.fiftyfourms.com/photo_3_1cc1d60029.webp"
                  alt="3D Models B+ON"
                  className="w-full h-auto object-cover max-h-[340px] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Col: 4 Service/Partner Cards (2x2) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Partner Card 1: Promotion */}
              <div className="bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.25rem] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 min-h-[220px] group">
                <div className="space-y-2.5">
                  <h4 className="text-base sm:text-lg font-light text-white font-philosopher leading-snug">
                    {t.benefit1Title}
                  </h4>
                  <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                    {t.benefit1Desc}
                  </p>
                </div>
                <div className="pt-4 flex justify-end">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_5_6d8da16486.png"
                    alt="Project Promotion"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              {/* Partner Card 2: AR Models */}
              <div className="bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.25rem] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 min-h-[220px] group">
                <div className="space-y-2.5">
                  <h4 className="text-base sm:text-lg font-light text-white font-philosopher leading-snug">
                    {t.benefit2Title}
                  </h4>
                  <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                    {t.benefit2Desc}
                  </p>
                </div>
                <div className="pt-4 flex justify-end">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_7_1de8082174.png"
                    alt="AR Models"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              {/* Partner Card 3: Partner Collaboration */}
              <div className="bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.25rem] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 min-h-[220px] group">
                <div className="space-y-2.5">
                  <h4 className="text-base sm:text-lg font-light text-white font-philosopher leading-snug">
                    {t.benefit3Title}
                  </h4>
                  <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                    {t.benefit3Desc}
                  </p>
                </div>
                <div className="pt-4 flex justify-end">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_8_be86a9e402.png"
                    alt="Partnership"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              {/* Partner Card 4: Bespoke Consultation */}
              <div className="bg-[#181818] border border-[#262626] rounded-2xl md:rounded-[1.25rem] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 min-h-[220px] group">
                <div className="space-y-2.5">
                  <h4 className="text-base sm:text-lg font-light text-white font-philosopher leading-snug">
                    {t.benefit4Title}
                  </h4>
                  <p className="text-xs text-[#8e8e8e] font-light leading-relaxed">
                    {t.benefit4Desc}
                  </p>
                </div>
                <div className="pt-4 flex justify-end">
                  <img
                    src="https://cdn.fiftyfourms.com/icon_6_fb61c09e6c.png"
                    alt="Personal Consultation"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SECTION: DESIGNER COMPETITION & MACBOOK AIR BANNER */}
        {/* Matches fiftyfourms desktop_fd6eb60bc2.webp & mobile_fa4c852d39.webp */}
        {/* ========================================================================= */}
        <section className="relative w-full mb-16 md:mb-24">
          <div className="relative rounded-2xl md:rounded-[1.75rem] overflow-hidden border border-[#262626] min-h-[360px] sm:min-h-[440px] flex items-center p-6 sm:p-12 lg:p-16">
            
            {/* Background Image with picture element */}
            <picture className="absolute inset-0 w-full h-full -z-10">
              <source media="(max-width: 767px)" srcSet="https://media.fiftyfourms.com/mobile_fa4c852d39.webp" />
              <img
                src="https://media.fiftyfourms.com/desktop_fd6eb60bc2.webp"
                alt="Competition for Designers"
                className="w-full h-full object-cover brightness-[0.85]"
              />
            </picture>

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent -z-10" />

            {/* Content */}
            <div className="max-w-xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
                <Trophy className="w-4 h-4 text-[#d4af37]" />
                <span>Studia 54 & B+ON Design Award</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white font-philosopher uppercase leading-tight tracking-[0.04em]">
                {t.competitionTitle}
              </h2>

              <button
                onClick={() => setShowCompetitionModal(true)}
                className="px-8 py-3.5 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-xl hover:scale-[1.02]"
              >
                {t.competitionBtn}
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. SECTION: FOLLOW US ON SOCIAL MEDIA + VIDEO REEL */}
        {/* 45 000+ stat, social links, and media.fiftyfourms.com/fifti_obrezano_3b16a1ea2c.mp4 */}
        {/* ========================================================================= */}
        <section className="relative w-full mb-16 md:mb-24">
          <div className="rounded-2xl md:rounded-[1.75rem] bg-[#181818] border border-[#262626] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left social info */}
              <div className="lg:col-span-5 text-center lg:text-left space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-philosopher uppercase leading-tight tracking-[0.04em]">
                  {t.socialTitle}
                </h2>

                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-white font-philosopher">
                    {t.socialStatVal}
                  </div>
                  <div className="text-xs sm:text-sm text-[#8e8e8e] font-light">
                    {t.socialStatDesc}
                  </div>
                </div>

                {/* Social icons row matching fiftyfourms */}
                <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5 pt-2">
                  <a
                    href="https://www.instagram.com/bpluson/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#242424] hover:bg-[#333] border border-[#333] flex items-center justify-center p-2.5 transition-all hover:scale-110"
                    title="Instagram"
                  >
                    <img
                      src="https://media.fiftyfourms.com/instagram_1_5201ac8d41.svg"
                      alt="Instagram"
                      className="w-full h-full object-contain"
                    />
                  </a>

                  <a
                    href="https://vk.com/bpluson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#242424] hover:bg-[#333] border border-[#333] flex items-center justify-center p-2.5 transition-all hover:scale-110"
                    title="VK"
                  >
                    <img
                      src="https://cdn.fiftyfourms.com/vk_71931b4b87.svg"
                      alt="VK"
                      className="w-full h-full object-contain"
                    />
                  </a>

                  <a
                    href="https://www.youtube.com/@bpluson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#242424] hover:bg-[#333] border border-[#333] flex items-center justify-center p-2.5 transition-all hover:scale-110"
                    title="YouTube"
                  >
                    <img
                      src="https://media.fiftyfourms.com/yutub_1_44612dbc1c.svg"
                      alt="YouTube"
                      className="w-full h-full object-contain"
                    />
                  </a>

                  <a
                    href="https://ru.pinterest.com/bpluson/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#242424] hover:bg-[#333] border border-[#333] flex items-center justify-center p-2.5 transition-all hover:scale-110"
                    title="Pinterest"
                  >
                    <img
                      src="https://cdn.fiftyfourms.com/pin_b9ede31a33.svg"
                      alt="Pinterest"
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
              </div>

              {/* Right video reel player */}
              <div className="lg:col-span-7">
                <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden border border-[#303030] aspect-[16/10] sm:aspect-video bg-black shadow-2xl">
                  <video
                    src="https://media.fiftyfourms.com/fifti_obrezano_3b16a1ea2c.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. SECTION: PARTNERSHIP APPLICATION FORM (ĐĂNG KÝ HỢP TÁC KIẾN TRÚC) */}
        {/* Left interior photo + Right signature underline form + social icons */}
        {/* ========================================================================= */}
        <section id="form-partnership" className="relative w-full mb-16 md:mb-24 scroll-mt-28">
          <div className="rounded-2xl md:rounded-[1.75rem] bg-[#181818] border border-[#262626] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              
              {/* Left Photo (hidden on small mobile, visible md+) */}
              <div className="hidden md:block md:col-span-5 lg:col-span-6 relative min-h-[440px]">
                <img
                  src="https://cdn.fiftyfourms.com/photo_4_f99ca99db2.webp"
                  alt="B+ON Partnership"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Form container */}
              <div className="col-span-1 md:col-span-7 lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-philosopher uppercase tracking-[0.04em]">
                    {t.formTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8e8e8e] font-light leading-relaxed">
                    {t.formDesc}
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="bg-[#202020] border border-[#383838] p-6 sm:p-8 rounded-xl text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-950/60 border border-green-700/80 text-green-400 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-light text-white font-philosopher uppercase">
                      {t.formSuccessTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed max-w-md mx-auto">
                      {t.formSuccessDesc}
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormName('');
                        setFormPhone('');
                        setFormEmail('');
                        setFormStudio('');
                      }}
                      className="px-6 py-2.5 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Input 1: Name */}
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={t.formNamePlaceholder}
                        className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                      />
                    </div>

                    {/* Input 2: Phone */}
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder={t.formPhonePlaceholder}
                        className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                      />
                    </div>

                    {/* Input 3: Email */}
                    <div className="relative">
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder={t.formEmailPlaceholder}
                        className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                      />
                    </div>

                    {/* Input 4: Studio */}
                    <div className="relative">
                      <input
                        type="text"
                        value={formStudio}
                        onChange={(e) => setFormStudio(e.target.value)}
                        placeholder={t.formStudioPlaceholder}
                        className="w-full bg-transparent border-b border-[#404040] focus:border-white py-3 text-sm text-white placeholder-[#6b6b6b] outline-none transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-4 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        {formLoading ? '...' : t.formSubmitBtn}
                      </button>
                    </div>

                    {/* Social icons row at bottom of form */}
                    <div className="pt-6 border-t border-[#262626] flex items-center justify-center gap-6">
                      <a
                        href="https://www.instagram.com/bpluson/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 transition-opacity"
                        title="Instagram"
                      >
                        <img
                          src="https://media.fiftyfourms.com/instagram_3_78477317e5.svg"
                          alt="Instagram"
                          className="w-7 h-7 object-contain"
                        />
                      </a>
                      <a
                        href="https://t.me/bpluson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 transition-opacity"
                        title="Telegram"
                      >
                        <img
                          src="https://media.fiftyfourms.com/tg_logo_8a417aa76e.svg"
                          alt="Telegram"
                          className="w-6 h-6 object-contain"
                        />
                      </a>
                      <a
                        href="https://ru.pinterest.com/bpluson/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 transition-opacity"
                        title="Pinterest"
                      >
                        <img
                          src="https://cdn.fiftyfourms.com/pin_icon_footer_46e4c14377.svg"
                          alt="Pinterest"
                          className="w-6 h-6 object-contain"
                        />
                      </a>
                      <a
                        href="https://youtube.com/@bpluson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 transition-opacity"
                        title="YouTube"
                      >
                        <img
                          src="https://media.fiftyfourms.com/yutub_3_374442b434.svg"
                          alt="YouTube"
                          className="w-7 h-7 object-contain"
                        />
                      </a>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 9. MODAL: COMPETITION FOR DESIGNERS (THỂ LỆ CUỘC THI THIẾT KẾ) */}
      {/* ========================================================================= */}
      {showCompetitionModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#353535] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-10 relative space-y-6 text-[#dcdcdc] shadow-2xl">
            <button
              onClick={() => setShowCompetitionModal(false)}
              className="absolute top-6 right-6 text-[#888] hover:text-white p-2 rounded-full hover:bg-[#252525] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                <Trophy className="w-4 h-4 text-[#d4af37]" />
                <span>Studia 54 × B+ON Annual Award</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white font-philosopher uppercase">
                {t.competitionTitle}
              </h3>
            </div>

            <div className="space-y-5 text-xs sm:text-sm leading-relaxed border-t border-b border-[#2a2a2a] py-5">
              <div className="bg-[#202020] border border-[#333] p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Gift className="w-4 h-4 text-[#d4af37]" />
                  <span>Giải thưởng / Prizes:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[#b0b0b0] pl-1">
                  <li><strong className="text-white">1st Prize:</strong> Apple MacBook Air M3 (15-inch, 16GB RAM) + Hợp đồng hợp tác chiến lược cùng B+ON.</li>
                  <li><strong className="text-white">2nd Prize:</strong> Bộ mẫu hộp vật liệu thực tế B+ON Box + Gói tài khoản 3D Pro VIP.</li>
                  <li><strong className="text-white">3rd Prize:</strong> Xuất bản dự án trên các kênh truyền thông chính thức của Studia 54 & B+ON.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Calendar className="w-4 h-4 text-[#aeb8c2]" />
                  <span>Điều kiện & Thể lệ tham dự / Terms & Criteria:</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-[#9e9e9e] pl-1">
                  <li>Dành cho tất cả kiến trúc sư, nhà thiết kế nội thất và nghệ sĩ 3D visualizer trên toàn thế giới.</li>
                  <li>Thiết kế phối cảnh không gian nội thất (phòng khách, phòng ngủ, phòng ăn hoặc sảnh đón) có sử dụng ít nhất 01 sản phẩm nội thất bất kỳ của B+ON.</li>
                  <li>Sử dụng các file 3D chính thức tải từ Thư viện Model 3D của B+ON.</li>
                  <li>Gửi bài dự thi kèm thông tin portfolio qua email: <a href="mailto:sales@bpluson.com" className="text-white underline hover:text-[#d4af37]">sales@bpluson.com</a> hoặc đăng tải Instagram gắn thẻ <strong className="text-white">@bpluson</strong> và hashtag <strong className="text-white">#BplusonDesignAward</strong>.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={() => {
                  setShowCompetitionModal(false);
                  setShow3DLibraryModal(true);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-white text-black hover:bg-[#dcdcdc] rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.download3dBtn}</span>
              </button>
              <button
                onClick={() => setShowCompetitionModal(false)}
                className="w-full sm:w-auto px-6 py-3 bg-transparent text-white border border-[#404040] hover:border-white rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
              >
                Đóng / Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. MODAL / DRAWER: 3D MODEL & BIM ASSETS BROWSER */}
      {/* ========================================================================= */}
      {show3DLibraryModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#181818] border border-[#353535] max-w-5xl w-full max-h-[92vh] overflow-hidden rounded-2xl flex flex-col shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-7 border-b border-[#282828] flex items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#a0a0a0] mb-1">
                  <Box className="w-3.5 h-3.5" />
                  <span>3D CAD / BIM / Max / Corona / FBX</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-white font-philosopher uppercase">
                  {t.libraryTitle}
                </h3>
              </div>
              <button
                onClick={() => setShow3DLibraryModal(false)}
                className="p-2 text-[#888] hover:text-white rounded-full hover:bg-[#252525] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 sm:p-5 border-b border-[#262626] bg-[#141414] flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <Search className="w-4 h-4 text-[#666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search3D}
                  onChange={(e) => setSearch3D(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-[#1c1c1c] border border-[#303030] focus:border-white pl-10 pr-4 py-2.5 rounded-full text-xs text-white placeholder-[#666] outline-none"
                />
              </div>

              {/* Format filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['all', '3ds max', 'corona', 'v-ray', 'fbx', 'obj'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setActiveFormat(fmt)}
                    className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-mono transition-all whitespace-nowrap cursor-pointer ${
                      activeFormat === fmt
                        ? 'bg-white text-black font-medium'
                        : 'bg-[#202020] text-[#888] hover:text-white border border-[#303030]'
                    }`}
                  >
                    {fmt === 'all' ? t.formatAll : fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Models Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 max-h-[58vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((item) => {
                  const name = getProductName(item, currentLanguage);
                  const isDownloaded = downloadedItems[item.id];

                  return (
                    <div
                      key={item.id}
                      className="bg-[#1c1c1c] border border-[#282828] hover:border-[#404040] rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all group"
                    >
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/40 border border-[#242424]">
                        <img
                          src={item.image}
                          alt={name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] uppercase font-mono text-[#a0a0a0] border border-[#333]">
                          {item.sku}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-white line-clamp-1 group-hover:text-white transition-colors">
                          {name}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-[#777]">
                          <span>{item.model3d?.polyCount || '45k polys'}</span>
                          <span>{item.model3d?.fileSize || '38 MB'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-[#9e9e9e] pt-1">
                          <Layers className="w-3 h-3 text-[#a0a0a0]" />
                          <span>{t.materialsIncluded}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownloadModel(item.id, name)}
                        className={`w-full py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isDownloaded
                            ? 'bg-green-950/60 border border-green-700 text-green-300'
                            : 'bg-white text-black hover:bg-[#dcdcdc]'
                        }`}
                      >
                        {isDownloaded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã tải / Downloaded</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>{t.downloadAssetBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#282828] bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#777]">
                Tất cả model 3D đều được chuẩn hóa tỷ lệ 1:1 và kèm vật liệu V-Ray/Corona bản quyền.
              </div>
              <button
                onClick={() => {
                  const dummyBlob = new Blob(['B+ON COMPLETE 3D PACK 2026'], { type: 'application/zip' });
                  const url = URL.createObjectURL(dummyBlob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'BON_Complete_3D_Pack_2026.zip';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="px-5 py-2.5 bg-[#252525] hover:bg-white hover:text-black text-white border border-[#3a3a3a] rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadCompletePack}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
