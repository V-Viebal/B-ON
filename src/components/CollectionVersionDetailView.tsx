import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  ExternalLink,
  Maximize2,
  Ruler,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import { AppLanguage } from '../types';
import { CollectionEdition, FurnitureCollection } from '../data/collectionData';

interface CollectionVersionDetailViewProps {
  collection: FurnitureCollection;
  edition: CollectionEdition;
  currentLanguage: AppLanguage;
  onBack: () => void;
  onSelectEdition: (edition: CollectionEdition) => void;
}

export const CollectionVersionDetailView: React.FC<CollectionVersionDetailViewProps> = ({
  collection,
  edition,
  currentLanguage,
  onBack,
  onSelectEdition,
}) => {
  const [copied, setCopied] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const isVi = currentLanguage === 'VI';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [edition.id]);

  const editionIndex = collection.editions.findIndex((item) => item.id === edition.id);
  const previousEdition =
    collection.editions[(editionIndex - 1 + collection.editions.length) % collection.editions.length];
  const nextEdition = collection.editions[(editionIndex + 1) % collection.editions.length];

  const editionNarrative = useMemo(() => {
    const palette = edition.palette.slice(0, 3).join(', ');
    return isVi
      ? `${edition.name} là một phương án phối cảnh của hệ sofa Linear, kết hợp các module chủ đạo với bàn và ghế điểm nhấn để tạo nên một không gian đồng nhất. Bảng màu ${palette} được tuyển chọn nhằm định hình sắc thái riêng cho từng bối cảnh sống.`
      : `${edition.name} is a composed setting from the Linear sofa system, pairing its core modules with accent tables and lounge pieces. The ${palette} palette gives this interior scenario its distinct atmosphere.`;
  }, [edition, isVi]);

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const t = {
    back: isVi ? 'Linear Collection' : 'Linear Collection',
    overview: isVi ? 'TỔNG QUAN PHIÊN BẢN' : 'VERSION OVERVIEW',
    setting: isVi ? 'KHÔNG GIAN PHỐI CẢNH' : 'CURATED SETTING',
    pieces: isVi ? 'SẢN PHẨM TRONG VERSION' : 'PIECES IN THIS VERSION',
    palette: isVi ? 'BẢNG MÀU & VẬT LIỆU' : 'PALETTE & MATERIALS',
    roomSize: isVi ? 'Kích thước phối cảnh' : 'Setting size',
    piecesCount: isVi ? 'Sản phẩm' : 'Pieces',
    presentation: isVi ? 'HỒ SƠ TRÌNH BÀY' : 'PRESENTATION DECK',
    presentationBody: isVi
      ? 'Mở hồ sơ PDF để xem đầy đủ mặt bằng phối cảnh, danh sách sản phẩm và bảng màu của phiên bản này.'
      : 'Open the PDF deck for the complete setting layout, product lineup, and material palette for this version.',
    viewPdf: isVi ? 'XEM PDF' : 'VIEW PDF',
    download: isVi ? 'TẢI XUỐNG' : 'DOWNLOAD',
    next: isVi ? 'Phiên bản tiếp theo' : 'Next version',
    previous: isVi ? 'Phiên bản trước' : 'Previous version',
    share: isVi ? 'Sao chép liên kết' : 'Copy link',
    copied: isVi ? 'Đã sao chép' : 'Copied',
    exploreAnother: isVi ? 'KHÁM PHÁ PHIÊN BẢN KHÁC' : 'EXPLORE ANOTHER VERSION',
    closeImage: isVi ? 'Đóng ảnh' : 'Close image',
  };

  return (
    <div className="w-full bg-[#141414] text-[#e8e8e8] font-manrope pt-[58px] sm:pt-[68px] lg:pt-[104px] pb-28">
      {/* Detail sub-navigation follows the same hierarchy as an interior project. */}
      <div className="w-full border-b border-[#242424] bg-[#161616]/90 backdrop-blur-md sticky top-[58px] sm:top-[68px] lg:top-[104px] z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 h-14 md:h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-[#a0a0a0] hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
            <span className="font-medium">{t.back}</span>
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#202020] border border-[#333] text-[11px] uppercase tracking-[0.16em] text-[#aeb8c2] font-medium">
              {collection.name}
            </span>
            <span className="text-xs text-[#666] uppercase tracking-[0.12em]">{edition.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSelectEdition(previousEdition)}
              className="p-2 rounded-full hover:bg-[#252525] text-[#999] hover:text-white transition-colors cursor-pointer"
              title={t.previous}
              aria-label={t.previous}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectEdition(nextEdition)}
              className="p-2 rounded-full hover:bg-[#252525] text-[#999] hover:text-white transition-colors cursor-pointer"
              title={t.next}
              aria-label={t.next}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={copyLink}
              className="p-2 rounded-full hover:bg-[#252525] text-[#999] hover:text-white transition-colors cursor-pointer"
              title={copied ? t.copied : t.share}
              aria-label={copied ? t.copied : t.share}
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-8 md:pt-14 space-y-20 md:space-y-28">
        {/* 1. Hero / overview */}
        <section className="relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="lg:col-span-7 relative order-2 lg:order-1">
              <div className="relative w-full aspect-[16/10] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                <img
                  src={edition.perspectiveImages[0] || edition.layoutImage}
                  alt={`${collection.name} ${edition.name} perspective`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />
                <button
                  type="button"
                  onClick={() => setLightboxImage(edition.layoutImage)}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Phóng to ảnh' : 'Enlarge view'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative order-1 lg:order-2 flex flex-col justify-center px-2 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full border border-[#444] bg-[#1a1a1a] flex items-center justify-center text-[#aeb8c2]">
                  <span className="font-philosopher text-sm tracking-widest">B+</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#777777]">B+ON</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#aeb8c2]">{collection.eyebrow}</p>
                </div>
              </div>

              <p className="text-[11px] uppercase tracking-[0.28em] text-[#aeb8c2] font-medium">
                {t.overview}
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-light text-white font-philosopher uppercase leading-tight tracking-[0.06em]">
                {edition.name}
              </h1>
              <p className="mt-6 text-sm sm:text-base md:text-[1.05rem] text-[#9e9e9e] font-light leading-relaxed">
                {editionNarrative}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#303030] bg-[#1a1a1a] px-4 py-4">
                  <div className="flex items-center gap-2 text-[#aeb8c2]">
                    <Ruler className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-[0.16em]">{t.roomSize}</span>
                  </div>
                  <p className="mt-2 text-sm text-white">{edition.roomSize}</p>
                </div>
                <div className="rounded-xl border border-[#303030] bg-[#1a1a1a] px-4 py-4">
                  <div className="flex items-center gap-2 text-[#aeb8c2]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-[0.16em]">{t.piecesCount}</span>
                  </div>
                  <p className="mt-2 text-sm text-white">{edition.productLineup.length}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={edition.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3 bg-[#aeb8c2] hover:bg-white text-[#141414] font-medium text-xs uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(174,184,194,0.25)] inline-flex items-center gap-2"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{t.viewPdf}</span>
                </a>
                <a
                  href={edition.pdfUrl}
                  download
                  className="px-6 py-3 border border-[#444] hover:border-white text-[#d0d0d0] hover:text-white text-xs uppercase tracking-[0.16em] rounded-full transition-colors inline-flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.download}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Project-style narrative / setting section */}
        <section className="w-full">
          <div className="rounded-2xl md:rounded-[1.75rem] bg-[#181818] border border-[#2c2c2c] p-6 sm:p-10 md:p-14 lg:p-16 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#222] border border-[#383838] text-[#aeb8c2] text-[10px] uppercase tracking-[0.25em] font-medium rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.setting}</span>
                </div>
                <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-light text-white font-philosopher uppercase tracking-wide">
                  {collection.name} / {edition.name}
                </h2>
                <p className="mt-6 text-sm sm:text-base text-[#a0a0a0] font-light leading-relaxed">
                  {isVi
                    ? 'Các module Linear được sắp đặt theo tỷ lệ của không gian, tạo nên một bố cục mở nhưng có điểm tựa. Bàn phụ, bàn trà và ghế lounge hoàn thiện trải nghiệm sử dụng mà không làm mất đi sự tĩnh tại của tổng thể.'
                    : 'Linear modules are arranged to the proportions of the room, creating an open composition with a clear architectural anchor. Accent tables and lounge seating complete the experience without disturbing the calm of the whole.'}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {edition.productLineup.slice(0, 5).map((product) => (
                    <span
                      key={product}
                      className="px-3 py-1.5 rounded-full border border-[#3a3a3a] text-xs text-[#b4b4b4]"
                    >
                      {product}
                    </span>
                  ))}
                  {edition.productLineup.length > 5 && (
                    <span className="px-3 py-1.5 rounded-full border border-[#3a3a3a] text-xs text-[#777777]">
                      +{edition.productLineup.length - 5}
                    </span>
                  )}
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl md:rounded-2xl border border-[#353535] bg-[#202020] group">
                  <img
                    src={edition.perspectiveImages[1] || edition.layoutImage}
                    alt={`${collection.name} ${edition.name} second perspective`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Furniture in the version */}
        <section className="w-full space-y-8 md:space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white font-philosopher uppercase tracking-[0.08em]">
              {t.pieces}
            </h2>
            <div className="w-12 h-0.5 bg-[#aeb8c2]/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {edition.productLineup.map((product, index) => (
              <div
                key={`${product}-${index}`}
                className="group rounded-2xl border border-[#2c2c2c] bg-[#191919] p-5 sm:p-6 hover:border-[#555555] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] text-[#6f6f6f] tracking-[0.2em]">0{index + 1}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#aeb8c2] transition-colors" />
                </div>
                <h3 className="mt-8 text-lg sm:text-xl text-white font-philosopher uppercase tracking-wide group-hover:text-[#aeb8c2] transition-colors">
                  {product}
                </h3>
                <p className="mt-2 text-xs text-[#777777] uppercase tracking-[0.15em]">
                  {product.toLowerCase().includes('linear')
                    ? isVi
                      ? 'Module sofa system'
                      : 'Sofa system module'
                    : isVi
                      ? 'Accent furniture'
                      : 'Accent furniture'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Palette / materials */}
        <section className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 overflow-hidden rounded-2xl md:rounded-[1.75rem] border border-[#2c2c2c] bg-[#191919]">
              <img
                src={edition.materialsImage}
                alt={`${collection.name} ${edition.name} palette`}
                className="w-full h-full min-h-[280px] object-cover"
              />
            </div>
            <div className="lg:col-span-5 rounded-2xl md:rounded-[1.75rem] border border-[#2c2c2c] bg-gradient-to-b from-[#1e1e1e] to-[#161616] p-7 sm:p-10 md:p-12 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#aeb8c2] font-medium">
                {t.palette}
              </p>
              <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-light text-white font-philosopher uppercase tracking-wide">
                {edition.name}
              </h2>
              <p className="mt-5 text-sm text-[#9b9b9e] font-light leading-relaxed">
                {isVi
                  ? 'Bảng màu và vật liệu được trích xuất từ hồ sơ Linear do B+ON cung cấp, giữ nguyên tên gọi để thuận tiện đối chiếu khi tư vấn.'
                  : 'The palette and materials are transcribed from the B+ON Linear presentation deck, preserving the original names for consultation and specification.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {edition.palette.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-2 rounded-lg bg-[#232323] border border-[#383838] text-xs text-[#c1c1c1]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Presentation deck CTA */}
        <section className="w-full max-w-5xl mx-auto">
          <div className="rounded-2xl md:rounded-[1.75rem] bg-[#181818] border border-[#333333] p-8 sm:p-12 md:p-14 text-center space-y-6 shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#aeb8c2] font-medium">
              {t.presentation}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white font-philosopher uppercase tracking-wide">
              {collection.eyebrow} / {edition.name}
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9b9b9e] font-light leading-relaxed">
              {t.presentationBody}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={edition.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 bg-white hover:bg-[#aeb8c2] text-[#141414] font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all inline-flex items-center gap-2"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{t.viewPdf}</span>
              </a>
              <a
                href={edition.pdfUrl}
                download
                className="px-7 py-3 border border-[#444] hover:border-white text-[#d0d0d0] hover:text-white text-xs uppercase tracking-[0.2em] rounded-full transition-colors inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.download}</span>
              </a>
            </div>
          </div>
        </section>

        {/* 6. Recommended versions */}
        <section className="w-full space-y-8 md:space-y-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white font-philosopher uppercase tracking-wide">
              {t.exploreAnother}
            </h2>
            <button
              type="button"
              onClick={onBack}
              className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#aeb8c2] hover:text-white transition-colors"
            >
              {t.back} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
            {collection.editions
              .filter((item) => item.id !== edition.id)
              .slice(0, 5)
              .map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onSelectEdition(item)}
                  className="text-left group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-[#1a1a1a] border border-white/5">
                    <img
                      src={item.previewImage}
                      alt={`${collection.name} ${item.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.16em] text-white">
                      {item.name}
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </section>
      </main>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label={t.closeImage}
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightboxImage}
            alt={`${collection.name} ${edition.name}`}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
