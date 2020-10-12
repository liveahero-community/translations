// Node modules.
import fs from 'fs';
import _ from 'lodash';
// Local modules.
import SkillData from '../master-data/ja-JP/SkillMaster.json';
import StatusData from '../master-data/ja-JP/StatusMaster.json';

const main = async () => {
  // File 1.
  const skills = _.values(SkillData);
  const mappedSkills: any[] = _.map(skills, _.partialRight(_.pick, ['skillId', 'skillName', 'description']));

  const skillText = mappedSkills.map((data) => `${data.skillId}\t${data.skillName}\t${data.description}`).join('\n');

  fs.writeFileSync('./translations/ja-JP/skills.tsv', skillText, 'utf-8');

  // File 2.
  const statuses = _.values(StatusData);
  const mappedStatuses: any[] = _.map(statuses, _.partialRight(_.pick, ['statusId', 'statusName', 'description']));

  const statusText = mappedStatuses.map((data) => `${data.statusId}\t${data.statusName}\t${data.description}`).join('\n');

  fs.writeFileSync('./translations/ja-JP/statuses.tsv', statusText, 'utf-8');
};

main();
