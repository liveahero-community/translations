// Node modules.
import _ from 'lodash';
import fs from 'fs-extra';
import appRoot from 'app-root-path';

// Global variables.
const sourceLocale = 'ja-JP';
const targetLocale = 'zh-TW';
const translatedRawDataRoot = `${appRoot}/translations/${targetLocale}`;
const catalogDataRoot = `${appRoot}/master-data/latest`;
const sourceCatalogDataPath = `${catalogDataRoot}/${sourceLocale}`;
const targetCatalogDataPath = `${catalogDataRoot}/${targetLocale}`;

const generate = async (from: string, to: string) => {
  const rawFilePath = `${translatedRawDataRoot}/${from}`;
  const rawData = await fs.readFile(rawFilePath, 'utf-8');
  const updatedDict = rawData.split(/\n/).reduce((dict, line) => {
    const [key, value] = line.split('=');
    dict[key] = value;
    return dict;
  }, {} as any);

  const baseFilePath = `${sourceCatalogDataPath}/${to}`;
  const baseData = await fs.readFile(baseFilePath, 'utf-8');
  const results = baseData.split(/\n/).reduce<string[]>((all, line) => {
    const [key, value] = line.split('=');
    if (updatedDict[key]) {
      all.push(`${key}=${updatedDict[key]}`);
    } else {
      all.push(`${key}=${value}`);
    }
    return all;
  }, []);

  const exportFilePath = `${targetCatalogDataPath}/${to}`;
  const exportText = results.join('\n');

  if (!await fs.pathExists(targetCatalogDataPath)) {
    await fs.mkdir(targetCatalogDataPath);
  }
  await fs.writeFile(exportFilePath, exportText);
}

const main = async () => {
  // Over-write by translated parts.
  await generate(
    'detail.properties',
    'Japanese.properties',
  );
};

main();
