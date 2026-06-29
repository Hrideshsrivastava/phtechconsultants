import React, { useRef, useEffect } from 'react';

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

const ImageTrack = () => {
  const trackRef = useRef(null);

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

    const animate = () => {
      // Linear interpolation (lerp) for buttery smooth trailing effect
      currentPercentage += (targetPercentage - currentPercentage) * 0.06;
      
      // Stop updating DOM if it's very close to target to save CPU
      if (Math.abs(targetPercentage - currentPercentage) > 0.01) {
          track.style.transform = `translate(${currentPercentage}%, -50%)`;
          
          for(const image of track.getElementsByClassName("gallery-image")) {
            image.style.objectPosition = `${100 + currentPercentage}% center`;
          }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
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
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-slate-50">
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
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-slate-50/80"></div>
    </div>
  );
};

export default ImageTrack;
