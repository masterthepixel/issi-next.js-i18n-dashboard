// Shared metadata configuration
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://issi-nextjs-i18n-dashboard.vercel.app';
  }
  return 'http://localhost:3000';
};

export const metadataBase = new URL(getBaseUrl());

export const defaultMetadata = {
  metadataBase,
  title: "ISSI - International Software Systems International",
  description: "International Software Systems International official website",
  openGraph: {
    title: "ISSI - International Software Systems International",
    description: "International Software Systems International official website",
    url: getBaseUrl(),
    siteName: "ISSI",
    images: [
      {
        url: "/images/issi_logo.png",
        width: 1200,
        height: 630,
        alt: "ISSI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISSI - International Software Systems International",
    description: "International Software Systems International official website",
    images: ["/images/issi_logo.png"],
  },
};
