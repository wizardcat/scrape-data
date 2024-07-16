import useBidStore from '@/store/bidStore';
import { useState } from 'react';

export const Search = ({isLoading}: {isLoading: boolean}) => {

  const [bidId, setBidId] = useState<string>('');

  const setCurrentBidId = useBidStore((state) => state.setCurrentBidId);
  
    const handleBidIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBidId(e.target.value);
    };

    const handleSubmitClick = async () => {
      setCurrentBidId(bidId);
    };

  return (
    <div className="shadow-lg w-full h-36 bg-white text-base rounded-md group">
      <div className="m-3">
        <h6 className="font-bold text-black">Bid Dashboard</h6>
      </div>
      <div className="flex items-center text-base m-3">
        <input
          type="text"
          className="border-2 border-gray-300 rounded-md p-2 w-full focus:border-black focus:outline-none"
          placeholder="Enter Bid ID"
          value={bidId}
          onChange={handleBidIdInputChange}
        />
        <button
          className="ml-4 bg-black px-2 py-2 rounded-md right-0   text-white w-[175px]"
          onClick={handleSubmitClick}
          disabled={bidId === '' || isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      <div className="text-center text-gray-500 pr-[125px]">Enter a bid ID to view the details</div>
    </div>
  );
};

