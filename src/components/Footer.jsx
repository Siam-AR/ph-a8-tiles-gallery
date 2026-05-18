import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-24 overflow-hidden bg-slate-950 text-white">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full" />

      {/* Top Border */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/black-logo.png"
                alt="logo"
                width={42}
                height={42}
                className="rounded-lg bg-white p-1"
              />

              <h2 className="text-2xl font-black tracking-tight">
                tile.gallery
              </h2>
            </div>

            <p className="text-sm leading-7 text-gray-400">
              Discover premium tile collections crafted for modern interiors,
              luxury spaces, and creative aesthetics.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500 transition flex items-center justify-center"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://www.twitter.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-500 transition flex items-center justify-center"
              >
                <FaTwitter size={16} />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-500 transition flex items-center justify-center"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/all-tiles"
                  className="hover:text-cyan-400 transition"
                >
                  All Tiles
                </Link>
              </li>

              <li>
                <Link
                  href="/my-profile"
                  className="hover:text-cyan-400 transition"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Categories
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-pink-400 transition cursor-pointer">
                Ceramic Tiles
              </li>

              <li className="hover:text-pink-400 transition cursor-pointer">
                Marble Designs
              </li>

              <li className="hover:text-pink-400 transition cursor-pointer">
                Modern Patterns
              </li>

              <li className="hover:text-pink-400 transition cursor-pointer">
                Luxury Collections
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm text-gray-400">
              <p>Email: support@tilegallery.com</p>

              <p>Phone: +880 1234-567890</p>

              <p>Location: Dhaka, Bangladesh</p>
            </div>

            <Link
              href="/all-tiles"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 text-sm font-semibold shadow-lg shadow-cyan-500/20"
            >
              Browse Tiles →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          
          <p>
            © {new Date().getFullYear()} tile.gallery — All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>

            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;