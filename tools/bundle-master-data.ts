// Node modules.
import _ from 'lodash';
import fs from 'fs-extra';
import appRoot from 'app-root-path';
import { pack } from 'jsonpack';

const bundleFileName = 'bundles.compressed.json';

const main = async () => {
  const latestRootPath = `${appRoot}/master-data/latest`;
  const rootDirents = await fs.readdir(latestRootPath, { withFileTypes: true });
  const locales = rootDirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

  for await (const locale of locales) {
    const localePath = `${latestRootPath}/${locale}`;
    const allFileNames = await fs.readdir(localePath);
    const fileNames = allFileNames.filter(fileName => /.+\.json/.test(fileName) && fileName !== bundleFileName);

    const results: any = {};

    for await (const fileName of fileNames) {
      const rawText = await fs.readFile(`${localePath}/${fileName}`, 'utf-8');
      const jsonData = JSON.parse(rawText);

      results[fileName] = jsonData;
    }

    const bundleFilePath = `${localePath}/${bundleFileName}`;
    const bundleText = pack(results);
    await fs.writeFile(bundleFilePath, bundleText, 'utf-8');
  }
};

main();
