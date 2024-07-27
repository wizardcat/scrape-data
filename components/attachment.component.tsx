import { Attachment } from '@/common/interfaces';
import { useDocumentQuery } from '@/hooks/use-document-query.hook';
import { useState } from 'react';

interface AttachmentProps {
  attachment: Attachment;
}

export const AttachedDoc = ({ attachment }: AttachmentProps) => {
  const { link, title, fileName } = attachment;
  const [url, setUrl] = useState<string>('');
  const [showedUrls, setShowedUrls] = useState<string[]>([]);
  const { error, isLoading, isError, data: docUrl, isSuccess } = useDocumentQuery({ url: url });

  const handleShowClick = async (selectedUrl: string) => {
    setUrl(selectedUrl);
    if (showedUrls.includes(selectedUrl)) {
      setShowedUrls(showedUrls.filter((item) => item !== selectedUrl));
      return;
    }
    setShowedUrls([...showedUrls, selectedUrl]);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => handleShowClick(link)}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
      >
        {showedUrls.includes(link) && isSuccess
          ? 'Hide Document'
          : isLoading
          ? 'Loading...'
          : title}
      </button>
      {showedUrls.includes(link) && isSuccess && (
        <div className="mt-4">
          <iframe src={docUrl} className="w-full h-[600px]" />
          {/* {contentType === CONTENT_TYPE.pdf && <iframe src={docUrl} className="w-full h-[600px]" />} */}
          {/* {contentType === CONTENT_TYPE.xlsx && <XLSXDoc src={docUrl} />} */}
        </div>
      )}
    </div>
  );
};
