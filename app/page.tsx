

import BidSearch from '@/components/bid.component';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BidSearch />
      {/* <Doc filename="Amendment___2.pdf" /> */}
      {/* <PdfViewer /> */}
      {/* <DocViewer fileNames={['Amendment___2.pdf']} /> */}
    </main>
  );
}
