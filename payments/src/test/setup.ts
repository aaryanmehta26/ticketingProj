import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

// telling typescript, there is signup property
declare global {
  var getCookie: (id?: string) => string[];
}

jest.mock('../nats-wrapper')

let mongo: any;

// before All run before our test
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// beforeEach run before each test
beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections();

  // reset all data in mongo collections
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// afterall run, after all tests complete
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.getCookie = (id?: string) => {
  // faking test 

  // build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com"
  }

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build the session object. {jwt: MY_JWT}
  const session = { jwt: token };

  // turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // tkae that json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // returns a string, that is the cookie with the encoded data
  return [`session=${base64}`];
};
