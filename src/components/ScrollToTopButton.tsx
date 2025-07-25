"use client";

import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top smoothly
    const scrollToTop = () => {
        // Try multiple scroll methods to ensure it works
        // First try the window
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        
        // Also try document elements as fallback
        if (document.documentElement.scrollTop > 0) {
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        if (document.body.scrollTop > 0) {
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Force fallback for immediate effect if smooth doesn't work
        setTimeout(() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div className="fixed bottom-24 right-8">
                    {/* Pulse ring behind the button */}
                    <div className="absolute inset-0 rounded-full bg-blue-600 dark:bg-blue-500 opacity-75 animate-[pulse_3s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-0 rounded-full bg-blue-600 dark:bg-blue-500 opacity-30 animate-[ping_4s_ease-in-out_infinite]"></div>

                    {/* Actual button */}
                    <Button
                        onClick={scrollToTop}
                        className="relative rounded-full p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-110"
                        size="icon"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </>
    );
};

export default ScrollToTopButton;
