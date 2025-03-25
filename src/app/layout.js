import { Poppins, Quicksand } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

// Define the fonts with variable properties
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '400', '700', '800', '900'],
  variable: '--font-poppins',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'], // Include 700 for bold
  variable: '--font-quicksand',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${quicksand.variable}`}>
      <body className={poppins.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.node.isRequired };

// You can manage the metadata, tab content and info about your app dynamically using this. It will work on every page in your app:
export const generateMetadata = async () => ({
  title: `NiceList - Your Holiday Shopping Dashboard`, // Dynamically set the title using route parameters
  description: `NiceList - Manage your holiday shopping all in one place`, // Dynamic description
  // Add other metadata fields as needed, like keywords, open graph tags, etc.
  icons: '/favicon.svg',
  keywords: ['christmas', 'shopping', 'holiday', 'dashboard', 'gifts', 'presents', 'package'],
  openGraph: {
    title: `NiceList - Your Holiday Shopping Dashboard`,
    description: `Manage your holiday shopping all in one place`,
    url: `https://nice-list-sigma.vercel.app/`,
    sitename: 'NiceList',
  },
});
