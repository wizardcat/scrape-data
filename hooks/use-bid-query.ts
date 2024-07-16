import { BidDetails } from '@/common/interfaces';
import { useQuery } from '@tanstack/react-query';

const getBidFn = async (bidId: string) => {
  const response = await fetch(`/api/bid?bidId=${bidId}`);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Bid not found');
    }

    throw new Error('Failed to fetch bid details');
  }

  return data;
};

interface UseBidQueryOptions {
  id: string;
}

export const useBidQuery = ({ id }: UseBidQueryOptions) => {
  const query = useQuery<BidDetails>({
    queryKey: ['bid', id],
    enabled: !!id,
    queryFn: () => getBidFn(id!),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  return query;
};
