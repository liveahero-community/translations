// Node modules.
import _ from 'lodash';
import fs from 'fs';
import fetch from 'node-fetch';
import appRoot from 'app-root-path';

const FETCH_OPTIONS = {
  headers: { 'User-Agent': 'LiveAHeroAPI' },
};

const getVersion = async (url: string) => {
  const res = await fetch(url, FETCH_OPTIONS);
  // {"result":true,"message":"","client":"1.0.3","master":33}
  const { client, master } = await res.json();

  return {
    appVersion: client,
    masterVersion: master,
  };
};

const getDataList = async (url: string) => {
  const res = await fetch(url, FETCH_OPTIONS);
  // { "CardMaster": "7b6414cc5f7d1addf5c1ed7004e27073@113374", ...
  const data = await res.json();
  const dataList = Object.keys(data);

  return dataList;
};

const download = async (url: string, filedir: string, filename: string, isJson = true) => {
  const res = await fetch(url, FETCH_OPTIONS);
  const data = isJson ? await res.json() : await res.text();

  fs.mkdirSync(filedir, { recursive: true });

  const text = isJson ? JSON.stringify(data, null, 2) : data;
  fs.writeFileSync(`${filedir}/${filename}`, text, { encoding: 'utf-8' });
};

const main = async () => {
  // Step 1: get app version info.
  const versionApiUrl = 'https://gateway.live-a-hero.jp/api/status/version';
  const { appVersion, masterVersion } = await getVersion(versionApiUrl);

  // Store the version info.
  if (!appVersion || !masterVersion) {
    console.warn('Cannot get version from server');
    process.exit(0);
  }

  fs.writeFileSync(
    `${appRoot}/master-data/AppVersion`,
    String(appVersion),
  );
  fs.writeFileSync(
    `${appRoot}/master-data/MasterVersion`,
    String(masterVersion),
  );
  fs.writeFileSync(
    `${appRoot}/master-data/version.json`,
    JSON.stringify({ appVersion, masterVersion }, null, 2),
  );
  console.log(`Version: ${appVersion} / ${masterVersion}`);

  // Step 2: get master data JSON.
  const masterDataBaseUrl = `https://d1itvxfdul6wxg.cloudfront.net/datas/master/${masterVersion}`;
  const masterDataCatalogUrl = `${masterDataBaseUrl}/MasterDataCatalog`;
  
  const masterDataList = await getDataList(masterDataCatalogUrl);

  masterDataList.forEach((masterDataItem) => {
    const url = `${masterDataBaseUrl}/${masterDataItem}`;
    download(
      url,
      `${appRoot}/master-data/${masterVersion}/ja-JP`,
      `${masterDataItem}.json`,
    );
    download(
      url,
      `${appRoot}/master-data/latest/ja-JP`,
      `${masterDataItem}.json`,
    );
    console.log(`Save ${url}`);
  });

  // Step 3: get catalog data.
  const catalogDataUrl = `https://d1itvxfdul6wxg.cloudfront.net/datas/catalog/Japanese.properties`;
  download(
    catalogDataUrl,
    `${appRoot}/master-data/latest/ja-JP`,
    `Japanese.properties`,
    false,
  );
  console.log(`Save ${catalogDataUrl}`);
};

main();
