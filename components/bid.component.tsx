import { BidDetails } from '@/common/interfaces';
import { useState } from 'react';

const BidSearch: React.FC = () => {
  const [bidId, setBidId] = useState<string>('');
  const [bidDetails, setBidDetails] = useState<BidDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidId(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/bid?bidId=${bidId}`);
      const data = await response.json();
      setBidDetails(data);
    } catch (err) {
      setError('Failed to fetch bid details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
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
            onChange={handleInputChange}
          />
          <button
            className="ml-4 bg-black px-4 py-2 rounded-md right-0   text-white"
            onClick={handleSearch}
            disabled={loading}
          >
            Submit
          </button>
        </div>
        <div className="text-center text-gray-500">Enter a bid ID to view the details</div>
      </div>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      {bidDetails && (
        <div className="shadow-lg w-full bg-white text-base rounded-md group mt-10 w-full max-w-md border-gray-300 p-4 rounded-md">
          <p>
            <strong>Title:</strong> {bidDetails.title}
          </p>
          <p>
            <strong>ID:</strong> {bidDetails.id}
          </p>
          <p>
            <strong>Due / Close Date (EST):</strong> {bidDetails.dueDate}
          </p>
          <p>
            <strong>Solicitation Summary:</strong> {bidDetails.solicitationSummary}
          </p>
          <p>
            <strong>Main Category:</strong> {bidDetails.mainCategory}
          </p>
          <p>
            <strong>Solicitation Type:</strong> {bidDetails.solicitationType}
          </p>
          <div>
            <strong>Attachments:</strong>
            <ul className="list-disc pl-5">
              {bidDetails?.attachments?.map((attachment, index) => (
                <li key={index}>
                  <a
                    href={attachment.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {attachment.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidSearch;