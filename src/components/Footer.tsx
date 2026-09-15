import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Lock, Send, MessageCircle, PhoneCall } from 'lucide-react';
import { MainCategory, PageType, AppLanguage } from '../types';

interface FooterProps {
  onSelectCategory: (cat: MainCategory) => void;
  onNavigatePage: (page: PageType, cat?: MainCategory) => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenCatalogDownload?: () => void;
  currentLanguage: AppLanguage;
  onOpenConsultation?: () => void;
  onSelectFurniture?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory: _onSelectCategory,
  onNavigatePage,
  currentLanguage,
  onOpenConsultation,
  onSelectFurniture,
}) => {
  const [activeInfoModal, setActiveInfoModal] = useState<'delivery' | 'warranty' | 'privacy' | null>(null);

  const t = {
    VI: {
      brandSubtitle: 'BEYOND ORDINARY LIVING',
      socialTitle: 'CHÚNG TÔI TRÊN MẠNG XÃ HỘI',
      metaDisclaimer: '* Công ty Meta được công nhận là tổ chức cực đoan và bị cấm tại Liên bang Nga.',
      catalogTitle: 'DANH MỤC',
      navCabinet: 'Nội thất gỗ & đá (Cabinet)',
      navUpholstered: 'Nội thất bọc nệm',
      navByRoom: 'Nội thất theo không gian',
      inspirationTitle: 'NGUỒN CẢM HỨNG',
      navBlog: 'Kiến trúc & Đời sống (Blog)',
      navInteriors: 'Dự án nội thất',
      navMaterials: 'Bảng vật liệu hoàn thiện',
      informationTitle: 'THÔNG TIN',
      navAbout: 'Về công ty',
      navDelivery: 'Điều khoản thanh toán & giao hàng',
      navWarranty: 'Chính sách bảo hành sản phẩm',
      contactsTitle: 'LIÊN HỆ',
      spbAddress: 'Showroom & Xưởng chế tác: 68 Nguyễn Huệ, Phường Sài Gòn',
      moscowAddress: 'Studio thiết kế: 68 Nguyễn Huệ, Phường Sài Gòn',
      phone: '+84 931100377',
      email: 'sales@bpluson.com',
      companyEntity: 'BPLUSON LIVING CO., LTD',
      copyright: '© 2026 Bảo lưu mọi quyền.',
      privacyPolicy: 'Chính sách bảo mật',
      selectFurniture: 'Chọn nội thất',
    },
    EN: {
      brandSubtitle: 'BEYOND ORDINARY LIVING',
      socialTitle: 'WE ARE ON SOCIAL NETWORKS',
      metaDisclaimer: '* The Meta company is recognized as an extremist organization and is banned in the Russian Federation.',
      catalogTitle: 'CATALOG',
      navCabinet: 'Cabinet furniture',
      navUpholstered: 'Upholstered furniture',
      navByRoom: 'Furniture by room',
      inspirationTitle: 'INSPIRATION',
      navBlog: 'Blog',
      navInteriors: 'Interiors',
      navMaterials: 'Materials',
      informationTitle: 'INFORMATION',
      navAbout: 'About the company',
      navDelivery: 'Delivery and payment terms',
      navWarranty: 'Warranty obligations',
      contactsTitle: 'CONTACTS',
      spbAddress: 'Flagship Showroom & Atelier: 68 Nguyen Hue, Saigon Ward',
      moscowAddress: 'Design Studio: 68 Nguyen Hue, Saigon Ward',
      phone: '+84 931100377',
      email: 'sales@bpluson.com',
      companyEntity: 'BPLUSON LIVING CO., LTD',
      copyright: '© 2026 All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      selectFurniture: 'Select furniture',
    },
  }[currentLanguage];

  return (
    <footer id="main-footer" className="w-full bg-[#181818] text-[#a5a5a5] font-manrope border-t border-[#262626] pt-16 md:pt-20 pb-12 transition-colors">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1920px]">
        {/* Main 5-Column Grid matching attached screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-[#262626]">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-7">
            <div>
              <div
                onClick={() => onNavigatePage('home')}
                className="cursor-pointer inline-flex items-center group select-none"
              >
                <img
                  src="/bon-logo.png"
                  alt="B+ON"
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity group-hover:opacity-85"
                />
              </div>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#8e8e8e] font-light mt-2.5">
                {t.brandSubtitle}
              </p>
            </div>

            <div className="space-y-3 pt-3">
              <h4 className="text-xs uppercase tracking-[0.16em] text-white font-semibold">
                {t.socialTitle}
              </h4>
              <ul className="space-y-2.5 text-sm text-[#9e9e9e] font-light">
                <li>
                  <a
                    href="https://instagram.com/bpluson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/bpluson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://pinterest.com/bpluson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Pinterest
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@bpluson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
              <p className="text-[9.5px] sm:text-[10px] text-[#555555] leading-relaxed pt-3 max-w-[240px] font-light">
                {t.metaDisclaimer}
              </p>
            </div>
          </div>

          {/* Column 2: CATALOG */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#808080] font-light">
              {t.catalogTitle}
            </h4>
            <ul className="space-y-3.5 text-sm text-[#a8a8a8] font-light">
              <li>
                <button
                  onClick={() => onNavigatePage('catalog', 'cabinet')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navCabinet}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('catalog', 'upholstered')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navUpholstered}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('catalog', 'by-rooms')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navByRoom}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: INSPIRATION */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#808080] font-light">
              {t.inspirationTitle}
            </h4>
            <ul className="space-y-3.5 text-sm text-[#a8a8a8] font-light">
              <li>
                <button
                  onClick={() => onNavigatePage('blog')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navBlog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('interiors')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navInteriors}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('materials')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navMaterials}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: INFORMATION */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#808080] font-light">
              {t.informationTitle}
            </h4>
            <ul className="space-y-3.5 text-sm text-[#a8a8a8] font-light">
              <li>
                <button
                  onClick={() => onNavigatePage('about')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveInfoModal('delivery')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navDelivery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveInfoModal('warranty')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navWarranty}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACTS */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#808080] font-light">
              {t.contactsTitle}
            </h4>
            <div className="space-y-3.5 text-sm text-[#a8a8a8] font-light leading-relaxed">
              <p>
                {t.spbAddress}
              </p>
              <p>
                {t.moscowAddress}
              </p>
              <p className="pt-1">
                <a
                  href="tel:+84931100377"
                  className="text-white hover:text-[#d0d0d0] transition-colors"
                >
                  {t.phone}
                </a>
              </p>
              <p>
                <a
                  href="mailto:sales@bpluson.com"
                  className="text-[#999999] hover:text-white transition-colors"
                >
                  {t.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching attached screenshot */}
        <div className="pt-8 pb-2 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-[#707070] font-light">
          {/* Legal entity on left */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 md:gap-14">
            <span>{t.companyEntity}</span>
            <span>{t.copyright}</span>
            <button
              onClick={() => setActiveInfoModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer text-[#707070]"
            >
              {t.privacyPolicy}
            </button>
          </div>

          {/* Bottom Right Actions Dock (Telegram, Chat, WhatsApp, Select furniture) */}
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/bpluson"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#202020] hover:bg-[#2c2c2c] text-[#c0c0c0] hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
              title="Telegram"
            >
              <Send className="w-3.5 h-3.5 -translate-x-0.5 translate-y-0.5" />
            </a>

            <button
              onClick={onOpenConsultation}
              className="w-8 h-8 rounded-full bg-[#202020] hover:bg-[#2c2c2c] text-[#c0c0c0] hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
              title="Chat"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>

            <a
              href="https://wa.me/84931100377"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#202020] hover:bg-[#2c2c2c] text-[#c0c0c0] hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
              title="WhatsApp"
            >
              <PhoneCall className="w-3.5 h-3.5" />
            </a>

            <button
              id="footer-btn-select-furniture"
              onClick={onSelectFurniture || (() => onNavigatePage('catalog'))}
              className="px-5 py-2 rounded-full bg-[#202020] hover:bg-[#2a2a2a] text-[#dedede] hover:text-white text-xs font-normal border border-white/5 transition-all shadow-sm cursor-pointer"
            >
              {t.selectFurniture}
            </button>
          </div>
        </div>
      </div>

      {/* Info Modals for Delivery, Warranty, Privacy */}
      {activeInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1b1b1b] border border-[#333333] rounded-2xl max-w-xl w-full p-6 sm:p-8 relative text-[#e0e0e0] shadow-2xl space-y-4">
            <button
              onClick={() => setActiveInfoModal(null)}
              className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeInfoModal === 'delivery' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#262626] text-white">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{t.navDelivery}</h3>
                    <p className="text-xs text-[#888888]">B+ON Logistics & White-Glove Assembly</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-[#b0b0b0] font-light leading-relaxed pt-2">
                  <p>
                    {currentLanguage === 'VI'
                      ? 'B+ON cung cấp dịch vụ giao hàng cao cấp White-Glove trên toàn nước Nga, các nước CIS và xuất khẩu toàn cầu. Tất cả sản phẩm được đóng kiện gỗ gia cố tiêu chuẩn hàng không quốc tế.'
                      : 'B+ON provides premium White-Glove delivery throughout Russia, the CIS, and worldwide destinations. All furniture items are packed in reinforced museum-grade wooden crates.'}
                  </p>
                  <p>
                    {currentLanguage === 'VI'
                      ? 'Quy trình giao nhận bao gồm vận chuyển đến phòng chỉ định, tháo dỡ kiện, lắp ráp hoàn chỉnh bởi đội ngũ kỹ thuật viên lành nghề và thu dọn toàn bộ vật liệu đóng gói.'
                      : 'Services include transit to the designated room, crate unpacking, full professional assembly by certified craftsmen, and removal of all packaging debris.'}
                  </p>
                  <p>
                    {currentLanguage === 'VI'
                      ? 'Hình thức thanh toán: Chuyển khoản ngân hàng doanh nghiệp (B2B), thẻ tín dụng quốc tế hoặc bảo lãnh tín dụng cho các dự án nội thất quy mô lớn.'
                      : 'Payment terms: Wire bank transfer, corporate B2B contracts, international payment cards, or letter of credit for private residence commissions.'}
                  </p>
                </div>
              </>
            )}

            {activeInfoModal === 'warranty' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#262626] text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{t.navWarranty}</h3>
                    <p className="text-xs text-[#888888]">Five-Year Craftsmanship Guarantee</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-[#b0b0b0] font-light leading-relaxed pt-2">
                  <p>
                    {currentLanguage === 'VI'
                      ? 'Mọi sản phẩm nội thất B+ON được bảo hành chính hãng 5 năm cho phần khung kết cấu gỗ, phụ kiện ray giảm chấn Blum/Hettich và bề mặt sơn mài cao cấp.'
                      : 'Every B+ON piece carries an official 5-year warranty covering solid timber frames, internal engineering, European soft-close hardware, and lacquer coatings.'}
                  </p>
                  <p>
                    {currentLanguage === 'VI'
                      ? 'Chúng tôi cam kết hỗ trợ bảo dưỡng định kỳ, phục hồi bề mặt da/đá cẩm thạch và cung cấp linh kiện chính hãng trọn đời sản phẩm.'
                      : 'We provide lifetime post-warranty concierge support, including professional stone/leather care regimens and genuine replacement components.'}
                  </p>
                </div>
              </>
            )}

            {activeInfoModal === 'privacy' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#262626] text-white">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{t.privacyPolicy}</h3>
                    <p className="text-xs text-[#888888]">LLC "PRODUCTION 54" Data Privacy Policy</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-[#b0b0b0] font-light leading-relaxed pt-2">
                  <p>
                    {currentLanguage === 'VI'
                      ? 'LLC "PRODUCTION 54" cam kết bảo mật tuyệt đối thông tin cá nhân và dữ liệu dự án của khách hàng theo đạo luật liên bang số 152-FZ và quy định quốc tế GDPR.'
                      : 'LLC "PRODUCTION 54" is strictly committed to protecting personal customer credentials and architectural project specifications in accordance with federal and international standards.'}
                  </p>
                  <p>
                    {currentLanguage === 'VI'
                      ? 'Thông tin liên hệ chỉ phục vụ mục đích tư vấn thiết kế, gửi báo giá và điều phối vận chuyển đơn hàng, không chia sẻ cho bên thứ ba vì bất kỳ mục đích nào.'
                      : 'Your contact details are solely utilized for project consultation, quote preparation, and white-glove logistics coordination.'}
                  </p>
                </div>
              </>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveInfoModal(null)}
                className="px-5 py-2 bg-white text-black text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#e0e0e0] transition-colors cursor-pointer"
              >
                {currentLanguage === 'VI' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
