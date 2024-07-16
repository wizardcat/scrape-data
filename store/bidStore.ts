import { BidDetails } from '@/common/interfaces';
import { create } from 'zustand';

interface BidStore {
  bidDetails: BidDetails | null;
  currentBidId: string;
  setBidDetails: (details: BidDetails) => void;
  setCurrentBidId: (bidId: string) => void;
}

const useBidStore = create<BidStore>((set) => ({
  bidDetails: null,
  currentBidId: '',
  setBidDetails: (details) => set({ bidDetails: details }),
  setCurrentBidId: (currentBidId) => set({ currentBidId }),
}));

export default useBidStore;
