import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

interface BidDetails {
  title: string;
  id: string;
  dueDate: string;
  solicitationSummary: string;
  mainCategory: string;
  solicitationType: string;
  attachments: string[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bidId = searchParams.get('bidId');
  console.log('bidId', bidId);

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
    // formData.append('__isSecurePage', 'true');
    // formData.append('hdnUserValue', ',body_x_txtBpmCodeCalculated_3');
    // formData.append('__LASTFOCUS', 'body_x_prxFilterBar_x_cmdSearchBtn');
    // formData.append(
    //   '__VIEWSTATE',
    //   'hbbAZ5FA%2FcoYzkvk%2BI5eab0aVLT9JA0M3Q1h%2BmflkrsKppQTwC26MDNok72KNdSCyOEyRSD0dmIAMdDu2BgQnf63poHTMEOJdTGT6cfkbeY%3D',
    // );
    // formData.append('__EVENTTARGET', 'body:x:prxFilterBar:x:cmdSearchBtn');
    // formData.append('__EVENTARGUMENT', '');
    // formData.append('__VIEWSTATEGENERATOR', '3989C74E');
    // formData.append('__VIEWSTATEENCRYPTED', '');
    // formData.append('HTTP_RESOLUTION', '1512 x 982 x 30');
    // formData.append('REQUEST_METHOD', 'GET');
    // formData.append('x_headaction', '');
    // formData.append('x_headloginName', '');
    // formData.append('proxyActionBar:x:txtWflRefuseMessage', '');
    // formData.append('hdnMandatory', '0');
    // formData.append('hdnWflAction', '');
    // formData.append('body:ctl0', '');
    formData.append('body:x:txtBpmCodeCalculated_3', bidId);
    // formData.append('body_x_selStatusCode_text', '');
    // formData.append('body:x:selStatusCode', 'val');
    // formData.append('body_x_selFamily_text', '');
    // formData.append('body:x:selFamily', '');
    // formData.append('body:x:prxFilterBar:x:cmdSearchBtn', '');
    // formData.append('body:x:prxFilterBar:x:hdnResetFilterUrlbody_x_prxFilterBar_x_cmdRazBtn', '');
    // formData.append('body_x_selRfptypeCode_text', '');
    // formData.append('body:x:selRfptypeCode', '');
    // formData.append('body_x_selStatusCode_2_text', '');
    // formData.append('body:x:selStatusCode_2', '');
    // formData.append('body_x_selActCode_text', '');
    // formData.append('body:x:selActCode', '');
    // formData.append('body_x_selSactCode_text', '');
    // formData.append('body:x:selSactCode', '');
    // formData.append('body_x_selAuthCode_2_text', '');
    // formData.append('body:x:selAuthCode_2', '');
    // formData.append('body_x_selSiteCode_text', '');
    // formData.append('body:x:selSiteCode', '');
    // formData.append('body:x:cbBpmSbrDesignation_1', 'False');
    // formData.append('body:x:cbBpmSbeDesignation', 'False');
    // formData.append('body:x:cbBpmMbeGoalYesNo_1', 'False');
    // formData.append('body:x:cbBpmMbeSubGoalYesNo', 'False');
    // formData.append('body:x:cbBpmVsbeGoalYesNo', 'False');
    // formData.append('body:x:cbBpmDbeGoalYesNo', 'False');
    // formData.append('body:x:grid:grd:ctl2:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl3:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl4:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl5:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl6:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl7:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl8:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl9:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl10:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl11:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl12:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl13:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl14:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl15:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl16:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl17:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl18:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl19:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl20:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl21:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl22:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl23:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl24:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl25:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('body:x:grid:grd:ctl26:ctrl_cbRfpAutoOpen', 'False');
    // formData.append('hdnSortExpressionbody_x_grid_grd', '');
    // formData.append('hdnSortDirectionbody_x_grid_grd', '');
    // formData.append('hdnCurrentPageIndexbody_x_grid_grd', '0');
    // formData.append('hdnRowCountbody_x_grid_grd', '151');
    // formData.append('maxpageindexbody_x_grid_grd', '5');
    // formData.append('ajaxrowsiscountedbody_x_grid_grd', 'False');
    // formData.append('CSRFToken', 'VCQanZoR%2BPBnmUrrtXEbzzV%2Fn5L9kCY0uDWP4giPHNM%3D');

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
        const attachmentTitle = $(row[1]).text().trim();
        return attachmentTitle;
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
