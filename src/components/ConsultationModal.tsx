import React, { useState } from 'react';
import { X, Check, Send, Phone, Mail } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: 'VI' | 'EN';
  productContext?: {
    productName?: string;
    sizeLabel?: string;
    swatchName?: string;
    priceFormatted?: string;
  } | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  productContext,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState(
    productContext
      ? currentLanguage === 'VI'
        ? `Yêu cầu đặt mua: ${productContext.productName || ''} (${productContext.sizeLabel || ''}, ${productContext.swatchName || ''})`
        : `Order inquiry: ${productContext.productName || ''} (${productContext.sizeLabel || ''}, ${productContext.swatchName || ''})`
      : ''
  );
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const t = {
    VI: {
      title: 'TƯ VẤN TRỰC TIẾP TỪ BPLUSON®',
      subtitle: 'Để lại thông tin và chuyên viên tư vấn nội thất sẽ liên hệ lại trong vòng 15 phút.',
      nameLabel: 'Họ và tên của bạn',
      contactLabel: 'Số điện thoại / Zalo / Telegram',
      commentLabel: 'Ghi chú về công trình / yêu cầu mẫu (tùy chọn)',
      btn: 'GỬI YÊU CẦU TƯ VẤN',
      success: 'Cảm ơn quý khách! Yêu cầu đã được tiếp nhận. Quản lý dự án sẽ liên hệ trong ít phút.',
      phone: '+84 931100377',
      email: 'sales@bpluson.com',
    },
    EN: {
      title: 'BPLUSON® SPECIALIST CONSULTATION',
      subtitle: 'Leave your contact details and our senior curator will reach out within 15 minutes to discuss your project.',
      nameLabel: 'Your Full Name',
      contactLabel: 'Phone / Telegram / WhatsApp',
      commentLabel: 'Project requirements / models of interest (optional)',
      btn: 'SUBMIT REQUEST',
      success: 'Thank you! Your request has been received. A personal manager will connect with you shortly.',
      phone: '+84 931100377',
      email: 'sales@bpluson.com',
    },
  }[currentLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 3500);
  };

  return (
    <div
      id="consultation-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-manrope select-none"
    >
      <div className="relative w-full max-w-lg bg-[#1f1f1f] border border-[#353535] p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#353535] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#aeb8c2] font-semibold block mb-1">
              Studia 54 Design
            </span>
            <h3 className="text-lg sm:text-xl text-white font-philosopher uppercase flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {currentLanguage === 'VI' ? (
                <>
                  <span>TƯ VẤN TRỰC TIẾP TỪ</span>
                  <img
                    src="/bon-logo.png"
                    alt="B+ON"
                    className="h-5 sm:h-6 w-auto object-contain inline-block my-auto brightness-110"
                  />
                </>
              ) : (
                <>
                  <img
                    src="/bon-logo.png"
                    alt="B+ON"
                    className="h-5 sm:h-6 w-auto object-contain inline-block my-auto brightness-110"
                  />
                  <span>SPECIALIST CONSULTATION</span>
                </>
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#868686] hover:text-white p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="py-8 text-center space-y-3">
            <Check className="w-10 h-10 text-[#aeb8c2] mx-auto" />
            <p className="text-sm text-white font-light leading-relaxed">{t.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-light">
            <p className="text-[#969696] leading-relaxed text-xs">{t.subtitle}</p>

            {productContext?.productName && (
              <div className="p-3 bg-[#161616] border border-[#2e2e2e] rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#888] uppercase tracking-wider block">
                    {currentLanguage === 'VI' ? 'Sản phẩm yêu cầu' : 'Selected Piece'}
                  </span>
                  <span className="text-white font-medium">{productContext.productName}</span>
                  {productContext.sizeLabel && (
                    <span className="text-[#aaa] ml-1.5 font-mono">({productContext.sizeLabel})</span>
                  )}
                  {productContext.swatchName && (
                    <span className="text-[#888] block text-[11px] mt-0.5">{productContext.swatchName}</span>
                  )}
                </div>
                {productContext.priceFormatted && (
                  <span className="text-[#ddd] font-mono text-[11px]">{productContext.priceFormatted}</span>
                )}
              </div>
            )}

            <div>
              <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                {t.nameLabel} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2.5 focus:outline-none focus:border-[#aeb8c2]"
              />
            </div>

            <div>
              <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                {t.contactLabel} *
              </label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2.5 focus:outline-none focus:border-[#aeb8c2]"
              />
            </div>

            <div>
              <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                {t.commentLabel}
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2.5 focus:outline-none focus:border-[#aeb8c2]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#e8e8e8] hover:bg-white text-[#181818] font-medium uppercase tracking-[0.2em] transition-colors mt-2"
            >
              {t.btn}
            </button>

            <div className="pt-2 text-center text-[11px] text-[#767676] flex items-center justify-center gap-4">
              <span>{t.phone}</span>
              <span>•</span>
              <span>{t.email}</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
