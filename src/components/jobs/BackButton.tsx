"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useIntl } from "react-intl";

interface BackButtonProps {
  href?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
}

export default function BackButton({ 
  href, 
  variant = "ghost", 
  size = "sm" 
}: BackButtonProps) {
  const router = useRouter();
  const intl = useIntl();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button variant={variant} size={size} onClick={handleClick}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      {intl.formatMessage({ id: "common.back", defaultMessage: "Back" })}
    </Button>
  );
}