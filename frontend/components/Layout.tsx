import { Navbar, Footer } from 'flowbite-react';
import Link from 'next/link';
import { HiOutlineUserCircle } from 'react-icons/hi';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar fluid className="bg-white shadow-sm">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-800">
            Evenly
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/expenses" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            Expenses
          </Link>
          <Link href="/groups" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            Groups
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            <HiOutlineUserCircle className="h-5 w-5" />
          </Link>
        </Navbar.Collapse>
      </Navbar>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <Footer container className="bg-white">
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