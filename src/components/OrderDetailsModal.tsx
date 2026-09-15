import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { AppLanguage } from '../types';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: AppLanguage;
  productContext?: {
    productName?: string;
    sku?: string;
    shade?: string;
    priceFormatted?: string;
  } | null;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  productContext,
}) => {
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [comment, setComment] = useState(
    productContext?.productName
      ? `${productContext.productName}${productContext.shade ? ` (${productContext.shade})` : ''}`
      : ''
  );
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const t = {
    EN: {
      title: 'Discuss the details of your order',
      subtitle:
        'Leave your contact information and we will contact you to discuss the product you like and the details of your order.',
      namePlaceholder: 'Name*',
      phonePlaceholder: 'Telephone*',
      commentPlaceholder: 'Comment',
      consentPart1: 'I consent to the processing of personal data in accordance with ',
      consentLink1: 'the Consent to the processing of personal data',
      consentPart2: ' and confirm that I have read ',
      consentLink2: 'the Privacy Policy',
      consentPart3: '.',
      sendBtn: 'Send',
      sendingBtn: 'Sending...',
      successTitle: 'Thank You!',
      successMsg:
        'Your request has been received. Our personal concierge will contact you shortly to finalize your order details.',
      closeBtn: 'Close',
      fillRequired: 'Please provide both your name and telephone number.',
      agreeRequired: 'Please agree to the personal data processing policy.',
    },
    VI: {
      title: 'Trao đổi chi tiết đơn hàng của bạn',
      subtitle:
        'Để lại thông tin liên hệ và chúng tôi sẽ liên hệ với bạn để trao đổi về sản phẩm bạn yêu thích và chi tiết đơn hàng.',
      namePlaceholder: 'Họ và tên*',
      phonePlaceholder: 'Số điện thoại*',
      commentPlaceholder: 'Ghi chú / Yêu cầu về sản phẩm',
      consentPart1: 'Tôi đồng ý với việc xử lý dữ liệu cá nhân theo ',
      consentLink1: 'Thỏa thuận xử lý dữ liệu cá nhân',
      consentPart2: ' và xác nhận đã đọc ',
      consentLink2: 'Chính sách bảo mật',
      consentPart3: '.',
      sendBtn: 'Gửi yêu cầu',
      sendingBtn: 'Đang gửi...',
      successTitle: 'Cảm ơn quý khách!',
      successMsg:
        'Yêu cầu của quý khách đã được tiếp nhận thành công. Chuyên viên tư vấn nội thất B+ON sẽ liên hệ lại trong thời gian sớm nhất.',
      closeBtn: 'Đóng',
      fillRequired: 'Vui lòng nhập họ tên và số điện thoại.',
      agreeRequired: 'Vui lòng xác nhận đồng ý với điều khoản bảo mật.',
    },
  }[currentLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !telephone.trim()) {
      setErrorMsg(t.fillRequired);
      return;
    }
    if (!consent) {
      setErrorMsg(t.agreeRequired);
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate sending order request to concierge service
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setTelephone('');
        setComment('');
        onClose();
      }, 3500);
    }, 600);
  };

  return (
    <div
      id="order-details-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-manrope select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="order-details-modal-container"
        className="relative w-full max-w-[620px] bg-[#1c1c1e] text-white rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Close Button matching screenshot */}
        <button
          id="order-details-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[#8e8e93] hover:text-white transition-colors cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto border border-white/20">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-philosopher font-normal tracking-wide text-white">
              {t.successTitle}
            </h3>
            <p className="text-sm font-manrope text-[#a0a0a0] max-w-md mx-auto leading-relaxed font-light">
              {t.successMsg}
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-6 px-8 py-2.5 rounded-full bg-[#242e39] hover:bg-[#2d3a48] text-white text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
            >
              {t.closeBtn}
            </button>
          </div>
        ) : (
          <div>
            {/* Header: Title & Subtitle */}
            <div className="text-center mb-8 pr-6 pl-6">
              <div className="flex justify-center mb-3">
                <img
                  src="/bon-logo.png"
                  alt="B+ON"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <h2
                id="order-details-modal-title"
                className="text-2xl sm:text-[32px] font-philosopher font-normal tracking-wide text-white leading-tight"
              >
                {t.title}
              </h2>
              <p
                id="order-details-modal-subtitle"
                className="text-xs sm:text-sm font-manrope text-[#9e9ea3] font-light leading-relaxed mt-3 max-w-[460px] mx-auto"
              >
                {t.subtitle}
              </p>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300 text-xs text-center font-light">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name* Input */}
              <div>
                <input
                  id="order-input-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full h-13 px-4 rounded-xl bg-[#141416] border border-[#2c2c30] text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#4a4a52] transition-colors"
                />
              </div>

              {/* Telephone* Input */}
              <div>
                <input
                  id="order-input-telephone"
                  type="tel"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full h-13 px-4 rounded-xl bg-[#141416] border border-[#2c2c30] text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#4a4a52] transition-colors"
                />
              </div>

              {/* Comment Textarea */}
              <div>
                <textarea
                  id="order-input-comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.commentPlaceholder}
                  className="w-full min-h-[120px] p-4 rounded-xl bg-[#141416] border border-[#2c2c30] text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#4a4a52] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2 flex items-start gap-3">
                <input
                  id="order-checkbox-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded bg-[#141416] border-[#2c2c30] text-[#242e39] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#3a4b5d]"
                />
                <label
                  htmlFor="order-checkbox-consent"
                  className="text-[11.5px] sm:text-xs font-manrope text-[#828287] font-light leading-relaxed cursor-pointer"
                >
                  {t.consentPart1}
                  <a
                    href="#privacy-policy"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="underline hover:text-white transition-colors"
                  >
                    {t.consentLink1}
                  </a>
                  {t.consentPart2}
                  <a
                    href="#privacy-policy"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="underline hover:text-white transition-colors"
                  >
                    {t.consentLink2}
                  </a>
                  {t.consentPart3}
                </label>
              </div>

              {/* Send Button */}
              <div className="pt-3">
                <button
                  id="order-btn-send"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#242e39] hover:bg-[#2b3745] active:bg-[#1f2832] text-[#9eb1c2] hover:text-white font-manrope text-sm font-medium tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? t.sendingBtn : t.sendBtn}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
