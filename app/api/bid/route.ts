import { BidDetails } from '@/common/interfaces';
import axios from 'axios';
import * as cheerio from 'cheerio';
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
    const formData = new URLSearchParams();
    formData.append('body:x:txtBpmCodeCalculated_3', bidId);

    const response = await axios.post(
      'https://emma.maryland.gov/page.aspx/en/rfp/request_browse_public',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    let $ = cheerio.load(response.data);
    const bidDetailUrl = $('#body_x_grid_grd > tbody > tr:nth-child(1) > td:nth-child(3) > a').attr(
      'href',
    );

    if (!bidDetailUrl) {
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

    const { data } = await axios.get(`https://emma.maryland.gov${bidDetailUrl}`);
    $ = cheerio.load(data);
    
    const title = $('#body_x_tabc_rfp_ext_prxrfp_ext_x_lblLabel').text().trim();
    const id = $('#body_x_tabc_rfp_ext_prxrfp_ext_x_lblProcessCode').text().trim();
    const dueDate = $('#body_x_tabc_rfp_ext_prxrfp_ext_x_txtRfpEndDateEst').val() as string;
    const solicitationSummary = $(
      '#body_x_tabc_rfp_ext_prxrfp_ext_x_lblSummary > p > span > span > span > span',
    )
      .text()
      .trim();
    const mainCategory = $('#body_x_tabc_rfp_ext_prxrfp_ext_x_txtFamLabel').val() as string;
    const solicitationType = $(
      '#body_x_tabc_rfp_ext_prxrfp_ext_x_placeholder_rfp_190512185909 > tbody > tr:nth-child(2) > td.iv-phc-cell.top.aligned > div > div > div > div.text',
    )
      .text()
      .trim();
    const attachments = $('#body_x_tabc_rfp_ext_prxrfp_ext_x_prxDoc_x_grid_grd > tbody > tr')
      .map((i, el) =>{
        //$(el).attr('href')
        const row = $((el as cheerio.Element).children);
        const title = $(row[1]).text().trim();
        const link = `https://emma.maryland.gov/bare.aspx/en/fil/download_public/ba136075-ca00-4116-a30e-5ee88bce7a1a?file_context[rfp]=72220 ${$(
          row[3],
        )
          .text()
          .trim()}`;
        return {title, link};
      }
    )
      .get();

    const bidDetails: BidDetails = {
      title,
      id,
      dueDate,
      solicitationSummary,
      mainCategory,
      solicitationType,
      attachments,
    };

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
