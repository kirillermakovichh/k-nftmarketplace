// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    Counters.Counter public _tokenIDs;

    enum NFTStatus {
        Owned,
        Listed,
        Bought
    }
    struct NFTItem {
        address owner;
        NFTStatus status;
        uint tokenId;
        string tokenURI;
        uint price;
    }

    mapping(uint => NFTItem) public items;

    event NFTTransfer(
        uint256 indexed tokenID,
        address indexed from,
        address indexed to
    );

    constructor() ERC721("BLAB's NFTs", "BLANFT") {}

    function createNFT(string calldata tokenURI) public {
        _tokenIDs.increment();
        uint256 currentID = _tokenIDs.current();
        _safeMint(msg.sender, currentID);
        _setTokenURI(currentID, tokenURI);

        items[currentID] = NFTItem({
            owner: msg.sender,
            status: NFTStatus(0),
            tokenId: currentID,
            tokenURI: tokenURI,
            price: 0
        });
        emit NFTTransfer(currentID, address(0), msg.sender);
    }

    function listNFT(uint256 tokenID, uint256 price) public {
        NFTItem storage item = items[tokenID];
        require(price > 0, "NFTMarket: price must be greater than 0");
        transferFrom(msg.sender, address(this), tokenID);

        item.status = NFTStatus(1);
        item.price = price;

        emit NFTTransfer(tokenID, msg.sender, address(this));
    }

    function buyNFT(uint256 tokenID) public payable {
        NFTItem storage item = items[tokenID];
        require(item.price > 0, "NFTMarket: nft not listed for sale");
        require(msg.value == item.price, "NFTMarket: incorrect price");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        address prevOwner = items[tokenID].owner;
        uint256 reward = items[tokenID].price;
        items[tokenID].owner = msg.sender;
        items[tokenID].status = NFTStatus(2);
        items[tokenID].price = 0;
        payable(prevOwner).transfer(reward.mul(95).div(100));

        emit NFTTransfer(tokenID, address(this), msg.sender);
    }

    function cancelListing(uint256 tokenID) public {
        NFTItem storage item = items[tokenID];
        require(item.price > 0, "NFTMarket: nft not listed for sale");
        require(item.owner == msg.sender, "NFTMarket: you're not the seller");

        item.owner = msg.sender;
        item.status = NFTStatus(0);
        item.price = 0;

        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);

        emit NFTTransfer(tokenID, address(this), msg.sender);
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "NFTMarket: balance is zero");
        payable(msg.sender).transfer(balance);
    }
}
