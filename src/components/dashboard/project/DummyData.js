import { faker } from '@faker-js/faker';

export function createRandomProject() {
  return {
    projectName: faker.company.bs(),
    projectLogo: faker.image.url(),
    projectKey: faker.lorem.word(5),
    creator: {
      name: faker.person.firstName(),
      image: faker.image.avatar(),
    },
    description: faker.lorem.lines(2),
  };
}

export const PROJECTS = faker.helpers.multiple(createRandomProject, {
  count: 5,
});
