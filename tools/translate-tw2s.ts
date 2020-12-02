// Node modules.
import _ from 'lodash';
import fs from 'fs-extra';
import appRoot from 'app-root-path';
import { OpenCC } from 'opencc';

const isLegalFile = (fileName: string) => /.+\.(tsv|properties)/.test(fileName);

const main = async () => {
  const sourcePath = `${appRoot}/translations/zh-TW`;
  const targetPath = `${appRoot}/translations/zh-CN`;
  await fs.copy(sourcePath, targetPath);

  const converter = new OpenCC('tw2s.json');

  const allFileNames = await fs.readdir(targetPath);
  const fileNames = allFileNames.filter(isLegalFile);

  for await (const fileName of fileNames) {
    const filePath = `${targetPath}/${fileName}`;
    const traditionalText = await fs.readFile(filePath, 'utf-8');
    const simpleText = await converter.convertPromise(traditionalText);
    await fs.writeFile(filePath, simpleText, 'utf-8');
  }
};

main();
