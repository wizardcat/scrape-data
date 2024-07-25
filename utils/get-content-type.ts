import { CONTENT_TYPE } from '@/common/constants';

export function getContentType(filename: string) {
  const ext = filename.split('.').pop();
  return CONTENT_TYPE[ext as keyof typeof CONTENT_TYPE] || 'application/octet-stream';
}
