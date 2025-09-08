'use client';

import { Button } from '@/components/ui/button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
  title: string;
  toggleAriaLabel: string;
  closeAriaLabel: string;
}

export default function TableOfContents({
  items,
  activeId,
  title,
  toggleAriaLabel,
  closeAriaLabel
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile TOC when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Close mobile TOC on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return 'pl-0';
      case 2:
        return 'pl-4';
      default:
        return 'pl-8';
    }
  };

  return (
    <>
      {/* Mobile TOC Button */}
      <div className="xl:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-40 rounded-full bg-background p-3 shadow-lg ring-1 ring-border hover:bg-accent"
          aria-label={toggleAriaLabel}
        >
          <Bars3Icon className="h-6 w-6 text-muted-foreground" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md">
              <div className="flex h-full flex-col bg-background shadow-xl">
                <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                  <h2 className="text-foreground">{title}</h2>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md text-muted-foreground hover:text-foreground"
                    aria-label={closeAriaLabel}
                    variant="ghost"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                  <nav className="space-y-1">
                    {items.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => {
                          scrollToSection(item.id);
                          handleLinkClick();
                        }}
                        className={`block w-full text-left rounded-md px-3 py-2  ${getLevelClass(item.level)} ${activeId === item.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        variant="ghost"
                      >
                        {item.title}
                      </Button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop TOC */}
      <div className="hidden xl:block">
        <div className="sticky top-20 w-64">
          <div className="rounded-lg bg-card p-6 shadow-sm ring-1 ring-border">
            <h2 className="text-foreground mb-4">{title}</h2>
            <nav className="space-y-1">
              {items.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left rounded-md px-3 py-2  ${getLevelClass(item.level)} ${activeId === item.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  variant="ghost"
                >
                  {item.title}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
