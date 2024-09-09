// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DaoToken{
    struct Proposal{
        uint256 id;
        string description;
        uint256 votes;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    //Crer una nueva propuesta
    function createProposal(string memory descriptio) public{
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, descriptio,0, false);
    }

    //crear funcion para la votacion de la propuesta
    function voteOnProposal(uint256 proposalId) public{
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Propuesta ya esta ejecutada");
        proposal.votes++;
    }

    //Ejecucion de la propuesta
    function executeProposal(uint256 proposalId) public{
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Propuesta ya esta ejecutada");
        proposal.executed = true;
    }

    // obtener el detalle de una propuesta
    function getProposal(uint256 proposalId) public view returns(uint256, string memory, uint256, bool){
        Proposal storage proposal = proposals[proposalId];
        return (proposal.id, proposal.description, proposal.votes, proposal.executed);
    }

}