const hre = require("hardhat");

async function main() {
  // Obtén el contrato desplegado (asegúrate de tener la dirección correcta)
  const contractAddress = "0x232e76d8891B27B0CF9F59Aa61A7bf045551281a"; // Cambia por la dirección real
  const EcoStay = await hre.ethers.getContractFactory("EcoStayTwo");
  const ecoStay = await EcoStay.attach(contractAddress);

  // Obtener las cuentas para interactuar
  const [owner, addr1, addr2] = await hre.ethers.getSigners();

  // Registrar una transacción
  //const tx1 = await ecoStay.recordTransaction(addr1.address, 100, "GCT");
  //await tx1.wait();
  //console.log("Transacción registrada para", addr1.address);
  // Verificar balance de GCT para addr1
  const gctBalance1 = await ecoStay.gctBalances(addr2.address);
  console.log("Balance de GCT para", addr2.address, ":", gctBalance1.toString());

  // Distribuir recompensas
  const reward = await ecoStay.distributeReward(addr2.address, 50);
  await reward.wait();
  console.log("Recompensa distribuida a", addr2.address);

  const gctBalance2 = await ecoStay.gctBalances(addr2.address);
  console.log("Balance de GCT para", addr2.address, ":", gctBalance2.toString());

  // Intercambiar GCT
  const exchange = await ecoStay.exchangeGCT(addr2.address, 25, "Cambio por servicios de limpieza");
  await exchange.wait();
  console.log("GCT intercambiado por", addr2.address);

  // Verificar balance de GCT para addr1
  const gctBalance = await ecoStay.gctBalances(addr2.address);
  console.log("Balance de GCT para", addr1.address, ":", gctBalance.toString());

  // Obtener los intercambios por addr1
  const exchanges = await ecoStay.getExchangeByUser(addr2.address);
  console.log("Intercambios para", addr2.address, ":", exchanges);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
