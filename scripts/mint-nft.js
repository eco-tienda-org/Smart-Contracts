const { ethers } = require('hardhat');

async function main(){
    // direccion del contracto del NFT
    const contractAddress = "0x86C4e9496c4Ac28A9CFC14c312E3F5EE6EdF644d";

    // obtener el contrato a partir del contrato ABI
    const NftTeto =  await ethers.getContractFactory('NftTETO');
    const nftContract = await NftTeto.attach(contractAddress);

    // llamar la funcion mint del contrato
    const mintTX =  await nftContract.mint();

    // Esperar la transaccion que sea confirmada
    await mintTX.wait();

    console.log(`NFT minteado con exito. Transaction hash: ${mintTX.hash}`)
    console.log(JSON.stringify(mintTX));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})