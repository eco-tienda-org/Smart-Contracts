const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require ("hardhat");

module.exports = buildModule("TetoToken",(m) => {
    const initialSuppy = m.getParameter("initialSupply", ethers.parseUnits("100",4));

    const token =  m.contract("TetoToken",[initialSuppy])

    return { token };
});
