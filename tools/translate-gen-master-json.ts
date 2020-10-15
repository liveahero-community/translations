// Node modules.
import fs from 'fs';
import _ from 'lodash';
import appRoot from 'app-root-path';
import { ncp } from 'ncp';
// Local modules.
import SkillData from '../master-data/latest/ja-JP/SkillMaster.json';
import StatusData from '../master-data/latest/ja-JP/StatusMaster.json';

// Global variables.
const masterVersion = 'latest';
const sourceLocale = 'ja-JP';
const targetLocale = 'zh-TW';
const translatedRawDataRoot = `${appRoot}/translations/${targetLocale}`;
const masterDataRoot = `${appRoot}/master-data/${masterVersion}`;
const sourceMasterDataPath = `${masterDataRoot}/${sourceLocale}`;
const targetMasterDataPath = `${masterDataRoot}/${targetLocale}`;

const generate = (tsvName: string, jsonName: string, keys: string[], baseMasterData: any) => {
  const rawFilePath = `${translatedRawDataRoot}/${tsvName}.tsv`;
  const rawData = fs.readFileSync(rawFilePath, 'utf-8');
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

  fs.mkdirSync(targetMasterDataPath, { recursive: true });
  fs.writeFileSync(exportFilePath, exportText, 'utf-8');
}

const main = () => {
  ncp(sourceMasterDataPath, targetMasterDataPath, (err) => {
    console.log(`Copy ${sourceMasterDataPath} to ${targetMasterDataPath}`);

    if (err) {
      console.error(`Error: ${err}`);
    } else {
      // Over-write by translated parts.
      generate(
        'skills',
        'SkillMaster',
        ['skillId', 'skillName', 'description'],
        SkillData,
      );

      generate(
        'statuses',
        'StatusMaster',
        ['statusId', 'statusName', 'description'],
        StatusData,
      );
    }
  });
};

main();
