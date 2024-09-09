const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Interacting with the contract using the account:", deployer.address);

    // Obtén el contrato DaoToken
    const DaoToken = await ethers.getContractFactory("DaoToken");
    const daoToken = await DaoToken.attach("0xdFD64f996366969BEE27287F9f50d0116D8ed467"); // Reemplaza con la dirección de tu contrato desplegado

    // Crea una nueva propuesta
    const proposalDescription = "Propuesta de aprender Traiding2";
    try {
        const createTx = await daoToken.createProposal(proposalDescription);
        await createTx.wait();
        console.log(`Propuesta creada con descripción: "${proposalDescription}"`);
    } catch (error) {
        console.error("Error al crear propuesta:", error);
    }

    // Vota en la propuesta con ID 1
    try {
        const voteTx = await daoToken.voteOnProposal(2);
        await voteTx.wait();
        console.log("Voto registrado para la propuesta con ID 2");
    } catch (error) {
        console.error("Error al votar en la propuesta:", error);
    }

    // Ejecuta la propuesta con ID 1
    try {
        const executeTx = await daoToken.executeProposal(2);
        await executeTx.wait();
        console.log("Propuesta con ID 2 ejecutada");
    } catch (error) {
        console.error("Error al ejecutar la propuesta:", error);
    }

    // Obtén detalles de la propuesta con ID 1
    try {
        const [id, description, votes, executed] = await daoToken.getProposal(2);
        console.log(`Detalles de la propuesta con ID 2:`);
        console.log(`ID: ${id}`);
        console.log(`Descripción: ${description}`);
        console.log(`Votos: ${votes}`);
        console.log(`Ejecutada: ${executed}`);
    } catch (error) {
        console.error("Error al obtener detalles de la propuesta:", error);
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
