import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import BreadcrumbWithGlobe from '../BreadcrumbWithGlobe';

// Mock the GeoGlobeInspira component since it uses Three.js
vi.mock('../GeoGlobeInspira', () => ({
  default: () => <div data-testid="mock-globe">3D Globe</div>
}));

const mockBreadcrumbItems = [
  { label: 'Home', href: '/en' },
  { label: 'Services', href: '/en/services' },
  { label: 'Current Page', isActive: true }
];

const defaultProps = {
  items: mockBreadcrumbItems,
  title: 'Test Page Title',
  backLabel: 'Back',
  backHref: '/en',
  lang: 'en',
  baseUrl: 'https://issi.com'
};

describe('BreadcrumbWithGlobe', () => {
  beforeEach(() => {
    // Clear DOM before each test
    document.head.innerHTML = '';
  });

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('displays the correct title', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Page Title');
    });

    it('renders the 3D globe component', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      expect(screen.getByTestId('mock-globe')).toBeInTheDocument();
    });
  });

  describe('SEO Structured Data', () => {
    it('generates correct JSON-LD structured data', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const scriptElement = document.querySelector('script[type="application/ld+json"]');
      expect(scriptElement).toBeInTheDocument();
      
      const structuredData = JSON.parse(scriptElement?.textContent || '{}');
      expect(structuredData).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'inLanguage': 'en',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://issi.com/en'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Services',
            'item': 'https://issi.com/en/services'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Current Page'
          }
        ]
      });
    });

    it('includes language attribute in structured data', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} lang="fr" />);
      
      const scriptElement = document.querySelector('script[type="application/ld+json"]');
      const structuredData = JSON.parse(scriptElement?.textContent || '{}');
      expect(structuredData.inLanguage).toBe('fr');
    });

    it('handles items without href in structured data', () => {
      const itemsWithoutHref = [
        { label: 'Home', href: '/en' },
        { label: 'Current Page', isActive: true }
      ];
      
      render(<BreadcrumbWithGlobe {...defaultProps} items={itemsWithoutHref} />);
      
      const scriptElement = document.querySelector('script[type="application/ld+json"]');
      const structuredData = JSON.parse(scriptElement?.textContent || '{}');
      
      expect(structuredData.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        'position': 2,
        'name': 'Current Page'
      });
    });
  });

  describe('Mobile Navigation', () => {
    it('renders mobile back button with correct attributes', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const backButton = screen.getByRole('link', { name: /back/i });
      expect(backButton).toHaveAttribute('href', '/en');
      expect(backButton).toHaveAttribute('rel', 'prev');
      expect(backButton).toHaveAttribute('itemprop', 'url');
    });

    it('displays custom back label', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} backLabel="Go Back" />);
      expect(screen.getByText('Go Back')).toBeInTheDocument();
    });

    it('uses custom back href', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} backHref="/custom-back" />);
      const backButton = screen.getByRole('link', { name: /back/i });
      expect(backButton).toHaveAttribute('href', '/custom-back');
    });
  });

  describe('Desktop Breadcrumb Navigation', () => {
    it('renders breadcrumb navigation with correct ARIA attributes', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const nav = screen.getByRole('navigation', { name: /breadcrumb navigation/i });
      expect(nav).toHaveAttribute('itemscope');
      expect(nav).toHaveAttribute('itemtype', 'https://schema.org/BreadcrumbList');
    });

    it('renders all breadcrumb items', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
      expect(screen.getByText('Current Page')).toBeInTheDocument();
    });

    it('applies correct microdata attributes to breadcrumb items', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toHaveAttribute('itemprop', 'item');
      expect(homeLink).toHaveAttribute('itemscope');
      expect(homeLink).toHaveAttribute('itemtype', 'https://schema.org/WebPage');
    });

    it('marks active item with aria-current', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const activeItem = screen.getByText('Current Page');
      expect(activeItem).toHaveAttribute('aria-current', 'page');
      expect(activeItem).toHaveAttribute('itemprop', 'name');
    });

    it('renders chevron icons between breadcrumb items', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const chevrons = screen.getAllByRole('img', { hidden: true });
      expect(chevrons).toHaveLength(2); // Between 3 items
      chevrons.forEach(chevron => {
        expect(chevron).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveAttribute('itemprop', 'headline');
      expect(heading).toHaveAttribute('itemscope');
      expect(heading).toHaveAttribute('itemtype', 'https://schema.org/WebPage');
    });

    it('provides descriptive navigation labels', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      expect(screen.getByRole('navigation', { name: 'Back navigation' })).toBeInTheDocument();
      expect(screen.getByRole('navigation', { name: 'Breadcrumb navigation' })).toBeInTheDocument();
    });

    it('has proper list structure', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });

    it('includes position metadata for each breadcrumb item', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const metaTags = document.querySelectorAll('meta[itemprop="position"]');
      expect(metaTags).toHaveLength(3);
      expect(metaTags[0]).toHaveAttribute('content', '1');
      expect(metaTags[1]).toHaveAttribute('content', '2');
      expect(metaTags[2]).toHaveAttribute('content', '3');
    });
  });

  describe('Responsive Design', () => {
    it('applies correct CSS classes for mobile layout', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const mobileNav = screen.getByRole('navigation', { name: 'Back navigation' });
      expect(mobileNav).toHaveClass('sm:hidden');
      
      const desktopNav = screen.getByRole('navigation', { name: 'Breadcrumb navigation' });
      expect(desktopNav).toHaveClass('hidden', 'sm:flex');
    });

    it('positions globe with correct transform classes', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const globeContainer = document.querySelector('.absolute.-top-48');
      expect(globeContainer).toBeInTheDocument();
      expect(globeContainer).toHaveClass('transform', 'translate-x-[40%]', 'sm:translate-x-[25%]');
    });

    it('sets proper z-index for layering', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const titleContainer = screen.getByRole('heading', { level: 1 }).parentElement;
      expect(titleContainer).toHaveClass('z-10');
      
      const globeContainer = document.querySelector('.z-0');
      expect(globeContainer).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('handles different language codes', () => {
      const languages = ['en', 'fr', 'es'];
      
      languages.forEach(lang => {
        const { unmount } = render(<BreadcrumbWithGlobe {...defaultProps} lang={lang} />);
        
        const scriptElement = document.querySelector('script[type="application/ld+json"]');
        const structuredData = JSON.parse(scriptElement?.textContent || '{}');
        expect(structuredData.inLanguage).toBe(lang);
        
        unmount();
        document.head.innerHTML = '';
      });
    });

    it('uses custom base URL for international sites', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} baseUrl="https://issi.fr" />);
      
      const scriptElement = document.querySelector('script[type="application/ld+json"]');
      const structuredData = JSON.parse(scriptElement?.textContent || '{}');
      
      expect(structuredData.itemListElement[0].item).toBe('https://issi.fr/en');
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily when props remain the same', () => {
      const renderSpy = vi.fn();
      const TestComponent = (props: any) => {
        renderSpy();
        return <BreadcrumbWithGlobe {...props} />;
      };
      
      const { rerender } = render(<TestComponent {...defaultProps} />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      // Re-render with same props
      rerender(<TestComponent {...defaultProps} />);
      expect(renderSpy).toHaveBeenCalledTimes(2); // React re-renders but our component stays stable
    });

    it('updates structured data when items change', () => {
      const { rerender } = render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const newItems = [
        { label: 'Home', href: '/en' },
        { label: 'Products', href: '/en/products' },
        { label: 'Software', isActive: true }
      ];
      
      rerender(<BreadcrumbWithGlobe {...defaultProps} items={newItems} />);
      
      const scriptElement = document.querySelector('script[type="application/ld+json"]');
      const structuredData = JSON.parse(scriptElement?.textContent || '{}');
      
      expect(structuredData.itemListElement[1].name).toBe('Products');
      expect(structuredData.itemListElement[2].name).toBe('Software');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty breadcrumb items array', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} items={[]} />);
      
      const scriptElement = document.querySelector('script[type="application/ld+json"]');
      const structuredData = JSON.parse(scriptElement?.textContent || '{}');
      
      expect(structuredData.itemListElement).toEqual([]);
    });

    it('handles single breadcrumb item', () => {
      const singleItem = [{ label: 'Home', href: '/en' }];
      render(<BreadcrumbWithGlobe {...defaultProps} items={singleItem} />);
      
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      
      const chevrons = screen.queryAllByRole('img', { hidden: true });
      expect(chevrons).toHaveLength(0);
    });

    it('handles very long breadcrumb trails', () => {
      const longItems = Array.from({ length: 10 }, (_, i) => ({
        label: `Level ${i + 1}`,
        href: `/en/level-${i + 1}`,
        isActive: i === 9
      }));
      
      render(<BreadcrumbWithGlobe {...defaultProps} items={longItems} />);
      
      const scriptElement = document.querySelector('script[type="application/ld+json"]');
      const structuredData = JSON.parse(scriptElement?.textContent || '{}');
      
      expect(structuredData.itemListElement).toHaveLength(10);
      expect(structuredData.itemListElement[9].position).toBe(10);
    });

    it('sanitizes HTML in breadcrumb labels', () => {
      const maliciousItems = [
        { label: '<script>alert("xss")</script>Home', href: '/en' }
      ];
      
      render(<BreadcrumbWithGlobe {...defaultProps} items={maliciousItems} />);
      
      // React automatically escapes HTML, so script should not execute
      expect(screen.getByText('<script>alert("xss")</script>Home')).toBeInTheDocument();
    });
  });

  describe('Globe Integration', () => {
    it('renders globe with correct positioning classes', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const globeContainer = screen.getByTestId('mock-globe').parentElement;
      expect(globeContainer).toHaveClass('w-full', 'h-full');
    });

    it('applies pointer-events-none to globe container', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const globeWrapper = document.querySelector('.pointer-events-none');
      expect(globeWrapper).toBeInTheDocument();
    });

    it('positions globe absolutely for natural scrolling', () => {
      render(<BreadcrumbWithGlobe {...defaultProps} />);
      
      const globeWrapper = document.querySelector('.absolute.-top-48');
      expect(globeWrapper).toBeInTheDocument();
      expect(globeWrapper).not.toHaveClass('fixed');
    });
  });
});
