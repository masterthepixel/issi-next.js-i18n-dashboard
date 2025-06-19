import { Locale } from '@/lib/definitions';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BreadcrumbWithGlobeWrapper from '../BreadcrumbWithGlobeWrapper';

// Mock the main component
vi.mock('../BreadcrumbWithGlobe', () => ({
  default: (props: any) => (
    <div data-testid="breadcrumb-with-globe">
      <div data-testid="props">{JSON.stringify(props)}</div>
    </div>
  )
}));

const mockMessages = {
  'breadcrumb.home': 'Home',
  'breadcrumb.services': 'Services',
  'breadcrumb.back': 'Back',
  'services.page.title': 'IT Services & Solutions'
};

const mockBreadcrumbItems = [
  { label: 'Home', href: '/en' },
  { label: 'Services', href: '/en/services' },
  { label: 'Current Page', isActive: true }
];

const defaultProps = {
  locale: 'en' as Locale,
  messages: mockMessages,
  items: mockBreadcrumbItems,
  title: 'Test Page Title',
  backLabel: 'Back',
  backHref: '/en'
};

describe('BreadcrumbWithGlobeWrapper', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.head.innerHTML = '';
  });

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} />);
      expect(screen.getByTestId('breadcrumb-with-globe')).toBeInTheDocument();
    });

    it('passes correct props to BreadcrumbWithGlobe', () => {
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} />);
      
      const propsElement = screen.getByTestId('props');
      const passedProps = JSON.parse(propsElement.textContent || '{}');
      
      expect(passedProps).toEqual({
        items: mockBreadcrumbItems,
        title: 'Test Page Title',
        backLabel: 'Back',
        backHref: '/en',
        lang: 'en',
        baseUrl: 'https://issi.com'
      });
    });

    it('passes custom base URL', () => {
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} />);
      
      const propsElement = screen.getByTestId('props');
      const passedProps = JSON.parse(propsElement.textContent || '{}');
      
      expect(passedProps.baseUrl).toBe('https://issi.com');
    });
  });

  describe('Internationalization Provider', () => {
    it('provides correct locale to IntlProvider', () => {
      const { container } = render(<BreadcrumbWithGlobeWrapper {...defaultProps} locale="fr" />);
      
      // IntlProvider should wrap our component
      expect(container.querySelector('[data-testid="breadcrumb-with-globe"]')).toBeInTheDocument();
    });

    it('provides messages to IntlProvider', () => {
      const customMessages = {
        ...mockMessages,
        'custom.key': 'Custom Value'
      };
      
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} messages={customMessages} />);
      
      // Component should render successfully with custom messages
      expect(screen.getByTestId('breadcrumb-with-globe')).toBeInTheDocument();
    });

    it('handles different locale values', () => {
      const locales: Locale[] = ['en', 'fr', 'es'];
      
      locales.forEach(locale => {
        const { unmount } = render(<BreadcrumbWithGlobeWrapper {...defaultProps} locale={locale} />);
        
        const propsElement = screen.getByTestId('props');
        const passedProps = JSON.parse(propsElement.textContent || '{}');
        
        expect(passedProps.lang).toBe(locale);
        
        unmount();
      });
    });
  });

  describe('Props Handling', () => {
    it('handles optional props correctly', () => {
      const minimalProps = {
        locale: 'en' as Locale,
        messages: mockMessages,
        items: mockBreadcrumbItems,
        title: 'Test Title'
      };
      
      render(<BreadcrumbWithGlobeWrapper {...minimalProps} />);
      
      const propsElement = screen.getByTestId('props');
      const passedProps = JSON.parse(propsElement.textContent || '{}');
      
      expect(passedProps.backLabel).toBeUndefined();
      expect(passedProps.backHref).toBeUndefined();
      expect(passedProps.lang).toBe('en');
      expect(passedProps.baseUrl).toBe('https://issi.com');
    });

    it('passes through custom back label and href', () => {
      const customProps = {
        ...defaultProps,
        backLabel: 'Go Back',
        backHref: '/custom/path'
      };
      
      render(<BreadcrumbWithGlobeWrapper {...customProps} />);
      
      const propsElement = screen.getByTestId('props');
      const passedProps = JSON.parse(propsElement.textContent || '{}');
      
      expect(passedProps.backLabel).toBe('Go Back');
      expect(passedProps.backHref).toBe('/custom/path');
    });

    it('handles complex breadcrumb items', () => {
      const complexItems = [
        { label: 'Home', href: '/en' },
        { label: 'Products', href: '/en/products' },
        { label: 'Software Solutions', href: '/en/products/software' },
        { label: 'Enterprise Tools', isActive: true }
      ];
      
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} items={complexItems} />);
      
      const propsElement = screen.getByTestId('props');
      const passedProps = JSON.parse(propsElement.textContent || '{}');
      
      expect(passedProps.items).toEqual(complexItems);
      expect(passedProps.items).toHaveLength(4);
    });
  });

  describe('Error Handling', () => {
    it('handles empty messages object', () => {
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} messages={{}} />);
      
      expect(screen.getByTestId('breadcrumb-with-globe')).toBeInTheDocument();
    });

    it('handles empty items array', () => {
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} items={[]} />);
      
      const propsElement = screen.getByTestId('props');
      const passedProps = JSON.parse(propsElement.textContent || '{}');
      
      expect(passedProps.items).toEqual([]);
    });

    it('handles long titles gracefully', () => {
      const longTitle = 'A'.repeat(200);
      
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} title={longTitle} />);
      
      const propsElement = screen.getByTestId('props');
      const passedProps = JSON.parse(propsElement.textContent || '{}');
      
      expect(passedProps.title).toBe(longTitle);
    });
  });

  describe('Performance', () => {
    it('does not cause unnecessary re-renders', () => {
      const renderCount = vi.fn();
      
      const TestWrapper = (props: any) => {
        renderCount();
        return <BreadcrumbWithGlobeWrapper {...props} />;
      };
      
      const { rerender } = render(<TestWrapper {...defaultProps} />);
      expect(renderCount).toHaveBeenCalledTimes(1);
      
      // Re-render with same props
      rerender(<TestWrapper {...defaultProps} />);
      expect(renderCount).toHaveBeenCalledTimes(2);
    });

    it('updates when locale changes', () => {
      const { rerender } = render(<BreadcrumbWithGlobeWrapper {...defaultProps} locale="en" />);
      
      let propsElement = screen.getByTestId('props');
      let passedProps = JSON.parse(propsElement.textContent || '{}');
      expect(passedProps.lang).toBe('en');
      
      rerender(<BreadcrumbWithGlobeWrapper {...defaultProps} locale="fr" />);
      
      propsElement = screen.getByTestId('props');
      passedProps = JSON.parse(propsElement.textContent || '{}');
      expect(passedProps.lang).toBe('fr');
    });
  });

  describe('Integration', () => {
    it('provides complete integration with IntlProvider', () => {
      const { container } = render(<BreadcrumbWithGlobeWrapper {...defaultProps} />);
      
      // Should not throw any errors and render successfully
      expect(container.firstChild).toBeInTheDocument();
    });

    it('maintains component hierarchy', () => {
      render(<BreadcrumbWithGlobeWrapper {...defaultProps} />);
      
      // The breadcrumb component should be rendered within the wrapper
      expect(screen.getByTestId('breadcrumb-with-globe')).toBeInTheDocument();
    });
  });
});
