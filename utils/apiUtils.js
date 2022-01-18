import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export function setFailedRequest(res, msg) {
  return res.status(400).json({ success: false, msg });
}

export function setSuccessfulRequest(res, data) {
  return res.status(200).json({ success: true, data });
}

export async function uploadFile(files, fieldName) {
  const oldPath = files[fieldName].filepath;
  const rawData = fs.readFileSync(oldPath);
  const relativePath = `/upload/${files[fieldName].originalFilename}`;
  const newPath = `${path.resolve('./public')}${relativePath}`;

  fs.writeFile(newPath, rawData, (error) => {
    if (error) {
      throw new Error('Error accured during writing file');
    }
  });
  return relativePath;
}

export function parseRequest(req) {
  return new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(new Error('Error accured during parsing'));
      }
      resolve({ fields, files });
    });
  });
}

export async function getImageLinkFromFiles(files) {
  if (Object.keys(files).length > 0) {
    return uploadFile(files, 'image');
  }
  return '';
}

export function setInputArray(fields, keyName, input) {
  const parsedData = JSON.parse(input);
  if (parsedData.length === 0) {
    // eslint-disable-next-line no-param-reassign
    fields[keyName] = [];
    return;
  }
  // eslint-disable-next-line no-param-reassign
  fields[keyName] = parsedData;
}
