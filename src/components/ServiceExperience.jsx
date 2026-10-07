import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import OnePage from './OnePage';
import HR_OD from './services/HR_OD';
import SCM from './services/SCM';
import IPA from './services/IPA';
import PPM from './services/PPM';
import MRBD from './services/MRBD';
import TrainingCategoryPage from './TrainingCategoryPage';
import { trainingCategoriesById } from '../data/trainingPrograms';

const servicePages = {
    '/services/hr-od': HR_OD,
    '/services/scm': SCM,
    '/services/ipa': IPA,
    '/services/ppm': PPM,
    '/services/mrbd': MRBD
};

const transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1]
};

const ServiceExperience = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const reduceMotion = useReducedMotion();
    const panelRef = useRef(null);
    const ServicePage = servicePages[location.pathname];
    const trainingCategoryId = location.pathname.startsWith('/training/')
        ? location.pathname.replace('/training/', '')
        : null;
    const trainingCategory = trainingCategoryId ? trainingCategoriesById[trainingCategoryId] : null;
    const isServiceOpen = Boolean(ServicePage);
    const isTrainingOpen = Boolean(trainingCategory);
    const isExtensionOpen = isServiceOpen || isTrainingOpen;
    const extensionDirection = 1;
    const wasExtensionOpen = useRef(isExtensionOpen);
    const isReturningToMainPage = !isExtensionOpen && wasExtensionOpen.current && navigationType === 'POP';
    const motionTransition = reduceMotion ? { duration: 0 } : transition;

    useEffect(() => {
        wasExtensionOpen.current = isExtensionOpen;
    }, [isExtensionOpen]);

    useEffect(() => {
        if (!isExtensionOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        const previousPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPaddingRight;
        };
    }, [isExtensionOpen]);

    useEffect(() => {
        if (!isExtensionOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                if (location.state?.serviceTransition || location.state?.trainingTransition) {
                    navigate(-1);
                } else {
                    navigate(isTrainingOpen ? '/training' : '/services');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isExtensionOpen, isTrainingOpen, location.state, navigate]);

    useEffect(() => {
        if (isExtensionOpen) {
            window.dispatchEvent(new CustomEvent('phtc:extension-scroll', {
                detail: { progress: 0, direction: extensionDirection }
            }));
            panelRef.current?.focus({ preventScroll: true });
        }
    }, [extensionDirection, isExtensionOpen, location.pathname]);

    const handleExtensionScroll = (event) => {
        const panel = event.currentTarget;
        const scrollableDistance = panel.scrollHeight - panel.clientHeight;
        const progress = scrollableDistance > 0
            ? panel.scrollTop / scrollableDistance
            : 0;

        window.dispatchEvent(new CustomEvent('phtc:extension-scroll', {
            detail: { progress, direction: extensionDirection }
        }));
    };

    const handleBack = () => {
        if (location.state?.serviceTransition || location.state?.trainingTransition) {
            navigate(-1);
        } else {
            navigate(isTrainingOpen ? '/training' : '/services');
        }
    };

    return (
        <div className="relative">
            <Motion.div
                animate={{ x: isExtensionOpen ? `${extensionDirection * -105}vw` : 0 }}
                transition={motionTransition}
                aria-hidden={isExtensionOpen}
                inert={isExtensionOpen}
                className="relative z-10 will-change-transform"
            >
                <OnePage preserveScroll={isReturningToMainPage} />
            </Motion.div>

            <AnimatePresence initial={false}>
                {isExtensionOpen && (
                    <Motion.section
                        key={location.pathname}
                        ref={panelRef}
                        tabIndex={-1}
                        role="region"
                        aria-label={isTrainingOpen ? 'Training programme details' : 'Service details'}
                        onScroll={handleExtensionScroll}
                        initial={{ x: `${extensionDirection * 105}vw` }}
                        animate={{ x: 0 }}
                        exit={{ x: `${extensionDirection * 105}vw` }}
                        transition={motionTransition}
                        className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto overflow-x-hidden bg-transparent outline-none will-change-transform"
                    >
                        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                            {isTrainingOpen ? (
                                <TrainingCategoryPage category={trainingCategory} onBack={handleBack} />
                            ) : (
                                <ServicePage onBack={handleBack} />
                            )}
                        </div>
                    </Motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServiceExperience;
