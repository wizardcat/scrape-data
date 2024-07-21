import { scrapUrl } from '@/common/config';
import { BidDetails } from '@/common/interfaces';
import axios from 'axios';
import * as cheerio from 'cheerio';

export const getBidDetails = async (bidDetailUrl: string) => {
  const { data } = await axios.get(`${scrapUrl}${bidDetailUrl}`);
  const $ = cheerio.load(data);

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
    .map((i, el) => {
      const row = $((el as cheerio.Element).children);
      const title = $(row[1]).text().trim();
      const link = scrapUrl + $('a', row[3]).attr('href')!;
      const fileName = $('span', row[3]).text().trim();
      return { title, link, fileName };
    })
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

  return bidDetails;
};
