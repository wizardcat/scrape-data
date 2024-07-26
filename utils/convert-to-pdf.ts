import fs from 'fs';
import libre from 'libreoffice-convert';

//libreoffice-convert needs LibreOffice to be installed
export const convertToPDF = async (inputPath: string, outputPath: string): Promise<void> => {
  console.log('inputPath: ', inputPath);
  console.log('outputPath: ', outputPath);
  
  return new Promise((resolve, reject) => {
    const extend = '.pdf';
    const file = fs.readFileSync(inputPath);
    console.log('file: ', file);
    
    libre.convert(file, extend, undefined, (err, done) => {
      if (err) {
        reject(err);
      }
      fs.writeFileSync(outputPath, done);
      resolve();
    });
  });
};
