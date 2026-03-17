import LandingNavbar from '../components/landing/LandingNavbar';
import Hero          from '../components/landing/Hero';
import Features      from '../components/landing/Features';
import HowItWorks    from '../components/landing/HowItWorks';
import Benefits      from '../components/landing/Benefits';
import CTA           from '../components/landing/CTA';
import Footer        from '../components/landing/Footer';

const Home = () => (
  <div className="min-h-screen bg-white overflow-x-hidden">
    <LandingNavbar />
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <CTA />
    </main>
    <Footer />
  </div>
);

export default Home;
