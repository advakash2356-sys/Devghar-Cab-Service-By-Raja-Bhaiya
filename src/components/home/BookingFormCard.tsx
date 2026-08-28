import React from 'react';
import BookingForm from '../BookingForm';

interface BookingFormCardProps {
  initialRoute?: string;
}

export default function BookingFormCard({ initialRoute }: BookingFormCardProps) {
  return (
    <section id="book" className="py-12 md:py-16 bg-[#fdfaf5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <BookingForm
          initialDestination={initialRoute || 'Baba Baidyanath Temple (Darshan)'}
        />
      </div>
    </section>
  );
}
