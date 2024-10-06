'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin');
    }
  }, [router]);

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      {/* Your admin functionalities here */}
    </div>
  );
}