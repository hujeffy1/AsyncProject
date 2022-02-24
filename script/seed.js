'use strict';

const {
  db,
  models: { User },
} = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ username: 'Gura', password: '123' }),
    User.create({ username: 'Amelia', password: '123' }),
    User.create({ username: 'Ina', password: '123' }),
    User.create({ username: 'Calli', password: '123' }),
    User.create({ username: 'Kiara', password: '123' }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      Gura: users[0],
      Amelia: users[1],
      Ina: users[2],
      Calli: users[3],
      Kiara: users[4],
    },
  };
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
