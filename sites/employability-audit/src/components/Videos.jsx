import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal, { SectionHeading } from './Reveal';
import Icon from './Icon';
import { videos } from '../data/program';

// Shows the thumbnail first and only loads the YouTube player on click, keeping the page fast.
const VideoCard = ({ video }) => {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="group relative aspect-video overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
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
                                className="relative grid h-20 w-20 place-items-center rounded-full bg-amber-400 text-blue-950 shadow-2xl"
                            >
                                <Icon name="play" filled className="ml-1 h-9 w-9" />
                            </motion.span>
                        </span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-6">
                        <span className="block text-xs font-bold uppercase tracking-widest text-amber-300">{video.caption}</span>
                        <span className="mt-1 block font-display text-2xl font-bold text-white">{video.title}</span>
                    </span>
                </button>
            )}
        </div>
    );
};

const Videos = () => (
    <section id="videos" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Videos" title="Watch it happen.">
                Our trainer running live interviews in front of an audience at public seminars. You'll get the same kind of tough questions and honest feedback in your audit.
            </SectionHeading>
            <div className="grid gap-6 md:grid-cols-2">
                {videos.map((video, idx) => (
                    <Reveal key={video.id} delay={0.1 * idx}>
                        <VideoCard video={video} />
                    </Reveal>
                ))}
            </div>
            <Reveal delay={0.2} className="mx-auto mt-10 max-w-2xl">
                <div className="flex items-start gap-4 rounded-2xl border border-blue-900/10 bg-blue-50 p-5 text-left">
                    <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-blue-900 text-white">
                        <Icon name="shield" className="h-5 w-5" />
                    </span>
                    <p className="text-slate-700">
                        <strong className="text-slate-900">No audience in the real audit.</strong> These videos are from public seminars.
                        In your audit, the group discussion is with other candidates, the panel interview is with our panel, and the expert interview is one-on-one.
                    </p>
                </div>
            </Reveal>
        </div>
    </section>
);

export default Videos;
