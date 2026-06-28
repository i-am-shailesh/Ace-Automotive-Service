'use client';

import { useInView } from '@/hooks/use-intersection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { question: 'How quickly do brake pads wear out in Jaipur traffic?', answer: 'In stop-and-go Jaipur traffic, brake pads typically last 30,000-40,000 km. Heavy traffic and frequent braking accelerate wear. We recommend inspection every 10,000 km and free diagnostics with any service booking.' },
  { question: 'Do you service hybrid cars?', answer: 'Yes! Our certified mechanics are trained in hybrid vehicle maintenance including battery health checks, regenerative braking systems, and electric motor diagnostics. We service all major hybrid models.' },
  { question: 'What underbody protection services do you offer?', answer: 'We provide comprehensive underbody coating and anti-rust treatment that protects against monsoon damage, road salts, and everyday wear. Our coating comes with a 3-year warranty and is suitable for all car types.' },
  { question: 'Can you tune my suspension for better ride quality?', answer: 'Absolutely. We offer custom suspension tuning including shock absorber replacement, spring adjustments, and alignment services. Whether you want a comfortable ride or sportier handling, we can set it up for you.' },
  { question: 'How can I improve my car AC performance?', answer: 'Regular AC servicing is key. We recommend annual AC gas top-up, cabin filter replacement every 15,000 km, and condenser cleaning. Our AC service package includes diagnostics, gas refill, and cooling performance checks.' },
  { question: 'Do you provide service warranty?', answer: 'Yes, all our services come with a minimum 3-month or 5,000 km warranty (whichever comes first). Parts used carry manufacturer warranty. For detailing services like ceramic coating, we offer up to 2-year warranty.' },
];

export default function FAQSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="faq" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>FAQ</span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>Frequently Asked<span className="gradient-text"> Questions</span></h2>
          <p className={`text-muted-foreground text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>Got questions? We have answers.</p>
        </div>
        <div className={`${inView ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-sm transition-all bg-white">
                <AccordionTrigger className="text-left font-semibold hover:text-primary py-5">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
