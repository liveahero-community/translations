// Node modules.
import _ from 'lodash';
import fs from 'fs-extra';
import appRoot from 'app-root-path';
const opencc = require('node-opencc');

const isLegalFile = (fileName: string) => /.+\.(tsv|properties)/.test(fileName);

const main = async () => {
  const sourcePath = `${appRoot}/translations/zh-TW`;
  const targetPath = `${appRoot}/translations/zh-CN`;
  await fs.copy(sourcePath, targetPath);

  const allFileNames = await fs.readdir(targetPath);
  const fileNames = allFileNames.filter(isLegalFile);

  for await (const fileName of fileNames) {
    const filePath = `${targetPath}/${fileName}`;
    const traditionalText = await fs.readFile(filePath, 'utf-8');
    const simplifiedText = opencc.taiwanToSimplified(traditionalText);
    await fs.writeFile(filePath, simplifiedText, 'utf-8');
  }
};

main();
