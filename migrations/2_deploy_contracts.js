var Todo = artifacts.require("TodoList");

module.exports = function(deployer) {
    deployer.deploy(Todo);
};
