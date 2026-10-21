import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal, { SectionHeading } from './Reveal';
import Icon from './Icon';
import { moduleColors } from './Outline';
import { formatPrice, modules, modulesByCode, tiers } from '../data/program';

// Works out the best way to buy the selected modules.
const quote = (selected) => {
    const codes = [...selected];
    if (!codes.length) return null;

    const exact = tiers.find((tier) => tier.modules.length === codes.length && codes.every((code) => tier.modules.includes(code)));
    const allStandalone = codes.every((code) => modulesByCode[code].standalone);
    const separateTotal = codes.reduce((sum, code) => sum + modulesByCode[code].price, 0);

    if (exact) {
        return { packageName: `${exact.code} – ${exact.title}`, label: exact.title, price: exact.price, savings: allStandalone ? separateTotal - exact.price : 0, included: exact.modules };
    }
    if (allStandalone) {
        const names = codes.map((code) => modulesByCode[code].title);
        return { packageName: `Modules: ${codes.join(' + ')}`, label: codes.length === 1 ? names[0] : 'Individual stages', price: separateTotal, savings: 0, included: codes };
    }
    // M4/M5 are only sold in bundles: suggest the cheapest bundle that covers everything picked.
    const fit = tiers
        .filter((tier) => codes.every((code) => tier.modules.includes(code)))
        .sort((a, b) => a.price - b.price)[0];
    return {
        packageName: `${fit.code} – ${fit.title}`,
        label: fit.title,
        price: fit.price,
        savings: 0,
        included: fit.modules,
        note: 'Panel and expert interviews are only available in bundles, so this is the best-value bundle with everything you picked.'
    };
};

const Builder = ({ onSelect }) => {
    const [selected, setSelected] = useState(() => new Set(['M1', 'M2']));
    const result = useMemo(() => quote(selected), [selected]);
    const order = modules.map((module) => module.code);

    const toggle = (code) => {
        setSelected((current) => {
            const next = new Set(current);
            if (next.has(code)) next.delete(code);
            else next.add(code);
            return next;
        });
    };

    return (
        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/5 md:p-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
                <h3 className="font-display text-2xl font-bold text-slate-900">Build your audit</h3>
                <p className="mt-1 text-slate-500">Tap the stages you want. We'll find the best price.</p>
                <div className="mt-6 grid gap-3">
                    {modules.map((module) => {
                        const isOn = selected.has(module.code);
                        const colors = moduleColors[module.color];
                        return (
                            <motion.button
                                key={module.code}
                                type="button"
                                onClick={() => toggle(module.code)}
                                whileTap={{ scale: 0.97 }}
                                aria-pressed={isOn}
                                className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${isOn ? `border-transparent ${colors.soft} ring-2 ${colors.ring}` : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <span className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-white transition-transform ${colors.bg} ${isOn ? 'scale-100' : 'scale-90 opacity-50'}`}>
                                    <Icon name={module.icon} className="h-5 w-5" />
                                </span>
                                <span className="min-w-0 flex-grow">
                                    <span className="block font-semibold text-slate-900">{module.title}</span>
                                    <span className="block text-sm text-slate-500">
                                        {module.standalone ? formatPrice(module.price) : 'Bundle exclusive'}
                                        {module.perk && <span className="ml-2 font-semibold text-emerald-600">· {module.perk}</span>}
                                    </span>
                                </span>
                                <span className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border-2 transition-all ${isOn ? 'border-blue-900 bg-blue-900 text-white' : 'border-slate-300 text-transparent'}`}>
                                    <Icon name="check" className="h-4 w-4" />
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 to-blue-950 p-8 text-white">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/20 blur-2xl" />
                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div
                            key={result.packageName}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Your plan</p>
                            <p className="mt-2 font-display text-2xl font-bold leading-tight">{result.label}</p>
                            <p className="mt-6 font-display text-6xl font-bold">{formatPrice(result.price)}</p>
                            {result.savings > 0 && (
                                <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="mt-3 inline-block rounded-full bg-emerald-400 px-3 py-1 text-sm font-bold text-emerald-950">
                                    You save {formatPrice(result.savings)}
                                </motion.p>
                            )}
                            {result.note && <p className="mt-4 text-sm text-blue-100">{result.note}</p>}
                            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-blue-200">Includes</p>
                            <ul className="mt-3 space-y-2">
                                {[...result.included].sort((a, b) => order.indexOf(a) - order.indexOf(b)).map((code) => (
                                    <li key={code} className="flex items-center gap-2 text-sm">
                                        <span className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-white/15">
                                            <Icon name="check" className="h-3 w-3" />
                                        </span>
                                        <span className="font-medium">{modulesByCode[code].title}</span>
                                        {!selected.has(code) && (
                                            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-300">Added</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ) : (
                        <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative font-display text-xl text-blue-100">
                            Pick at least one stage to see your price.
                        </motion.p>
                    )}
                </AnimatePresence>
                <button
                    type="button"
                    disabled={!result}
                    onClick={() => result && onSelect(result.packageName)}
                    className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-4 font-bold text-blue-950 transition-all hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Register for this plan
                    <Icon name="arrow" className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

const TierCard = ({ tier, index, onSelect }) => (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
        <motion.div
            whileHover={{ y: -8 }}
            className={`relative flex h-full flex-col rounded-3xl p-7 transition-shadow hover:shadow-2xl ${tier.featured ? 'bg-gradient-to-br from-amber-300 to-amber-400 text-blue-950 shadow-xl shadow-amber-400/30' : 'border border-slate-200 bg-white shadow-sm'}`}
        >
            {tier.featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-blue-900 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">Flagship</span>
            )}
            <p className={`text-xs font-bold uppercase tracking-widest ${tier.featured ? 'text-blue-900/70' : 'text-slate-400'}`}>{tier.code}</p>
            <h3 className="mt-2 font-display text-xl font-bold leading-snug">{tier.title}</h3>
            <p className="mt-4 font-display text-4xl font-bold">{formatPrice(tier.price)}</p>
            <div className="mt-5 flex flex-grow flex-wrap content-start gap-2">
                {tier.modules.map((code) => (
                    <span key={code} className={`rounded-full px-3 py-1 text-xs font-semibold ${moduleColors[modulesByCode[code].color].soft} ${moduleColors[modulesByCode[code].color].text}`}>
                        {modulesByCode[code].title}
                    </span>
                ))}
            </div>
            <button
                type="button"
                onClick={() => onSelect(`${tier.code} – ${tier.title}`)}
                className={`mt-6 rounded-full px-5 py-3 text-sm font-bold transition-colors ${tier.featured ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-white'}`}
            >
                Choose {tier.code}
            </button>
        </motion.div>
    </Reveal>
);

const Pricing = ({ onSelect }) => (
    <section id="pricing" className="relative bg-grid py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Pricing" title="Start small or go all in.">
                Take one stage on its own, or bundle them and save. Every plan ends with a clear picture of where you stand.
            </SectionHeading>

            <Reveal className="mb-20">
                <Builder onSelect={onSelect} />
            </Reveal>

            <h3 className="mb-8 text-center font-display text-2xl font-bold text-slate-900">All bundles</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tiers.map((tier, idx) => (
                    <TierCard key={tier.code} tier={tier} index={idx} onSelect={onSelect} />
                ))}
            </div>
        </div>
    </section>
);

export default Pricing;
