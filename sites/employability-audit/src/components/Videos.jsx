import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal, { SectionHeading } from './Reveal';
import Icon from './Icon';
import { videos } from '../data/program';

// Shows the thumbnail first and only loads the YouTube player on click, keeping the page fast.
const VideoCard = ({ video, large = false }) => {
    const [playing, setPlaying] = useState(false);

    return (
        <div className={`group relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl ${large ? 'aspect-video lg:row-span-2 lg:aspect-auto lg:min-h-[28rem]' : 'aspect-video'}`}>
            {playing ? (
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 h-full w-full text-left" aria-label={`Play video: ${video.title}`}>
                    <img
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        onError={(event) => { event.currentTarget.style.display = 'none'; }}
                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/30 to-transparent" />
                    <span className="absolute inset-0 grid place-items-center">
                        <span className="relative grid place-items-center">
                            <span className="absolute h-24 w-24 animate-ping rounded-full bg-amber-400/40" />
                            <motion.span
                                whileHover={{ scale: 1.12 }}
                                className={`relative grid place-items-center rounded-full bg-amber-400 text-blue-950 shadow-2xl ${large ? 'h-24 w-24' : 'h-16 w-16'}`}
                            >
                                <Icon name="play" filled className={large ? 'ml-1 h-10 w-10' : 'ml-1 h-7 w-7'} />
                            </motion.span>
                        </span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-6">
                        <span className="block text-xs font-bold uppercase tracking-widest text-amber-300">{video.caption}</span>
                        <span className={`mt-1 block font-display font-bold text-white ${large ? 'text-3xl' : 'text-xl'}`}>{video.title}</span>
                    </span>
                </button>
            )}
        </div>
    );
};

const Videos = () => {
    const featured = videos.find((video) => video.featured);
    const others = videos.filter((video) => !video.featured);

    return (
        <section id="videos" className="py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading eyebrow="Videos" title="Watch it happen.">
                    Real sessions, real candidates, real pressure. See what the audit feels like before you step in.
                </SectionHeading>
                <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                    <Reveal className="lg:row-span-2">
                        <VideoCard video={featured} large />
                    </Reveal>
                    {others.map((video, idx) => (
                        <Reveal key={video.id} delay={0.1 * (idx + 1)}>
                            <VideoCard video={video} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Videos;
