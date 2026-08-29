import './globals.css';

export const metadata = {
  title: 'قاعات النعمان | Al Numan Halls',
  description: 'قاعات النعمان - تجربة أعراس فاخرة مع خدمة الدعوات الإلكترونية. اكتشف قاعاتنا الفخمة وصمّم دعوة زفافك الرقمية.',
  keywords: 'قاعات أعراس, قاعات النعمان, دعوات إلكترونية, دعوة زفاف, حفلات زفاف, عمّان',
  openGraph: {
    title: 'قاعات النعمان | Al Numan Halls',
    description: 'تجربة أعراس فاخرة مع خدمة الدعوات الإلكترونية',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
