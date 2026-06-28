'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone, Clock } from 'lucide-react';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat bubble */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-72 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-emerald-500 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Ace Automotive</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse" />
                    <p className="text-white/80 text-xs">Typically replies instantly</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm border border-gray-100 mb-4">
              <p className="text-sm text-gray-800 leading-relaxed">
                Hi! Welcome to Ace Automotive Virginia Beach. How can we help you today?
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Ace Automotive · now</p>
            </div>
            <p className="text-xs text-gray-500 text-center mb-3">Choose an option or message us:</p>
            <div className="space-y-2">
              {[
                'Book a Service Appointment',
                'Get a Price Estimate',
                'Check Service Status',
                'Ask a Question',
              ].map((option) => (
                <a
                  key={option}
                  href={`https://wa.me/17574161901?text=${encodeURIComponent(`Hi! I'd like to: ${option}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-medium px-4 py-2.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  {option}
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Mon–Fri 8am–6pm</span>
            </div>
            <a href="tel:7574161901" className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
              <Phone className="w-3 h-3" />
              Call Instead
            </a>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center relative"
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">1</span>
          </>
        )}
      </button>
    </div>
  );
}
