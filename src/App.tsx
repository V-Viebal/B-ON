import React, { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from './data/furnitureData';
import { Product, MainCategory, SubCategory, PageType, AppLanguage } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomePage } from './components/HomePage';
import { ProductionSection } from './components/ProductionSection';
import { AboutPage } from './components/AboutPage';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ConfiguratorSection } from './components/ConfiguratorSection';
import { DesignerPortal } from './components/DesignerPortal';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ShowroomsSection } from './components/ShowroomsSection';
import { ContactsPage } from './components/ContactsPage';
import { BlogSection } from './components/BlogSection';
import { BLOG_POSTS } from './data/blogData';
import { FloatingActions } from './components/FloatingActions';
import { CatalogDownloadModal } from './components/CatalogDownloadModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ConsultationModal } from './components/ConsultationModal';
import { OrderDetailsModal } from './components/OrderDetailsModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { MaterialsPage } from './components/MaterialsPage';
import { Footer } from './components/Footer';
import { CollectionPage } from './components/CollectionPage';
import { COLLECTIONS, COLLECTION_NAMES as CURATED_COLLECTION_NAMES } from './data/collectionData';

// Keep the navigation list limited to collections that have been explicitly
// prepared for the B+ON website. At the moment that list contains only Linear.
const COLLECTION_NAMES = CURATED_COLLECTION_NAMES;

