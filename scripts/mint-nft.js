const { ethers } = require('hardhat');

async function main(){
    // direccion del contracto del NFT
    const contractAddress = "0x9c66d2d5adc7dfc4fa7c92481c62b2bf98b06864";

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