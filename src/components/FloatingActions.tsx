import React from 'react';
import { Send, MessageCircle, PhoneCall } from 'lucide-react';
import { AppLanguage } from '../types';

interface FloatingActionsProps {
  currentLanguage: AppLanguage;
  onOpenConsultation: () => void;
  onSelectFurniture: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  currentLanguage,
  onOpenConsultation,
  onSelectFurniture,
}) => {
  const t = {
    VI: {
      selectFurniture: 'Chọn nội thất',
      whatsapp: 'WhatsApp Bpluson',
      telegram: 'Telegram Bpluson',
      chat: 'Tư vấn trực tiếp',
    },
    EN: {
      selectFurniture: 'Select furniture',
      whatsapp: 'WhatsApp Bpluson',
      telegram: 'Telegram Bpluson',
      chat: 'Direct Consultation',
    },
  }[currentLanguage];

  return (
    <aside
      id="floating-action-bar"
      aria-label="Contact channels"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 font-manrope animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      {/* Telegram Button */}
      <a
        id="floating-btn-telegram"
        href="https://t.me/bpluson"
        target="_blank"
        rel="noopener noreferrer"
        title={t.telegram}
        aria-label="Telegram"
        className="w-9 h-9 rounded-full bg-[#202020]/90 hover:bg-[#2c2c2c] text-white flex items-center justify-center border border-white/10 shadow-xl transition-all duration-200 hover:scale-105"
      >
        <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5 text-white" />
      </a>

      {/* Direct Chat Button */}
      <button
        id="floating-btn-chat"
        onClick={onOpenConsultation}
        title={t.chat}
        aria-label="Live Chat"
        className="w-9 h-9 rounded-full bg-[#202020]/90 hover:bg-[#2c2c2c] text-white flex items-center justify-center border border-white/10 shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 text-white" />
      </button>

      {/* WhatsApp Button */}
      <a
        id="floating-btn-whatsapp"
        href="https://wa.me/84931100377"
        target="_blank"
        rel="noopener noreferrer"
        title={t.whatsapp}
        aria-label="WhatsApp"
        className="w-9 h-9 rounded-full bg-[#202020]/90 hover:bg-[#2c2c2c] text-white flex items-center justify-center border border-white/10 shadow-xl transition-all duration-200 hover:scale-105"
      >
        <PhoneCall className="w-4 h-4 text-white" />
      </a>

      {/* "Select furniture" Pill Button as shown in Image 1 & 2 */}
      <button
        id="floating-btn-select-furniture"
        onClick={onSelectFurniture}
        className="px-5 py-2 rounded-full bg-[#202020]/95 hover:bg-[#2a2a2a] text-xs font-normal text-white border border-white/10 shadow-xl transition-all duration-200 hover:scale-102 cursor-pointer whitespace-nowrap"
      >
        {t.selectFurniture}
      </button>
    </aside>
  );
};
