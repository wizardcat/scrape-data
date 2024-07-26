import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const fetchExcelData = async (url: any) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  const data = new Uint8Array(response.data);
  const workbook = XLSX.read(data, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  return jsonData;
};

export const XLSXDoc = (src: string) => {
  const [excelData, setExcelData] = useState<unknown[] | undefined>(undefined);
  // const data = new Uint8Array(event.target.result);

  useEffect( () => {
    if (!src) return;
    async function getData() {
    const document = await fetchExcelData(src);
    setExcelData(document);
    }
    getData();
  }, [src]);

  return (
    // <div className="shadow-lg w-full bg-white text-base rounded-md group mt-10 max-w-md border-gray-300 p-4">
    //   <p className="text-gray-500 text-center">No bid details found.</p>
    // </div>

    <div>
      {excelData && (
        <div>
          <h3>Excel Data:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};