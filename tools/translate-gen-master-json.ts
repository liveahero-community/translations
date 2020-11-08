// Node modules.
import _ from 'lodash';
import fs from 'fs-extra';
import appRoot from 'app-root-path';
// Local modules.
import SkillData from '../master-data/latest/ja-JP/SkillMaster.json';
import StatusData from '../master-data/latest/ja-JP/StatusMaster.json';
import HeroData from '../master-data/latest/ja-JP/CardMaster.json';
import SidekickData from '../master-data/latest/ja-JP/SidekickMaster.json';

// Global variables.
const masterVersion = 'latest';
const sourceLocale = 'ja-JP';
const targetLocale = 'zh-TW';
const translatedRawDataRoot = `${appRoot}/translations/${targetLocale}`;
const masterDataRoot = `${appRoot}/master-data/${masterVersion}`;
const sourceMasterDataPath = `${masterDataRoot}/${sourceLocale}`;
const targetMasterDataPath = `${masterDataRoot}/${targetLocale}`;

const generate = async (tsvName: string, jsonName: string, keys: string[], baseMasterData: any) => {
  const rawFilePath = `${translatedRawDataRoot}/${tsvName}.tsv`;
  const rawData = await fs.readFile(rawFilePath, 'utf-8');
  const updatedList = rawData.split(/\n/).map((line) => {
    const tokens = line.split('\t');
    const row = _.zipObject(keys, tokens);
    return row;
  });

  updatedList.forEach((row) => {
    const idKey = keys[0];
    const id = row[idKey];
    Object.assign(_.get(baseMasterData, id), {
      ...row,
      [idKey]: Number(id),
    });
  });

  const exportFilePath = `${targetMasterDataPath}/${jsonName}.json`;
  const exportText = JSON.stringify(baseMasterData, null, 2);

  if (!await fs.pathExists(targetMasterDataPath)) {
    await fs.mkdir(targetMasterDataPath);
  }
  await fs.writeFile(exportFilePath, exportText);
}

const main = async () => {
  await fs.copy(sourceMasterDataPath, targetMasterDataPath);
  console.log(`Copy ${sourceMasterDataPath} to ${targetMasterDataPath}`);

  // Over-write by translated parts.
  await generate(
    'skills',
    'SkillMaster',
    ['skillId', 'skillName', 'description'],
    SkillData,
  );

  await generate(
    'statuses',
    'StatusMaster',
    ['statusId', 'statusName', 'description'],
    StatusData,
  );

  await generate(
    'heroes',
    'CardMaster',
    ['heroCardId', 'cardName', 'job', 'affiliationOffice'],
    HeroData,
  );

  await generate(
    'sidekicks',
    'SidekickMaster',
    ['sidekickCardId', 'cardName', 'job', 'affiliationOffice'],
    SidekickData,
  );
};

main();
