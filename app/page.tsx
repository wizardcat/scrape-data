'use client';

import BidSearch from '@/components/bid.component';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BidSearch />
    </main>
  );
}
