import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Ruler, Sparkles } from 'lucide-react';
import { AppLanguage } from '../types';
import { CollectionEdition, FurnitureCollection } from '../data/collectionData';
import { CollectionVersionDetailView } from './CollectionVersionDetailView';

interface CollectionPageProps {
  collection: FurnitureCollection;
  currentLanguage: AppLanguage;
  onBackToCollections: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  collection,
  currentLanguage,
  onBackToCollections,
}) => {
  const [selectedEdition, setSelectedEdition] = useState<CollectionEdition | null>(null);
  const isVi = currentLanguage === 'VI';

  if (selectedEdition) {
    return (
      <CollectionVersionDetailView
        collection={collection}
        edition={selectedEdition}
        currentLanguage={currentLanguage}
        onBack={() => setSelectedEdition(null)}
        onSelectEdition={setSelectedEdition}
      />
    );
  }

  return (
    <section className="w-full min-h-screen pt-36 sm:pt-44 lg:pt-48 pb-24 bg-[#141414] text-[#e8e8e8] font-manrope">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1920px]">
        <button
          type="button"
          onClick={onBackToCollections}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#9b9b9e] hover:text-white transition-colors font-light cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>{isVi ? 'Tất cả Collection' : 'All collections'}</span>
        </button>

        <div className="max-w-4xl mx-auto text-center pt-14 sm:pt-20 pb-14 sm:pb-20">
          <p className="text-[11px] sm:text-xs text-[#aeb8c2] uppercase tracking-[0.34em] font-medium">
            {collection.eyebrow}
          </p>
          <h1 className="mt-5 text-5xl sm:text-7xl lg:text-8xl font-light tracking-[0.12em] uppercase text-white font-philosopher">
            {isVi ? collection.nameVi : collection.name}
          </h1>
          <p className="max-w-2xl mx-auto mt-7 text-sm sm:text-base md:text-lg text-[#a0a0a0] font-light leading-relaxed">
            {isVi ? collection.descriptionVi : collection.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border-y border-[#2b2b2b] py-4 mb-8">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#aeb8c2]">
            <Sparkles className="w-4 h-4" />
            <span>{isVi ? 'Sáu câu chuyện màu sắc' : 'Six colour stories'}</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#666666]">
            {collection.editions.length} {isVi ? 'phiên bản' : 'editions'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">
          {collection.editions.map((edition) => (
            <button
              type="button"
              key={edition.id}
              onClick={() => setSelectedEdition(edition)}
              className="group text-left bg-[#1a1a1a] border border-[#2b2b2b] rounded-2xl overflow-hidden shadow-2xl hover:border-[#555555] transition-colors cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#252525]">
                <img
                  src={edition.perspectiveImages[0] || edition.previewImage}
                  alt={`${collection.name} ${edition.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/80">
                    {collection.eyebrow}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-white text-[#181818] flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#858585]">
                      {isVi ? 'Phiên bản phối cảnh' : 'Setting version'}
                    </p>
                    <h2 className="mt-2 text-2xl text-white font-philosopher font-normal tracking-wide group-hover:text-[#aeb8c2] transition-colors">
                      {isVi ? edition.nameVi : edition.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#9b9b9e] whitespace-nowrap">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{edition.roomSize}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#777777]">
                    {edition.productLineup.length} {isVi ? 'nhóm sản phẩm' : 'product groups'}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#aeb8c2]">
                    <span>{isVi ? 'Xem chi tiết' : 'Explore detail'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
