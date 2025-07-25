'use client';


interface ComplianceCarouselWrapperProps {
  locale: string;
  messages: any;
}

export default function ComplianceCarouselWrapper({ locale: _locale, messages: _messages }: ComplianceCarouselWrapperProps) {
  console.log('ComplianceCarouselWrapper component is hidden - replaced with bento grid');

  // Temporarily hidden - replaced with ComplianceCertifications bento grid
  return null;
}
