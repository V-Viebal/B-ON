import React, { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { Product, AppLanguage } from '../types';
import { BlogArticleView } from './BlogArticleView';
import { Search, Calendar, Clock, ArrowRight, Share2, Check, Sparkles, Filter } from 'lucide-react';

interface BlogSectionProps {
  currentLanguage: AppLanguage;
  onNavigatePage?: (page: string) => void;
  onSelectProduct?: (product: Product) => void;
  onOpenConsultation?: () => void;
  onOpenCatalogDownload?: () => void;
  initialArticleSlug?: string;
}

type FilterCategory = 'all' | 'office' | 'spatial' | 'trends' | 'philosophy' | 'gifts';

export const BlogSection: React.FC<BlogSectionProps> = ({
  currentLanguage,
  onNavigatePage,
  onSelectProduct,
  onOpenConsultation,
  onOpenCatalogDownload,
  initialArticleSlug,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<BlogPost | null>(() => {
    if (initialArticleSlug) {
      return BLOG_POSTS.find((p) => p.slug === initialArticleSlug) || null;
    }
    return null;
  });
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (initialArticleSlug) {
      const found = BLOG_POSTS.find((p) => p.slug === initialArticleSlug);
      if (found) {
        setReadingArticle(found);
      }
    }
  }, [initialArticleSlug]);

  const t = {
    VI: {
      badge: 'BÀI VIẾT & XU HƯỚNG KIẾN TRÚC',
      title: 'KIẾN TRÚC & ĐỜI SỐNG',
      subtitle:
        'Góc nhìn chuyên sâu từ các kiến trúc sư Studia 54 và nghệ nhân B+ON® về xu hướng không gian, màu sắc và nghệ thuật bài trí nội thất cao cấp.',
      searchLabel: 'TÌM KIẾM',
      searchPlaceholder: 'Tìm kiếm theo tiêu đề bài viết...',
      all: 'Tất cả',
      catOffice: 'Văn phòng & Dự án',
      catSpatial: 'Thiết kế không gian',
      catTrends: 'Xu hướng & Vật liệu',
      catPhilosophy: 'Triết lý thiết kế',
      catGifts: 'Bộ sưu tập quà tặng',
      readArticle: 'Đọc bài viết',
      share: 'Chia sẻ',
      noResults: 'Không tìm thấy bài viết phù hợp với từ khóa.',
      clearSearch: 'Xóa tìm kiếm',
      resultsCount: (count: number) => `Hiển thị ${count} bài viết`,
      featuredBannerBadge: 'ẤN PHẨM MỚI NHẤT',
    },
    EN: {
      badge: 'ARCHITECTURAL JOURNAL & ESSAYS',
      title: 'ARCHITECTURE & LIFE',
      subtitle:
        'In-depth perspectives from Studia 54 architects and B+ON® master ateliers on contemporary spatial philosophies, color dialogues, and high-end living.',
      searchLabel: 'SEARCH',
      searchPlaceholder: 'Search by article title...',
      all: 'All Stories',
      catOffice: 'Office & Projects',
      catSpatial: 'Spatial Design',
      catTrends: 'Trends & Materials',
      catPhilosophy: 'Design Philosophy',
      catGifts: 'Curated Gifts',
      readArticle: 'Read article',
      share: 'Share',
      noResults: 'No journal entries found matching your query.',
      clearSearch: 'Clear search',
      resultsCount: (count: number) => `Showing ${count} stories`,
      featuredBannerBadge: 'LATEST STORY',
    },
  }[currentLanguage];

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: t.all },
    { id: 'spatial', label: t.catSpatial },
    { id: 'trends', label: t.catTrends },
    { id: 'office', label: t.catOffice },
    { id: 'philosophy', label: t.catPhilosophy },
    { id: 'gifts', label: t.catGifts },
  ];

  // Filtering logic
  const filteredArticles = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // Category match
      let matchesCategory = true;
      if (activeCategory === 'office') {
        matchesCategory =
          post.categoryEn.includes('Office') || post.slug.includes('conference');
      } else if (activeCategory === 'spatial') {
        matchesCategory =
          post.categoryEn.includes('Spatial') || post.slug.includes('personal-zones');
      } else if (activeCategory === 'trends') {
        matchesCategory =
          post.categoryEn.includes('Trends') ||
          post.slug.includes('colors') ||
          post.slug.includes('outdated');
      } else if (activeCategory === 'philosophy') {
        matchesCategory =
          post.categoryEn.includes('Philosophy') ||
          post.categoryEn.includes('Expert') ||
          post.slug.includes('italian-furniture') ||
          post.slug.includes('competitions');
      } else if (activeCategory === 'gifts') {
        matchesCategory =
          post.categoryEn.includes('Gifts') || post.slug.includes('gifts');
      }

      // Search match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleVi = post.titleVi.toLowerCase();
        const titleEn = post.titleEn.toLowerCase();
        const summaryVi = post.summaryVi.toLowerCase();
        const summaryEn = post.summaryEn.toLowerCase();
        const tags = post.tags.map((t) => t.toLowerCase()).join(' ');

        matchesSearch =
          titleVi.includes(q) ||
          titleEn.includes(q) ||
          summaryVi.includes(q) ||
          summaryEn.includes(q) ||
          tags.includes(q);
      }

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle quick share
  const handleShare = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#/blog/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // If reading an article, render full BlogArticleView matching fiftyfourms.com/blogitems/...
  if (readingArticle) {
    return (
      <BlogArticleView
        article={readingArticle}
        onBack={() => setReadingArticle(null)}
        onSelectArticle={(newArticle) => setReadingArticle(newArticle)}
        onSelectProduct={onSelectProduct}
        onOpenConsultation={onOpenConsultation}
        currentLanguage={currentLanguage}
      />
    );
  }

  return (
    <div id="blog-section" className="w-full bg-[#141414] text-[#e8e8e8] font-manrope pb-28">
      {/* 1. Page Header (fiftyfourms style: refined, centered H1 with uppercase tracking) */}
      <section className="w-full pt-44 sm:pt-52 lg:pt-56 pb-8 px-4 sm:px-6 lg:px-12 max-w-[1920px] mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center mb-2">
            <img
              src="/bon-logo.png"
              alt="B+ON"
              className="h-6 sm:h-7 w-auto object-contain opacity-85"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.12em] uppercase text-white font-philosopher">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#9e9e9e] font-light leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 2. Top Filter and Search Bar Row (Identical to fiftyfourms.com/blog) */}
        <div className="mt-12 max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-[#262626]">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 w-full lg:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#141414] font-medium shadow-md'
                      : 'bg-[#1c1c1c] text-[#909090] hover:text-white border border-[#303030] hover:border-[#555]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box Matching fiftyfourms.com/blog */}
          <div className="w-full sm:w-80 relative border-b border-[#383838] lg:border lg:border-[#303030] lg:rounded-xl lg:px-4 lg:py-2 bg-[#181818]/60 backdrop-blur-sm transition-all focus-within:border-[#aeb8c2]">
            <label
              htmlFor="blog-search"
              className="text-[10px] text-[#787878] uppercase tracking-wider block font-light mb-0.5"
            >
              {t.searchLabel}
            </label>
            <div className="flex items-center justify-between gap-2">
              <input
                id="blog-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="bg-transparent text-white text-xs sm:text-sm outline-none placeholder:text-[#555] w-full font-light"
              />
              <Search className="w-4 h-4 text-[#777] shrink-0 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results count & Clear filter bar if search active */}
        {searchQuery.trim() && (
          <div className="mt-4 max-w-[1440px] mx-auto flex items-center justify-between text-xs text-[#888]">
            <span>{t.resultsCount(filteredArticles.length)}</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#aeb8c2] hover:text-white underline cursor-pointer"
            >
              {t.clearSearch}
            </button>
          </div>
        )}
      </section>

      {/* 3. The Exact FiftyFourms 2-Column Grid of Articles */}
      <section className="w-full px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto pt-4">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="text-base text-[#888] font-light">{t.noResults}</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#222] text-xs uppercase tracking-wider text-white border border-[#444] hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              {t.clearSearch}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-8 lg:gap-x-10 xl:gap-y-16">
            {filteredArticles.map((post, idx) => {
              const title =
                currentLanguage === 'VI' ? post.titleVi : post.titleEn;
              const category =
                currentLanguage === 'VI' ? post.categoryVi : post.categoryEn;
              const summary =
                currentLanguage === 'VI' ? post.summaryVi : post.summaryEn;
              const readTime =
                currentLanguage === 'VI' ? post.readTimeVi : post.readTimeEn;
              const dateFormatted =
                currentLanguage === 'VI' ? post.date : post.dateEn;

              return (
                <article
                  key={post.id}
                  onClick={() => setReadingArticle(post)}
                  className="group cursor-pointer flex flex-col gap-4"
                >
                  {/* Image Card (aspect 16/10 with rounded-[1.75rem] as seen on fiftyfourms.com/blog) */}
                  <div className="rounded-2xl md:rounded-[1.75rem] w-full overflow-hidden aspect-[16/10] relative bg-[#1c1c1c] border border-white/5 shadow-xl">
                    <img
                      src={post.coverImage}
                      alt={title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.96]"
                    />

                    {/* Category badge overlay top-left */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-[#aeb8c2] border border-white/10 uppercase tracking-widest font-medium">
                      {category}
                    </div>

                    {/* Read time badge top-right */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#888] flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#aeb8c2]" />
                      <span>{readTime}</span>
                    </div>

                    {/* Quick share button overlay on hover */}
                    <button
                      onClick={(e) => handleShare(post.slug, e)}
                      className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
                      title={t.share}
                    >
                      {copiedSlug === post.slug ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Card Editorial Text */}
                  <div className="space-y-2">
                    <h2 className="text-base sm:text-lg md:text-xl font-light text-white group-hover:text-[#aeb8c2] transition-colors leading-snug line-clamp-2 uppercase font-philosopher tracking-wide">
                      {title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#909090] font-light leading-relaxed line-clamp-2">
                      {summary}
                    </p>

                    {/* Bottom row with Date and Read Action */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[#222]">
                      <div className="flex items-center gap-1.5 text-[#737373]">
                        <Calendar className="w-3.5 h-3.5 text-[#555]" />
                        <span>{dateFormatted}</span>
                      </div>

                      <span className="text-xs uppercase tracking-wider font-medium text-[#aeb8c2] group-hover:text-white flex items-center gap-1 transition-colors">
                        <span>{t.readArticle}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Editorial & Architectural Consultation Footer Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto mt-24">
        <div className="p-8 sm:p-12 rounded-[2rem] bg-gradient-to-b from-[#1c1c1c] to-[#161616] border border-[#2d2d2d] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2.5 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#252525] border border-[#383838] text-[10px] uppercase tracking-widest text-[#aeb8c2]">
              <Sparkles className="w-3 h-3" />
              <span>Studia 54 & B+ON Research</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white font-philosopher uppercase tracking-wide">
              {currentLanguage === 'VI'
                ? 'Đồng hành cùng kiến trúc sư trong mọi công trình đỉnh cao'
                : 'Architectural Partnership for Monumental Living Spaces'}
            </h3>
            <p className="text-xs sm:text-sm text-[#949494] font-light leading-relaxed">
              {currentLanguage === 'VI'
                ? 'B+ON cung cấp giải pháp sản xuất đồ rời bespoke theo kích thước và vật liệu tùy biến riêng biệt cho từng mặt bằng biệt thự và penthouse.'
                : 'B+ON manufactures bespoke loose furniture tailored to exact architectural shop drawings, custom materials, and dimensions worldwide.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#aeb8c2] hover:bg-white text-[#141414] text-xs uppercase tracking-widest font-medium transition-all cursor-pointer shadow-lg"
              >
                {currentLanguage === 'VI' ? 'Tư vấn dự án' : 'Request Consultation'}
              </button>
            )}
            {onOpenCatalogDownload && (
              <button
                onClick={onOpenCatalogDownload}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#222] hover:bg-[#2c2c2c] text-white text-xs uppercase tracking-widest border border-[#383838] transition-all cursor-pointer"
              >
                {currentLanguage === 'VI' ? 'Tải Catalogue PDF' : 'Download Catalog PDF'}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
