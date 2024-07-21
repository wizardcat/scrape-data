'use client';
import { Attachment } from '@/common/interfaces';
import { useState } from 'react';

interface AttachmentProps {
  attachment: Attachment;
}

export const AttachedDoc = ( { attachment }: AttachmentProps) => {
  const { link, title, fileName } = attachment;
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [isShowDoc, setIsShowDoc] = useState<boolean>(false);
  const [clickedUrl, setClickedUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleShowClick = async (url: string) => {
    console.log(url);

    if (clickedUrl.includes(url)) {
      setIsShowDoc(!isShowDoc);
      setClickedUrl(clickedUrl.filter((item) => item !== url));
      return;
    }

    setIsLoading(true);
    const response = await fetch(`/api/bid/attachment?url=${encodeURIComponent(url)}`);

    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setDocUrl(objectUrl);
      setIsShowDoc(!isShowDoc);
      setClickedUrl([...clickedUrl, url]);
    } else {
      console.error('Failed to download document');
    }

    setIsLoading(false);
  };
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => handleShowClick(link)}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
      >
        {clickedUrl.includes(link) && isShowDoc ? 'Hide Document' : isLoading ? 'Loading...' : title}
      </button>
      {clickedUrl.includes(link) && isShowDoc && docUrl && (
        <div className="mt-4">
          <iframe src={docUrl} className="w-full h-[600px]" />
        </div>
      )}
    </div>
  );
};
