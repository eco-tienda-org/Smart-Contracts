const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Dao", (m) => {
    const dao = m.contract("DaoToken");
    return { dao };
})