import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
  locale?: string;
}

export function EmptyState({ 
  title, 
  description, 
  buttonText, 
  href,
  locale = "en" 
}: EmptyStateProps) {
  const intl = useIntl();
  const router = useRouter();

  const defaultTitle = intl.formatMessage({ 
    id: "careers.emptyState.title", 
    defaultMessage: "No jobs found" 
  });
  
  const defaultDescription = intl.formatMessage({ 
    id: "careers.emptyState.description", 
    defaultMessage: "Try searching for a different job title, location, or adjusting your filters." 
  });
  
  const defaultButtonText = intl.formatMessage({ 
    id: "careers.emptyState.clearFilters", 
    defaultMessage: "Clear all filters" 
  });

  const handleButtonClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.push(`/${locale}/careers`);
    }
  };

  return (
    <Card className="p-12">
      <div className="text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <div className="relative">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
            <Search className="h-4 w-4 text-muted-foreground absolute -bottom-1 -right-1" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="">
            {title || defaultTitle}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {description || defaultDescription}
          </p>
        </div>
        
        <Button onClick={handleButtonClick} variant="outline">
          {buttonText || defaultButtonText}
        </Button>
      </div>
    </Card>
  );
}