// enables use of ES6 syntax
require('babel-core/register')({
  ignore: /node_modules/
});

// assertion with async
chai = require('chai');
chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
expect = chai.expect;
