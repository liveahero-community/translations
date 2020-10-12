// Node modules.
import fs from 'fs';
import _ from 'lodash';
import appRoot from 'app-root-path';
// Local modules.
import SkillData from '../master-data/ja-JP/SkillMaster.json';
import StatusData from '../master-data/ja-JP/StatusMaster.json';

const main = async () => {
  // File 1.
  const skillsRawData = fs.readFileSync(`${appRoot}/translations/zh-TW/skills.tsv`, 'utf-8');
  const updatedSkills = skillsRawData.split(/\n/).map((line) => {
    const [skillId, skillName, description] = line.split('\t');
    return { skillId, skillName, description };
  });

  updatedSkills.forEach((skill) => {
    Object.assign(_.get(SkillData, skill.skillId), {
      ...skill,
      skillId: Number(skill.skillId),
    });
  });

  const skillText = JSON.stringify(SkillData, null, 2) + '\n';

  fs.writeFileSync(`${appRoot}/master-data/zh-TW/SkillMaster.json`, skillText, 'utf-8');

  // File 2.
  const statusRawData = fs.readFileSync(`${appRoot}/translations/zh-TW/statuses.tsv`, 'utf-8');
  const updatedStatuses = statusRawData.split(/\n/).map((line) => {
    const [statusId, statusName, description] = line.split('\t');
    return { statusId, statusName, description };
  });

  updatedStatuses.forEach((status) => {
    Object.assign(_.get(StatusData, status.statusId), {
      ...status,
      statusId: Number(status.statusId),
    });
  });

  const statusText = JSON.stringify(StatusData, null, 2) + '\n';

  fs.writeFileSync(`${appRoot}/master-data/zh-TW/StatusMaster.json`, statusText, 'utf-8');
};

main();
