import faker from 'faker';

export function bookListFactory(n = 20) {
  return [...new Array(n)].map(bookFactory);
}

export function bookFactory() {
  return {
    _id: faker.datatype.uuid(),
    name: faker.lorem.words(),
    img:
      'https://st2.depositphotos.com/1105977/5461/i/600/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg',
    date: faker.date.past(),
    authorId: faker.datatype.uuid(),
    genre: faker.lorem.words(),
    otherAuthors: [...new Array(faker.datatype.number({ min: 1, max: 3 }))].map(faker.lorem.words),
    pageQuantity: faker.datatype.number({ min: 80, max: 1200 }),
    isPaid: faker.datatype.boolean(),
    description: faker.lorem.paragraph(),
  };
}
