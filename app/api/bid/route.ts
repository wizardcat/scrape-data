import { getBidDetails } from '@/services/get-bid-details';
import { getBidDetailsUrl } from '@/services/get-bid-details-url';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bidId = searchParams.get('bidId');

  if (!bidId || typeof bidId !== 'string') {
    return NextResponse.json(
      [
        {
          code: 'missing_query_param',
          field: 'bidId',
          message: 'Query param bidId is required',
        },
      ],
      { status: 400 },
    );
  }

  try {
    const bidDetailUrl = await getBidDetailsUrl(bidId);

    if (!bidDetailUrl) {
      return NextResponse.json(
        [
          {
            code: 'no_data_found',
            field: 'bidId',
            message: 'No data found',
          },
        ],
        { status: 404 },
      );
    }

    const bidDetails = await getBidDetails(bidDetailUrl);

    if (!bidDetails) {
      return NextResponse.json(
        [
          {
            code: 'no_data_found',
            field: 'bidId',
            message: 'No data found',
          },
        ],
        { status: 404 },
      );
    }

    return NextResponse.json(bidDetails);
  } catch (error) {
    return NextResponse.json(
      [
        {
          code: 'fetch_failed',
          message: 'Failed to fetch bid details',
        },
      ],
      { status: 500 },
    );
  }
}
