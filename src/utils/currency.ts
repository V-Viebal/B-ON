import { Product } from '../types';

export const RUB_TO_VND_RATE = 280;

/**
 * Format a number into Vietnamese Dong currency string.
 * Example: 124435000 -> "124.435.000 VNĐ" (VI) or "124,435,000 VNĐ" (EN)
 */
export function formatVND(
  amount: number,
  options?: { showPrefix?: boolean; lang?: 'VI' | 'EN' }
): string {
  const lang = options?.lang || 'VI';
  const showPrefix = options?.showPrefix ?? true;
  const rounded = Math.round(amount / 1000) * 1000;

  if (lang === 'VI') {
    const formattedNum = rounded.toLocaleString('vi-VN');
    return showPrefix ? `từ ${formattedNum} VNĐ` : `${formattedNum} VNĐ`;
  } else {
    const formattedNum = rounded.toLocaleString('en-US');
    return showPrefix ? `from ${formattedNum} VNĐ` : `${formattedNum} VNĐ`;
  }
}

/**
 * Parse any price representation (raw number, RUB string with ₽, or already formatted VND)
 * and ensure it is rendered cleanly in VNĐ according to user language.
 */
export function parseAndFormatVND(
  rawPrice: string | number | undefined | null,
  lang: 'VI' | 'EN' = 'VI'
): string {
  if (rawPrice === undefined || rawPrice === null || rawPrice === '') {
    return lang === 'VI' ? 'Giá liên hệ' : 'Price on inquiry';
  }

  if (typeof rawPrice === 'number') {
    const vndAmount = rawPrice < 20000000 ? rawPrice * RUB_TO_VND_RATE : rawPrice;
    return formatVND(vndAmount, { showPrefix: true, lang });
  }

  const str = String(rawPrice).trim();

  // If already formatted in VNĐ / VND / đ
  if (str.includes('VNĐ') || str.includes('VND') || str.includes('đ')) {
    if (lang === 'VI') {
      return str.replace(/^from\s+/i, 'từ ');
    } else {
      return str.replace(/^từ\s+/i, 'from ');
    }
  }

  // If contains Ruble symbol or raw digits
  const hasFrom = /from|từ/i.test(str);
  const cleanDigits = str.replace(/[^\d]/g, '');
  const parsedNum = parseInt(cleanDigits, 10);

  if (isNaN(parsedNum) || parsedNum <= 0) {
    return lang === 'VI' ? 'Giá liên hệ' : 'Price on inquiry';
  }

  const vndAmount = parsedNum < 20000000 ? parsedNum * RUB_TO_VND_RATE : parsedNum;
  return formatVND(vndAmount, { showPrefix: hasFrom, lang });
}

/**
 * Get display price for any Product object in VNĐ.
 */
export function getProductPriceDisplay(
  product?: Partial<Product> | null,
  lang: 'VI' | 'EN' = 'VI'
): string {
  if (!product) {
    return lang === 'VI' ? 'Giá liên hệ' : 'Price on inquiry';
  }

  if (lang === 'VI' && product.priceFormattedVi) {
    return product.priceFormattedVi;
  }
  if (lang === 'EN' && product.priceFormattedEn) {
    return product.priceFormattedEn;
  }

  if (product.priceVnd) {
    return formatVND(product.priceVnd, { showPrefix: true, lang });
  }

  if (product.priceFormatted) {
    return parseAndFormatVND(product.priceFormatted, lang);
  }

  if (product.priceRub) {
    return formatVND(product.priceRub * RUB_TO_VND_RATE, { showPrefix: true, lang });
  }

  return lang === 'VI' ? 'Giá liên hệ' : 'Price on inquiry';
}
