import React, { useState } from 'react';
import { X, Trash2, Download, Send, Check, Heart, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { getProductName } from '../utils/i18n';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  currentLanguage: 'EN' | 'VI';
  onSelectProduct?: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveProduct,
  onClearAll,
  currentLanguage,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectCity: '',
    deliveryRequired: true,
  });

  const getQty = (id: string) => quantities[id] || 1;
  const updateQty = (id: string, delta: number) => {
    const next = Math.max(1, getQty(id) + delta);
    setQuantities((prev) => ({ ...prev, [id]: next }));
  };

  const t = {
    EN: {
      title: 'Project Specification Board',
      subtitle: 'Items curated for your architectural interior dossier.',
      emptyTitle: 'Your Project Board is Empty',
      emptySubtitle: 'Explore the collections and add furniture objects to request pricing and finish samples.',
      itemsCount: 'Items in dossier',
      exportPdf: 'Export Specification Sheet (PDF)',
      exportSuccess: 'Specification dossier exported successfully',
      sendInquiry: 'Submit Project Request to B+ON Concierge',
      nameLabel: 'Contact Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp',
      cityLabel: 'Project Location / City',
      submitBtn: 'Send Dossier for Quotation',
      clearAll: 'Clear Board',
      successTitle: 'Specification Request Submitted',
      successMsg: 'Our private project manager will calculate the trade quote, production timeline, and coordinate material swatches with you within 24 hours.',
    },
    VI: {
      title: 'Hồ Sơ Dự Án & Bảng Dự Toán',
      subtitle: 'Các sản phẩm đã chọn cho hồ sơ thiết kế nội thất.',
      emptyTitle: 'Chưa có sản phẩm nào trong hồ sơ',
      emptySubtitle: 'Khám phá bộ sưu tập và chọn các mẫu ưng ý để nhận báo giá dự toán và bộ khay mẫu vật liệu.',
      itemsCount: 'Số lượng vật phẩm',
      exportPdf: 'Xuất Bảng Dự Toán Kỹ Thuật (PDF)',
      exportSuccess: 'Đã xuất file bảng dự toán kỹ thuật thành công',
      sendInquiry: 'Gửi Hồ Sơ Tới Ban Quản Lý Dự Án B+ON',
      nameLabel: 'Tên người liên hệ',
      emailLabel: 'Địa chỉ Email',
      phoneLabel: 'Số điện thoại / Zalo',
      cityLabel: 'Địa điểm công trình / Thành phố',
      submitBtn: 'Gửi Yêu Cầu Báo Giá & Mẫu Vật Liệu',
      clearAll: 'Xóa toàn bộ',
      successTitle: 'Đã gửi yêu cầu hồ sơ dự án',
      successMsg: 'Quản lý dự án của B+ON sẽ lập bảng báo giá, tiến độ sản xuất và điều phối gửi mẫu vật liệu cho bạn trong vòng 24 giờ.',
    },
  }[currentLanguage];

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  const handleExportPdf = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-md animate-in fade-in font-manrope text-[#e8e8e8]">
      <div className="w-full max-w-xl bg-[#181818] border-l border-[#353535] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#353535] flex items-center justify-between">
          <div className="space-y-2">
            <img
              src="/bon-logo.png"
              alt="B+ON"
              className="h-5 w-auto object-contain"
            />
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#aeb8c2] fill-current" />
                <h3 className="text-base sm:text-lg font-light text-white font-philosopher uppercase tracking-wider">
                  {t.title}
                </h3>
              </div>
              <p className="text-xs text-[#969696] font-light mt-0.5">
                {wishlistProducts.length} {t.itemsCount}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#868686] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <Heart className="w-12 h-12 text-[#353535] mx-auto" />
              <h4 className="text-base text-white font-medium">{t.emptyTitle}</h4>
              <p className="text-xs text-[#969696] max-w-sm mx-auto leading-relaxed">
                {t.emptySubtitle}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#969696] pb-2 border-b border-[#353535]">
                <span className="uppercase tracking-wider">Configured Objects</span>
                <button
                  onClick={onClearAll}
                  className="hover:text-white transition-colors uppercase tracking-wider text-[11px]"
                >
                  {t.clearAll}
                </button>
              </div>

              {wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 bg-[#1f1f1f] border border-[#353535] flex gap-4 items-center justify-between"
                >
                  <div
                    onClick={() => {
                      if (onSelectProduct) {
                        onClose();
                        onSelectProduct(prod);
                      }
                    }}
                    className="flex items-center gap-3 min-w-0 cursor-pointer group"
                  >
                    <img
                      src={prod.images[0]}
                      alt={getProductName(prod, currentLanguage)}
                      className="w-16 h-14 object-cover bg-[#141414] border border-[#353535] shrink-0 group-hover:border-white transition-colors"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-[#868686] uppercase tracking-wider font-mono">{prod.sku}</p>
                      <h4 className="text-sm font-light text-white truncate font-philosopher group-hover:text-[#aeb8c2] transition-colors">
                        {getProductName(prod, currentLanguage)}
                      </h4>
                      <p className="text-[11px] text-[#969696] font-mono">
                        {prod.dimensions.width} × {prod.dimensions.depth} × {prod.dimensions.height} cm
                      </p>
                    </div>
                  </div>

                  {/* Qty & Delete */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center border border-[#353535] bg-[#141414]">
                      <button
                        onClick={() => updateQty(prod.id, -1)}
                        className="p-1 text-[#969696] hover:text-white transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono text-white">{getQty(prod.id)}</span>
                      <button
                        onClick={() => updateQty(prod.id, 1)}
                        className="p-1 text-[#969696] hover:text-white transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveProduct(prod.id)}
                      className="p-1.5 text-[#868686] hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Inquiry Form */}
              <div className="pt-4 border-t border-[#353535] space-y-4">
                {inquirySubmitted ? (
                  <div className="p-5 bg-green-950/40 border border-green-700/50 space-y-2 text-center">
                    <Check className="w-6 h-6 text-green-400 mx-auto" />
                    <h5 className="text-sm font-medium text-white uppercase tracking-wider">
                      {t.successTitle}
                    </h5>
                    <p className="text-xs text-green-200 leading-relaxed font-light">
                      {t.successMsg}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendInquiry} className="space-y-3 text-xs font-light">
                    <p className="text-xs uppercase tracking-wider text-[#aeb8c2] font-semibold">
                      {t.sendInquiry}
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder={t.nameLabel + ' *'}
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className="w-full bg-[#141414] border border-[#353535] px-3 py-2 text-white focus:outline-none focus:border-[#aeb8c2]"
                      />
                      <input
                        type="email"
                        required
                        placeholder={t.emailLabel + ' *'}
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className="w-full bg-[#141414] border border-[#353535] px-3 py-2 text-white focus:outline-none focus:border-[#aeb8c2]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        placeholder={t.phoneLabel + ' *'}
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full bg-[#141414] border border-[#353535] px-3 py-2 text-white focus:outline-none focus:border-[#aeb8c2]"
                      />
                      <input
                        type="text"
                        placeholder={t.cityLabel}
                        value={inquiryForm.projectCity}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, projectCity: e.target.value })}
                        className="w-full bg-[#141414] border border-[#353535] px-3 py-2 text-white focus:outline-none focus:border-[#aeb8c2]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#e8e8e8] hover:bg-white text-[#181818] text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.submitBtn}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-[#353535] bg-[#141414] space-y-2">
          {exportNotice && (
            <p className="text-xs text-green-400 text-center flex items-center justify-center gap-1.5 pb-1">
              <Check className="w-3.5 h-3.5" />
              <span>{t.exportSuccess}</span>
            </p>
          )}
          <button
            onClick={handleExportPdf}
            disabled={wishlistProducts.length === 0}
            className="w-full py-3 bg-transparent hover:bg-[#e8e8e8] hover:text-[#181818] disabled:opacity-30 border border-[#353535] hover:border-[#e8e8e8] text-xs uppercase tracking-wider text-[#dcdcdc] font-medium flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.exportPdf}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
