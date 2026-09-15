import React, { useState, useEffect, useRef } from 'react';
import { BlogPost, BLOG_POSTS, BlogArticleSection } from '../data/blogData';
import { Product, AppLanguage } from '../types';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  BookOpen,
  Menu,
  ArrowRight,
} from 'lucide-react';

interface BlogArticleViewProps {
  article: BlogPost;
  onBack: () => void;
  onSelectArticle: (article: BlogPost) => void;
  onSelectProduct?: (product: Product) => void;
  onOpenConsultation?: () => void;
  currentLanguage: AppLanguage;
}

export const BlogArticleView: React.FC<BlogArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  onSelectProduct,
  onOpenConsultation,
  currentLanguage,
}) => {
  const [copied, setCopied] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption?: string } | null>(null);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const articleContentRef = useRef<HTMLDivElement>(null);

  // Scroll to section or top when opening an article
  useEffect(() => {
    const rawHash = window.location.hash;
    // Check if there is a target anchor in the hash (e.g. #chto-uchityvat-krome-kolichestva-mest)
    const hashParts = rawHash.split('#').filter(Boolean);
    const lastHashPart = hashParts[hashParts.length - 1];

    let foundTarget = false;
    if (lastHashPart && !lastHashPart.startsWith('/')) {
      setTimeout(() => {
        const targetEl =
          document.getElementById(lastHashPart) ||
          document.querySelector(`[data-slug="${lastHashPart}"]`);
        if (targetEl) {
          const yOffset = -110;
          const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          foundTarget = true;
          // Find matching index if available
          const secIdx = article.sections.findIndex(s => s.slug === lastHashPart);
          if (secIdx !== -1) {
            setActiveSectionIdx(secIdx);
          }
        }
      }, 200);
    }

    if (!foundTarget && (!lastHashPart || lastHashPart.startsWith('/'))) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSectionIdx(0);
    }
  }, [article.slug]);

  // Scroll spy to highlight current section in Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      if (!article.sections || article.sections.length === 0) return;

      const headerOffset = 180;
      const scrollPosition = window.scrollY + headerOffset;

      for (let i = article.sections.length - 1; i >= 0; i--) {
        const sec = article.sections[i];
        const el = document.getElementById(sec.slug || `section-${i}`) || document.getElementById(`section-${i}`);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionIdx(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.sections]);

  const scrollToSection = (idx: number) => {
    const sec = article.sections[idx];
    const el = document.getElementById(sec?.slug || `section-${idx}`) || document.getElementById(`section-${idx}`);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSectionIdx(idx);
      setIsMobileTocOpen(false);
    }
  };

  const t = {
    VI: {
      backToBlog: 'Tất cả bài viết',
      journalBadge: 'TẠP CHÍ KIẾN TRÚC & ĐỜI SỐNG',
      share: 'Chia sẻ',
      copied: 'Đã sao chép link!',
      readTime: 'Thời gian đọc',
      published: 'Ngày xuất bản',
      editorialTeam: 'B+ON & Studia 54 Editorial Atelier',
      tocTitle: 'MỤC LỤC BÀI VIẾT',
      tocSubtitle: 'Các luận điểm & Giải pháp',
      featuredFurniture: 'ĐỒ NỘI THẤT TRONG BÀI VIẾT',
      featuredFurnitureSubtitle:
        'Các tuyệt phẩm nội thất xuất hiện trong bài viết được chế tác trực tiếp tại xưởng B+ON.',
      viewProduct: 'Xem thông số sản phẩm',
      consultationTitle: 'Quan tâm đến các giải pháp bài trí trong bài viết?',
      consultationSubtitle:
        'Liên hệ kiến trúc sư B+ON để nhận bản vẽ kỹ thuật CAD/3D, bảng báo giá dự án và mẫu vật liệu hoàn thiện.',
      consultationButton: 'Yêu cầu tư vấn thiết kế',
      relatedArticles: 'BÀI VIẾT GỢI Ý CÙNG CHỦ ĐỀ',
      readMore: 'Đọc tiếp',
      prevArticle: 'Bài trước',
      nextArticle: 'Bài tiếp',
      enlarge: 'Phóng to ảnh',
      specsHeader: 'Quy chuẩn chiều dài & sức chứa bàn họp:',
      seatsUnit: 'chỗ',
      clearanceNote: 'Khoảng lưu thông tối thiểu từ mép bàn đến vách tường: 100–120 cm',
      mergentiaSpotlightTitle: 'BÀN HỌP MERGENTIA — B+ON',
      mergentiaSpotlightDesc:
        'Biểu tượng quyền lực cho phòng hội đồng: Chân trụ tròn bọc da bò Ý cao cấp khâu chỉ thủ công, mặt bàn đá Quartzite hoặc Veneer quý hiếm, tích hợp nắp lật điện tử giấu dây âm mặt bàn.',
      viewMergentiaBtn: 'Khám phá bàn họp Mergentia',
    },
    EN: {
      backToBlog: 'All Stories',
      journalBadge: 'ARCHITECTURE & INTERIOR JOURNAL',
      share: 'Share',
      copied: 'Link copied!',
      readTime: 'Reading time',
      published: 'Published',
      editorialTeam: 'B+ON & Studia 54 Editorial Atelier',
      tocTitle: 'TABLE OF CONTENTS',
      tocSubtitle: 'Key Sections & Insights',
      featuredFurniture: 'FURNITURE PIECES IN STORY',
      featuredFurnitureSubtitle:
        'Sculptural masterworks featured in this story, crafted directly at the B+ON atelier.',
      viewProduct: 'View specifications',
      consultationTitle: 'Inspired by the spatial concepts in this article?',
      consultationSubtitle:
        'Connect with B+ON architects to receive CAD/3D files, contract pricing, and bespoke finish swatches.',
      consultationButton: 'Request Architectural Consultation',
      relatedArticles: 'RECOMMENDED STORIES',
      readMore: 'Read story',
      prevArticle: 'Previous story',
      nextArticle: 'Next story',
      enlarge: 'Enlarge photo',
      specsHeader: 'Standard length & seating capacity benchmarks:',
      seatsUnit: 'seats',
      clearanceNote: 'Mandatory perimeter clearance from table edge to walls: 100–120 cm',
      mergentiaSpotlightTitle: 'MERGENTIA BOARDROOM TABLE — B+ON',
      mergentiaSpotlightDesc:
        'Flagship symbol for executive discourse: Hand-stitched Italian leather pedestals, bookmatched veneer or quartz agglomerate top, and flush motor-retractable power hatches.',
      viewMergentiaBtn: 'Discover Mergentia Table',
    },
  }[currentLanguage];

  // Helper to resolve localized strings
  const title = currentLanguage === 'VI' ? article.titleVi : article.titleEn;
  const category = currentLanguage === 'VI' ? article.categoryVi : article.categoryEn;
  const summary = currentLanguage === 'VI' ? article.summaryVi : article.summaryEn;
  const readTime = currentLanguage === 'VI' ? article.readTimeVi : article.readTimeEn;
  const dateFormatted = currentLanguage === 'VI' ? article.date : article.dateEn;

  // Handle share
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#/blog/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Find previous and next articles
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === article.slug);
  const prevArticle =
    currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : BLOG_POSTS[BLOG_POSTS.length - 1];
  const nextArticle =
    currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : BLOG_POSTS[0];

  // Related articles (excluding current)
  const relatedArticles = BLOG_POSTS.filter((p) => p.slug !== article.slug).slice(0, 2);

  return (
    <div id="blog-article-view" className="w-full min-h-screen bg-[#111111] text-[#e8e8e8] font-manrope pt-[58px] sm:pt-[68px] lg:pt-[104px] pb-24 selection:bg-[#aeb8c2] selection:text-[#111]">
      {/* 1. Sub-navigation Top Bar */}
      <div className="sticky top-[58px] sm:top-[68px] lg:top-[104px] z-30 bg-[#161616]/95 backdrop-blur-xl border-b border-[#282828] py-3.5 px-4 md:px-8 lg:px-12 transition-all shadow-md">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9e9e9e] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#aeb8c2]" />
            <span className="font-medium">{t.backToBlog}</span>
          </button>

          {/* Center Category pill */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#202020] text-[11px] uppercase tracking-wider text-[#aeb8c2] border border-[#383838] font-medium">
              {category}
            </span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile TOC trigger */}
            <button
              onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#222] border border-[#333] text-xs text-[#aeb8c2] hover:text-white"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>{t.tocTitle}</span>
            </button>

            {/* Prev Article */}
            <button
              onClick={() => onSelectArticle(prevArticle)}
              className="p-2 rounded-full hover:bg-[#252525] text-[#999] hover:text-white transition-colors cursor-pointer"
              title={t.prevArticle}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {/* Next Article */}
            <button
              onClick={() => onSelectArticle(nextArticle)}
              className="p-2 rounded-full hover:bg-[#252525] text-[#999] hover:text-white transition-colors cursor-pointer"
              title={t.nextArticle}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#222] hover:bg-[#2c2c2c] border border-[#383838] hover:border-[#aeb8c2] text-xs text-[#ccc] hover:text-white transition-all cursor-pointer ml-1"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">{t.copied}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.share}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Table of Contents Drawer */}
      {isMobileTocOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[108px] sm:top-[118px] z-40 bg-[#161616]/98 backdrop-blur-2xl border-b border-[#2d2d2d] p-5 shadow-2xl animate-in slide-in-from-top duration-300 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#282828] mb-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#aeb8c2] font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {t.tocTitle}
            </span>
            <button
              onClick={() => setIsMobileTocOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#282828] text-[#888] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="space-y-1">
            {article.sections.map((sec, sIdx) => {
              const secHeading = currentLanguage === 'VI' ? sec.headingVi : sec.headingEn;
              const isActive = activeSectionIdx === sIdx;
              return (
                <button
                  key={sIdx}
                  onClick={() => scrollToSection(sIdx)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                    isActive
                      ? 'bg-[#aeb8c2]/15 text-[#ffffff] font-medium border-l-2 border-[#aeb8c2]'
                      : 'text-[#8e8e8e] hover:text-white hover:bg-[#202020]'
                  }`}
                >
                  <span className="font-mono text-[11px] text-[#666] shrink-0 mt-0.5">
                    0{sIdx + 1}.
                  </span>
                  <span className="line-clamp-2">{secHeading}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* 2. Article Container */}
      <article ref={articleContentRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12">
        {/* Article Eyebrow & Meta */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#888]">
            <img
              src="/bon-logo.png"
              alt="B+ON"
              className="h-4 w-auto object-contain opacity-80"
            />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#aeb8c2] font-semibold">
              {t.journalBadge}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#777]" />
              {dateFormatted}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#777]" />
              {readTime}
            </span>
          </div>

          {/* Article Title H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-light text-white font-philosopher uppercase tracking-wide leading-[1.2]">
            {title}
          </h1>

          {/* Author/Editorial */}
          <p className="text-xs text-[#777] font-light tracking-wider">
            {t.editorialTeam}
          </p>
        </div>

        {/* 3. Hero Header Dual-Images Gallery (FiftyFourms authentic desktop view) */}
        {article.headerDesktopImages && article.headerDesktopImages.length >= 2 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Primary Large Image (8 cols) */}
            <div
              onClick={() =>
                setLightboxImage({
                  src: article.headerDesktopImages![0].high,
                  caption: title,
                })
              }
              className="md:col-span-7 lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#181818] border border-[#282828] group cursor-pointer shadow-2xl"
            >
              <img
                src={article.headerDesktopImages[0].high}
                alt={article.headerDesktopImages[0].alt || title}
                className="w-full h-full object-cover brightness-95 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <button
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-1.5 transition-all"
                title={t.enlarge}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.enlarge}</span>
              </button>
            </div>

            {/* Secondary Detail Image (5 cols) */}
            <div
              onClick={() =>
                setLightboxImage({
                  src: article.headerDesktopImages![1].high,
                  caption: article.headerDesktopImages![1].alt || title,
                })
              }
              className="md:col-span-5 lg:col-span-4 relative aspect-[16/10] md:aspect-auto rounded-2xl overflow-hidden bg-[#181818] border border-[#282828] group cursor-pointer shadow-2xl"
            >
              <img
                src={article.headerDesktopImages[1].high}
                alt={article.headerDesktopImages[1].alt || title}
                className="w-full h-full object-cover brightness-95 group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <button
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-1.5 transition-all"
                title={t.enlarge}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Single Hero Image Fallback */
          <div
            onClick={() =>
              setLightboxImage({
                src: article.coverImage,
                caption: title,
              })
            }
            className="mt-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#181818] border border-[#2e2e2e] shadow-2xl group cursor-pointer"
          >
            <img
              src={article.coverImage}
              alt={title}
              className="w-full h-full object-cover brightness-95 group-hover:scale-102 transition-transform duration-700"
            />
            <button className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-2 transition-all cursor-pointer">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{t.enlarge}</span>
            </button>
          </div>
        )}

        {/* 4. Article Summary Callout Box */}
        <div className="mt-10 p-6 sm:p-8 bg-[#171717] rounded-2xl border-l-2 border-l-[#aeb8c2] border-y border-r border-[#262626] shadow-xl">
          <p className="text-base sm:text-lg text-[#d8d8d8] font-light leading-relaxed italic">
            "{summary}"
          </p>
        </div>

        {/* 5. Main Content Area with Sticky Sidebar (FiftyFourms Authentic Two-Column Layout) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Sidebar: Table of Contents (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-40 bg-[#161616] p-6 rounded-2xl border border-[#262626] shadow-xl">
            <div className="space-y-1 pb-4 border-b border-[#282828]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#aeb8c2] font-semibold">
                <BookOpen className="w-4 h-4 text-[#aeb8c2]" />
                <span>{t.tocTitle}</span>
              </div>
              <p className="text-[11px] text-[#777] font-light">{t.tocSubtitle}</p>
            </div>

            <nav className="mt-4 space-y-1.5">
              {article.sections.map((sec, sIdx) => {
                const secHeading = currentLanguage === 'VI' ? sec.headingVi : sec.headingEn;
                const isActive = activeSectionIdx === sIdx;

                return (
                  <button
                    key={sIdx}
                    onClick={() => scrollToSection(sIdx)}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs transition-all flex items-start gap-3 cursor-pointer group ${
                      isActive
                        ? 'bg-[#222222] text-white font-medium border-l-2 border-[#aeb8c2] shadow-sm'
                        : 'text-[#888888] hover:text-[#d0d0d0] hover:bg-[#1b1b1b]'
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] shrink-0 mt-0.5 ${
                        isActive ? 'text-[#aeb8c2] font-semibold' : 'text-[#555] group-hover:text-[#888]'
                      }`}
                    >
                      0{sIdx + 1}
                    </span>
                    <span className="leading-snug line-clamp-2">{secHeading}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Consultation hint in sidebar */}
            {onOpenConsultation && (
              <div className="mt-6 pt-5 border-t border-[#252525] text-center">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 px-3 bg-[#202020] hover:bg-[#282828] border border-[#333] hover:border-[#aeb8c2] rounded-xl text-[11px] uppercase tracking-wider text-[#ccc] hover:text-white transition-all cursor-pointer font-medium"
                >
                  {t.consultationButton}
                </button>
              </div>
            )}
          </aside>

          {/* Right Main Reading Content (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-16">
            {article.sections.map((sec, sIdx) => {
              const secHeading = currentLanguage === 'VI' ? sec.headingVi : sec.headingEn;
              const secParagraphs =
                currentLanguage === 'VI'
                  ? sec.paragraphsVi || [sec.contentVi]
                  : sec.paragraphsEn || [sec.contentEn];
              const secCaption =
                currentLanguage === 'VI' ? sec.captionVi : sec.captionEn;

              return (
                <section
                  key={sIdx}
                  id={sec.slug || `section-${sIdx}`}
                  data-slug={sec.slug}
                  className="scroll-mt-36 space-y-6 pb-4 relative"
                >
                  {sec.slug && <span id={`section-${sIdx}`} className="sr-only" tabIndex={-1} />}
                  {/* Section Heading with 0X Counter */}
                  <div className="space-y-2 border-b border-[#282828] pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#aeb8c2]">
                      <span className="px-2 py-0.5 rounded bg-[#202020] border border-[#333]">
                        0{sIdx + 1}
                      </span>
                      <span className="uppercase tracking-widest text-[10px] text-[#777]">
                        Section
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white font-philosopher uppercase tracking-wide leading-snug">
                      {secHeading}
                    </h2>
                  </div>

                  {/* Section Paragraphs */}
                  <div className="space-y-4">
                    {secParagraphs.map((pText, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[15px] sm:text-base text-[#c8c8c8] font-light leading-[1.8]"
                      >
                        {pText}
                      </p>
                    ))}
                  </div>

                  {/* Section Image with Caption & Lightbox Zoom */}
                  {sec.image && (
                    <div className="mt-6 space-y-2.5">
                      <div
                        onClick={() =>
                          setLightboxImage({
                            src: sec.image!,
                            caption: secCaption || secHeading,
                          })
                        }
                        className="relative rounded-2xl overflow-hidden bg-[#161616] border border-[#2c2c2c] group cursor-pointer shadow-xl"
                      >
                        <img
                          src={sec.image}
                          alt={secCaption || secHeading || ''}
                          className="w-full h-auto object-cover max-h-[520px] group-hover:scale-102 transition-transform duration-700 brightness-95"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <button
                          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-1.5 transition-all"
                          title={t.enlarge}
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span className="text-[11px]">{t.enlarge}</span>
                        </button>
                      </div>
                      {secCaption && (
                        <p className="text-xs text-[#888] italic px-1 font-light flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#aeb8c2]/50" />
                          {secCaption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Section External or Internal CTA Link (e.g. FiftyFourms Tables, Mergentia Table) */}
                  {sec.linkUrl && (
                    <div className="pt-2">
                      <a
                        href={sec.linkUrl}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202020] hover:bg-[#2c2c2c] border border-[#383838] hover:border-[#aeb8c2] text-xs uppercase tracking-wider text-[#e0e0e0] hover:text-white transition-all group"
                      >
                        <span className="font-medium">
                          {currentLanguage === 'VI'
                            ? sec.linkTextVi || 'Xem chi tiết'
                            : sec.linkTextEn || 'Learn more'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#aeb8c2] group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </section>
              );
            })}

            {/* Architectural Consultation Call-to-Action Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#191919] to-[#222222] border border-[#333] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left max-w-xl">
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest text-[#aeb8c2] font-medium">
                  <img
                    src="/bon-logo.png"
                    alt="B+ON"
                    className="h-4 w-auto object-contain opacity-90"
                  />
                  <span>Architectural Atelier</span>
                </div>
                <h3 className="text-lg sm:text-xl font-light text-white font-philosopher uppercase tracking-wide">
                  {t.consultationTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#9e9e9e] font-light leading-relaxed">
                  {t.consultationSubtitle}
                </p>
              </div>

              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="shrink-0 px-6 py-3 bg-[#aeb8c2] hover:bg-white text-[#111] font-medium text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-lg hover:shadow-white/10"
                >
                  {t.consultationButton}
                </button>
              )}
            </div>

            {/* 9. Recommended Stories */}
            <div className="pt-10 border-t border-[#262626] space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-light text-white uppercase tracking-[0.16em] font-philosopher">
                  {t.relatedArticles}
                </h3>
                <button
                  onClick={onBack}
                  className="text-xs uppercase tracking-widest text-[#aeb8c2] hover:text-white transition-colors"
                >
                  {t.backToBlog} →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectArticle(item)}
                    className="group cursor-pointer flex flex-col gap-3.5"
                  >
                    <div className="rounded-2xl w-full overflow-hidden aspect-[16/10] relative bg-[#181818] border border-[#2b2b2b]">
                      <img
                        src={item.coverImage}
                        alt={currentLanguage === 'VI' ? item.titleVi : item.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-[#aeb8c2] border border-white/10 uppercase tracking-widest">
                        {currentLanguage === 'VI' ? item.categoryVi : item.categoryEn}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-sm sm:text-base font-light text-white group-hover:text-[#aeb8c2] transition-colors line-clamp-2 uppercase font-philosopher tracking-wide">
                        {currentLanguage === 'VI' ? item.titleVi : item.titleEn}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-[#777] pt-1">
                        <span>{currentLanguage === 'VI' ? item.date : item.dateEn}</span>
                        <span className="text-[#aeb8c2] uppercase tracking-wider font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {t.readMore} →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* 10. Fullscreen Lightbox Zoom Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.caption || 'Enlarged photo'}
              className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            {lightboxImage.caption && (
              <p className="text-xs sm:text-sm text-[#ccc] font-light text-center px-4 max-w-2xl italic">
                {lightboxImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
