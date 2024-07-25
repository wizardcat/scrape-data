import { documentsDirectory } from '@/common/config';
import { downloadDocument } from '@/services/download-document';
import { getContentType } from '@/utils/get-content-type';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        [
          {
            code: 'missing_query_param',
            field: 'url',
            message: 'Query param url is required',
          },
        ],
        { status: 400 },
      );
    }
    // /public can't be used on Versel because app starts like services
    // const downloadPath = path.join(process.cwd(), 'public', documentsDirectory);
    // /tmp can't be used on Versel because of timeout limitation for hobby plan
    //to do: realize using external storage
    const downloadPath = path.join('/tmp/', documentsDirectory);

    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }
    const downloadedFile = await downloadDocument(url, downloadPath);
    const filePath = path.join(downloadPath, downloadedFile);
    console.log('filePath: ', filePath);

    const fileData = fs.readFileSync(filePath);

    // res.headers.set('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    // res.headers.set('Content-Type', 'application/pdf');
    // createReadStream(filePath).pipe(res);
    // const fileStream = createReadStream(filePath);

    // const response = new NextResponse(fileStream, {
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //   },
    // });

    // Clean up
    fs.unlinkSync(filePath);
    // return response;

    // return NextResponse.json({ url: filePath });

    try {
      // const fileName = await fsp.readFile(filePath);
      const contentType = getContentType(downloadedFile);  

      return new NextResponse(fileData, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `inline; filename="${downloadedFile}"`,
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      [
        {
          code: 'download_failed',
          message: 'Failed to download file',
          error: error,
        },
      ],
      { status: 500 },
    );
  }
}
