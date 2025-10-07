import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/providers';
import { cn, geistMono, geistSans } from '@/lib';

import './globals.css';

export const metadata: Metadata = {
  title: 'Code base',
  description:
    'A starter code base for Next.js projects with Tailwind CSS and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
