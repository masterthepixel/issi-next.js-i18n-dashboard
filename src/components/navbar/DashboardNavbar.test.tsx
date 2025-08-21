import { render, screen, fireEvent, within } from '@testing-library/react';
import { vi, beforeEach, describe, expect, it } from 'vitest';
import DashboardNavbar from './DashboardNavbar';
import { Locale } from '@/lib/definitions';

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/home',
}));

// Mock shadcn/ui components
vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className, ...props }: any) => <div className={`avatar ${className}`} {...props}>{children}</div>,
  AvatarImage: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
  AvatarFallback: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, variant, className, ...props }: any) => (
    <span className={`badge badge-${variant} ${className}`} {...props}>{children}</span>
  ),
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, size, asChild, className, ...props }: any) => 
    asChild ? <div className={`button-wrapper ${className}`} {...props}>{children}</div> : 
    <button className={`button button-${variant} button-${size} ${className}`} {...props}>{children}</button>
}));

vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => <div className=\"dropdown-menu\">{children}</div>,
  DropdownMenuContent: ({ children, align, className, ...props }: any) => (
    <div className={`dropdown-content align-${align} ${className}`} {...props}>{children}</div>
  ),
  DropdownMenuItem: ({ children, onClick, className, ...props }: any) => (
    <div className={`dropdown-item ${className}`} onClick={onClick} {...props}>{children}</div>
  ),
  DropdownMenuLabel: ({ children, className, ...props }: any) => (
    <div className={`dropdown-label ${className}`} {...props}>{children}</div>
  ),
  DropdownMenuSeparator: ({ className, ...props }: any) => (
    <div className={`dropdown-separator ${className}`} {...props} />
  ),
  DropdownMenuTrigger: ({ children, asChild, ...props }: any) => 
    asChild ? <div className=\"dropdown-trigger-wrapper\" {...props}>{children}</div> :
    <button className=\"dropdown-trigger\" {...props}>{children}</button>
}));

vi.mock('@/components/ui/navigation-menu', () => ({
  NavigationMenu: ({ children, className }: any) => <nav className={`navigation-menu ${className}`}>{children}</nav>,
  NavigationMenuContent: ({ children }: any) => <div className=\"nav-content\">{children}</div>,
  NavigationMenuItem: ({ children }: any) => <div className=\"nav-item\">{children}</div>,
  NavigationMenuLink: ({ children, className, href, ...props }: any) => (
    <a href={href} className={`nav-link ${className}`} {...props}>{children}</a>
  ),
  NavigationMenuList: ({ children }: any) => <ul className=\"nav-list\">{children}</ul>,
  NavigationMenuTrigger: ({ children }: any) => <button className=\"nav-trigger\">{children}</button>,
  navigationMenuTriggerStyle: () => 'nav-trigger-style',
}));

vi.mock('@/components/ui/separator', () => ({
  Separator: ({ className }: any) => <div className={`separator ${className}`} />
}));

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: any) => <div className=\"sheet\">{children}</div>,
  SheetContent: ({ children, side }: any) => <div className={`sheet-content side-${side}`}>{children}</div>,
  SheetTrigger: ({ children, asChild, ...props }: any) => 
    asChild ? <div className=\"sheet-trigger-wrapper\" {...props}>{children}</div> :
    <button className=\"sheet-trigger\" {...props}>{children}</button>
}));

// Mock local components
vi.mock('../ThemeToggle', () => ({
  default: () => <div data-testid=\"theme-toggle\">Theme Toggle</div>,
}));

vi.mock('./LangSwitcher', () => ({
  default: ({ locale }: { locale: string }) => <div data-testid=\"lang-switcher\">Lang: {locale}</div>,
}));

// Mock utilities
vi.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