export default function App() {
  // Page state: 'catalog' | 'in-stock' | 'about' | 'interiors' | 'blog' | 'designers' | 'materials' | 'contacts' | 'home'
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory>('cabinet');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [catalogDownloadModalOpen, setCatalogDownloadModalOpen] = useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set(['modular-sofa-lares', 'dining-table-astor']));
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>('VI');
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(() => {
    return PRODUCTS.find((p) => p.id === 'bed-vida-deluxe-moon-ash') || PRODUCTS[0] || null;
  });
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | undefined>(undefined);
  const [consultationProductContext, setConsultationProductContext] = useState<{
    productName?: string;
    sizeLabel?: string;
    swatchName?: string;
    priceFormatted?: string;
  } | null>(null);

  // Helper to build URL hash for current state
  const buildHash = useCallback(
    (page: PageType, mainCat?: MainCategory, subcat?: SubCategory): string => {
      if (page === 'home') return '#/home';
      if (page === 'interiors') return '#/inspiration';
      if (page === 'blog') return '#/blog';
      if (page === 'designers') return '#/designer';
      if (page === 'materials') return '#/materials';
      if (page === 'contacts') return '#/contacts';
      if (page === 'about') return '#/about';
      if (page === 'product-detail') {
        return selectedDetailProduct ? `#/product/${selectedDetailProduct.id}` : '#/catalog';
      }
      if (page === 'catalog') {
        const catSlug =
          mainCat === 'cabinet'
            ? 'korpusnaya-mebel'
            : mainCat === 'upholstered'
            ? 'myagkaya-mebel'
            : mainCat || 'all';

        if (subcat && subcat !== 'all') {
          return `#/catalog/${catSlug}/${subcat}`;
        }
        if (mainCat && mainCat !== 'all') {
          return `#/catalog/${catSlug}`;
        }
        return '#/catalog';
      }
      return `#/${page}`;
    },
    [selectedDetailProduct]
  );

  // Helper to parse URL hash on load or popstate
  const parseHash = useCallback((): {
    page: PageType;
    mainCat?: MainCategory;
    subcat?: SubCategory;
    collection?: string;
  } => {
    const raw = window.location.hash.replace(/^#\/?/, '').trim();
    if (!raw || raw === 'home') {
      return { page: 'home' };
    }
    if (raw === 'about' || raw === 'o-nas' || raw === 've-chung-toi') {
      return { page: 'about' };
    }
    if (raw === 'inspiration' || raw === 'interiors' || raw === 'du-an') {
      return { page: 'interiors' };
    }
    if (raw === 'blog' || raw === 'journal' || raw === 'kien-truc-va-doi-song') {
      return { page: 'blog' };
    }
    if (raw === 'designer' || raw === 'designers' || raw === 'danh-cho-kts') {
      return { page: 'designers' };
    }
    if (raw === 'materials' || raw === 'material' || raw === 'vat-lieu') {
      return { page: 'materials' };
    }
    if (raw === 'contacts' || raw === 'contact' || raw === 'lien-he') {
      return { page: 'contacts' };
    }

    const parts = raw.split('/');

    // Collection browsing stays inside the Catalog route and intentionally
    // crosses cabinet/upholstered product categories.
    if (parts[0] === 'catalog' && parts[1] === 'collection' && parts[2]) {
      let collection = parts.slice(2).join('/');
      try {
        collection = decodeURIComponent(collection);
      } catch {
        // Keep the raw slug if a hand-edited URL contains malformed encoding.
      }
      return { page: 'catalog', mainCat: 'all', subcat: 'all', collection };
    }

    // Handle direct product detail URL (e.g. #/product/bed-vida-deluxe-moon-ash)
    if (parts[0] === 'product' && parts[1]) {
      const slug = parts[1].toLowerCase();
      const matchedProduct = PRODUCTS.find(
        (p) => p.id.toLowerCase() === slug || p.sku.toLowerCase() === slug
      );
      if (matchedProduct) {
        setSelectedDetailProduct(matchedProduct);
        return { page: 'product-detail' };
      }
    }

    // Handle direct blog article URL (e.g. #/blog/how-to-choose-conference-table-size-and-seating or #/blogitems/how-to-choose-conference-table-size-and-seating#chto-uchityvat-krome-kolichestva-mest)
    if ((parts[0] === 'blog' || parts[0] === 'journal' || parts[0] === 'blogitems') && parts[1]) {
      const cleanSlug = parts[1].split('#')[0];
      setSelectedBlogSlug(cleanSlug);
      return { page: 'blog' };
    }

    // Direct blog slug fallback (e.g. #/how-to-choose-conference-table-size-and-seating)
    const directSlug = parts[0].split('#')[0];
    if (BLOG_POSTS.some(p => p.slug === directSlug)) {
      setSelectedBlogSlug(directSlug);
      return { page: 'blog' };
    }

    let pageKey = parts[0] as PageType;
    if (parts[0] === 'inspiration') pageKey = 'interiors';
    if (parts[0] === 'designer') pageKey = 'designers';
    if (parts[0] === 'material') pageKey = 'materials';
    if (parts[0] === 'contact') pageKey = 'contacts';

    const validPages: PageType[] = [
      'home',
      'catalog',
      'product-detail',
      'in-stock',
      'about',
      'interiors',
      'blog',
      'designers',
      'materials',
      'contacts',
    ];

    if (!validPages.includes(pageKey)) {
      return { page: 'catalog' };
    }

    const rawCat = parts[1];
    let mainCat: MainCategory | undefined;
    if (rawCat === 'korpusnaya-mebel' || rawCat === 'cabinet') {
      mainCat = 'cabinet';
    } else if (rawCat === 'myagkaya-mebel' || rawCat === 'upholstered') {
      mainCat = 'upholstered';
    } else if (rawCat === 'in-stock') {
      mainCat = 'in-stock';
    } else if (rawCat === 'by-rooms') {
      mainCat = 'by-rooms';
    } else if (rawCat === 'all') {
      mainCat = 'all';
    }

    const rawSubcat = parts[2];
    let subcat: SubCategory | undefined;
    if (rawSubcat) {
      const aliasMap: Record<string, SubCategory> = {
        stoly: 'dining-tables',
        'stoly-obedennye': 'dining-tables',
        'dining-tables': 'dining-tables',
        'stoly-zhurnalnye': 'coffee-tables',
        'coffee-tables': 'coffee-tables',
        konsoli: 'consoles',
        consoles: 'consoles',
        'komody-i-bufety': 'sideboards',
        komody: 'sideboards',
        sideboards: 'sideboards',
        'tumby-prikrovatnye': 'bedside-tables',
        'bedside-tables': 'bedside-tables',
        'tumby-pod-tv': 'tv-stands',
        'tv-stands': 'tv-stands',
        'tualetnye-stoliki': 'dressing-tables',
        'dressing-tables': 'dressing-tables',
        'pismennye-stoly': 'desks',
        desks: 'desks',
        divany: 'sofas',
        sofas: 'sofas',
        krovati: 'beds',
        beds: 'beds',
        kresla: 'armchairs',
        armchairs: 'armchairs',
        stulya: 'chairs',
        chairs: 'chairs',
        banketki: 'banquettes',
        banquettes: 'banquettes',
        kushetki: 'couches',
        shezlongi: 'couches',
        couches: 'couches',
        pufy: 'poufs',
        poufs: 'poufs',
      };
      subcat = aliasMap[rawSubcat] || (rawSubcat as SubCategory);
    }
    return { page: pageKey, mainCat, subcat };
  }, []);

  // Central Navigation Handler with URL hash synchronization
  const navigateToPage = useCallback(
    (page: PageType, mainCat?: MainCategory, subcat?: SubCategory) => {
      setCurrentPage(page);
      if (mainCat) {
        setSelectedMainCategory(mainCat);
      }
      if (subcat) {
        setSelectedSubCategory(subcat);
      } else if (page === 'catalog' && !mainCat) {
        setSelectedSubCategory('all');
      }
      if (page === 'catalog') {
        setSelectedCollection('all');
      }

      const targetHash = buildHash(page, mainCat, subcat);
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [buildHash]
  );

  const selectCollection = useCallback((collection?: string) => {
    const nextCollection = collection?.trim() || 'all';
    setCurrentPage('catalog');
    setSelectedMainCategory('all');
    setSelectedSubCategory('all');
    setSelectedCollection(nextCollection);

    const targetHash =
      nextCollection === 'all'
        ? '#/catalog'
        : `#/catalog/collection/${encodeURIComponent(nextCollection)}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Navigate directly to dedicated Product Detail Page
  const navigateToProductDetail = useCallback(
    (product: Product) => {
      setSelectedDetailProduct(product);
      setCurrentPage('product-detail');
      const targetHash = `#/product/${product.id}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  // Synchronize browser history and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash();
      setCurrentPage(parsed.page);
      if (parsed.mainCat) {
        setSelectedMainCategory(parsed.mainCat);
      }
      if (parsed.subcat) {
        setSelectedSubCategory(parsed.subcat);
      }
      if (parsed.page === 'catalog') {
        setSelectedCollection(parsed.collection || 'all');
      }
      const rawHash = window.location.hash;
      const hasSpecificAnchor =
        rawHash.split('#').length > 2 ||
        (rawHash.includes('#') &&
          !rawHash.endsWith('/home') &&
          !rawHash.endsWith('/catalog') &&
          !rawHash.endsWith('/blog') &&
          !rawHash.endsWith('/about') &&
          !rawHash.endsWith('/interiors') &&
          !rawHash.endsWith('/designers') &&
          !rawHash.endsWith('/materials') &&
          !rawHash.endsWith('/contacts') &&
          rawHash.split('/').length > 1 &&
          rawHash.includes('#', 2));
      if (!hasSpecificAnchor) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Parse on initial mount
    if (window.location.hash) {
      const parsed = parseHash();
      setCurrentPage(parsed.page);
      if (parsed.mainCat) setSelectedMainCategory(parsed.mainCat);
      if (parsed.subcat) setSelectedSubCategory(parsed.subcat);
      if (parsed.page === 'catalog') setSelectedCollection(parsed.collection || 'all');
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [parseHash]);

  // Synchronize document title to current dedicated page
  useEffect(() => {
    if (currentPage === 'catalog') {
      if (selectedCollection !== 'all') {
        document.title =
          currentLanguage === 'VI'
            ? `${selectedCollection} | Bộ Sưu Tập Nội Thất — B+ON`
            : `${selectedCollection} | Furniture Collection — B+ON`;
        return;
      }
      if (selectedMainCategory === 'cabinet') {
        if (selectedSubCategory && selectedSubCategory !== 'all') {
          const subNames: Record<string, { VI: string; EN: string }> = {
            'dining-tables': { VI: 'Bàn Ăn Cao Cấp', EN: 'Luxury Dining Tables' },
            'coffee-tables': { VI: 'Bàn Trà Mặt Đá', EN: 'Designer Coffee Tables' },
            consoles: { VI: 'Bàn Console Đá & Titan', EN: 'Luxury Consoles' },
            sideboards: { VI: 'Tủ Buffet & Ngăn Kéo', EN: 'Sideboards & Commodes' },
            'bedside-tables': { VI: 'Tủ Đầu Giường', EN: 'Bedside Tables' },
            'tv-stands': { VI: 'Kệ Tivi Cao Cấp', EN: 'TV Units' },
            'dressing-tables': { VI: 'Bàn Trang Điểm', EN: 'Dressing Tables' },
            desks: { VI: 'Bàn Làm Việc Độc Quyền', EN: 'Executive Desks' },
          };
          const item = subNames[selectedSubCategory];
          if (item) {
            document.title =
              currentLanguage === 'VI'
                ? `${item.VI} | Nội Thất Gỗ & Đá — B+ON`
                : `${item.EN} | Cabinet Furniture — B+ON`;
            return;
          }
        }
        document.title =
          currentLanguage === 'VI'
            ? 'Nội Thất Gỗ & Đá (Korpusnaya Mebel) — B+ON'
            : 'Cabinet Furniture (Korpusnaya Mebel) — B+ON';
        return;
      }
      if (selectedMainCategory === 'upholstered') {
        if (selectedSubCategory && selectedSubCategory !== 'all') {
          const subNames: Record<string, { VI: string; EN: string }> = {
            sofas: { VI: 'Sofa Module Cao Cấp', EN: 'Luxury Modular Sofas' },
            beds: { VI: 'Giường Ngủ Bọc Da Ý', EN: 'Italian Leather Beds' },
            armchairs: { VI: 'Ghế Bành Đơn Thư Giãn', EN: 'Designer Armchairs' },
            chairs: { VI: 'Ghế Ăn Bọc Nệm Thượng Hạng', EN: 'Dining Chairs' },
            banquettes: { VI: 'Ghế Băng Dài Bouclé', EN: 'Banquettes' },
            couches: { VI: 'Ghế Thư Giãn Cao Cấp', EN: 'Luxury Loungers' },
            poufs: { VI: 'Đôn Sofa Bọc Da', EN: 'Designer Poufs' },
          };
          const item = subNames[selectedSubCategory];
          if (item) {
            document.title =
              currentLanguage === 'VI'
                ? `${item.VI} | Nội Thất Bọc Nệm — B+ON`
                : `${item.EN} | Upholstered Furniture — B+ON`;
            return;
          }
        }
        document.title =
          currentLanguage === 'VI'
            ? 'Nội Thất Bọc Nệm (Myagkaya Mebel) — B+ON'
            : 'Upholstered Furniture (Myagkaya Mebel) — B+ON';
        return;
      }
    }

    const titles: Record<PageType, { VI: string; EN: string }> = {
      home: {
        VI: 'B+ON — Nội Thất Thiết Kế Độc Quyền Studia 54',
        EN: 'B+ON — Designer Furniture by Studia 54',
      },
      catalog: {
        VI: 'Danh Mục Nội Thất Cao Cấp — B+ON',
        EN: 'Luxury Furniture Catalog — B+ON',
      },
      'in-stock': {
        VI: 'Nội Thất Có Sẵn Giao Trong 3 Ngày — B+ON',
        EN: 'In Stock Collections Ready to Ship — B+ON',
      },
      about: {
        VI: 'Về Chúng Tôi & Xưởng Chế Tác 2.000 m² — B+ON',
        EN: 'About Us & 2,000 m² Manufacture — B+ON',
      },
      interiors: {
        VI: 'Dự Án Nội Thất Toàn Cầu Studia 54 — B+ON',
        EN: 'Global Residences by Studia 54 — B+ON',
      },
      blog: {
        VI: 'Kiến Trúc & Đời Sống (Architectural Journal) — B+ON',
        EN: 'Architectural Journal — B+ON',
      },
      designers: {
        VI: 'Cổng Thông Tin KTS & Thư Viện 3D BIM — B+ON',
        EN: 'For Architects & 3D BIM Assets — B+ON',
      },
      materials: {
        VI: 'Trình Chọn Vật Liệu 3D — B+ON',
        EN: '3D Material Configurator — B+ON',
      },
      contacts: {
        VI: 'Hệ Thống Showroom Flagship & Liên Hệ — B+ON',
        EN: 'Flagship Showrooms & Concierge — B+ON',
      },
      'product-detail': {
        VI: selectedDetailProduct
          ? `${selectedDetailProduct.name} | Chi Tiết Sản Phẩm — B+ON`
          : 'Chi Tiết Sản Phẩm — B+ON',
        EN: selectedDetailProduct
          ? `${selectedDetailProduct.name} | Architectural Specification — B+ON`
          : 'Product Details — B+ON',
      },
    };

    const currentDoc = titles[currentPage] || titles.home;
    document.title = currentDoc[currentLanguage];
  }, [currentPage, selectedMainCategory, selectedSubCategory, selectedCollection, currentLanguage, selectedDetailProduct]);

  // Scroll to section helper (for in-page anchors)
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Derived wishlist items
  const wishlistProducts = PRODUCTS.filter((p) => Boolean(p && p.id && wishlistIds.has(p.id)));

  const toggleWishlist = (product: Product) => {
    if (!product?.id) return;
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  const removeWishlistProduct = (productId: string) => {
    if (!productId) return;
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const clearAllWishlist = () => {
    setWishlistIds(new Set());
  };

  const handleOpenCustomizerWithProduct = (_product: Product) => {
    navigateToPage('materials');
  };

  const selectedCollectionDefinition = COLLECTIONS.find(
    (collection) => collection.name === selectedCollection
  );

  return (
    <div className="min-h-screen bg-[#141414] text-[#e8e8e8] font-manrope selection:bg-[#aeb8c2] selection:text-[#141414]">
      {/* Universal Header with Active Page Navigation */}
      <Header
        currentPage={currentPage}
        onNavigatePage={navigateToPage}
        onSelectCategory={(cat, subcat) => navigateToPage('catalog', cat, subcat)}
        collections={COLLECTION_NAMES}
        onSelectCollection={selectCollection}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWishlist={() => setWishlistDrawerOpen(true)}
        onOpenCatalogDownload={() => setCatalogDownloadModalOpen(true)}
        onNavigateSection={navigateToSection}
        onOpenContactModal={() => setConsultationModalOpen(true)}
        wishlistCount={wishlistIds.size}
        currentLanguage={currentLanguage}
        onChangeLanguage={setCurrentLanguage}
      />

      <main className="w-full">
        {/* ======================================================== */}
        {/* PAGE 1: CATALOG (Matches user screenshot) */}
        {/* ======================================================== */}
        {currentPage === 'catalog' && (
          selectedCollectionDefinition ? (
            <CollectionPage
              collection={selectedCollectionDefinition}
              currentLanguage={currentLanguage}
              onBackToCollections={() => selectCollection()}
            />
          ) : (
            <CatalogSection
              products={PRODUCTS}
              selectedMainCategory={selectedMainCategory}
              selectedCollection={selectedCollection}
              onSelectMainCategory={setSelectedMainCategory}
              selectedSubCategory={selectedSubCategory}
              onSelectSubCategory={(subcat) => {
                setSelectedSubCategory(subcat);
                const targetHash = buildHash('catalog', selectedMainCategory, subcat);
                if (window.location.hash !== targetHash) {
                  window.location.hash = targetHash;
                }
              }}
              onSelectCollection={selectCollection}
              onSelectProduct={navigateToProductDetail}
              onToggleWishlist={toggleWishlist}
              wishlistIds={wishlistIds}
              onOpenCustomizerWithProduct={handleOpenCustomizerWithProduct}
              currentLanguage={currentLanguage}
              isDedicatedPage={true}
              onNavigateHome={() => navigateToPage('home')}
            />
          )
        )}

        {/* ======================================================== */}
        {/* PAGE 2: IN STOCK (Dedicated Page) */}
        {/* ======================================================== */}
        {currentPage === 'in-stock' && (
          <div className="animate-in fade-in duration-300">
            <CatalogSection
              products={PRODUCTS}
              selectedMainCategory="in-stock"
              selectedCollection={selectedCollection}
              onSelectMainCategory={setSelectedMainCategory}
              onSelectCollection={selectCollection}
              onSelectProduct={navigateToProductDetail}
              onToggleWishlist={toggleWishlist}
              wishlistIds={wishlistIds}
              onOpenCustomizerWithProduct={handleOpenCustomizerWithProduct}
              currentLanguage={currentLanguage}
              isDedicatedPage={true}
              onNavigateHome={() => navigateToPage('home')}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 3: ABOUT US (MANUFACTURE - Dedicated Page matching fiftyfourms.com/about) */}
        {/* ======================================================== */}
        {currentPage === 'about' && (
          <div className="animate-in fade-in duration-300">
            <AboutPage
              currentLanguage={currentLanguage}
              onNavigatePage={(page, cat) => navigateToPage(page, cat)}
              onOpenConsultation={() => setConsultationModalOpen(true)}
              onOpenCatalogDownload={() => setCatalogDownloadModalOpen(true)}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 4: INTERIORS (Studia 54 Projects - Dedicated Page) */}
        {/* ======================================================== */}
        {currentPage === 'interiors' && (
          <div className="animate-in fade-in duration-300">
            <ProjectsShowcase
              onSelectProduct={navigateToProductDetail}
              currentLanguage={currentLanguage}
              onOpenConsultation={() => setConsultationModalOpen(true)}
              onOpenCatalogDownload={() => setCatalogDownloadModalOpen(true)}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 5: BLOG (Architectural Journal - Dedicated Page) */}
        {/* ======================================================== */}
        {currentPage === 'blog' && (
          <div className="animate-in fade-in duration-300">
            <BlogSection
              currentLanguage={currentLanguage}
              onNavigatePage={(page) => navigateToPage(page as PageType)}
              onSelectProduct={navigateToProductDetail}
              onOpenConsultation={() => setConsultationModalOpen(true)}
              onOpenCatalogDownload={() => setCatalogDownloadModalOpen(true)}
              initialArticleSlug={selectedBlogSlug}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 6: FOR DESIGNERS (3D & BIM - Dedicated Page) */}
        {/* ======================================================== */}
        {currentPage === 'designers' && (
          <div className="animate-in fade-in duration-300">
            <DesignerPortal
              products={PRODUCTS}
              currentLanguage={currentLanguage}
              onNavigatePage={(page) => navigateToPage(page as PageType)}
              onOpenCatalogDownload={() => setCatalogDownloadModalOpen(true)}
              onSelectProduct={navigateToProductDetail}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 7: MATERIALS (Configurator - Dedicated Page) */}
        {/* ======================================================== */}
        {currentPage === 'materials' && (
          <div className="animate-in fade-in duration-300">
            <MaterialsPage
              currentLanguage={currentLanguage}
              onSelectProduct={navigateToProductDetail}
              onToggleWishlist={toggleWishlist}
              isWishlisted={(id) => wishlistIds.has(id)}
              onOpenConsultation={() => setConsultationModalOpen(true)}
              onNavigatePage={(page) => navigateToPage(page as PageType)}
              onOpenCatalogDownload={() => setCatalogDownloadModalOpen(true)}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 8: CONTACTS (fiftyfourms.com/contacts) */}
        {/* ======================================================== */}
        {currentPage === 'contacts' && (
          <div className="animate-in fade-in duration-300">
            <ContactsPage
              currentLanguage={currentLanguage}
              onNavigatePage={(page) => navigateToPage(page as any)}
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 9: HOME (fiftyfourms.com) */}
        {/* ======================================================== */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            <HomePage
              currentLanguage={currentLanguage}
              onNavigatePage={(page, cat) => navigateToPage(page, cat)}
              onOpenConsultation={() => setConsultationModalOpen(true)}
              onOpenCatalogDownload={() => setCatalogDownloadModalOpen(true)}
              onSelectProduct={navigateToProductDetail}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 10: PRODUCT DETAIL (Full Architectural Page) */}
        {/* ======================================================== */}
        {currentPage === 'product-detail' && selectedDetailProduct && (
          <div className="animate-in fade-in duration-300">
            <ProductDetailPage
              product={selectedDetailProduct}
              onBackToCatalog={(subcat, mainCat) => {
                if (subcat) {
                  navigateToPage(
                    'catalog',
                    (mainCat as any) || selectedDetailProduct.mainCategory,
                    subcat as any
                  );
                } else {
                  navigateToPage('catalog');
                }
              }}
              onToggleWishlist={toggleWishlist}
              isWishlisted={Boolean(selectedDetailProduct.id && wishlistIds.has(selectedDetailProduct.id))}
              currentLanguage={currentLanguage}
              onOpenConsultationWithProduct={(prod, size, swatch) => {
                setConsultationProductContext({
                  productName: currentLanguage === 'VI' && prod.nameVi ? prod.nameVi : (prod.nameEn || prod.name),
                  sizeLabel: size,
                  swatchName: swatch,
                  priceFormatted: prod.priceFormatted,
                });
                setOrderDetailsModalOpen(true);
              }}
              onOpenCustomizer={handleOpenCustomizerWithProduct}
              onSelectRelatedProduct={navigateToProductDetail}
            />
          </div>
        )}
      </main>

      {/* Floating Actions: Telegram, Chat, WhatsApp, and "Select furniture" button */}
      <FloatingActions
        currentLanguage={currentLanguage}
        onOpenConsultation={() => setOrderDetailsModalOpen(true)}
        onSelectFurniture={() => {
          setOrderDetailsModalOpen(true);
        }}
      />

      {/* Universal Footer */}
      <Footer
        onSelectCategory={(cat) => navigateToPage('catalog', cat)}
        onNavigatePage={navigateToPage}
        onNavigateSection={navigateToSection}
        onOpenCatalogDownload={() => setCatalogDownloadModalOpen(true)}
        currentLanguage={currentLanguage}
        onOpenConsultation={() => setOrderDetailsModalOpen(true)}
        onSelectFurniture={() => setOrderDetailsModalOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onToggleWishlist={toggleWishlist}
        isWishlisted={Boolean(activeProductModal?.id && wishlistIds.has(activeProductModal.id))}
        onOpenCustomizerWithProduct={handleOpenCustomizerWithProduct}
        currentLanguage={currentLanguage}
        onViewFullPage={navigateToProductDetail}
      />

      {/* Order Details Modal matching user's requested form */}
      <OrderDetailsModal
        isOpen={orderDetailsModalOpen}
        onClose={() => {
          setOrderDetailsModalOpen(false);
          setConsultationProductContext(null);
        }}
        currentLanguage={currentLanguage}
        productContext={consultationProductContext}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => {
          setConsultationModalOpen(false);
          setConsultationProductContext(null);
        }}
        currentLanguage={currentLanguage}
        productContext={consultationProductContext}
      />

      {/* Catalog Download Modal */}
      <CatalogDownloadModal
        isOpen={catalogDownloadModalOpen}
        onClose={() => setCatalogDownloadModalOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistDrawerOpen}
        onClose={() => setWishlistDrawerOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveProduct={removeWishlistProduct}
        onClearAll={clearAllWishlist}
        currentLanguage={currentLanguage}
        onSelectProduct={navigateToProductDetail}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => {
          setSearchModalOpen(false);
          navigateToProductDetail(product);
        }}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
