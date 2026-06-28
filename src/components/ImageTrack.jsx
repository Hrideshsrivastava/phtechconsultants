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

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const scrollFraction = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      
      // We map the full page scroll to -100% so that at the very bottom of the page,
      // the track translates fully and the last image is perfectly visible on screen.
      const nextPercentage = scrollFraction * -100;
      
      track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });
      
      for(const image of track.getElementsByClassName("gallery-image")) {
        image.animate({
          // The magic illusion requires this percentage to map 1:1 with the track movement!
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Trigger once on mount to set initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
