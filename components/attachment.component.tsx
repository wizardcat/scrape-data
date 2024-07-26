'use client';
import { CONTENT_TYPE } from '@/common/constants';
import { Attachment } from '@/common/interfaces';
import { useState } from 'react';
import { ErrorMessage } from './error.component';

interface AttachmentProps {
  attachment: Attachment;
}

export const AttachedDoc = ( { attachment }: AttachmentProps) => {
  const { link, title, fileName } = attachment;
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [isShowDoc, setIsShowDoc] = useState<boolean>(false);
  const [clickedUrl, setClickedUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentType, setContentType] = useState<string>('');
  
  const handleShowClick = async (url: string) => {

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
      setContentType(blob.type);
      
      setDocUrl(objectUrl);
      setIsShowDoc(!isShowDoc);
      setClickedUrl([...clickedUrl, url]);
    } else {
      ErrorMessage({ error: 'Failed to download document' });
    }

    setIsLoading(false);
  };
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => handleShowClick(link)}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
      >
        {clickedUrl.includes(link) && isShowDoc
          ? 'Hide Document'
          : isLoading
          ? 'Loading...'
          : title}
      </button>
      {clickedUrl.includes(link) && isShowDoc && docUrl && (
        <div className="mt-4">
          {contentType === CONTENT_TYPE.pdf && <iframe src={docUrl} className="w-full h-[600px]" />}
          {/* {contentType === CONTENT_TYPE.xlsx && <XLSXDoc src={docUrl} />} */}
        </div>
      )}
    </div>
  );
};
