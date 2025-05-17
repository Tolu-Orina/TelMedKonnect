import Link from 'next/link';
import { HeartPulse, MessageSquare, Stethoscope, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-blue-50 to-white">
        <nav className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TelMedkonnect</span>
            </div>
            <div className="hidden space-x-6 lg:flex">
              <Link href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </Link>
              <Link href="#partners" className="text-gray-600 hover:text-blue-600">
                Partners
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
            </div>
            <Button className="lg:hidden" variant="ghost">
              Menu
            </Button>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div className="lg:max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Truly Unified Medical Connect Experience
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Secure, HIPAA-compliant telemedicine platform connecting patients with healthcare professionals
              and partner organizations through seamless digital consultations.
            </p>
            <div className="mt-10 flex gap-x-6">
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Healthcare reimagined</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for modern medical care
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <div className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-1">{feature.name}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by leading healthcare organizations
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {partners.map((partner) => (
              <img
                key={partner.name}
                className="col-span-1 max-h-12 w-full object-contain grayscale transition hover:grayscale-0"
                src={partner.logo}
                alt={partner.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8 text-white" />
                <span className="text-xl font-bold text-white">TelMedkonnect</span>
              </div>
              <p className="text-sm text-gray-300">
                Empowering healthcare through secure, accessible telemedicine solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 lg:col-span-2">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-sm text-gray-300 hover:text-white">Privacy</Link></li>
                  <li><Link href="#" className="text-sm text-gray-300 hover:text-white">Terms</Link></li>
                  <li><Link href="#" className="text-sm text-gray-300 hover:text-white">Compliance</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Support</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-sm text-gray-300 hover:text-white">Contact</Link></li>
                  <li><Link href="#" className="text-sm text-gray-300 hover:text-white">FAQ</Link></li>
                  <li><Link href="#" className="text-sm text-gray-300 hover:text-white">Documentation</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} TelMedkonnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    name: 'Secure Messaging',
    description: 'End-to-end encrypted text-based consultations with file sharing capabilities',
    icon: MessageSquare,
  },
  {
    name: 'Medical Compliance',
    description: 'HIPAA & GDPR compliant platform with audit logging and data protection',
    icon: ShieldCheck,
  },
  {
    name: 'Multi-Specialty Care',
    description: 'Connect with specialists across various medical disciplines',
    icon: Stethoscope,
  },
  {
    name: 'Health Monitoring',
    description: 'Integrated vital tracking and health record management',
    icon: HeartPulse,
  },
];

const partners = [
  { name: 'City General Hospital', logo: '/partners/city-hospital.svg' },
  { name: 'MediLab Diagnostics', logo: '/partners/medilab.svg' },
  { name: 'PharmaCare', logo: '/partners/pharmacare.svg' },
  { name: 'Radiology Associates', logo: '/partners/radiology-associates.svg' },
];