import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaDownload } from 'react-icons/fa';

const Hero = () => {
  const socialLinks = [
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/gopikrishee/" },
    { icon: <FaTwitter />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
    { icon: <FaDownload />, url: "#" },
  ];

  return (
    <section className="bg-white py-12 md:py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Main Grid: 1 column for mobile, 2 columns for medium screens and up */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-4">
          
          {/* Left Side: Text Content (Centered on mobile, left-aligned on desktop) */}
          <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
            <div className="space-y-4">
              <span className="text-lg font-medium tracking-tight text-gray-800 sm:text-xl">
                Hello I'M A
              </span>
              <h1 className="text-5xl font-bold tracking-tighter text-gray-900 sm:text-6xl lg:text-8xl">
                DevOps <span className="text-sky-500/100">Engineer.</span>
              </h1>
            </div>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-800 sm:text-lg md:mt-8">
              Hi, I’m Gopi, a passionate DevOps Engineer based in India.
              Welcome to my portfolio world.
            </p>

            {/* Responsive Social Icons */}
            <div className="mt-8 flex items-center gap-3 sm:gap-4 md:mt-10">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target='_blank'
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/100 text-white shadow-md transition-all hover:-translate-y-1 hover:bg-sky-500/75 sm:h-12 sm:w-12 text-lg"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Illustration (Stacks on top for mobile) */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-full">
              {/* Image with responsive scaling */}
              <img 
                src="heroImage.png" 
                alt="Illustration of UI/UX Designer"
                className="h-auto w-full object-contain"
              />
              {/* Optional: Add a subtle background glow for depth */}
              <div className="absolute inset-0 -z-10 animate-pulse bg-radial from-[#5dbf86]/10 to-transparent blur-3xl"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;