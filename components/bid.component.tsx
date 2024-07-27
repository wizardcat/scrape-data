'use client';
import { useBidQuery } from '@/hooks/use-bid-query.hook';
import useBidStore from '@/store/bidStore';
import { Attachments } from './attachments.component';
import { ErrorMessage } from './error.component';
import { NoDataFound } from './no-data-found.component';
import { Search } from './search.component';

const BidSearch = () => {
  const currentBidId = useBidStore((state) => state.currentBidId);
  const { error, isLoading, isError, data: bidDetails } = useBidQuery({ id: currentBidId });

  return (
    <div className="flex flex-col items-center mt-10 w-[560px]">
      <Search isLoading={isLoading} />
      {!isLoading && !isError && bidDetails?.title && (
        <div className="shadow-lg w-full bg-white text-base rounded-md group mt-10 max-w-md border-gray-300 p-4">
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
            {bidDetails?.title && <Attachments attachments={bidDetails.attachments} />}
          </div>
        </div>
      )}
      {!isError && currentBidId && !isLoading && !bidDetails?.title && <NoDataFound />}
      {isError && <ErrorMessage error={error.message} />}
    </div>
  );
};

export default BidSearch;
