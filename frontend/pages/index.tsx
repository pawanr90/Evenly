import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Frontend entry point
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return null;
}