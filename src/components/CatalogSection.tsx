import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, X, Sparkles, SlidersHorizontal, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product, MainCategory, SubCategory, RoomType, AppLanguage } from '../types';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: Product[];
  selectedMainCategory: MainCategory;
  onSelectMainCategory: (cat: MainCategory) => void;
  selectedSubCategory?: SubCategory;
  onSelectSubCategory?: (subcat: SubCategory) => void;
  selectedCollection?: string;
  onSelectCollection?: (collection?: string) => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onOpenCustomizerWithProduct: (product: Product) => void;
  currentLanguage: AppLanguage;
  isDedicatedPage?: boolean;
  onNavigateHome?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedMainCategory,
  onSelectMainCategory,
  selectedSubCategory: externalSubCategory,
  onSelectSubCategory,
  selectedCollection = 'all',
  onSelectCollection,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
  onOpenCustomizerWithProduct,
  currentLanguage,
  isDedicatedPage = true,
  onNavigateHome,
}) => {
  const [internalSubCategory, setInternalSubCategory] = useState<SubCategory>(externalSubCategory || 'all');
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('all');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'novelty'>('popularity');
  const [firstDropdownMode, setFirstDropdownMode] = useState<'type' | 'room'>('type');

  // Sync with external subcategory prop
  React.useEffect(() => {
    if (externalSubCategory !== undefined) {
      setInternalSubCategory(externalSubCategory);
    }
  }, [externalSubCategory]);

  // Sync dropdown mode with category
  React.useEffect(() => {
    if (selectedMainCategory === 'by-rooms') {
      setFirstDropdownMode('room');
    } else {
      setFirstDropdownMode('type');
    }
  }, [selectedMainCategory]);

  const selectedSubCategory = externalSubCategory !== undefined ? externalSubCategory : internalSubCategory;

  const handleSubCategoryChange = (subcat: SubCategory) => {
    setInternalSubCategory(subcat);
    if (onSelectSubCategory) {
      onSelectSubCategory(subcat);
    }
  };

  // Dropdown open states for filter boxes matching screenshot
  const [openDropdown, setOpenDropdown] = useState<'type' | 'color' | 'material' | 'sort' | null>(null);

  const t = {
    VI: {
      allFurnitureBreadcrumb: 'Tất cả nội thất',
      allCollections: 'Tất cả Collection',
      titleAll: 'TẤT CẢ NỘI THẤT',
      titleCabinet: 'NỘI THẤT GỖ & ĐÁ',
      titleUpholstered: 'NỘI THẤT BỌC NỆM',
      titleInStock: 'HÀNG CÓ SẴN TẠI KHO',
      titleRooms: 'NỘI THẤT THEO KHÔNG GIAN',
      tabAll: 'Tất cả nội thất',
      tabCabinet: 'Nội thất gỗ & đá',
      tabUpholstered: 'Nội thất bọc nệm',
      tabInStock: 'Hàng có sẵn',
      tabByRoom: 'Theo không gian',
      typeLabel: 'Loại nội thất',
      colorLabel: 'Màu sắc',
      materialsLabel: 'Vật liệu',
      sortingLabel: 'Sắp xếp',
      searchLabel: 'Tìm kiếm',
      searchPlaceholder: 'Tìm theo tên...',
      allTypes: 'Tất cả nội thất',
      allColors: 'Tất cả màu sắc',
      allMaterials: 'Tất cả vật liệu',
      byPopularity: 'Độ phổ biến',
      byPriceAsc: 'Giá tăng dần',
      byPriceDesc: 'Giá giảm dần',
      byNovelty: 'Mới nhất',
      showing: 'Hiển thị',
      objects: 'sản phẩm',
      noResults: 'Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn.',
      resetFilters: 'Đặt lại bộ lọc',
      spaceFilter: 'Không gian phòng',
      allRooms: 'Tất cả phòng',
      livingRoom: 'Phòng khách',
      diningRoom: 'Phòng ăn',
      bedroom: 'Phòng ngủ',
      office: 'Phòng làm việc',
      lounge: 'Khu vực sảnh',
    },
    EN: {
      allFurnitureBreadcrumb: 'All furniture',
      allCollections: 'All collections',
      titleAll: 'ALL FURNITURE',
      titleCabinet: 'CABINET FURNITURE',
      titleUpholstered: 'UPHOLSTERED FURNITURE',
      titleInStock: 'IN STOCK FURNITURE',
      titleRooms: 'FURNITURE BY ROOM',
      tabAll: 'All furniture',
      tabCabinet: 'Cabinet furniture',
      tabUpholstered: 'Upholstered furniture',
      tabInStock: 'In stock',
      tabByRoom: 'Furniture by room',
      typeLabel: 'Type of furniture',
      colorLabel: 'Color',
      materialsLabel: 'Materials',
      sortingLabel: 'Sorting',
      searchLabel: 'Search',
      searchPlaceholder: 'Search by name',
      allTypes: 'All furniture',
      allColors: 'All colors',
      allMaterials: 'All materials',
      byPopularity: 'By popularity',
      byPriceAsc: 'By ascending price',
      byPriceDesc: 'In descending order of price',
      byNovelty: 'By novelty',
      showing: 'Showing',
      objects: 'products',
      noResults: 'No furniture objects match your filters.',
      resetFilters: 'Reset filters',
      spaceFilter: 'Room space',
      allRooms: 'All rooms',
      livingRoom: 'Living room',
      diningRoom: 'Dining room',
      bedroom: 'Bedroom',
      office: 'Office',
      lounge: 'Lounge',
    },
  }[currentLanguage];

  // Subcategories list for the Type dropdown
  const subcategoryOptions: { id: SubCategory; label: string }[] = useMemo(() => {
    const common: { id: SubCategory; label: string }[] = [{ id: 'all', label: t.allTypes }];
    if (selectedMainCategory === 'cabinet') {
      return [
        ...common,
        { id: 'dining-tables', label: currentLanguage === 'VI' ? 'Bàn ăn' : 'Dining Tables' },
        { id: 'coffee-tables', label: currentLanguage === 'VI' ? 'Bàn trà' : 'Coffee Tables' },
        { id: 'consoles', label: currentLanguage === 'VI' ? 'Bàn console' : 'Consoles' },
        { id: 'sideboards', label: currentLanguage === 'VI' ? 'Tủ ngăn kéo / Buffet' : 'Sideboards' },
        { id: 'tv-stands', label: currentLanguage === 'VI' ? 'Kệ tivi' : 'TV Stands' },
        { id: 'bedside-tables', label: currentLanguage === 'VI' ? 'Tủ đầu giường' : 'Bedside Tables' },
        { id: 'dressing-tables', label: currentLanguage === 'VI' ? 'Bàn trang điểm' : 'Dressing Tables' },
        { id: 'desks', label: currentLanguage === 'VI' ? 'Bàn làm việc' : 'Office Desks' },
      ];
    }
    if (selectedMainCategory === 'upholstered') {
      return [
        ...common,
        { id: 'sofas', label: currentLanguage === 'VI' ? 'Sofa cao cấp' : 'Sofas' },
        { id: 'beds', label: currentLanguage === 'VI' ? 'Giường ngủ' : 'Beds' },
        { id: 'armchairs', label: currentLanguage === 'VI' ? 'Ghế bành' : 'Armchairs' },
        { id: 'chairs', label: currentLanguage === 'VI' ? 'Ghế ăn bọc nệm' : 'Dining Chairs' },
        { id: 'banquettes', label: currentLanguage === 'VI' ? 'Ghế băng dài' : 'Banquettes' },
        { id: 'couches', label: currentLanguage === 'VI' ? 'Ghế thư giãn' : 'Loungers' },
        { id: 'poufs', label: currentLanguage === 'VI' ? 'Đôn sofa' : 'Poufs' },
      ];
    }
    return [
      ...common,
      { id: 'sofas', label: currentLanguage === 'VI' ? 'Sofa' : 'Sofas' },
      { id: 'dining-tables', label: currentLanguage === 'VI' ? 'Bàn ăn' : 'Dining Tables' },
      { id: 'coffee-tables', label: currentLanguage === 'VI' ? 'Bàn trà' : 'Coffee Tables' },
      { id: 'sideboards', label: currentLanguage === 'VI' ? 'Tủ buffet' : 'Sideboards' },
      { id: 'beds', label: currentLanguage === 'VI' ? 'Giường ngủ' : 'Beds' },
      { id: 'armchairs', label: currentLanguage === 'VI' ? 'Ghế bành' : 'Armchairs' },
      { id: 'consoles', label: currentLanguage === 'VI' ? 'Bàn console' : 'Consoles' },
    ];
  }, [selectedMainCategory, currentLanguage, t.allTypes]);

  // Space / Room options for the first dropdown
  const roomOptions: { id: RoomType; label: string }[] = useMemo(() => [
    { id: 'all', label: currentLanguage === 'VI' ? 'Tất cả không gian' : 'All spaces' },
    { id: 'living-room', label: t.livingRoom },
    { id: 'dining-room', label: t.diningRoom },
    { id: 'bedroom', label: t.bedroom },
    { id: 'office', label: t.office },
    { id: 'lounge', label: t.lounge },
  ], [currentLanguage, t.livingRoom, t.diningRoom, t.bedroom, t.office, t.lounge]);

  // Subcategory and category product counts
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      if (p.subcategory) {
        counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const cabinetTotalCount = useMemo(() => {
    return products.filter((p) => p.category === 'cabinet').length;
  }, [products]);

  const upholsteredTotalCount = useMemo(() => {
    return products.filter((p) => p.category === 'upholstered').length;
  }, [products]);

  // Dynamic Page Title matching user screenshot or subcategory page
  const pageTitle = useMemo(() => {
    if (selectedSubCategory !== 'all') {
      const sub = subcategoryOptions.find((o) => o.id === selectedSubCategory);
      if (sub) {
        return sub.label.toUpperCase();
      }
    }
    switch (selectedMainCategory) {
      case 'cabinet':
        return t.titleCabinet;
      case 'upholstered':
        return t.titleUpholstered;
      case 'in-stock':
        return t.titleInStock;
      case 'by-rooms':
        if (selectedRoom !== 'all') {
          const roomObj = roomOptions.find((r) => r.id === selectedRoom);
          if (roomObj) {
            return (currentLanguage === 'VI' ? `NỘI THẤT ${roomObj.label}` : `${roomObj.label} FURNITURE`).toUpperCase();
          }
        }
        return t.titleRooms;
      case 'all':
      default:
        return t.titleAll;
    }
  }, [selectedMainCategory, selectedSubCategory, selectedRoom, subcategoryOptions, roomOptions, currentLanguage, t]);

  // Color options matching screenshot
  const colorOptions = useMemo(() => [
    { id: 'beige', label: currentLanguage === 'VI' ? 'Beige' : 'Beige', hex: '#cbb39d', keywords: ['beige', 'kem', 'cát', 'sand', 'ivory', 'almond', 'linen'] },
    { id: 'white', label: currentLanguage === 'VI' ? 'Trắng' : 'White', hex: '#ffffff', keywords: ['white', 'trắng', 'bianco', 'calacatta', 'snow', 'milk'] },
    { id: 'burgundy', label: currentLanguage === 'VI' ? 'Đỏ Burgundy' : 'Burgundy', hex: '#5a1024', keywords: ['burgundy', 'đỏ', 'rượu', 'bordeaux', 'ruby', 'crimson', 'rosso'] },
    { id: 'graphite', label: currentLanguage === 'VI' ? 'Xám Graphite' : 'Graphite', hex: '#404040', keywords: ['graphite', 'than', 'anthracite', 'nero', 'đen khói'] },
    { id: 'green', label: currentLanguage === 'VI' ? 'Xanh lá' : 'Green', hex: '#7f8f6f', keywords: ['green', 'xanh lá', 'emerald', 'sage', 'rêu'] },
    { id: 'brown', label: currentLanguage === 'VI' ? 'Nâu' : 'Brown', hex: '#4d2e1b', keywords: ['brown', 'nâu', 'cognac', 'walnut', 'sandalwood', 'gỗ'] },
    { id: 'olive', label: currentLanguage === 'VI' ? 'Xanh Olive' : 'Olive', hex: '#7b8159', keywords: ['olive', 'oliu', 'khaki'] },
    { id: 'orange', label: currentLanguage === 'VI' ? 'Cam' : 'Orange', hex: '#b3641b', keywords: ['orange', 'cam', 'terracotta', 'rust', 'amber', 'hổ phách'] },
    { id: 'grey', label: currentLanguage === 'VI' ? 'Xám' : 'Grey', hex: '#7d7d7d', keywords: ['grey', 'gray', 'xám', 'greige', 'tro', 'smoke', 'silver', 'bạc'] },
    { id: 'black', label: currentLanguage === 'VI' ? 'Đen' : 'Black', hex: '#1a1a1a', keywords: ['black', 'nero', 'đen', 'tối màu'] },
  ], [currentLanguage]);

  // Material options matching screenshot
  const materialOptions = useMemo(() => [
    { id: 'wood', label: currentLanguage === 'VI' ? 'Gỗ tự nhiên' : 'Wood', keywords: ['gỗ', 'wood', 'walnut', 'oak', 'ash', 'sồi', 'mun', 'veneer', 'timber'] },
    { id: 'marble', label: currentLanguage === 'VI' ? 'Đá cẩm thạch' : 'Marble', keywords: ['marble', 'đá', 'cẩm thạch', 'stone', 'calacatta', 'marquina', 'onyx'] },
    { id: 'leather', label: currentLanguage === 'VI' ? 'Da thuộc Ý' : 'Leather', keywords: ['da', 'leather', 'nubuck', 'da bò', 'tuscany'] },
    { id: 'metal', label: currentLanguage === 'VI' ? 'Kim loại & Titan' : 'Metal', keywords: ['kim loại', 'metal', 'brass', 'đồng', 'titan', 'steel', 'pvd'] },
    { id: 'fabric', label: currentLanguage === 'VI' ? 'Vải & Bouclé' : 'Fabric', keywords: ['fabric', 'boucle', 'bouclé', 'vải', 'wool', 'len', 'dệt'] },
    { id: 'velvet', label: currentLanguage === 'VI' ? 'Nhung Como' : 'Velvet', keywords: ['velvet', 'nhung', 'velour'] },
    { id: 'glass', label: currentLanguage === 'VI' ? 'Kính & Gương' : 'Glass', keywords: ['kính', 'glass', 'gương', 'mirror'] },
  ], [currentLanguage]);

  // Sorting options matching screenshot
  const sortOptions = useMemo(() => [
    { id: 'popularity', label: t.byPopularity },
    { id: 'price-asc', label: t.byPriceAsc },
    { id: 'price-desc', label: t.byPriceDesc },
    { id: 'novelty', label: t.byNovelty },
  ], [t]);

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Collections are cross-category browsing groups, so apply this
        // filter before the existing type, room, color, and material filters.
        if (selectedCollection !== 'all' && item.collection !== selectedCollection) {
          return false;
        }

        // Main category
        if (selectedMainCategory === 'in-stock') {
          if (!item.inStock) return false;
        } else if (selectedMainCategory === 'by-rooms') {
          if (selectedRoom !== 'all' && !item.rooms.includes(selectedRoom)) {
            return false;
          }
        } else if (selectedMainCategory !== 'all' && item.category !== selectedMainCategory) {
          return false;
        }

        // Subcategory
        if (selectedSubCategory !== 'all' && item.subcategory !== selectedSubCategory) {
          return false;
        }

        // Room filter (when not in by-rooms tab)
        if (selectedMainCategory !== 'by-rooms' && selectedRoom !== 'all' && !item.rooms.includes(selectedRoom)) {
          return false;
        }

        // Color filter (supports multi-selection)
        if (selectedColors.length > 0) {
          const itemText = (
            item.materialsDescription + ' ' + 
            (item.materialsDescriptionVi || '') + ' ' +
            (item.tagline || '') + ' ' + 
            (item.shade || '') + ' ' +
            (item.shadeVi || '') + ' ' +
            item.description + ' ' + 
            (item.descriptionVi || '')
          ).toLowerCase();

          // Check if item has matching color swatch
          const swatchMatch = item.colorSwatches?.some((swatch) => 
            selectedColors.some((cId) => swatch.id.toLowerCase().includes(cId) || swatch.name.toLowerCase().includes(cId))
          );

          // Check keywords
          const keywordMatch = selectedColors.some((colorId) => {
            const opt = colorOptions.find((c) => c.id === colorId);
            if (!opt) return false;
            return opt.keywords.some((kw) => itemText.includes(kw));
          });

          if (!swatchMatch && !keywordMatch) {
            return false;
          }
        }

        // Material filter (supports multi-selection)
        if (selectedMaterials.length > 0) {
          const itemText = (
            item.materialsDescription + ' ' + 
            (item.materialsDescriptionVi || '') + ' ' +
            item.description + ' ' + 
            (item.descriptionVi || '')
          ).toLowerCase();

          const matchesMaterial = selectedMaterials.some((matId) => {
            const opt = materialOptions.find((m) => m.id === matId);
            if (!opt) return false;
            return opt.keywords.some((kw) => itemText.includes(kw));
          });

          if (!matchesMaterial) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchVi = item.nameVi?.toLowerCase().includes(q) || false;
          const matchSku = item.sku.toLowerCase().includes(q);
          const matchItalian = item.italianName?.toLowerCase().includes(q) || false;
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchMaterials = item.materialsDescription.toLowerCase().includes(q);
          if (!matchName && !matchVi && !matchSku && !matchItalian && !matchDesc && !matchMaterials) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          const priceA = a.priceVnd ?? (a.priceRub ? a.priceRub * 280 : (a.isBestseller ? 266000000 : 182000000));
          const priceB = b.priceVnd ?? (b.priceRub ? b.priceRub * 280 : (b.isBestseller ? 266000000 : 182000000));
          return priceA - priceB;
        }
        if (sortBy === 'price-desc') {
          const priceA = a.priceVnd ?? (a.priceRub ? a.priceRub * 280 : (a.isBestseller ? 266000000 : 182000000));
          const priceB = b.priceVnd ?? (b.priceRub ? b.priceRub * 280 : (b.isBestseller ? 266000000 : 182000000));
          return priceB - priceA;
        }
        if (sortBy === 'novelty') {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.id.localeCompare(a.id);
        }
        // Default: By popularity
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, selectedCollection, selectedMainCategory, selectedSubCategory, selectedRoom, selectedColors, selectedMaterials, searchQuery, sortBy, colorOptions, materialOptions]);

  const resetAllFilters = () => {
    onSelectMainCategory('all');
    handleSubCategoryChange('all');
    onSelectCollection?.();
    setSelectedRoom('all');
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSearchQuery('');
    setSortBy('popularity');
    setOpenDropdown(null);
  };

  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) => 
      prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]
    );
  };

  const toggleMaterial = (matId: string) => {
    setSelectedMaterials((prev) => 
      prev.includes(matId) ? prev.filter((id) => id !== matId) : [...prev, matId]
    );
  };

  const currentTypeLabel = subcategoryOptions.find((o) => o.id === selectedSubCategory)?.label || t.allTypes;
  const currentRoomLabel = useMemo(() => {
    return roomOptions.find((r) => r.id === selectedRoom)?.label || (currentLanguage === 'VI' ? 'Tất cả không gian' : 'All spaces');
  }, [roomOptions, selectedRoom, currentLanguage]);
  
  const currentColorLabel = useMemo(() => {
    if (selectedColors.length === 0) return t.allColors;
    if (selectedColors.length === 1) {
      return colorOptions.find((c) => c.id === selectedColors[0])?.label || t.allColors;
    }
    return `${selectedColors.length} ${currentLanguage === 'VI' ? 'màu' : 'colors'}`;
  }, [selectedColors, colorOptions, currentLanguage, t.allColors]);

  const currentMaterialLabel = useMemo(() => {
    if (selectedMaterials.length === 0) return t.allMaterials;
    if (selectedMaterials.length === 1) {
      return materialOptions.find((m) => m.id === selectedMaterials[0])?.label || t.allMaterials;
    }
    return `${selectedMaterials.length} ${currentLanguage === 'VI' ? 'vật liệu' : 'materials'}`;
  }, [selectedMaterials, materialOptions, currentLanguage, t.allMaterials]);

  const currentSortLabel = sortOptions.find((o) => o.id === sortBy)?.label || t.byPopularity;

  // Category Hero Banner content matching B+ON design
  const heroInfo = useMemo(() => {
    switch (selectedMainCategory) {
      case 'cabinet':
        return {
          title: currentLanguage === 'VI' ? 'Nội thất gỗ & đá B+ON' : 'B+ON cabinet furniture',
          description: currentLanguage === 'VI'
            ? 'Nội thất gỗ & đá B+ON thuộc phân khúc siêu cao cấp. Sản xuất nội bộ khép kín, lắp ráp thủ công và kiểm soát chất lượng ở mọi công đoạn đảm bảo trình độ thủ công đỉnh cao. Showroom tọa lạc tại Moscow, văn phòng tại St. Petersburg, và chúng tôi giao hàng trên khắp nước Nga và quốc tế.'
            : 'B+ON cabinet furniture is premium. In-house production, hand assembly, and quality control at every stage ensure a high level of craftsmanship. The showroom is located in Moscow, the office is in St. Petersburg, and we deliver worldwide.',
        };
      case 'upholstered':
        return {
          title: currentLanguage === 'VI' ? 'Nội thất bọc nệm B+ON' : 'B+ON upholstered furniture',
          description: currentLanguage === 'VI'
            ? 'Nội thất bọc nệm B+ON kết hợp phom dáng kiến trúc điêu khắc với sự êm ái thư thái tối đa. Vải dệt thủ công từ Ý, da thuộc nguyên tấm tự nhiên và hệ đệm mút đa tầng thiết kế cho không gian sống tĩnh tại.'
            : 'B+ON upholstered furniture combines sculptural architectural silhouettes with supreme tactile comfort. Hand-tailored Italian textiles, full-grain leathers, and multi-density cushioning engineered for serene living spaces.',
        };
      case 'by-rooms':
        return {
          title: currentLanguage === 'VI' ? 'Nội thất theo không gian B+ON' : 'B+ON furniture by room',
          description: currentLanguage === 'VI'
            ? 'Bộ sưu tập nội thất B+ON tuyển chọn theo từng không gian sống. Ngôn ngữ thiết kế gắn kết hài hòa phòng khách, phòng ăn và phòng ngủ trong cùng một chuẩn mực thẩm mỹ sang trọng.'
            : 'B+ON curated furniture arrangements by room. Cohesive design language where living rooms, dining salons, and private bedroom suites harmonize in tone, materiality, and proportion.',
        };
      case 'in-stock':
        return {
          title: currentLanguage === 'VI' ? 'Nội thất có sẵn B+ON' : 'B+ON in-stock furniture',
          description: currentLanguage === 'VI'
            ? 'Các sản phẩm B+ON sẵn sàng giao ngay. Những thiết kế biểu tượng đã hoàn thiện, kiểm định chất lượng và lưu trữ tại kho tiêu chuẩn Moscow và St. Petersburg.'
            : 'B+ON pieces ready for immediate delivery. Flagship designs assembled, quality-verified, and stored in our climate-controlled Moscow and St. Petersburg depots.',
        };
      case 'all':
      default:
        return {
          title: currentLanguage === 'VI' ? 'Nội thất kiến trúc B+ON' : 'B+ON luxury furniture',
          description: currentLanguage === 'VI'
            ? 'Bộ sưu tập nội thất kiến trúc B+ON sáng tạo bởi Studia 54. Kết hợp kỹ nghệ mộc công nghệ cao cùng đá cẩm thạch quý hiếm, veneer gỗ mun tự nhiên và lớp hoàn thiện mạ PVD thủ công.'
            : 'B+ON architectural furniture collection created by Studia 54, fusing high-tech manufacturing with rare marbles, exotic timber veneers, and bespoke metalwork.',
        };
    }
  }, [selectedMainCategory, currentLanguage]);

  return (
    <section id="catalog" className="w-full min-h-screen pt-36 sm:pt-44 lg:pt-48 pb-24 bg-[#141414] text-[#e8e8e8] font-manrope">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1920px]">
        
        {/* Top Header Bar with "< All furniture" Button and Count */}
        {!isDedicatedPage && selectedMainCategory !== 'in-stock' && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] font-light">
            {selectedMainCategory !== 'all' ? (
              <button
                onClick={() => {
                  onSelectMainCategory('all');
                  handleSubCategoryChange('all');
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181818] border border-[#2d2d2d] text-[#a0a0a0] hover:text-white hover:border-[#444444] text-xs uppercase tracking-wider transition-all cursor-pointer group"
              >
                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>{t.allFurnitureBreadcrumb}</span>
              </button>
            ) : (
              <div />
            )}

            <div className="text-xs text-[#767676] tracking-wider uppercase font-light">
              {t.showing} <span className="text-white font-medium">{filteredProducts.length}</span> {t.objects}
            </div>
          </div>
        )}

        {/* Center Title matching FiftyFourms design */}
        <div className="text-center my-6 md:my-9">
          <div className="flex justify-center mb-4">
            <img
              src="/bon-logo.png"
              alt="B+ON"
              className="h-6 sm:h-7 w-auto object-contain opacity-85"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.14em] uppercase text-white font-philosopher leading-tight">
            {selectedCollection !== 'all'
              ? selectedCollection.toUpperCase()
              : selectedMainCategory === 'cabinet'
              ? (currentLanguage === 'VI' ? 'NỘI THẤT GỖ & ĐÁ' : 'CABINET FURNITURE')
              : selectedMainCategory === 'upholstered'
              ? (currentLanguage === 'VI' ? 'NỘI THẤT BỌC NỆM' : 'UPHOLSTERED FURNITURE')
              : selectedMainCategory === 'in-stock'
              ? (currentLanguage === 'VI' ? 'HÀNG CÓ SẴN' : 'IN STOCK')
              : selectedMainCategory === 'by-rooms'
              ? (currentLanguage === 'VI' ? 'NỘI THẤT THEO KHÔNG GIAN' : 'FURNITURE BY ROOM')
              : (currentLanguage === 'VI' ? 'TẤT CẢ NỘI THẤT' : 'ALL FURNITURE')}
          </h1>
        </div>

        {/* Category Tabs with Underline matching user screenshot */}
        <div className="flex items-center justify-center overflow-x-auto no-scrollbar border-b border-[#282828] gap-6 sm:gap-10 md:gap-14 text-xs sm:text-sm uppercase tracking-[0.16em] mb-8 pb-0">
          <button
            onClick={() => {
              onSelectMainCategory('all');
              handleSubCategoryChange('all');
              setOpenDropdown(null);
            }}
            className={`pb-3.5 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              selectedMainCategory === 'all'
                ? 'border-white text-white font-medium'
                : 'border-transparent text-[#707070] hover:text-white'
            }`}
          >
            {t.tabAll}
          </button>

          <button
            onClick={() => {
              onSelectMainCategory('cabinet');
              handleSubCategoryChange('all');
              setOpenDropdown(null);
            }}
            className={`pb-3.5 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              selectedMainCategory === 'cabinet'
                ? 'border-white text-white font-medium'
                : 'border-transparent text-[#707070] hover:text-white'
            }`}
          >
            {t.tabCabinet}
          </button>

          <button
            onClick={() => {
              onSelectMainCategory('upholstered');
              handleSubCategoryChange('all');
              setOpenDropdown(null);
            }}
            className={`pb-3.5 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              selectedMainCategory === 'upholstered'
                ? 'border-white text-white font-medium'
                : 'border-transparent text-[#707070] hover:text-white'
            }`}
          >
            {t.tabUpholstered}
          </button>

          <button
            onClick={() => {
              onSelectMainCategory('in-stock');
              handleSubCategoryChange('all');
              setOpenDropdown(null);
            }}
            className={`pb-3.5 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              selectedMainCategory === 'in-stock'
                ? 'border-white text-white font-medium'
                : 'border-transparent text-[#707070] hover:text-white'
            }`}
          >
            {t.tabInStock}
          </button>

          <button
            onClick={() => {
              onSelectMainCategory('by-rooms');
              handleSubCategoryChange('all');
              setOpenDropdown(null);
            }}
            className={`pb-3.5 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              selectedMainCategory === 'by-rooms'
                ? 'border-white text-white font-medium'
                : 'border-transparent text-[#707070] hover:text-white'
            }`}
          >
            {t.tabByRoom}
          </button>
        </div>

        {/* Backdrop for closing open filter dropdown */}
        {openDropdown && (
          <div
            className="fixed inset-0 z-30 bg-transparent"
            onClick={() => setOpenDropdown(null)}
          />
        )}

        {/* Unified Category Filter Bar matching user screenshot */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Left: Segmented Filter Container with 4 Interconnected Cells */}
          <div className="flex flex-col sm:flex-row items-stretch bg-[#161616] border border-[#2d2d2d] rounded-xl sm:divide-x divide-y sm:divide-y-0 divide-[#2d2d2d] shadow-sm relative z-30">
            
            {/* Segment 1: Type of furniture or Space (as requested by user) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                className="w-full sm:w-[175px] md:w-[200px] xl:w-[220px] px-4 py-2.5 flex items-center justify-between text-left hover:bg-[#202020] transition-colors cursor-pointer select-none rounded-t-xl sm:rounded-t-none sm:rounded-l-xl h-full min-h-[52px]"
              >
                <div className="flex flex-col truncate pr-2">
                  <span className="text-[10px] text-[#787878] tracking-wider uppercase font-light truncate">
                    {selectedMainCategory === 'by-rooms'
                      ? (currentLanguage === 'VI' ? 'KHÔNG GIAN' : 'SPACE')
                      : (selectedRoom !== 'all' ? (currentLanguage === 'VI' ? 'KHÔNG GIAN' : 'SPACE') : t.typeLabel)}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-normal truncate mt-0.5">
                    {selectedMainCategory === 'by-rooms'
                      ? currentRoomLabel
                      : (selectedRoom !== 'all' ? currentRoomLabel : currentTypeLabel)}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-200 ${
                    openDropdown === 'type' ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {openDropdown === 'type' && (
                <div className="absolute top-full left-0 mt-1.5 w-64 sm:w-72 bg-[#181818] border border-[#2d2d2d] rounded-xl shadow-2xl z-40 p-2 max-h-80 overflow-y-auto animate-in fade-in duration-150">
                  {selectedMainCategory === 'by-rooms' ? (
                    // In "Theo không gian" mode: directly show the list of spaces matching user's arrow request
                    <div className="space-y-1">
                      {roomOptions.map((opt) => {
                        const isSelected = selectedRoom === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedRoom(opt.id);
                              setOpenDropdown(null);
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-lg text-left transition-colors cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#252525] text-white font-medium'
                                : 'text-[#a8a8a8] hover:text-white hover:bg-[#202020]'
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-light tracking-wide">{opt.label}</span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? 'border-white' : 'border-[#666666]'
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    // In other category modes: provide toggle between Type and Space
                    <div>
                      <div className="flex items-center gap-1 p-1 bg-[#202020] rounded-lg mb-2">
                        <button
                          type="button"
                          onClick={() => setFirstDropdownMode('type')}
                          className={`flex-1 py-1.5 text-xs text-center rounded transition-colors cursor-pointer ${
                            firstDropdownMode === 'type'
                              ? 'bg-[#2e2e2e] text-white font-medium shadow-sm'
                              : 'text-[#888] hover:text-white'
                          }`}
                        >
                          {currentLanguage === 'VI' ? 'Loại nội thất' : 'By type'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setFirstDropdownMode('room')}
                          className={`flex-1 py-1.5 text-xs text-center rounded transition-colors cursor-pointer ${
                            firstDropdownMode === 'room'
                              ? 'bg-[#2e2e2e] text-white font-medium shadow-sm'
                              : 'text-[#888] hover:text-white'
                          }`}
                        >
                          {currentLanguage === 'VI' ? 'Không gian' : 'By space'}
                        </button>
                      </div>

                      {firstDropdownMode === 'type' ? (
                        <div className="space-y-1">
                          {subcategoryOptions.map((opt) => {
                            const isSelected = selectedSubCategory === opt.id && selectedRoom === 'all';
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  handleSubCategoryChange(opt.id);
                                  setSelectedRoom('all');
                                  setOpenDropdown(null);
                                }}
                                className={`w-full px-3 py-2 rounded-lg text-left text-xs tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#252525] text-white font-medium'
                                    : 'text-[#a0a0a0] hover:text-white hover:bg-[#202020]'
                                }`}
                              >
                                <span>{opt.label}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {roomOptions.map((opt) => {
                            const isSelected = selectedRoom === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  setSelectedRoom(opt.id);
                                  if (opt.id !== 'all') {
                                    onSelectMainCategory('by-rooms');
                                  }
                                  setOpenDropdown(null);
                                }}
                                className={`w-full px-3.5 py-2.5 rounded-lg text-left transition-colors cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-[#252525] text-white font-medium'
                                    : 'text-[#a8a8a8] hover:text-white hover:bg-[#202020]'
                                }`}
                              >
                                <span className="text-xs font-light tracking-wide">{opt.label}</span>
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected ? 'border-white' : 'border-[#666666]'
                                  }`}
                                >
                                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Segment 2: Color */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'color' ? null : 'color')}
                className="w-full sm:w-[140px] md:w-[160px] xl:w-[175px] px-4 py-2.5 flex items-center justify-between text-left hover:bg-[#202020] transition-colors cursor-pointer select-none h-full min-h-[52px]"
              >
                <div className="flex flex-col truncate pr-2">
                  <span className="text-[10px] text-[#787878] tracking-wider uppercase font-light truncate">
                    {t.colorLabel}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-normal truncate mt-0.5">
                    {currentColorLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-200 ${
                    openDropdown === 'color' ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {openDropdown === 'color' && (
                <div className="absolute top-full left-0 mt-1.5 w-64 sm:w-72 bg-[#181818] border border-[#2d2d2d] rounded-xl shadow-2xl z-40 p-2 max-h-80 overflow-y-auto animate-in fade-in duration-150">
                  {/* All colors option */}
                  <button
                    type="button"
                    onClick={() => setSelectedColors([])}
                    className={`w-full px-3 py-2 rounded-lg text-left text-xs tracking-wider flex items-center justify-between transition-colors cursor-pointer mb-1 ${
                      selectedColors.length === 0
                        ? 'bg-[#252525] text-white font-medium'
                        : 'text-[#909090] hover:text-white hover:bg-[#202020]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-4 h-4 rounded-full shrink-0 border border-[#555] bg-gradient-to-tr from-[#333] to-[#777]" />
                      <span>{t.allColors}</span>
                    </div>
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      selectedColors.length === 0 ? 'border-white bg-white text-black' : 'border-[#555]'
                    }`}>
                      {selectedColors.length === 0 && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Individual color swatches matching user screenshot */}
                  {colorOptions.map((opt) => {
                    const isSelected = selectedColors.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleColor(opt.id)}
                        className={`w-full px-3 py-2 rounded-lg text-left text-xs tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#252525] text-white font-normal'
                            : 'text-[#b0b0b0] hover:text-white hover:bg-[#202020]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className="w-4 h-4 rounded-full shrink-0 border border-white/20 shadow-sm"
                            style={{ backgroundColor: opt.hex }}
                          />
                          <span className="text-xs text-[#d0d0d0] font-light">{opt.label}</span>
                        </div>
                        <div
                          className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                            isSelected ? 'border-white bg-white text-black' : 'border-[#555555]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Segment 3: Materials */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'material' ? null : 'material')}
                className="w-full sm:w-[150px] md:w-[170px] xl:w-[185px] px-4 py-2.5 flex items-center justify-between text-left hover:bg-[#202020] transition-colors cursor-pointer select-none h-full min-h-[52px]"
              >
                <div className="flex flex-col truncate pr-2">
                  <span className="text-[10px] text-[#787878] tracking-wider uppercase font-light truncate">
                    {t.materialsLabel}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-normal truncate mt-0.5">
                    {currentMaterialLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-200 ${
                    openDropdown === 'material' ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {openDropdown === 'material' && (
                <div className="absolute top-full left-0 mt-1.5 w-64 sm:w-72 bg-[#181818] border border-[#2d2d2d] rounded-xl shadow-2xl z-40 p-2 max-h-80 overflow-y-auto animate-in fade-in duration-150">
                  {/* All materials option */}
                  <button
                    type="button"
                    onClick={() => setSelectedMaterials([])}
                    className={`w-full px-3 py-2 rounded-lg text-left text-xs tracking-wider flex items-center justify-between transition-colors cursor-pointer mb-1 ${
                      selectedMaterials.length === 0
                        ? 'bg-[#252525] text-white font-medium'
                        : 'text-[#909090] hover:text-white hover:bg-[#202020]'
                    }`}
                  >
                    <span className="text-xs font-light">{t.allMaterials}</span>
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      selectedMaterials.length === 0 ? 'border-white bg-white text-black' : 'border-[#555]'
                    }`}>
                      {selectedMaterials.length === 0 && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Individual material checkboxes */}
                  {materialOptions.map((opt) => {
                    const isSelected = selectedMaterials.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleMaterial(opt.id)}
                        className={`w-full px-3 py-2 rounded-lg text-left text-xs tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#252525] text-white font-normal'
                            : 'text-[#b0b0b0] hover:text-white hover:bg-[#202020]'
                        }`}
                      >
                        <span className="text-xs text-[#d0d0d0] font-light">{opt.label}</span>
                        <div
                          className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                            isSelected ? 'border-white bg-white text-black' : 'border-[#555555]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Segment 4: Sorting */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                className="w-full sm:w-[150px] md:w-[170px] xl:w-[185px] px-4 py-2.5 flex items-center justify-between text-left hover:bg-[#202020] transition-colors cursor-pointer select-none rounded-b-xl sm:rounded-b-none sm:rounded-r-xl h-full min-h-[52px]"
              >
                <div className="flex flex-col truncate pr-2">
                  <span className="text-[10px] text-[#787878] tracking-wider uppercase font-light truncate">
                    {t.sortingLabel}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-normal truncate mt-0.5">
                    {currentSortLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-200 ${
                    openDropdown === 'sort' ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {openDropdown === 'sort' && (
                <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-1.5 w-64 sm:w-72 bg-[#181818] border border-[#2d2d2d] rounded-xl shadow-2xl z-40 p-2 max-h-80 overflow-y-auto animate-in fade-in duration-150">
                  {sortOptions.map((opt) => {
                    const isSelected = sortBy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.id as any);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-lg text-left transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#252525] text-white'
                            : 'text-[#a8a8a8] hover:text-white hover:bg-[#202020]'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-light tracking-wide">{opt.label}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'border-white' : 'border-[#666666]'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Right: Search Input Box matching FiftyFourms screenshot */}
          <div className="w-full sm:w-[280px] lg:w-[320px] bg-[#161616] border border-[#2d2d2d] rounded-xl px-4 py-2 flex items-center justify-between shadow-sm focus-within:border-[#555555] transition-colors min-h-[52px]">
            <div className="flex flex-col flex-1 pr-2">
              <span className="text-[10px] text-[#787878] tracking-wider uppercase font-light">
                {t.searchLabel}
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="bg-transparent text-xs sm:text-sm text-white placeholder-[#555555] focus:outline-none w-full font-light mt-0.5"
              />
            </div>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#888888] hover:text-white transition-colors cursor-pointer p-1"
                title={currentLanguage === 'VI' ? 'Xóa' : 'Clear'}
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-[#777777] shrink-0" />
            )}
          </div>

        </div>

        {/* Active Filter Chips bar (if filters are active) */}
        {(selectedCollection !== 'all' || selectedSubCategory !== 'all' || selectedRoom !== 'all' || selectedColors.length > 0 || selectedMaterials.length > 0 || searchQuery) && (
          <div className="flex flex-wrap items-center justify-between gap-2 mb-8 text-xs text-[#888888] animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1">{currentLanguage === 'VI' ? 'Đang lọc:' : 'Active filters:'}</span>
              {selectedCollection !== 'all' && (
                <span className="px-2.5 py-1 bg-[#1e1e1e] border border-[#353535] rounded-full text-white flex items-center gap-1.5">
                  {selectedCollection}
                  <button onClick={() => onSelectCollection?.()} className="cursor-pointer">
                    <X className="w-3 h-3 hover:text-red-400" />
                  </button>
                </span>
              )}
              {selectedRoom !== 'all' && (
                <span className="px-2.5 py-1 bg-[#1e1e1e] border border-[#353535] rounded-full text-white flex items-center gap-1.5">
                  {currentRoomLabel}
                  <button onClick={() => setSelectedRoom('all')} className="cursor-pointer">
                    <X className="w-3 h-3 hover:text-red-400" />
                  </button>
                </span>
              )}
              {selectedSubCategory !== 'all' && (
                <span className="px-2.5 py-1 bg-[#1e1e1e] border border-[#353535] rounded-full text-white flex items-center gap-1.5">
                  {currentTypeLabel}
                  <button onClick={() => handleSubCategoryChange('all')} className="cursor-pointer">
                    <X className="w-3 h-3 hover:text-red-400" />
                  </button>
                </span>
              )}
              {selectedColors.map((cId) => {
                const col = colorOptions.find((c) => c.id === cId);
                return (
                  <span key={cId} className="px-2.5 py-1 bg-[#1e1e1e] border border-[#353535] rounded-full text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: col?.hex }} />
                    {col?.label || cId}
                    <button onClick={() => toggleColor(cId)} className="cursor-pointer">
                      <X className="w-3 h-3 hover:text-red-400" />
                    </button>
                  </span>
                );
              })}
              {selectedMaterials.map((mId) => {
                const mat = materialOptions.find((m) => m.id === mId);
                return (
                  <span key={mId} className="px-2.5 py-1 bg-[#1e1e1e] border border-[#353535] rounded-full text-white flex items-center gap-1.5">
                    {mat?.label || mId}
                    <button onClick={() => toggleMaterial(mId)} className="cursor-pointer">
                      <X className="w-3 h-3 hover:text-red-400" />
                    </button>
                  </span>
                );
              })}
              {searchQuery && (
                <span className="px-2.5 py-1 bg-[#1e1e1e] border border-[#353535] rounded-full text-white flex items-center gap-1.5">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="cursor-pointer">
                    <X className="w-3 h-3 hover:text-red-400" />
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={resetAllFilters}
              className="text-[#aeb8c2] hover:text-white underline transition-colors cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        )}

        {/* Product Grid with rounded cards matching FiftyFourms screenshot */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.has(product.id)}
                onOpenCustomizerWithProduct={onOpenCustomizerWithProduct}
                currentLanguage={currentLanguage}
                isFirstCardWithBack={index === 0 && (selectedMainCategory !== 'all' || selectedSubCategory !== 'all')}
                onNavigateBackAll={() => {
                  onSelectMainCategory('all');
                  handleSubCategoryChange('all');
                }}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-[#1c1c1c] border border-[#2e2e2e] rounded-2xl space-y-4 max-w-xl mx-auto">
            <p className="text-base text-[#9a9a9a] font-light">{t.noResults}</p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-white text-[#181818] text-xs uppercase tracking-widest font-semibold hover:bg-[#e8e8e8] transition-colors rounded-lg shadow-lg"
            >
              {t.resetFilters}
            </button>
          </div>
        )}

        {/* FiftyFourms Category Story / SEO Card right ABOVE FOOTER matching user's request */}
        <div className="relative w-full rounded-[24px] sm:rounded-[32px] bg-[#181818] border border-[#242424] px-6 py-20 sm:px-14 sm:py-24 md:py-28 mt-16 sm:mt-20 mb-4 text-center overflow-hidden shadow-2xl">
          {/* Top-left: < Tất cả nội thất */}
          {selectedMainCategory !== 'all' ? (
            <button
              onClick={() => {
                onSelectMainCategory('all');
                handleSubCategoryChange('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="absolute top-6 sm:top-8 left-6 sm:left-10 inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#9b9b9e] hover:text-white transition-colors font-light cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>{currentLanguage === 'VI' ? 'Tất cả nội thất' : 'All furniture'}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="absolute top-6 sm:top-8 left-6 sm:left-10 inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#9b9b9e] hover:text-white transition-colors font-light cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>{currentLanguage === 'VI' ? 'Lên đầu trang' : 'Back to top'}</span>
            </button>
          )}

          {/* Center Heading & Subtext */}
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight font-serif">
              {heroInfo.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#9a9a9f] font-light leading-relaxed mt-5 max-w-2xl mx-auto">
              {heroInfo.description}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
