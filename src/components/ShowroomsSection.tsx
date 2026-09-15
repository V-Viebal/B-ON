import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Check } from 'lucide-react';
import { SHOWROOMS } from '../data/furnitureData';
import { ShowroomLocation, AppLanguage } from '../types';
import { getShowroomCity, getShowroomTitle, getShowroomAddress, getShowroomSchedule } from '../utils/i18n';

interface ShowroomsSectionProps {
  currentLanguage: 'VI' | 'EN';
}

export const ShowroomsSection: React.FC<ShowroomsSectionProps> = ({ currentLanguage }) => {
  const [selectedShowroom, setSelectedShowroom] = useState<ShowroomLocation>(SHOWROOMS[0]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '14:00',
    projectType: 'Private Residence',
    notes: '',
  });

  const t = {
    VI: {
      badge: 'SHOWROOM B+ON®',
      title: 'TRẢI NGHIỆM TRỰC TIẾP TẠI SHOWROOM',
      subtitle: 'Cảm nhận chất liệu da nubuck nguyên tấm, kiểm tra độ êm ái công thái học và trao đổi trực tiếp cùng chuyên viên tư vấn nội thất.',
      bookVisit: 'Đặt lịch tham quan riêng',
      flagship: 'Showroom Flagship',
      consultationTitle: 'Đăng ký tham quan showroom riêng tư',
      nameLabel: 'Họ và tên của bạn',
      phoneLabel: 'Số điện thoại / Zalo / WhatsApp',
      emailLabel: 'Địa chỉ Email',
      dateLabel: 'Ngày hẹn dự kiến',
      timeLabel: 'Khung giờ mong muốn',
      projectTypeLabel: 'Loại hình dự án',
      notesLabel: 'Ghi chú về dự án hoặc các mẫu cần chuẩn bị mẫu vật liệu (tùy chọn)',
      submitBooking: 'Xác nhận lịch hẹn',
      bookingSuccessMsg: 'Cảm ơn bạn! Chuyên viên của B+ON sẽ liên hệ lại trong vòng 15 phút để xác nhận.',
    },
    EN: {
      badge: 'B+ON® SHOWROOMS',
      title: 'EXPERIENCE THE FURNITURE IN PERSON',
      subtitle: 'Touch exquisite nubuck textures, inspect rare veneer inlays, and consult directly with our architectural furniture curators.',
      bookVisit: 'Book Private Visit',
      flagship: 'Flagship Showroom',
      consultationTitle: 'Book Private Architectural Consultation',
      nameLabel: 'Your Full Name',
      phoneLabel: 'Phone / WhatsApp / Telegram',
      emailLabel: 'Email Address',
      dateLabel: 'Preferred Date',
      timeLabel: 'Preferred Time',
      projectTypeLabel: 'Project Type',
      notesLabel: 'Design brief or models of interest (optional)',
      submitBooking: 'Confirm Appointment Request',
      bookingSuccessMsg: 'Thank you! Our concierge will reach out within 15 minutes to confirm your private viewing.',
    },
  }[currentLanguage];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
    }, 3500);
  };

  return (
    <section id="showrooms" className="w-full pt-44 sm:pt-52 lg:pt-56 pb-24 bg-[#181818] text-[#e8e8e8] font-manrope border-b border-[#353535]">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
        {/* Header */}
        <div className="pb-12 border-b border-[#353535]/60 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/bon-logo.png"
              alt="B+ON"
              className="h-6 w-auto object-contain opacity-90"
            />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#aeb8c2] font-semibold">
              {t.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.04em] uppercase text-white font-philosopher mt-2">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-[#969696] font-light mt-2 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-12">
          {SHOWROOMS.map((room) => {
            const city = getShowroomCity(room, currentLanguage);
            const title = getShowroomTitle(room, currentLanguage);
            const address = getShowroomAddress(room, currentLanguage);
            const schedule = getShowroomSchedule(room, currentLanguage);

            return (
              <div
                key={room.id}
                className="bg-[#1f1f1f] border border-[#353535] hover:border-[#454545] flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#181818]">
                    <img
                      src={room.image}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                    />
                    {room.isFlagship && (
                      <span className="absolute top-3 left-3 bg-[#e8e8e8] text-[#181818] text-[9px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1">
                        {t.flagship}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-[#181818]/90 text-white text-xs px-2.5 py-1 font-philosopher">
                      {city}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg text-white font-light font-philosopher">
                      {title}
                    </h3>

                    <div className="space-y-2.5 text-xs text-[#969696] font-light">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#aeb8c2] shrink-0 mt-0.5" />
                        <span>{address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#aeb8c2] shrink-0" />
                        <span>{schedule}</span>
                      </div>
                      <div className="flex items-center gap-2.5 font-mono text-[#dcdcdc]">
                        <Phone className="w-4 h-4 text-[#aeb8c2] shrink-0" />
                        <span>{room.phone}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#b6b6b6]">
                        <Mail className="w-4 h-4 text-[#aeb8c2] shrink-0" />
                        <span>{room.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setSelectedShowroom(room);
                      setBookingModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-transparent hover:bg-[#e8e8e8] hover:text-[#181818] border border-[#353535] hover:border-[#e8e8e8] text-xs uppercase tracking-[0.18em] text-[#dcdcdc] font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.bookVisit}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#1f1f1f] border border-[#353535] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#353535] pb-4">
              <div>
                <span className="text-[10px] text-[#aeb8c2] uppercase tracking-[0.2em]">
                  {selectedShowroom.title}
                </span>
                <h3 className="text-xl text-white font-philosopher mt-0.5">
                  {t.consultationTitle}
                </h3>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="text-[#868686] hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 bg-[#181818] border border-[#353535] text-center space-y-3 animate-in fade-in">
                <Check className="w-8 h-8 text-[#aeb8c2] mx-auto" />
                <p className="text-sm text-[#e8e8e8] leading-relaxed">
                  {t.bookingSuccessMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-light">
                <div>
                  <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                    {t.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2 focus:outline-none focus:border-[#aeb8c2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2 focus:outline-none focus:border-[#aeb8c2]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                      {t.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2 focus:outline-none focus:border-[#aeb8c2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                      {t.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2 focus:outline-none focus:border-[#aeb8c2]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                      {t.timeLabel}
                    </label>
                    <select
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2 focus:outline-none focus:border-[#aeb8c2]"
                    >
                      <option value="11:00">11:00</option>
                      <option value="13:00">13:00</option>
                      <option value="15:00">15:00</option>
                      <option value="17:00">17:00</option>
                      <option value="19:00">19:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#969696] uppercase tracking-wider text-[10px] mb-1">
                    {t.notesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full bg-[#181818] border border-[#353535] text-white px-3 py-2 focus:outline-none focus:border-[#aeb8c2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#e8e8e8] hover:bg-white text-[#181818] font-medium uppercase tracking-[0.2em] transition-colors mt-2"
                >
                  {t.submitBooking}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
