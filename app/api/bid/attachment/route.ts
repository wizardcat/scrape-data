import { documentsDirectory } from '@/common/config';
import { getDocument } from '@/services/get-document';
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
    const downloadPath = path.join('/tmp/', documentsDirectory);

    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }
    const downloadedFile = await getDocument(url, downloadPath);
    const fileData = fs.readFileSync(downloadedFile);
    
    // Clean up
    fs.unlinkSync(downloadedFile);
    
    try {
      // const contentType = getContentType(downloadedFile);  

      return new NextResponse(fileData, {
        headers: {
          // 'Content-Type': contentType,
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${downloadedFile}"`,
        },
      });
    } catch (error) {
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
