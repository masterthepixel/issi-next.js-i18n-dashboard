export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  features?: string[];
  benefits?: string[];
  category?: string;
  tags?: string[];
  specifications?: Record<string, string>;
  pricing?: {
    startingPrice?: number;
    currency?: string;
    billingCycle?: string;
  };
  icon?: React.ComponentType<any>;
  titleKey?: string;
  descriptionKey?: string;
  size?: { width: number; height: number };
  className?: string;
  priority?: number;
}
