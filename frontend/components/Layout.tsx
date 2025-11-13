import { ReactNode } from 'react';
import Navbar from './Navbar';
import { Footer } from 'flowbite-react';
import Link from 'next/link';
import { HiOutlineUserCircle } from 'react-icons/hi';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
        {children}
      </main>
      <Footer container className="bg-gray-800 mt-auto">
        <Footer.Copyright
          href="#"
          by="Evenly"
          year={new Date().getFullYear()}
        />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Terms</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
} 