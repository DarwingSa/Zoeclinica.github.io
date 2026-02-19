'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
    /** IntersectionObserver threshold (0-1). Default: 0.15 */
    threshold?: number;
    /** Root margin for triggering earlier/later. Default: '0px 0px -60px 0px' */
    rootMargin?: string;
    /** If true, animation only triggers once. Default: true */
    once?: boolean;
}

/**
 * Hook that detects when an element enters the viewport using IntersectionObserver.
 * Returns a ref to attach to the target element and a boolean indicating visibility.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollAnimationOptions = {}
) {
    const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            });
        },
        [once]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin,
        });

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, handleIntersection]);

    return { ref, isVisible };
}
