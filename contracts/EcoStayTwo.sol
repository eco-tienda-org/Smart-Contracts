// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EcoStayTwo {

    // Definición de estructuras de datos
    struct Transaction {
        address user;
        uint256 amount;
        string token; // EWC o GCT
        uint256 timestamp;
    }

    struct Reward {
        address user;
        uint256 gctAmount;
        uint256 timestamp;
    }

    struct ExchangeRecord {
        address user;
        uint256 gctAmount;
        string reason;
        uint256 timestamp;
    }

    // Variables de estado
    address public owner;
    mapping(address => uint256) public ewcBalances;
    mapping(address => uint256) public gctBalances;
    Transaction[] public transactions;
    Reward[] public rewards;
    ExchangeRecord[] public exchanges; // Registro de intercambios

    // DAO Variables
    mapping(address => bool) public isVoter;
    mapping(address => uint256) public votes;

    // Eventos
    event TransactionRecorded(address indexed user, uint256 amount, string token, uint256 timestamp);
    event RewardDistributed(address indexed user, uint256 gctAmount, uint256 timestamp);
    event Voted(address indexed user, uint256 voteCount);
    event GCTExchanged(address indexed user, uint256 gctAmount, string reason, uint256 timestamp);

    // Modificadores
    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el propietario puede ejecutar esta funcion.");
        _;
    }

    modifier onlyVoters() {
        require(isVoter[msg.sender], "No tienes permiso para votar.");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Registro de transacciones
    function recordTransaction(address _user, uint256 _amount, string memory _token) public onlyOwner {
        transactions.push(Transaction(_user, _amount, _token, block.timestamp));

        if (keccak256(abi.encodePacked(_token)) == keccak256(abi.encodePacked("EWC"))) {
            ewcBalances[_user] += _amount;
        } else if (keccak256(abi.encodePacked(_token)) == keccak256(abi.encodePacked("GCT"))) {
            gctBalances[_user] += _amount;
        }

        emit TransactionRecorded(_user, _amount, _token, block.timestamp);
    }

    // Distribución de recompensas automáticas
    function distributeReward(address _user, uint256 _gctAmount) public onlyOwner {
        gctBalances[_user] += _gctAmount;
        rewards.push(Reward(_user, _gctAmount, block.timestamp));

        emit RewardDistributed(_user, _gctAmount, block.timestamp);
    }

    // Función para cambiar GCT y registrar motivo
    function exchangeGCT(address _user, uint256 _gctAmount, string memory _reason) public onlyOwner {
        require(gctBalances[_user] >= _gctAmount, "Saldo insuficiente de GCT para cambiar.");
        
        // Descontar GCT del balance del usuario
        gctBalances[_user] -= _gctAmount;
        
        // Registrar el cambio de GCT
        exchanges.push(ExchangeRecord(_user, _gctAmount, _reason, block.timestamp));

        emit GCTExchanged(_user, _gctAmount, _reason, block.timestamp);
    }

    // Función para obtener el registro completo de intercambios de GCT
    function getExchangeRecords() public view returns (ExchangeRecord[] memory) {
        return exchanges;
    }

    // **Nueva función** para obtener los registros de intercambios por usuario
    function getExchangeByUser(address _user) public view returns (ExchangeRecord[] memory) {
        uint256 count = 0;
        
        // Contar los intercambios realizados por el usuario
        for (uint256 i = 0; i < exchanges.length; i++) {
            if (exchanges[i].user == _user) {
                count++;
            }
        }

        // Crear un array temporal para almacenar los registros del usuario
        ExchangeRecord[] memory userExchanges = new ExchangeRecord[](count);
        uint256 index = 0;

        // Rellenar el array con los intercambios del usuario
        for (uint256 i = 0; i < exchanges.length; i++) {
            if (exchanges[i].user == _user) {
                userExchanges[index] = exchanges[i];
                index++;
            }
        }

        return userExchanges;
    }

    // Participación en la DAO
    function vote(uint256 _voteCount) public onlyVoters {
        votes[msg.sender] += _voteCount;
        emit Voted(msg.sender, _voteCount);
    }

    // Función para agregar votantes a la DAO
    function addVoter(address _voter) public onlyOwner {
        isVoter[_voter] = true;
    }

    // Función para remover votantes de la DAO
    function removeVoter(address _voter) public onlyOwner {
        isVoter[_voter] = false;
    }

    // Función para auditar el balance de un usuario
    function auditUser(address _user) public view returns (uint256 ewcBalance, uint256 gctBalance) {
        return (ewcBalances[_user], gctBalances[_user]);
    }

    // Retiro de fondos
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Recepción de fondos
    receive() external payable {}
}
