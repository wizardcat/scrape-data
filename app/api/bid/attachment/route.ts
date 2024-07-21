import { documentsDirectory } from '@/common/config';
import { downloadDocument } from '@/services/download-document';
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

    // const downloadPath = path.join(process.cwd(), 'public', documentsDirectory);
    // const downloadPath = path.join(__dirname, 'public', documentsDirectory);
    const downloadPath = path.join('/', 'public', documentsDirectory);
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

    // res.headers.set('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    // res.headers.set('Content-Type', 'application/pdf');

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
    
    return new NextResponse(fileData, {
      headers: {
        'Content-Type': 'application/pdf',
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
