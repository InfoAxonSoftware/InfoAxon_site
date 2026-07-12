import HeroSection from '../components/HeroSection';
import AboutPreview from '../components/AboutPreview';
import ServicesPreview from '../components/ServicesPreview';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import TechStackSection from '../components/TechStackSection';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <Testimonials />
      <TechStackSection />
      <ContactForm />
    </>
  );
}
