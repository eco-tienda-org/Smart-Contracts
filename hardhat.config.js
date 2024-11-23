require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache:{
      url: "http://127.0.0.1:7545", // URL correcta de Ganache
      chainId: 1337, // ID de red
      accounts: [
          "0x52d54775251184dbb7cbdff4cddecba764ff902bb31ac66bf9621ca3c179060e"
      ]
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
