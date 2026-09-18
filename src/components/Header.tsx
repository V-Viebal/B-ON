import React, { useState, useEffect } from 'react';
import { Search, Heart, MapPin, X, Menu, Phone, ChevronDown, Download, ArrowRight, Pencil, LogIn } from 'lucide-react';
import { MainCategory, SubCategory, PageType, AppLanguage } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigatePage: (page: PageType, cat?: MainCategory, subcat?: SubCategory) => void;
  onSelectCategory: (cat: MainCategory, subcat?: SubCategory) => void;
  collections: string[];
  onSelectCollection: (collection?: string) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCatalogDownload: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenContactModal: () => void;
  wishlistCount: number;
  currentLanguage: AppLanguage;
  onChangeLanguage: (lang: AppLanguage) => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  onSignInAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigatePage,
  onSelectCategory,
  collections,
  onSelectCollection,
  onOpenSearch,
  onOpenWishlist,
  onOpenCatalogDownload,
  onNavigateSection: _onNavigateSection,
  onOpenContactModal,
  wishlistCount,
  currentLanguage,
  onChangeLanguage,
  isAdmin = false,
  onOpenAdmin,
  onSignInAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationTooltip, setLocationTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    VI: {
      writeUs: 'LIÊN HỆ NGAY',
      catalog: 'DANH MỤC',
      inStock: 'HÀNG CÓ SẴN',
      about: 'VỀ CHÚNG TÔI',
      interiors: 'DỰ ÁN NỘI THẤT',
      blog: 'KIẾN TRÚC & ĐỜI SỐNG',
      designers: 'DÀNH CHO KTS',
      materials: 'VẬT LIỆU',
      contacts: 'LIÊN HỆ',
      downloadCatalog: 'TẢI CATALOGUE',
      cabinetTitle: 'NỘI THẤT GỖ & ĐÁ (CABINET)',
      upholsteredTitle: 'NỘI THẤT BỌC NỆM (SOFA, GIƯỜNG)',
      byRoomTitle: 'THEO KHÔNG GIAN',
      allFurniture: 'TẤT CẢ NỘI THẤT',
      collectionsTitle: 'COLLECTION',
      phone: '+84 931100377',
      addressMoscow: '68 Nguyễn Huệ, Phường Sài Gòn',
      addressSpb: '68 Nguyễn Huệ, Phường Sài Gòn',
      pdfCatalog: 'CATALOGUE PDF 2026',
      flagshipShowrooms: 'SHOWROOM FLAGSHIP',
      allShowrooms: 'TẤT CẢ SHOWROOM & GIỜ MỞ CỬA',
      locationLabel: '68 Nguyễn Huệ, Phường Sài Gòn',
    },
    EN: {
      writeUs: 'CONTACT US',
      catalog: 'CATALOG',
      inStock: 'IN STOCK',
      about: 'ABOUT US',
      interiors: 'INTERIORS',
      blog: 'BLOG',
      designers: 'FOR DESIGNERS',
      materials: 'MATERIALS',
      contacts: 'CONTACTS',
      downloadCatalog: 'DOWNLOAD CATALOG',
      cabinetTitle: 'CABINET FURNITURE',
      upholsteredTitle: 'UPHOLSTERED FURNITURE',
      byRoomTitle: 'BY ROOMS',
      allFurniture: 'ALL FURNITURE',
      collectionsTitle: 'COLLECTIONS',
      phone: '+84 931100377',
      addressMoscow: '68 Nguyen Hue, Saigon Ward',
      addressSpb: '68 Nguyen Hue, Saigon Ward',
      pdfCatalog: 'PDF CATALOG 2026',
      flagshipShowrooms: 'FLAGSHIP SHOWROOMS',
      allShowrooms: 'ALL SHOWROOMS & OPENING HOURS',
      locationLabel: '68 Nguyen Hue, Saigon Ward',
    },
  }[currentLanguage];

  const cabinetItems: { label: string; subcat: SubCategory }[] = [
    { label: currentLanguage === 'VI' ? 'Bàn ăn' : 'Dining Tables', subcat: 'dining-tables' },
    { label: currentLanguage === 'VI' ? 'Bàn trà' : 'Coffee Tables', subcat: 'coffee-tables' },
    { label: currentLanguage === 'VI' ? 'Bàn console' : 'Consoles', subcat: 'consoles' },
    { label: currentLanguage === 'VI' ? 'Tủ ngăn kéo' : 'Sideboards', subcat: 'sideboards' },
    { label: currentLanguage === 'VI' ? 'Tủ đầu giường' : 'Bedside Tables', subcat: 'bedside-tables' },
    { label: currentLanguage === 'VI' ? 'Kệ tivi' : 'TV Stands', subcat: 'tv-stands' },
    { label: currentLanguage === 'VI' ? 'Bàn trang điểm' : 'Dressing Tables', subcat: 'dressing-tables' },
    { label: currentLanguage === 'VI' ? 'Bàn làm việc' : 'Office Desks', subcat: 'desks' },
  ];

  const upholsteredItems: { label: string; subcat: SubCategory }[] = [
    { label: currentLanguage === 'VI' ? 'Sofa cao cấp' : 'Sofas', subcat: 'sofas' },
    { label: currentLanguage === 'VI' ? 'Giường ngủ' : 'Beds', subcat: 'beds' },
    { label: currentLanguage === 'VI' ? 'Ghế bành đơn' : 'Armchairs', subcat: 'armchairs' },
    { label: currentLanguage === 'VI' ? 'Ghế ăn' : 'Chairs', subcat: 'chairs' },
    { label: currentLanguage === 'VI' ? 'Ghế băng dài' : 'Banquettes', subcat: 'banquettes' },
    { label: currentLanguage === 'VI' ? 'Ghế thư giãn' : 'Couches', subcat: 'couches' },
    { label: currentLanguage === 'VI' ? 'Đôn sofa' : 'Poufs', subcat: 'poufs' },
  ];

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 z-50 w-full font-manrope select-none transition-colors duration-300"
    >
      <div
        className={`relative z-10 flex flex-col items-center justify-start transition-all duration-300 ${
          currentPage === 'home' || currentPage === 'about' || currentPage === 'product-detail'
            ? isScrolled
              ? 'bg-[#141414]/95 backdrop-blur-[14px] border-b border-[#303030]/90 shadow-2xl'
              : 'bg-[linear-gradient(180deg,rgba(20,20,20,0.85)_0%,rgba(20,20,20,0.3)_100%)] backdrop-blur-[6px]'
            : 'bg-[#141414] border-b border-[#2e2e2e] shadow-xl'
        }`}
      >
        {/* Top Header Bar */}
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
          <div className="relative w-full py-2.5 md:py-3.5 flex items-center justify-between border-b border-[#2e2e2e]">
            {/* Left Section: Location & Write Us */}
            <div className="flex items-center gap-4 lg:gap-7">
              {/* Location Pin with Tooltip */}
              <div className="relative">
                <button
                  id="header-location-btn"
                  onClick={() => setLocationTooltip(!locationTooltip)}
                  className="p-1 text-[#e8e8e8] hover:text-[#aeb8c2] transition-colors flex items-center gap-1.5 text-xs font-light tracking-wider uppercase"
                  title="Showrooms & Offices"
                >
                  <MapPin className="w-4 h-4 text-[#e8e8e8]" />
                  <span className="hidden xl:inline text-xs text-[#aeb8c2]">{t.locationLabel}</span>
                </button>

                {locationTooltip && (
                  <div
                    id="header-location-tooltip"
                    className="absolute top-full left-0 mt-2 w-72 bg-[#1f1f1f] border border-[#353535] p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="flex items-center justify-between border-b border-[#353535] pb-2">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#aeb8c2] font-medium">
                        {t.flagshipShowrooms}
                      </span>
                      <button
                        onClick={() => setLocationTooltip(false)}
                        className="text-[#868686] hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="space-y-3 pt-3 text-xs text-[#b6b6b6]">
                      <div>
                        <p className="text-white font-medium uppercase tracking-wider text-[11px]">
                          {currentLanguage === 'VI' ? 'Showroom Flagship Bpluson' : 'Bpluson Flagship Showroom'}
                        </p>
                        <p>{t.addressMoscow}</p>
                      </div>
                      <div>
                        <p className="text-white font-medium uppercase tracking-wider text-[11px]">
                          {currentLanguage === 'VI' ? 'Xưởng Chế Tác & Studio' : 'Atelier & Design Studio'}
                        </p>
                        <p>{t.addressSpb}</p>
                      </div>
                      <button
                        onClick={() => {
                          setLocationTooltip(false);
                          onNavigatePage('contacts');
                        }}
                        className="w-full mt-2 py-2 bg-[#25252b] hover:bg-[#353535] text-white text-[11px] uppercase tracking-wider transition-colors text-center block font-medium"
                      >
                        {t.allShowrooms}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Write to us with animated line */}
              <button
                id="header-write-us-btn"
                onClick={onOpenContactModal}
                className="group relative inline-flex items-center text-xs lg:text-[13px] font-light text-[#e8e8e8] hover:text-[#aeb8c2] uppercase tracking-[0.15em] transition-colors py-1"
              >
                <span>{t.writeUs}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#aeb8c2] group-hover:w-full transition-all duration-300" />
              </button>
            </div>

            {/* Center Section: B+ON Logo exactly centered (Click goes to Home) */}
            <div
              id="header-logo"
              onClick={() => onNavigatePage('home')}
              className="cursor-pointer absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center group py-0.5 select-none z-10"
              title="B+ON - Home"
            >
              <div className="flex items-center transition-opacity group-hover:opacity-85">
                <img
                  src="/bon-logo.png"
                  alt="B+ON"
                  className="h-6 sm:h-7 md:h-8 w-auto object-contain"
                />
              </div>
            </div>

            {/* Right Section: Phone, Language, Search, Wishlist, Menu */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Phone Link */}
              <a
                href="tel:+84931100377"
                className="hidden md:flex items-center gap-1.5 text-xs text-[#e8e8e8] hover:text-[#aeb8c2] tracking-wider transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#aeb8c2]" />
                <span className="font-light">{t.phone}</span>
              </a>

              {/* Language Switcher */}
              <div className="flex items-center space-x-1.5 text-[11px] tracking-wider border-l border-[#353535] pl-3 ml-1">
                {(['VI', 'EN'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onChangeLanguage(lang)}
                    className={`px-1.5 py-0.5 transition-colors uppercase ${
                      currentLanguage === lang
                        ? 'text-white font-medium border-b border-[#aeb8c2]'
                        : 'text-[#868686] hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Search Icon */}
              <button
                id="header-search-btn"
                onClick={onOpenSearch}
                aria-label="Search"
                className="p-1.5 text-[#e8e8e8] hover:text-[#aeb8c2] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Account action: sign in first, then switch to Edit Mode after admin authentication. */}
              {isAdmin && onOpenAdmin ? (
                <button
                  id="header-admin-edit-btn"
                  type="button"
                  onClick={onOpenAdmin}
                  className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[#aeb8c2]/60 px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] text-[#aeb8c2] hover:border-white hover:text-white transition-colors uppercase"
                  title={currentLanguage === 'VI' ? 'Chuyển sang chế độ chỉnh sửa' : 'Switch to edit mode'}
                >
                  <Pencil className="w-3 h-3" />
                  <span>{currentLanguage === 'VI' ? 'EDIT MODE' : 'EDIT MODE'}</span>
                </button>
              ) : onSignInAdmin ? (
                <button
                  id="header-admin-signin-btn"
                  type="button"
                  onClick={onSignInAdmin}
                  className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[#aeb8c2]/60 px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] text-[#aeb8c2] hover:border-white hover:text-white transition-colors uppercase"
                  title={currentLanguage === 'VI' ? 'Đăng nhập tài khoản admin' : 'Sign in as admin'}
                >
                  <LogIn className="w-3 h-3" />
                  <span>{currentLanguage === 'VI' ? 'ĐĂNG NHẬP' : 'SIGN IN'}</span>
                </button>
              ) : null}

              {/* Wishlist Icon */}
              <button
                id="header-wishlist-btn"
                onClick={onOpenWishlist}
                aria-label="Wishlist"
                className="relative p-1.5 text-[#e8e8e8] hover:text-[#aeb8c2] transition-colors"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#aeb8c2] text-[#181818] font-bold text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                id="header-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-[#e8e8e8] hover:text-[#aeb8c2]"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sub Navigation Bar (Desktop) with Separate Dedicated Pages - Centered */}
          <div className="hidden lg:flex items-center justify-center py-3 text-[13px] tracking-[0.16em] uppercase text-[#e8e8e8] font-light w-full">
            <div className="flex items-center justify-center space-x-7 xl:space-x-9">
              
              {/* 1. CATALOG with Mega Menu Dropdown */}
              <div
                className="relative py-1"
                onMouseEnter={() => setCatalogOpen(true)}
                onMouseLeave={() => setCatalogOpen(false)}
              >
                <button
                  id="nav-catalog-toggle"
                  onClick={() => {
                    onNavigatePage('catalog', 'all');
                    setCatalogOpen(false);
                  }}
                  className={`flex items-center gap-1.5 transition-colors uppercase tracking-[0.16em] group ${
                    currentPage === 'catalog'
                      ? 'text-white font-medium border-b border-[#aeb8c2]'
                      : 'text-[#d0d0d0] hover:text-white'
                  }`}
                >
                  <span>{t.catalog}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      catalogOpen ? 'rotate-180 text-[#aeb8c2]' : 'text-[#868686]'
                    }`}
                  />
                </button>

                {/* FiftyFourms Mega Dropdown */}
                {catalogOpen && (
                  <div
                    id="header-mega-menu"
                    className="absolute top-full left-0 w-[1040px] max-w-[calc(100vw-2rem)] bg-[#1a1a1a]/98 backdrop-blur-xl border border-[#353535] p-7 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(250px,0.85fr)] gap-8">
                      <div className="grid grid-cols-2 gap-8">
                      {/* Column 1: Cabinet (Korpusnaya Mebel) */}
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            onNavigatePage('catalog', 'cabinet', 'all');
                            setCatalogOpen(false);
                          }}
                          className="w-full text-left group/col flex items-center justify-between pb-3 border-b border-[#353535] mb-3.5 cursor-pointer hover:border-[#aeb8c2] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] uppercase tracking-[0.18em] font-medium text-[#aeb8c2] group-hover/col:text-white transition-colors">
                              {t.cabinetTitle}
                            </span>
                          </div>
                          <div className="flex items-center text-[#777777] group-hover/col:text-[#aeb8c2] transition-colors">
                            <ArrowRight className="w-3.5 h-3.5 group-hover/col:translate-x-1 transition-transform" />
                          </div>
                        </button>
                        <ul className="space-y-2.5">
                          {cabinetItems.map((item) => (
                            <li key={item.subcat}>
                              <button
                                onClick={() => {
                                  onNavigatePage('catalog', 'cabinet', item.subcat);
                                  setCatalogOpen(false);
                                }}
                                className="text-left text-xs font-light text-[#b6b6b6] hover:text-white transition-colors flex items-center justify-between w-full hover:translate-x-1 duration-150 uppercase tracking-wider py-0.5 group/item"
                              >
                                <span>{item.label}</span>
                                <span className="text-[10px] text-[#555555] group-hover/item:text-[#aeb8c2] opacity-0 group-hover/item:opacity-100 transition-opacity">
                                  →
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: Upholstered (Myagkaya Mebel) */}
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            onNavigatePage('catalog', 'upholstered', 'all');
                            setCatalogOpen(false);
                          }}
                          className="w-full text-left group/col flex items-center justify-between pb-3 border-b border-[#353535] mb-3.5 cursor-pointer hover:border-[#aeb8c2] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] uppercase tracking-[0.18em] font-medium text-[#aeb8c2] group-hover/col:text-white transition-colors">
                              {t.upholsteredTitle}
                            </span>
                          </div>
                          <div className="flex items-center text-[#777777] group-hover/col:text-[#aeb8c2] transition-colors">
                            <ArrowRight className="w-3.5 h-3.5 group-hover/col:translate-x-1 transition-transform" />
                          </div>
                        </button>
                        <ul className="space-y-2.5">
                          {upholsteredItems.map((item) => (
                            <li key={item.subcat}>
                              <button
                                onClick={() => {
                                  onNavigatePage('catalog', 'upholstered', item.subcat);
                                  setCatalogOpen(false);
                                }}
                                className="text-left text-xs font-light text-[#b6b6b6] hover:text-white transition-colors flex items-center justify-between w-full hover:translate-x-1 duration-150 uppercase tracking-wider py-0.5 group/item"
                              >
                                <span>{item.label}</span>
                                <span className="text-[10px] text-[#555555] group-hover/item:text-[#aeb8c2] opacity-0 group-hover/item:opacity-100 transition-opacity">
                                  →
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Expanded collection rail aligned with the two product
                        columns: the collection heading is followed directly
                        by the individual collection list. */}
                    <div className="border-l border-[#353535] pl-8 min-h-full">
                      <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#353535] mb-3.5">
                        <span className="text-[12px] uppercase tracking-[0.18em] font-medium text-[#aeb8c2]">
                          {t.collectionsTitle}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#5f5f5f]">
                          {collections.length} {currentLanguage === 'VI' ? 'collection' : 'collections'}
                        </span>
                      </div>
                      {collections.length > 0 && (
                        <ul className="space-y-3">
                          {collections.map((collection) => (
                            <li key={collection}>
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectCollection(collection);
                                  setCatalogOpen(false);
                                }}
                                className="text-left text-xs font-light text-[#b6b6b6] hover:text-white transition-colors flex items-center justify-between w-full hover:translate-x-1 duration-150 uppercase tracking-wider py-0.5 group/item"
                              >
                                <span>{collection}</span>
                                <span className="text-[10px] text-[#555555] group-hover/item:text-[#aeb8c2] opacity-0 group-hover/item:opacity-100 transition-opacity">
                                  →
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                    {/* Bottom row of mega menu */}
                    <div className="mt-6 pt-4 border-t border-[#353535] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src="/bon-logo.png"
                          alt="B+ON"
                          className="h-5 w-auto object-contain opacity-85"
                        />
                        <button
                          onClick={() => {
                            onNavigatePage('catalog', 'all');
                            setCatalogOpen(false);
                          }}
                          className="text-[#aeb8c2] hover:text-white flex items-center gap-1.5 tracking-wider uppercase font-medium"
                        >
                          <span>{t.allFurniture}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          onOpenCatalogDownload();
                          setCatalogOpen(false);
                        }}
                        className="text-[#868686] hover:text-white flex items-center gap-1.5 uppercase tracking-wider"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.pdfCatalog}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. IN STOCK (Page) */}
              <button
                id="nav-in-stock"
                onClick={() => onNavigatePage('in-stock')}
                className={`transition-colors uppercase tracking-[0.16em] ${
                  currentPage === 'in-stock'
                    ? 'text-white font-medium border-b border-[#aeb8c2]'
                    : 'text-[#d0d0d0] hover:text-white'
                }`}
              >
                {t.inStock}
              </button>

              {/* 3. ABOUT US (Page) */}
              <button
                id="nav-about"
                onClick={() => onNavigatePage('about')}
                className={`transition-colors uppercase tracking-[0.16em] ${
                  currentPage === 'about'
                    ? 'text-white font-medium border-b border-[#aeb8c2]'
                    : 'text-[#d0d0d0] hover:text-white'
                }`}
              >
                {t.about}
              </button>

              {/* 4. INTERIORS (Page) */}
              <button
                id="nav-interiors"
                onClick={() => onNavigatePage('interiors')}
                className={`transition-colors uppercase tracking-[0.16em] ${
                  currentPage === 'interiors'
                    ? 'text-white font-medium border-b border-[#aeb8c2]'
                    : 'text-[#d0d0d0] hover:text-white'
                }`}
              >
                {t.interiors}
              </button>

              {/* 5. BLOG / JOURNAL (Page) */}
              <button
                id="nav-blog"
                onClick={() => onNavigatePage('blog')}
                className={`transition-colors uppercase tracking-[0.16em] ${
                  currentPage === 'blog'
                    ? 'text-white font-medium border-b border-[#aeb8c2]'
                    : 'text-[#d0d0d0] hover:text-white'
                }`}
              >
                {t.blog}
              </button>

              {/* 6. FOR DESIGNERS (Page) */}
              <button
                id="nav-designers"
                onClick={() => onNavigatePage('designers')}
                className={`transition-colors uppercase tracking-[0.16em] ${
                  currentPage === 'designers'
                    ? 'text-white font-medium border-b border-[#aeb8c2]'
                    : 'text-[#d0d0d0] hover:text-white'
                }`}
              >
                {t.designers}
              </button>

              {/* 7. MATERIALS (Page) */}
              <button
                id="nav-materials"
                onClick={() => onNavigatePage('materials')}
                className={`transition-colors uppercase tracking-[0.16em] ${
                  currentPage === 'materials'
                    ? 'text-white font-medium border-b border-[#aeb8c2]'
                    : 'text-[#d0d0d0] hover:text-white'
                }`}
              >
                {t.materials}
              </button>

              {/* 8. CONTACTS (Page) */}
              <button
                id="nav-contacts"
                onClick={() => onNavigatePage('contacts')}
                className={`transition-colors uppercase tracking-[0.16em] ${
                  currentPage === 'contacts'
                    ? 'text-white font-medium border-b border-[#aeb8c2]'
                    : 'text-[#d0d0d0] hover:text-white'
                }`}
              >
                {t.contacts}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Full Screen Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="lg:hidden fixed inset-0 top-[56px] bg-[#141414]/98 backdrop-blur-xl border-t border-[#353535] p-6 flex flex-col justify-between overflow-y-auto z-50 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="space-y-6 pt-2">
            {/* Mobile Branding Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#353535]">
              <img
                src="/bon-logo.png"
                alt="B+ON"
                className="h-7 w-auto object-contain"
              />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8e8e93] font-mono">
                Studia 54 Design
              </span>
            </div>

            <div className="space-y-2 pb-4 border-b border-[#353535]">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#aeb8c2] font-medium">{t.catalog}</p>
              <button
                onClick={() => {
                  onNavigatePage('catalog', 'all');
                  setMobileMenuOpen(false);
                }}
                className={`block text-xl text-left w-full font-light ${
                  currentPage === 'catalog' ? 'text-[#aeb8c2] font-normal' : 'text-white'
                }`}
              >
                {t.allFurniture}
              </button>
              <div className="mt-4 pt-4 border-t border-[#2b2b2b] space-y-2">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#868686] font-medium">
                  {t.collectionsTitle}
                </p>
                {collections.map((collection) => (
                  <button
                    key={collection}
                    type="button"
                    onClick={() => {
                      onSelectCollection(collection);
                      setMobileMenuOpen(false);
                    }}
                    className="block text-sm text-[#b6b6b6] text-left w-full font-light pl-6 py-1 hover:text-[#aeb8c2]"
                  >
                    {collection}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  onNavigatePage('catalog', 'cabinet', 'all');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-base text-[#b6b6b6] hover:text-[#aeb8c2] text-left w-full pl-3 py-1 group"
              >
                <span>{t.cabinetTitle}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#777777] group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => {
                  onNavigatePage('catalog', 'upholstered', 'all');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-base text-[#b6b6b6] hover:text-[#aeb8c2] text-left w-full pl-3 py-1 group"
              >
                <span>{t.upholsteredTitle}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#777777] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="space-y-4 text-base font-light text-[#e8e8e8]">
              {isAdmin && onOpenAdmin ? (
                <button
                  type="button"
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-left w-full uppercase tracking-[0.16em] text-[#aeb8c2] hover:text-white"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'VI' ? 'EDIT MODE' : 'EDIT MODE'}</span>
                </button>
              ) : onSignInAdmin ? (
                <button
                  id="mobile-admin-signin-btn"
                  type="button"
                  onClick={() => {
                    onSignInAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-left w-full uppercase tracking-[0.16em] text-[#aeb8c2] hover:text-white"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'VI' ? 'ĐĂNG NHẬP' : 'SIGN IN'}</span>
                </button>
              ) : null}
              <button
                onClick={() => {
                  onNavigatePage('in-stock');
                  setMobileMenuOpen(false);
                }}
                className={`block text-left w-full uppercase tracking-[0.16em] ${
                  currentPage === 'in-stock' ? 'text-[#aeb8c2] font-medium' : 'hover:text-[#aeb8c2]'
                }`}
              >
                {t.inStock}
              </button>
              <button
                onClick={() => {
                  onNavigatePage('about');
                  setMobileMenuOpen(false);
                }}
                className={`block text-left w-full uppercase tracking-[0.16em] ${
                  currentPage === 'about' ? 'text-[#aeb8c2] font-medium' : 'hover:text-[#aeb8c2]'
                }`}
              >
                {t.about}
              </button>
              <button
                onClick={() => {
                  onNavigatePage('interiors');
                  setMobileMenuOpen(false);
                }}
                className={`block text-left w-full uppercase tracking-[0.16em] ${
                  currentPage === 'interiors' ? 'text-[#aeb8c2] font-medium' : 'hover:text-[#aeb8c2]'
                }`}
              >
                {t.interiors}
              </button>
              <button
                onClick={() => {
                  onNavigatePage('blog');
                  setMobileMenuOpen(false);
                }}
                className={`block text-left w-full uppercase tracking-[0.16em] ${
                  currentPage === 'blog' ? 'text-[#aeb8c2] font-medium' : 'hover:text-[#aeb8c2]'
                }`}
              >
                {t.blog}
              </button>
              <button
                onClick={() => {
                  onNavigatePage('designers');
                  setMobileMenuOpen(false);
                }}
                className={`block text-left w-full uppercase tracking-[0.16em] ${
                  currentPage === 'designers' ? 'text-[#aeb8c2] font-medium' : 'hover:text-[#aeb8c2]'
                }`}
              >
                {t.designers} (3D & BIM)
              </button>
              <button
                onClick={() => {
                  onNavigatePage('materials');
                  setMobileMenuOpen(false);
                }}
                className={`block text-left w-full uppercase tracking-[0.16em] ${
                  currentPage === 'materials' ? 'text-[#aeb8c2] font-medium' : 'hover:text-[#aeb8c2]'
                }`}
              >
                {t.materials}
              </button>
              <button
                onClick={() => {
                  onNavigatePage('contacts');
                  setMobileMenuOpen(false);
                }}
                className={`block text-left w-full uppercase tracking-[0.16em] ${
                  currentPage === 'contacts' ? 'text-[#aeb8c2] font-medium' : 'hover:text-[#aeb8c2]'
                }`}
              >
                {t.contacts}
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#353535] space-y-3">
            <button
              onClick={() => {
                onOpenCatalogDownload();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#aeb8c2] text-[#181818] font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadCatalog} (PDF 2026)</span>
            </button>
            <div className="text-center text-xs text-[#868686] pt-1">
              <p>{t.phone}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
