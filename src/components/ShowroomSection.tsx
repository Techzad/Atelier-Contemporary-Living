import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Calendar, Check, X } from 'lucide-react';
import { SHOWROOM_DETAILS } from '../data';

export default function ShowroomSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setIsBookingOpen(false);
      setBookingDate('');
      setBookingTime('');
      setBookingName('');
    }, 4000);
  };

  return (
    <section id="showroom-section" className="py-20 bg-surface-primary border-t border-border-warm/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Showroom visual + custom mock map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[16/10] overflow-hidden bg-stone-100 border border-border-warm rounded-[24px]">
              <img
                src="/src/assets/images/showroom_physical_experience_1786615605324.jpg"
                alt="Atelier London Shoreditch physical furniture showroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-500 hover:scale-101"
              />
            </div>
            
            {/* Elegant designed map component */}
            <div className="bg-bg-warm border border-border-warm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-[24px]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-main">Locate Showroom</h4>
                  <p className="text-xs text-text-secondary mt-0.5 font-light leading-relaxed">
                    {SHOWROOM_DETAILS.address}
                  </p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=84+Great+Eastern+Street+Shoreditch+London"
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-border-warm hover:border-accent-gold hover:text-accent-gold px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-text-main shrink-0 transition-colors rounded-full"
              >
                Open Google Maps
              </a>
            </div>
          </div>

          {/* Showroom Details + Scheduler on Right */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-gold font-bold block mb-2">
                Physical Experience
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-tighter text-text-main leading-tight lg:leading-[1.05] font-sans">
                Visit our Shoreditch Showroom.
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed mt-4">
                We believe you must touch natural solid wood and feel fabric textures to understand the high-end caliber of our craftsmanship. Explore fully configured living rooms, bedrooms, and kitchen setups in Shoreditch with curated consulting specialists.
              </p>
            </div>

            {/* Opening Hours & Contacts block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border-warm/60">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-text-main uppercase tracking-wider">
                  <Clock className="w-4.5 h-4.5 text-accent-gold" />
                  <span>Showroom Hours</span>
                </div>
                <div className="space-y-2 text-xs font-light text-text-secondary">
                  {SHOWROOM_DETAILS.hours.map(hour => (
                    <div key={hour.days} className="flex justify-between border-b border-border-warm/30 pb-1.5">
                      <span className="font-medium">{hour.days}</span>
                      <span>{hour.times}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-text-main uppercase tracking-wider">
                  <Phone className="w-4.5 h-4.5 text-accent-gold" />
                  <span>Reach the Floor</span>
                </div>
                <div className="space-y-2 text-xs font-light text-text-secondary">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{SHOWROOM_DETAILS.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span className="truncate">{SHOWROOM_DETAILS.email}</span>
                  </p>
                  <p className="text-[11px] leading-relaxed text-accent-gold mt-1.5">
                    Consulting is complimentary. No purchase pressure.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-dark-main text-[#F7F5F0] hover:bg-accent-gold text-xs font-semibold uppercase tracking-widest py-4.5 px-8 w-full text-center transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer rounded-full"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Book a Private Showroom Visit</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Private visit Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white border border-border-warm p-6 md:p-8 max-w-md w-full shadow-2xl z-10 rounded-[24px]"
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-text-main transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-wider text-accent-gold font-bold">Complimentary Experience</span>
                <h3 className="text-xl font-semibold text-text-main font-sans mt-1">Book Showroom Consult</h3>
                <p className="text-xs text-text-secondary mt-1 font-light">Choose a date to receive an advisor-led guided showroom layout walkthrough.</p>
              </div>

              {bookingSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-text-main uppercase tracking-wider">Appointment Scheduled</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    We have reserved your slot for <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>. A confirmation calendar invite has been sent to <strong>techseries358@gmail.com</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-text-main font-semibold mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full text-xs p-3.5 border border-border-warm bg-bg-warm focus:outline-none focus:border-accent-gold rounded-full px-5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-text-main font-semibold mb-1.5">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full text-xs p-3.5 border border-border-warm bg-bg-warm focus:outline-none focus:border-accent-gold rounded-full px-5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-text-main font-semibold mb-1.5">Preferred Time</label>
                      <select
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full text-xs p-3.5 border border-border-warm bg-bg-warm focus:outline-none focus:border-accent-gold rounded-full px-5 appearance-none"
                      >
                        <option value="">Select slot</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-dark-main hover:bg-accent-gold text-white text-[11px] font-semibold uppercase tracking-widest py-3.5 mt-2 transition-colors rounded-full"
                  >
                    Confirm Booking
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
