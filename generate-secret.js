// @file: generate-secret.js
// @source: < https://mojitocoder.medium.com/generate-a-random-jwt-secret-22a89e8be00d />

const crypto = require('crypto');

const lengthInBytes = parseInt(process.argv[2], 10);

if (![4, 8, 16, 32, 64, 128, 256].includes(lengthInBytes)) {
  console.error('Invalid length. Please choose from: 4, 8, 16, 32, 64, 128, 256');
  process.exit(1);
}

const secret = crypto.randomBytes(lengthInBytes).toString('hex');
console.log(secret);
