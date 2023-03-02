const twofactor = require("node-2fa");

const {
  secret,
  uri,
  qr
} = twofactor.generateSecret({ name: "My Awesome App", account: "johndoe" });

const fakeUser = {
  email: 'test@test.com',
  name: 'Bob',
  password: '123456',
  id: 1,
  secret,
  uri,
  qr
}

export default fakeUser;

console.log('-----')
console.log('user: ', fakeUser)
console.log('-----')