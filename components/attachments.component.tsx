'use client';
import { Attachment } from '@/common/interfaces';
import { useEffect } from 'react';
import { AttachedDoc } from './attachment.component';

interface AttachmentsProps {
  attachments: Attachment[];
}

export const Attachments = ({ attachments }: AttachmentsProps) => {
  useEffect(() => {
    console.log('attachments: ', attachments);
  }, [attachments]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Attachments</h1>
      {attachments.map((attachment) => {
        return <AttachedDoc key={attachment.link} attachment={attachment} />;
      })}
    </div>
  );
};
