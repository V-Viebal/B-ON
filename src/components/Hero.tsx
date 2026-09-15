import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Download, Box, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { MainCategory } from '../types';

interface HeroProps {
  onExploreCatalog: (cat: MainCategory) => void;
  onOpenCatalogDownload: () => void;
  onOpenCustomizer: () => void;
  onOpen3DLibrary: () => void;
  currentLanguage: 'VI' | 'EN';
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenCatalogDownload,
  onOpenCustomizer,
  onOpen3DLibrary,
  currentLanguage,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const t = {
    VI: {
      tag: 'B+ON TỪ B+FURNITURE — STUDIA 54',
      description:
        'B+ON từ B+Furniture — thương hiệu nội thất cao cấp sáng lập bởi văn phòng kiến trúc danh tiếng thế giới Studia 54. Cốt lõi của các bộ sưu tập là công nghệ Ý, chất lượng hoàn thiện chuẩn mực và ngôn ngữ thiết kế độc bản, hoàn thiện thủ công đến từng chi tiết.',
      watchCatalog: 'XEM BỘ SƯU TẬP',
      downloadCatalog: 'TẢI CATALOGUE',
      models3d: 'Thư viện 3D cho KTS',
      customizer: 'Tùy chỉnh chất liệu',
    },
    EN: {
      tag: 'B+ON BY B+FURNITURE — STUDIA 54',
      description:
        'B+ON by B+Furniture — premium furniture brand founded by the world-renowned architectural bureau Studia 54. At the core of the collections are Italian technologies, flawless craftsmanship, and recognizable signature design perfected by artisan handwork.',
      watchCatalog: 'EXPLORE CATALOG',
      downloadCatalog: 'DOWNLOAD CATALOG',
      models3d: '3D Models for Architects',
      customizer: 'Material Configurator',
    },
  }[currentLanguage];

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-end overflow-hidden select-none bg-[#181818] before:content-[''] before:absolute before:bottom-[-1px] before:left-0 before:z-[5] before:w-full before:h-[55vh] before:bg-gradient-to-b before:from-transparent via-[#181818]/60 before:to-[#181818] before:pointer-events-none"
    >
      {/* Background Video with Authentic FiftyFourms Master Banner */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster="https://media.fiftyfourms.com/photo_1_1_1af374055f.webp"
          className="w-full h-full object-cover object-center brightness-[0.80] contrast-[1.04]"
        >
          <source
            src="https://media.fiftyfourms.com/FF_WEBROLL_1080_2_47af644ded_1_253536a61d.mp4"
            type="video/mp4"
          />
          <picture className="block w-full h-full">
            <source media="(max-width: 768px)" srcSet="https://media.fiftyfourms.com/m_photo_1_1_2c89403b62.webp" />
            <img
              src="https://media.fiftyfourms.com/photo_1_1_1af374055f.webp"
              alt="B+ON Interior"
              className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.05]"
            />
          </picture>
        </video>

        {/* Sound toggle button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-28 md:top-32 right-5 sm:right-8 z-20 p-2.5 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer shadow-lg"
          title={isMuted ? (currentLanguage === 'VI' ? 'Bật âm thanh' : 'Unmute audio') : (currentLanguage === 'VI' ? 'Tắt âm thanh' : 'Mute audio')}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Subtle top shade for header contrast */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Bottom Overlay */}
      <div className="relative z-10 w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px] pb-8 md:pb-12 lg:pb-14">
        <div className="w-full space-y-6 md:space-y-8">
          {/* Giant B+ON Signature Vector Watermark */}
          <div className="w-full opacity-95 hover:opacity-100 transition-opacity">
            <img
              src="/bon-logo.png"
              alt="B+ON"
              className="w-full h-auto max-h-[90px] md:max-h-[140px] lg:max-h-[190px] max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] object-contain object-left pointer-events-none select-none filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Description and Call-to-Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pt-2">
            {/* Description Text */}
            <div className="lg:col-span-8">
              <p className="text-[14px] md:text-[16px] lg:text-[17px] text-[#dcdcdc] font-light leading-relaxed max-w-3xl font-manrope">
                {t.description}
              </p>

              {/* Sub features pill */}
              <div className="flex flex-wrap items-center gap-4 pt-4 text-xs tracking-wider text-[#969696]">
                <button
                  onClick={onOpen3DLibrary}
                  className="hover:text-[#aeb8c2] transition-colors flex items-center gap-1.5"
                >
                  <Box className="w-3.5 h-3.5 text-[#aeb8c2]" />
                  <span>{t.models3d}</span>
                </button>
                <span>•</span>
                <button
                  onClick={onOpenCustomizer}
                  className="hover:text-[#aeb8c2] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#aeb8c2]" />
                  <span>{t.customizer}</span>
                </button>
              </div>
            </div>

            {/* Buttons Group */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-end gap-3.5">
              <button
                id="hero-watch-catalog-btn"
                onClick={() => onExploreCatalog('all')}
                className="px-7 py-3.5 bg-[#e8e8e8] text-[#181818] hover:bg-white font-medium text-xs tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg group"
              >
                <span>{t.watchCatalog}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-download-btn"
                onClick={onOpenCatalogDownload}
                className="px-6 py-3.5 border border-[#454545] hover:border-[#aeb8c2] bg-[#181818]/60 backdrop-blur-md text-[#e8e8e8] hover:text-[#aeb8c2] font-light text-xs tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#aeb8c2]" />
                <span>{t.downloadCatalog}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
