import React, { useState } from 'react';
import { X, Download, Check } from 'lucide-react';

interface CatalogDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: 'EN' | 'VI';
}

export const CatalogDownloadModal: React.FC<CatalogDownloadModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
}) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Interior Designer / Architect');
  const [wantSamples, setWantSamples] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  const t = {
    EN: {
      badge: 'B+ON Official Lookbook 2025/2026',
      title: 'Download Full Furniture Catalogue',
      subtitle:
        'Over 180 pages of architectural photography, dimension drawings, material swatches, and realized Studia 54 interiors.',
      emailLabel: 'Work or Personal Email',
      nameLabel: 'Full Name',
      roleLabel: 'I am a...',
      samplesCheckbox: 'Also send me a physical Tactile Material Sample Box to my address',
      downloadCta: 'Download High-Res PDF (64 MB)',
      successTitle: 'Catalogue Download Initiated',
      successMsg:
        'The B+ON 2025/2026 Lookbook is downloading to your device. A mirror copy with BIM libraries has also been sent to your email.',
    },
    VI: {
      badge: 'Ấn Phẩm Catalogue Chính Thức 2025/2026',
      title: 'Tải Trọn Bộ Catalogue B+ON',
      subtitle:
        'Hơn 180 trang hình ảnh kiến trúc chuẩn mực, bản vẽ kỹ thuật chi tiết, bảng mẫu vật liệu và các công trình thực tế của Studia 54.',
      emailLabel: 'Địa chỉ Email nhận file',
      nameLabel: 'Họ và tên',
      roleLabel: 'Bạn là...',
      samplesCheckbox: 'Gửi kèm hộp mẫu vật liệu thực tế (da, gỗ, đá) đến địa chỉ của tôi',
      downloadCta: 'Tải File PDF Chất Lượng Cao (64 MB)',
      successTitle: 'Đang khởi tạo tải xuống Catalogue',
      successMsg:
        'Bản Catalogue 2025/2026 đang được tải về máy của bạn. Một liên kết dự phòng cùng thư viện BIM cũng đã được gửi đến email đăng ký.',
    },
  }[currentLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadStarted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in font-manrope">
      <div className="relative w-full max-w-lg bg-[#181818] border border-[#353535] p-6 sm:p-8 space-y-6 shadow-2xl text-[#e8e8e8]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#868686] hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-3">
          <img
            src="/bon-logo.png"
            alt="B+ON"
            className="h-6 w-auto object-contain"
          />
          <div>
            <span className="text-[10px] text-[#aeb8c2] uppercase tracking-[0.25em] font-medium block">
              {t.badge}
            </span>
            <h3 className="text-2xl font-light text-white font-philosopher uppercase mt-1">
              {t.title}
            </h3>
          </div>
          <p className="text-xs text-[#969696] leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {downloadStarted ? (
          <div className="p-6 bg-green-950/40 border border-green-700/50 text-center space-y-3 animate-in fade-in">
            <Check className="w-8 h-8 text-green-400 mx-auto" />
            <h4 className="text-sm font-medium text-white uppercase tracking-wider">
              {t.successTitle}
            </h4>
            <p className="text-xs text-green-200 leading-relaxed font-light">
              {t.successMsg}
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-5 py-2 bg-[#1f1f1f] hover:bg-[#252525] border border-[#353535] text-white text-xs uppercase tracking-widest font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-light">
            <div>
              <label className="block text-[#868686] uppercase tracking-wider text-[10px] mb-1">
                {t.nameLabel} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-[#141414] border border-[#353535] text-white px-3.5 py-2.5 focus:outline-none focus:border-[#aeb8c2]"
              />
            </div>

            <div>
              <label className="block text-[#868686] uppercase tracking-wider text-[10px] mb-1">
                {t.emailLabel} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@studio.com"
                className="w-full bg-[#141414] border border-[#353535] text-white px-3.5 py-2.5 focus:outline-none focus:border-[#aeb8c2]"
              />
            </div>

            <div>
              <label className="block text-[#868686] uppercase tracking-wider text-[10px] mb-1">
                {t.roleLabel}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#141414] border border-[#353535] text-white px-3 py-2.5 focus:outline-none focus:border-[#aeb8c2]"
              >
                <option value="Interior Designer / Architect">Architect / Interior Designer</option>
                <option value="Private Homeowner">Private Residence Owner</option>
                <option value="Real Estate Developer">Luxury Real Estate Developer</option>
                <option value="Hospitality Specifier">Hotelier / Hospitality Specifier</option>
              </select>
            </div>

            <div className="pt-1 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="samples-check"
                checked={wantSamples}
                onChange={(e) => setWantSamples(e.target.checked)}
                className="mt-0.5 accent-[#aeb8c2]"
              />
              <label htmlFor="samples-check" className="text-[11px] text-[#969696] leading-snug cursor-pointer">
                {t.samplesCheckbox}
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#e8e8e8] hover:bg-white text-[#181818] font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadCta}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

