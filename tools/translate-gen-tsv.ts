// Node modules.
import _ from 'lodash';
import fs from 'fs-extra';
import appRoot from 'app-root-path';

const [locale] = process.argv.slice(2);

const main = async () => {
  // File 1.
  const skillData = await fs.readJSON(`${appRoot}/master-data/latest/${locale}/SkillMaster.json`);
  const skills = _.values(skillData);
  const mappedSkills: any[] = _.map(skills, _.partialRight(_.pick, ['skillId', 'skillName', 'description']));

  const skillText = mappedSkills.map((data) => `${data.skillId}\t${data.skillName}\t${data.description}`).join('\n');

  await fs.writeFile(`${appRoot}/translations/${locale}/skills.tsv`, skillText);

  // File 2.
  const statusData = await fs.readJSON(`${appRoot}/master-data/latest/${locale}/StatusMaster.json`);
  const statuses = _.values(statusData);
  const mappedStatuses: any[] = _.map(statuses, _.partialRight(_.pick, ['statusId', 'statusName', 'description']));

  const statusText = mappedStatuses.map((data) => `${data.statusId}\t${data.statusName}\t${data.description}`).join('\n');

  await fs.writeFile(`${appRoot}/translations/${locale}/statuses.tsv`, statusText);
};

main();
