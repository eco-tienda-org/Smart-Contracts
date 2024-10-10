const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EcoStay", (m) => {
    const ecoEtay = m.contract("EcoStayTwo");
    return { ecoEtay };
})