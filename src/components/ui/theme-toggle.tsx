'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Animated sun/moon toggle for switching between light and dark mode.
 * Renders a placeholder during SSR to avoid hydration mismatch.
 */
export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl" disabled aria-label="Cargando tema">
                <Sun className="h-4 w-4" />
            </Button>
        );
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl relative overflow-hidden bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            <Sun className={`h-4 w-4 transition-all duration-500 ${isDark ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
            <Moon className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-0 opacity-0'}`} />
        </Button>
    );
}
