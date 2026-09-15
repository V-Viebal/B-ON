import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { AppLanguage, PageType } from '../types';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface PageHeaderProps {
  currentLanguage: AppLanguage;
  breadcrumbs: BreadcrumbItem[];
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title: string;
  subtitle?: string;
  highlights?: {
    label: string;
    value?: string;
  }[];
  actions?: React.ReactNode;
  onBack?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  currentLanguage,
  breadcrumbs,
  badge,
  title,
  subtitle,
  highlights,
  actions,
  onBack,
}) => {
  return (
    <div className="w-full bg-[#181818] border-b border-[#2e2e2e] pt-28 sm:pt-32 pb-10 px-4 md:px-8 lg:px-12 select-none">
      <div className="max-w-[1920px] mx-auto">
        {/* Breadcrumbs trail */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <ol className="flex items-center flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[#969696] font-light">
            {breadcrumbs.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-[#454545] select-none">/</span>}
                {item.onClick && !item.active ? (
                  <button
                    onClick={item.onClick}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {idx === 0 && <Home className="w-3.5 h-3.5 text-[#767676]" />}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <span className={item.active ? 'text-[#aeb8c2] font-medium' : 'text-[#858585]'}>
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>

          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-[#858585] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'VI' ? 'Quay lại' : 'Back'}</span>
            </button>
          )}
        </nav>

        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#222222] border border-[#353535] text-[10px] uppercase tracking-[0.25em] text-[#aeb8c2] font-medium rounded-full">
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.06em] text-white font-philosopher leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm md:text-base text-[#9e9e9e] font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Highlights & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:self-end">
            {highlights && highlights.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 bg-[#1f1f1f] border border-[#353535] text-[11px] uppercase tracking-wider text-[#b8b8b8] flex items-center gap-1.5"
                  >
                    {h.value && <span className="text-[#aeb8c2] font-medium">{h.value}</span>}
                    <span>{h.label}</span>
                  </div>
                ))}
              </div>
            )}

            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
