import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import StatsSection from '@/components/stats-section';
import ServicesSection from '@/components/services-section';
import FeaturesSection from '@/components/features-section';
import PricingSection from '@/components/pricing-section';
import LeadForm from '@/components/lead-form';
import CouponsSection from '@/components/coupons-section';
import FleetSection from '@/components/fleet-section';
import ReviewsSection from '@/components/reviews-section';
import BrandsSection from '@/components/brands-section';
import QuotationFeature from '@/components/quotation-dialog';
import FAQSection from '@/components/faq-section';
import LocationFinder from '@/components/location-finder';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/whatsapp-button';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturesSection />
      <PricingSection />
      <LeadForm />
      <CouponsSection />
      <FleetSection />
      <ReviewsSection />
      <BrandsSection />
      <QuotationFeature />
      <FAQSection />
      <LocationFinder />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
