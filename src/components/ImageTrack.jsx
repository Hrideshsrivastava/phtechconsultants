import React, { useRef, useEffect } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';

// Import images statically
import img1 from '../assets/group pictures/DSCN4468.JPG';
import img2 from '../assets/group pictures/Employment officer Trg IIFT16may2017.jpg';
import img3 from '../assets/group pictures/IIFT employment officer IMG_20170523_110032.jpg';
import img4 from '../assets/group pictures/IMG-20190704-WA0069.jpg';
import img5 from '../assets/group pictures/IMG-20190704-WA0083.jpg';
import img6 from '../assets/group pictures/IMG_20171007_142227.jpg';
import img7 from '../assets/group pictures/IMG_20180111_102430.jpg';
import img8 from '../assets/group pictures/IMG_20180111_153006.jpg';
import img9 from '../assets/group pictures/Photo from vivekksi.jpg';
import img10 from '../assets/group pictures/VMLG 27-11-2017.jpg';

// We use exactly the original 10 images to perfectly maintain the original parallax ratio.
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const ImageTrack = ({ extensionSide = null }) => {
  const trackRef = useRef(null);
  const targetExtensionOffsetRef = useRef(0);
  const currentExtensionOffsetRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!extensionSide) {
      targetExtensionOffsetRef.current = 0;
    }
  }, [extensionSide]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let targetPercentage = 0;
    let currentPercentage = 0;
    let rafId;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      targetPercentage = scrollFraction * -100;
    };

    const handleExtensionScroll = (event) => {
      const progress = Math.max(0, Math.min(event.detail?.progress ?? 0, 1));
      const direction = event.detail?.direction === 1 ? 1 : -1;
      // This offset belongs only to the open extension panel. It eases back to zero
      // when the panel closes, revealing the untouched main-page position.
      targetExtensionOffsetRef.current = progress * -24 * direction;
    };

    const animate = () => {
      // Linear interpolation (lerp) for buttery smooth trailing effect
      currentPercentage += (targetPercentage - currentPercentage) * 0.06;
      currentExtensionOffsetRef.current += (
        targetExtensionOffsetRef.current - currentExtensionOffsetRef.current
      ) * 0.06;

      const combinedPercentage = currentPercentage + currentExtensionOffsetRef.current;

      // Stop updating DOM if it's very close to target to save CPU
      if (
        Math.abs(targetPercentage - currentPercentage) > 0.01 ||
        Math.abs(targetExtensionOffsetRef.current - currentExtensionOffsetRef.current) > 0.01
      ) {
          track.style.transform = `translate(${combinedPercentage}%, -50%)`;

          for(const image of track.getElementsByClassName("gallery-image")) {
            image.style.objectPosition = `${100 + combinedPercentage}% center`;
          }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('phtc:extension-scroll', handleExtensionScroll);
    
    // Trigger once on mount to set initial position immediately without lerp delay
    handleScroll();
    currentPercentage = targetPercentage;
    track.style.transform = `translate(${currentPercentage}%, -50%)`;
    for(const image of track.getElementsByClassName("gallery-image")) {
      image.style.objectPosition = `${100 + currentPercentage}% center`;
    }
    
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('phtc:extension-scroll', handleExtensionScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-slate-50">
      <Motion.div
        className="absolute inset-0"
        animate={{
          x: extensionSide === 'right'
            ? '-28vw'
            : extensionSide === 'left'
              ? '28vw'
              : '0vw'
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-[4vmin] absolute left-1/2 top-1/2 select-none w-max"
          style={{ transform: 'translate(0%, -50%)' }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              className="gallery-image shrink-0 w-[60vmin] md:w-[45vmin] h-[50vmin] md:h-[60vmin] object-cover rounded-2xl opacity-25 mix-blend-multiply shadow-xl"
              style={{ objectPosition: '100% center' }}
              src={src}
              draggable="false"
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              alt={`Gallery image ${index + 1}`}
            />
          ))}
        </div>
      </Motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-slate-50/80"></div>
    </div>
  );
};

export default ImageTrack;
