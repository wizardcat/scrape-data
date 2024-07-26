import { useQuery } from '@tanstack/react-query';

const getDocumentFn = async (url: string) => {
  if (!url) return;
  const response = await fetch(`/api/bid/attachment?url=${encodeURIComponent(url)}`);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Document not found');
    }

    throw new Error('Failed to fetch document');
  }

  return objectUrl;
};

interface UseDocumentQueryOptions {
  url: string;
}

export const useDocumentQuery = ({ url }: UseDocumentQueryOptions) => {
  const query = useQuery<string|undefined>({
    queryKey: ['document', url],
    enabled: !!url,
    queryFn: () => getDocumentFn(url!),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  return query;
};