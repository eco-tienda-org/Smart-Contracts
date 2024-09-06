const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NftTeto", (m) => {
    const nftTeto =  m.contract("NftTETO");
    return { nftTeto };
});