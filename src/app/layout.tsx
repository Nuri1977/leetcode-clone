import './globals.css';
import { Lato } from 'next/font/google';
import AppProviders from '@/providers/appProviders';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata = {
  title: 'LeetCode',
  description: 'Web application that contains LeetCode problems and solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={lato.className}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
