import fs from 'fs';
import libre from 'libreoffice-convert';

//libreoffice-convert needs LibreOffice to be installed
export const convertToPDF = async (inputPath: string, outputPath: string): Promise<void> => {
  if (!fs.existsSync(inputPath)) {
    throw new Error('File not found');
  }  
  
  return new Promise((resolve, reject) => {
    const extend = '.pdf';
    const file = fs.readFileSync(inputPath);
    
    libre.convert(file, extend, undefined, (err, done) => {
      if (err) {
        reject(err);
      }
      fs.writeFileSync(outputPath, done);
      resolve();
    });
  });
};
