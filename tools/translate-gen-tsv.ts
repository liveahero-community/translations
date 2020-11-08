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

  // File 3.
  const heroData = await fs.readJSON(`${appRoot}/master-data/latest/${locale}/CardMaster.json`);
  const sidekickData = await fs.readJSON(`${appRoot}/master-data/latest/${locale}/SidekickMaster.json`);
  const heroes = _.values(heroData);
  const sidekicks = _.values(sidekickData);
  const mappedHeroes: any[] = _.map(heroes, _.partialRight(_.pick, ['heroCardId', 'cardName', 'job', 'affiliationOffice']));
  const mappedSidekicks: any[] = _.map(sidekicks, _.partialRight(_.pick, ['sidekickCardId', 'cardName', 'job', 'affiliationOffice']));

  const heroText = mappedHeroes.map((data) => `${data.heroCardId}\t${data.cardName}\t${data.job}\t${data.affiliationOffice}`).join('\n');
  const sidekickText = mappedSidekicks.map((data) => `${data.sidekickCardId}\t${data.cardName}\t${data.job}\t${data.affiliationOffice}`).join('\n');

  await fs.writeFile(`${appRoot}/translations/${locale}/heroes.tsv`, heroText);
  await fs.writeFile(`${appRoot}/translations/${locale}/sidekicks.tsv`, sidekickText);
};

main();
