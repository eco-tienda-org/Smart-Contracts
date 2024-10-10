require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache:{
      url: "http://127.0.0.1:7545"
    },
    besu:{
      url: "http://localhost:8545"
    },
    besuWallet: {
      url: "http://localhost:8545",
      accounts: {
        mnemonic: "foam enter bike alcohol prepare sad pill report hotel pizza solve pen",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 1,
        passphrase: "",
      },
    },
  }
};
