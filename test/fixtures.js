const faker = require('faker')

const newMember = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  gender: faker.random.boolean() === true ? 'male' : 'female',
  birthday: faker.date.past(),
  birthLocation: faker.address.city(),
  currentLocation: faker.address.city(),
  married: faker.random.boolean(),
  profession: faker.name.jobTitle(),
  company: faker.company.companyName(),
}

module.exports = {
  newMember,
}
