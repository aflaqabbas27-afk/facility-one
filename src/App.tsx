import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, X, Phone, Mail, MapPin, MessageCircle, ChevronRight,
  Zap, Package, HardHat, Search, Truck, ClipboardList,
  CheckCircle, ArrowRight
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-navy/95 backdrop-blur-md py-3 sm:py-4' : 'bg-transparent py-4 sm:py-6'
      }`}>
        <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg sm:text-xl text-white">Facility One</span>
            <span className="w-2 h-2 rounded-full bg-gold"></span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="nav-link"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-primary text-xs"
            >
              Get a Quote
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-heading font-bold text-white hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('#contact')}
            className="btn-primary mt-4"
          >
            Get a Quote
          </button>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      tl.fromTo(contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-navy flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero_office.jpg" 
          alt="Modern facility"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-[8vw] py-24 sm:py-32">
        <div ref={contentRef} className="max-w-4xl">
          <span className="label-mono mb-4 block">Facility One</span>
          <h1 className="heading-xl text-white mb-4 sm:mb-6">
            ONE PARTNER. <span className="text-gold">EVERY FACILITY NEED COVERED.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
            We cover the full supply and procurement needs of facility management operations. 
            Whatever your scope, we work to fulfil it.
          </p>
          <p className="text-sm sm:text-base text-white/60 mb-8 sm:mb-10 max-w-xl">
            Our goal is to remove the pain of operation teams and procurement teams chasing multiple suppliers. 
            One contact. One invoice. Complete coverage.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="#contact" className="btn-primary w-full sm:w-auto justify-center">
              Get a Quote
            </a>
            <a href="#services" className="flex items-center justify-center sm:justify-start gap-2 text-white/80 hover:text-gold transition-colors text-sm w-full sm:w-auto">
              Explore services <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/50 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                Dubai Based
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                UAE-wide Delivery
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                Fast Response
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const services = [
    { 
      icon: Zap, 
      title: 'MEP Material Supply', 
      desc: 'Electrical, plumbing, HVAC, lighting, consumables, and site materials. Everything your facility needs to keep running.',
      items: ['Electrical supplies', 'Plumbing materials', 'HVAC components', 'Lighting fixtures', 'Site consumables']
    },
    { 
      icon: Package, 
      title: 'Facility Support Supply', 
      desc: 'Daily maintenance materials, emergency requirements, and bulk procurement support for ongoing operations.',
      items: ['Maintenance supplies', 'Emergency stock', 'Bulk orders', 'Regular replenishment']
    },
    { 
      icon: Truck, 
      title: 'Supply Chain Solutions', 
      desc: 'End-to-end supply chain management for all facility needs. Tell us your scope and we deliver.',
      items: ['Vendor management', 'Logistics coordination', 'Inventory planning', 'On-time delivery']
    },
    { 
      icon: Search, 
      title: 'Technical Sourcing', 
      desc: 'Hard-to-find materials, brand-specific procurement, and project-based sourcing for specialized requirements.',
      items: ['Rare components', 'Brand-specific items', 'Custom orders', 'International sourcing']
    },
    { 
      icon: HardHat, 
      title: 'Fitout Works', 
      desc: 'Complete fitout coordination and material supply for renovations, upgrades, and new facility setups.',
      items: ['Material coordination', 'Vendor management', 'Quality assurance', 'Project delivery']
    },
    { 
      icon: ClipboardList, 
      title: 'Custom Requirements', 
      desc: 'Have a unique requirement? Share your scope and we will try our best to deliver. No job too specific.',
      items: ['Bespoke sourcing', 'Specialized materials', 'Urgent requests', 'Consultation support']
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative bg-navy py-16 sm:py-24 lg:py-32">
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        <div className="mb-10 sm:mb-16">
          <span className="label-mono mb-3 sm:mb-4 block">Our Services</span>
          <h2 className="heading-lg text-white mb-4 sm:mb-6">
            WHAT WE <span className="text-gold">DELIVER</span>
          </h2>
          <p className="body-text max-w-2xl">
            Comprehensive material supply and sourcing solutions designed specifically for Facility Management Companies in Dubai.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div key={index} className="card-service group">
              <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-gold mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-2">{service.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-3 sm:mb-4">{service.desc}</p>
              <ul className="space-y-1">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0"></span>
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Us Section
function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const reasons = [
    { title: 'FM Company Focused', desc: 'We exclusively serve Facility Management Companies. We understand your pace, your standards, and your procurement needs.' },
    { title: 'Fast Response', desc: 'Quick quotes, fast sourcing, and reliable delivery timelines. We know delays cost you money.' },
    { title: 'Comprehensive Supply', desc: 'From MEP materials to specialized sourcing. One partner for all your facility supply needs.' },
    { title: 'Transparent Pricing', desc: 'Clear quotes with no hidden costs. Know exactly what you are paying for every item.' },
    { title: 'Quality Assured', desc: 'We source from trusted suppliers and verify quality before delivery to your site.' },
    { title: 'Flexible Approach', desc: 'Tell us your scope and we will find a solution. Standard orders, urgent requests, or custom sourcing.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-navy py-16 sm:py-24 lg:py-32 border-t border-white/5">
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        <div className="mb-10 sm:mb-16">
          <span className="label-mono mb-3 sm:mb-4 block">Why Facility One</span>
          <h2 className="heading-lg text-white mb-4 sm:mb-6">
            WHY FM COMPANIES <span className="text-gold">CHOOSE US</span>
          </h2>
          <p className="body-text max-w-2xl">
            Built specifically for Facility Management Companies. We speak your language and deliver what you need.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="card-service group">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <h3 className="font-heading font-bold text-white text-sm sm:text-base">{reason.title}</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed pl-8">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const steps = [
    { num: '01', title: 'Share Your Scope', desc: 'Tell us what materials or services you need. Send your list, requirements, or project brief.' },
    { num: '02', title: 'We Review & Quote', desc: 'Our team assesses your requirements and provides a competitive, transparent quote quickly.' },
    { num: '03', title: 'We Source & Deliver', desc: 'We procure from our trusted network and deliver to your facility on schedule.' },
    { num: '04', title: 'Ongoing Support', desc: 'Need more? Reorder, adjust, or request new items. We are your long-term supply partner.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative bg-offwhite py-16 sm:py-24 lg:py-32">
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        <div className="mb-10 sm:mb-16">
          <span className="label-mono mb-3 sm:mb-4 block text-navy/70">How It Works</span>
          <h2 className="heading-lg text-navy mb-4 sm:mb-6">
            SIMPLE PROCESS. <span className="text-gold">FAST DELIVERY.</span>
          </h2>
          <p className="text-navy/70 max-w-2xl">
            From scope to delivery, we keep it straightforward and efficient.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <span className="text-3xl sm:text-4xl font-heading font-black text-gold mb-3 sm:mb-4 block">
                {step.num}
              </span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-navy mb-2">{step.title}</h3>
              <p className="text-sm text-navy/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative bg-navy py-16 sm:py-24 lg:py-32">
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20">
          <div ref={leftRef}>
            <span className="label-mono mb-3 sm:mb-4 block">Contact</span>
            <h2 className="heading-lg text-white mb-4 sm:mb-6">
              <span className="text-gold">READY</span> WHEN YOU ARE
            </h2>
            <p className="body-text mb-6 sm:mb-8">
              Tell us what you need. We will respond quickly and get your materials moving.
            </p>

            {submitted ? (
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 sm:p-8 text-center">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gold mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-2">Thank You!</h3>
                <p className="text-white/70 text-sm sm:text-base">We will get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <select
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm text-white text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="" className="bg-navy">What do you need help with?</option>
                  <option value="mep" className="bg-navy">MEP Material Supply</option>
                  <option value="facility" className="bg-navy">Facility Support Supply</option>
                  <option value="supplychain" className="bg-navy">Supply Chain Solutions</option>
                  <option value="sourcing" className="bg-navy">Technical Sourcing</option>
                  <option value="fitout" className="bg-navy">Fitout Works</option>
                  <option value="custom" className="bg-navy">Custom Requirements</option>
                </select>
                <textarea
                  placeholder="Message / Details"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
                  Send My Request <ArrowRight size={16} className="ml-2" />
                </button>
              </form>
            )}
          </div>

          <div ref={rightRef} className="lg:pl-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 sm:p-8 mb-6 sm:mb-8">
              <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-4 sm:mb-6">Direct Contact</h3>
              <div className="space-y-3 sm:space-y-4">
                <a href="https://wa.me/971553142771" className="flex items-center gap-3 sm:gap-4 text-white/80 hover:text-gold transition-colors text-sm sm:text-base">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                  <span>+971 55 314 2771 (WhatsApp)</span>
                </a>
                <a href="tel:+971553142771" className="flex items-center gap-3 sm:gap-4 text-white/80 hover:text-gold transition-colors text-sm sm:text-base">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                  <span>+971 55 314 2771</span>
                </a>
                <a href="mailto:hello@amcts.cloud" className="flex items-center gap-3 sm:gap-4 text-white/80 hover:text-gold transition-colors text-sm sm:text-base">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                  <span>hello@amcts.cloud</span>
                </a>
                <div className="flex items-center gap-3 sm:gap-4 text-white/80 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>

            <div className="relative h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden">
              <img 
                src="/meeting_room.jpg" 
                alt="Meeting room"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-10 sm:py-12 border-t border-white/10" style={{ backgroundColor: '#081a5a' }}>
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 sm:mb-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-heading font-bold text-lg sm:text-xl text-white">Facility One</span>
              <span className="w-2 h-2 rounded-full bg-gold"></span>
            </div>
            <p className="text-white/60 text-sm max-w-sm mb-4">
              Your reliable facility supply partner in Dubai. Serving Facility Management Companies with comprehensive material solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              {['Services', 'Process', 'Contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(`#${item.toLowerCase().replace(' ', '-')}`)}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>+971 55 314 2771</li>
              <li>hello@amcts.cloud</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © 2025 Facility One. All Rights Reserved. Dubai, UAE.
          </p>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span>Facility Management Supply Specialist</span>
            <span className="w-1 h-1 rounded-full bg-gold"></span>
            <span>Dubai Based</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp Button
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971553142771"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[200] bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} className="sm:w-7 sm:h-7" fill="currentColor" />
    </a>
  );
}

// Main App
function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <div className="grain-overlay" />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <ContactSection />
        <Footer />
      </main>
      <WhatsAppButton />
    </div>
  );
}

export default App;
