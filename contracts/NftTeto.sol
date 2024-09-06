// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NftTETO is ERC721 {
    uint256 private _count;

    constructor() ERC721("NftTETO", "NFTT"){}

    function mint() public{
        _count++;
        _mint(msg.sender,_count);
    }

    function tokenURI(uint256 tokenId) public pure virtual override returns (string memory){
        return string(
            abi.encodePacked("https://black-capitalist-swan-487.mypinata.cloud/ipfs/QmXgCjHNjVadHdFsWo6yGcdixF2aUsHuUubVLBqFMVVdfE/", 
            Strings.toString(tokenId),".json")
        );
    }

}