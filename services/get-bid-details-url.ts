import axios from 'axios';
import * as cheerio from 'cheerio';

export const getBidDetailsUrl = async (bidId: string) => {
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
  return bidDetailUrl;
};