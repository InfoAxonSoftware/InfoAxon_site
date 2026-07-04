import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { useData } from '../context/DataContext';

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  const { companyInfo, solutions } = useData();

  return (
    <footer className="relative bg-white dark:bg-dark-950 border-t border-dark-200/60 dark:border-dark-800/50">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center font-bold text-white text-lg">
                IA
              </div>
              <span className="text-xl font-bold text-dark-900 dark:text-white">
                Info<span className="gradient-text">Axon</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              Your trusted technology partner in driving digital transformation. Building the digital foundation for your success.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: companyInfo.socialLinks.facebook },
                { icon: FaLinkedinIn, href: companyInfo.socialLinks.linkedin },
                { icon: FaInstagram, href: companyInfo.socialLinks.instagram },
                { icon: FaTwitter, href: companyInfo.socialLinks.twitter },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-dark-900 dark:text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-dark-900 dark:text-white font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {solutions.slice(0, 5).map((solution) => (
                <li key={solution.id}>
                  <Link
                    to={`/solutions#${solution.id}`}
                    className="text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {solution.shortTitle || solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-dark-900 dark:text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-primary-500 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-dark-400 text-sm">{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-primary-500 flex-shrink-0" size={18} />
                <a href={`tel:${companyInfo.phone}`} className="text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-primary-500 flex-shrink-0" size={18} />
                <a href={`mailto:${companyInfo.email}`} className="text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm">
                  {companyInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-200/60 dark:border-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-400 dark:text-dark-500 text-sm">
            © InfoAxon {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-dark-400 dark:text-dark-500">
            <span className="hover:text-dark-600 dark:hover:text-dark-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-dark-600 dark:hover:text-dark-300 cursor-pointer transition-colors">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
