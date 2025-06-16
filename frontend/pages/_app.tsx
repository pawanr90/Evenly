import type { AppProps } from 'next/app';
import { Flowbite } from 'flowbite-react';
import { useEffect } from 'react';
import '../styles/globals.css';
import 'flowbite/dist/flowbite.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Flowbite
    import('flowbite');
  }, []);

  return (
    <Flowbite theme={{
      dark: true,
      theme: {
        button: {
          color: {
            primary: 'bg-blue-600 hover:bg-blue-700 text-white',
          },
        },
        card: {
          root: {
            base: 'flex rounded-lg border border-gray-700 bg-gray-800 shadow',
          },
        },
        navbar: {
          root: {
            base: 'bg-gray-800 border-gray-700',
          },
          link: {
            base: 'text-gray-300 hover:text-white',
          },
        },
        footer: {
          root: {
            base: 'bg-gray-800 border-gray-700',
          },
          link: {
            base: 'text-gray-300 hover:text-white',
          },
        },
      },
    }}>
      <div className="dark">
        <Component {...pageProps} />
      </div>
    </Flowbite>
  );
} 