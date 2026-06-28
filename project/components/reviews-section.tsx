'use client';

import { useInView } from '@/hooks/use-intersection';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Michael Thompson',
    text: 'Excellent service! My truck AC stopped working before a long trip. They fixed it same day. Very professional team and fair pricing.',
    source: 'Google',
    location: 'Virginia Beach, VA',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    name: 'Sarah Williams',
    text: 'Got my car detailed here. The ceramic coating looks amazing! Staff was friendly and kept me updated throughout the whole process.',
    source: 'Facebook',
    location: 'Chesapeake, VA',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    name: 'James Carter',
    text: 'Free pickup and drop was a game changer. They even sent real-time updates via text. Will never go back to the dealership.',
    source: 'Google',
    location: 'Norfolk, VA',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    name: 'Lisa Rodriguez',
    text: 'Best car spa service in Hampton Roads. Interior detailing was spotless and my SUV looks brand new. Highly recommend!',
    source: 'Yelp',
    location: 'Hampton Roads, VA',
    rating: 4,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    name: 'David Johnson',
    text: 'Saved about 25% compared to the Ford dealer on my F-150 service. Used genuine parts and the work was absolutely top-notch.',
    source: 'Google',
    location: 'Virginia Beach, VA',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    name: 'Emily Harrison',
    text: 'Veteran-owned and it shows — they take pride in their work. Dent repair and paint matching were perfect. Great value.',
    source: 'Facebook',
    location: 'Chesapeake, VA',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
];

export default function ReviewsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="reviews" ref={ref} className="py-20 md:py-28 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            Customer Reviews
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            What Hampton Roads
            <span className="gradient-text"> Drivers Say</span>
          </h2>
          <p className={`text-muted-foreground max-w-xl mx-auto text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            5,000+ verified reviews from Virginia Beach and surrounding areas.
          </p>
          <div className={`flex items-center justify-center gap-1 mt-4 ${inView ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 font-bold text-lg">4.9</span>
            <span className="text-muted-foreground text-sm ml-1">/ 5 from 5,000+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <Card
              key={review.name}
              className={`group border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 bg-white ${inView ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * i + 0.3}s` }}
            >
              <CardContent className="p-6">
                <Quote className="w-7 h-7 text-primary/15 mb-4" />
                <p className="text-foreground/80 text-sm leading-relaxed mb-5">&ldquo;{review.text}&rdquo;</p>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-border'}`} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-border" />
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">{review.source}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
