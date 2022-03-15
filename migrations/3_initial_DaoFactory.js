const DaoFactory = artifacts.require("DaoFactory");
module.exports = function (deployer) {
  deployer.deploy(DaoFactory);
};
