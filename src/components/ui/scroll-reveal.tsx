'use client';

import { type ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'none';

interface ScrollRevealProps {
    children: ReactNode;
    /** Animation direction. Default: 'up' */
    direction?: RevealDirection;
    /** Delay in ms before animation starts. Default: 0 */
    delay?: number;
    /** Animation duration in ms. Default: 700 */
    duration?: number;
    /** Additional CSS classes */
    className?: string;
    /** HTML tag to render. Default: 'div' */
    as?: keyof JSX.IntrinsicElements;
    /** IntersectionObserver threshold. Default: 0.15 */
    threshold?: number;
    /** Stagger index for cascading animations (multiplied by 100ms) */
    stagger?: number;
}

const directionStyles: Record<RevealDirection, { initial: string; visible: string }> = {
    up: {
        initial: 'translate-y-8 opacity-0',
        visible: 'translate-y-0 opacity-100',
    },
    down: {
        initial: '-translate-y-8 opacity-0',
        visible: 'translate-y-0 opacity-100',
    },
    left: {
        initial: 'translate-x-8 opacity-0',
        visible: 'translate-x-0 opacity-100',
    },
    right: {
        initial: '-translate-x-8 opacity-0',
        visible: 'translate-x-0 opacity-100',
    },
    zoom: {
        initial: 'scale-[0.92] opacity-0',
        visible: 'scale-100 opacity-100',
    },
    none: {
        initial: 'opacity-0',
        visible: 'opacity-100',
    },
};

export function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 700,
    className,
    as: Tag = 'div',
    threshold = 0.15,
    stagger,
}: ScrollRevealProps) {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });

    const styles = directionStyles[direction];
    const totalDelay = delay + (stagger ?? 0) * 100;

    const Component = Tag as any;

    return (
        <Component
            ref={ref}
            className={cn(
                'transition-all ease-out will-change-[transform,opacity]',
                isVisible ? styles.visible : styles.initial,
                className
            )}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${totalDelay}ms`,
            }}
        >
            {children}
        </Component>
    );
}
