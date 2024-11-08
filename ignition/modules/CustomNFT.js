const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CustomNFT", (m) => {
    const customNFT = m.contract("CustomNFT");
    return { customNFT };
})