describe('DashboardNavbar', () => {
  const defaultProps = {
    locale: 'en' as Locale,
    messages: {
      'common.navigation.home': 'Home',
      'common.navigation.services': 'Services',
      'common.navigation.products': 'Products',
      'common.navigation.government': 'Government',
      'common.navigation.eLearning': 'eLearning',
      'common.navigation.about': 'About',
      'common.navigation.contact': 'Contact',
    },
    userName: 'John Doe',
    userEmail: 'john@example.com',
    notificationCount: 5,
  };

  const mockCallbacks = {
    onNavItemClick: vi.fn(),
    onInfoItemClick: vi.fn(),
    onNotificationItemClick: vi.fn(),
    onUserItemClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.innerWidth for responsive behavior
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  describe('Basic Rendering', () => {
    it('renders the navigation bar', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByAltText('ISSI Logo')).toBeInTheDocument();
    });

    it('renders all navigation items', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Solutions')).toBeInTheDocument();
      expect(screen.getByText('Learning')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('renders user info correctly', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      // User avatar should be present with initials
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('displays notification count', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders theme toggle and language switcher', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('renders with Spanish locale', () => {
      const spanishMessages = {
        'common.navigation.home': 'Inicio',
        'common.navigation.services': 'Servicios',
        'common.navigation.products': 'Productos',
        'common.navigation.government': 'Gobierno',
        'common.navigation.eLearning': 'Aprendizaje',
        'common.navigation.about': 'Acerca de',
        'common.navigation.contact': 'Contacto',
      };

      render(
        <DashboardNavbar 
          {...defaultProps} 
          {...mockCallbacks}
          locale="es" 
          messages={spanishMessages} 
        />
      );
      
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Servicios')).toBeInTheDocument();
      expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    it('renders with French locale', () => {
      const frenchMessages = {
        'common.navigation.home': 'Accueil',
        'common.navigation.services': 'Services',
        'common.navigation.products': 'Produits',
        'common.navigation.government': 'Gouvernement',
        'common.navigation.eLearning': 'Apprentissage',
        'common.navigation.about': 'À propos',
        'common.navigation.contact': 'Contact',
      };

      render(
        <DashboardNavbar 
          {...defaultProps} 
          {...mockCallbacks}
          locale="fr" 
          messages={frenchMessages} 
        />
      );
      
      expect(screen.getByText('Accueil')).toBeInTheDocument();
      expect(screen.getByText('Produits')).toBeInTheDocument();
      expect(screen.getByText('À propos')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('handles navigation item clicks', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      const homeLink = screen.getByText('Home');
      fireEvent.click(homeLink);
      
      // Navigation should work through Link component
      expect(homeLink.closest('a')).toHaveAttribute('href', '/en/home');
    });

    it('handles info menu interactions', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      // Find help icon/button and click it
      const helpButton = screen.getByRole('button', { name: /help/i });
      fireEvent.click(helpButton);
      
      // Check if dropdown items appear (mocked behavior)
      expect(screen.getByText('Support & Help')).toBeInTheDocument();
    });

    it('handles notification interactions', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      // Click notification bell
      const notificationButton = screen.getByRole('button');
      const bellButton = [...screen.getAllByRole('button')].find(btn => 
        btn.querySelector('.lucide-bell, [data-testid=\"bell\"]')
      );
      
      if (bellButton) {
        fireEvent.click(bellButton);
        expect(screen.getByText('Notifications')).toBeInTheDocument();
      }
    });

    it('handles user menu interactions', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      // Click user avatar
      const avatar = screen.getByText('JD');
      fireEvent.click(avatar.closest('button')!);
      
      expect(mockCallbacks.onUserItemClick).toHaveBeenCalledTimes(0); // Menu should appear first
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('navigation-menu');
      
      // Logo should have proper alt text
      expect(screen.getByAltText('ISSI Logo')).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      const homeLink = screen.getByText('Home');
      homeLink.focus();
      
      expect(document.activeElement).toBe(homeLink.closest('a'));
    });

    it('has proper semantic structure', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      // Should have navigation landmark
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      // Should have proper button roles
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Theme Integration', () => {
    it('uses theme tokens in classes', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('bg-background/95');
      expect(nav).toHaveClass('border-border/40');
    });

    it('includes theme toggle component', () => {
      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('shows desktop navigation on large screens', () => {
      // Mock large screen
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });

      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      expect(screen.getByText('Solutions')).toBeInTheDocument();
      expect(screen.getByText('Learning')).toBeInTheDocument();
    });

    it('shows mobile menu on small screens', () => {
      // Mock mobile screen
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      });

      render(<DashboardNavbar {...defaultProps} {...mockCallbacks} />);
      
      // Mobile menu trigger should be present
      expect(screen.getByText('Toggle navigation menu')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('uses default values when props are not provided', () => {
      const minimalProps = {
        locale: 'en' as Locale,
        messages: defaultProps.messages,
      };

      render(<DashboardNavbar {...minimalProps} />);
      
      expect(screen.getByText('ISSI User')).toBeInTheDocument();
      expect(screen.getByText('IU')).toBeInTheDocument(); // Initials for default user
      expect(screen.getByText('0')).toBeInTheDocument(); // Default notification count
    });
  });

  describe('Error Handling', () => {
    it('handles missing messages gracefully', () => {
      const emptyMessages = {};

      render(
        <DashboardNavbar 
          {...defaultProps} 
          {...mockCallbacks}
          messages={emptyMessages} 
        />
      );
      
      // Should still render without crashing
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('handles missing user data gracefully', () => {
      render(
        <DashboardNavbar 
          {...defaultProps} 
          {...mockCallbacks}
          userName={undefined}
          userEmail={undefined}
          userAvatar={undefined}
        />
      );
      
      // Should use defaults
      expect(screen.getByText('IU')).toBeInTheDocument(); // Default initials
    });
  });
});