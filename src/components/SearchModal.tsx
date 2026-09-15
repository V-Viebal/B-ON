import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { getProductName } from '../utils/i18n';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  currentLanguage: 'EN' | 'VI';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  currentLanguage,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const t = {
    EN: {
      placeholder: 'Search furniture by name, SKU, marble, or room...',
      quickSearch: 'Popular Searches',
      noResults: 'No designer furniture objects match your query.',
      viewItem: 'View Details',
    },
    VI: {
      placeholder: 'Tìm kiếm theo tên mẫu, mã SKU, chất liệu đá, da hoặc không gian...',
      quickSearch: 'Tìm kiếm phổ biến',
      noResults: 'Không tìm thấy sản phẩm nào phù hợp với từ khóa.',
      viewItem: 'Xem chi tiết',
    },
  }[currentLanguage];

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        const localizedName = getProductName(p, currentLanguage).toLowerCase();
        return (
          localizedName.includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.materialsDescription.toLowerCase().includes(q) ||
          (p.italianName && p.italianName.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in font-manrope">
      <div className="w-full max-w-2xl bg-[#181818] border border-[#353535] shadow-2xl overflow-hidden">
        {/* Branding Bar */}
        <div className="px-5 py-3 bg-[#141414] border-b border-[#2a2a2a] flex items-center justify-between">
          <img
            src="/bon-logo.png"
            alt="B+ON"
            className="h-5 w-auto object-contain opacity-85"
          />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#868686] font-mono">
            Studia 54 Design
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative p-4 border-b border-[#353535] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#aeb8c2] shrink-0 ml-2" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#868686] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#868686] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills when empty */}
        {!query.trim() && (
          <div className="p-6 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-[#868686] block">
              {t.quickSearch}:
            </span>
            <div className="flex flex-wrap gap-2">
              {(currentLanguage === 'VI'
                ? ['Sofa Aura', 'Đá Calacatta', 'Ghế xoay Bellagio', 'Giường Vittoria', 'Bàn Console', 'Da bò Ý']
                : ['Aura Sofa', 'Calacatta Marble', 'Bellagio Swivel', 'Vittoria Bed', 'Brass Console', 'Nubuck Leather']
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-[#1f1f1f] hover:bg-[#252525] border border-[#353535] text-xs text-[#dcdcdc] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
            {results.length === 0 ? (
              <p className="text-center py-8 text-xs text-[#868686] font-light">{t.noResults}</p>
            ) : (
              results.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="p-3 bg-[#1f1f1f] hover:bg-[#252525] border border-[#353535] hover:border-[#aeb8c2] flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images[0]}
                      alt={getProductName(prod, currentLanguage)}
                      className="w-14 h-12 object-cover bg-[#141414] border border-[#353535]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#868686] uppercase">{prod.sku}</span>
                        <span className="text-[10px] text-[#aeb8c2] uppercase">{prod.collection}</span>
                      </div>
                      <h4 className="text-sm font-light text-white group-hover:text-[#aeb8c2] transition-colors font-philosopher">
                        {getProductName(prod, currentLanguage)}
                      </h4>
                      <p className="text-[11px] text-[#969696] font-mono">
                        {prod.dimensions.width} × {prod.dimensions.depth} cm
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#868686] group-hover:text-[#aeb8c2] transition-colors" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
