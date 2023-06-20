const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const NFTMarket = await ethers.getContractFactory("NFTMarket", owner);
    nftM = await NFTMarket.deploy();
    await nftM.deployed();
  });

  describe("createNFT", () => {
    it("creates NFT correctly", async function () {
      const tokenURI = "https://some-token.uri/";
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();
      const tokenID = await nftM._tokenIDs();
      const NFTItem = await nftM.items(tokenID);

      const createdTokenURI = await nftM.tokenURI(tokenID);
      expect(createdTokenURI).to.eq(tokenURI);

      const nftOwner = await nftM.ownerOf(tokenID);
      expect(user1.address).to.eq(nftOwner);

      expect(NFTItem.tokenId).to.equal(tokenID);
      expect(NFTItem.status).to.equal(0);
      expect(NFTItem.price).to.equal(0);
      expect(NFTItem.tokenURI).to.equal(createdTokenURI);
    });

    it("emit NFTTransfer event", async function () {
      const tokenURI = "https://some-token.uri/";
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      const tokenID = await nftM._tokenIDs();
      await expect(txCreate)
        .to.emit(nftM, "NFTTransfer")
        .withArgs(tokenID, ethers.constants.AddressZero, user1.address);
    });
  });

  describe("listNFT", () => {
    it("lists NFT correctly", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      const tokenID = await nftM._tokenIDs();

      const txList = await nftM.connect(user1).listNFT(tokenID, price);
      await txList.wait();

      const NFTItem = await nftM.items(tokenID);

      const nftOwner = await nftM.ownerOf(tokenID);
      expect(nftM.address).to.eq(nftOwner);

      const createdTokenURI = await nftM.tokenURI(tokenID);

      expect(NFTItem.tokenId).to.equal(tokenID);
      expect(NFTItem.status).to.equal(1);
      expect(NFTItem.tokenURI).to.equal(createdTokenURI);
      expect(NFTItem.price).to.equal(price);
    });

    it("emit NFTTransfer event", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();
      const tokenID = await nftM._tokenIDs();

      const txList = await nftM.connect(user1).listNFT(tokenID, price);
      await expect(txList)
        .to.emit(nftM, "NFTTransfer")
        .withArgs(tokenID, user1.address, nftM.address);
    });

    it('reverts if "NFTMarket: price must be greater than 0"', async function () {
      const tokenURI = "https://some-token.uri/";
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      await expect(nftM.connect(user1).listNFT(1, 0)).to.be.revertedWith(
        "NFTMarket: price must be greater than 0"
      );
    });

    it("reverts if called not by the owner", async function () {
      const tokenURI = "https://some-token.uri/";
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      await expect(nftM.connect(user2).listNFT(1, 123)).to.be.revertedWith(
        "ERC721: caller is not token owner or approved"
      );
    });
  });

  describe("CancelNFT", () => {
    it("cancel NFT correctly", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      const tokenID = await nftM._tokenIDs();

      const txList = await nftM.connect(user1).listNFT(tokenID, price);
      await txList.wait();

      const txCanc = await nftM.connect(user1).cancelListing(tokenID);
      await txCanc.wait();

      const NFTItem = await nftM.items(tokenID);

      const nftOwner = await nftM.ownerOf(tokenID);
      expect(user1.address).to.eq(nftOwner);

      const createdTokenURI = await nftM.tokenURI(tokenID);

      expect(NFTItem.tokenId).to.equal(tokenID);
      expect(NFTItem.status).to.equal(0);
      expect(NFTItem.tokenURI).to.equal(createdTokenURI);
      expect(NFTItem.price).to.equal(0);
    });

    it("emit NFTTransfer event", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();
      const tokenID = await nftM._tokenIDs();

      const txList = await nftM.connect(user1).listNFT(tokenID, price);
      await txList.wait();

      const txCanc = await nftM.connect(user1).cancelListing(tokenID);
      await expect(txCanc)
        .to.emit(nftM, "NFTTransfer")
        .withArgs(tokenID, nftM.address, user1.address);
    });

    it('reverts if "NFTMarket: nft not listed for sale"', async function () {
      const tokenURI = "https://some-token.uri/";
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();
      const tokenID = await nftM._tokenIDs();

      await expect(
        nftM.connect(user1).cancelListing(tokenID)
      ).to.be.revertedWith("NFTMarket: nft not listed for sale");
    });

    it("reverts if NFTMarket: you're not the seller", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();
      const tokenID = await nftM._tokenIDs();

      const txList = await nftM.connect(user1).listNFT(tokenID, price);
      await txList.wait();

      await expect(
        nftM.connect(user2).cancelListing(tokenID)
      ).to.be.revertedWith("NFTMarket: you're not the seller");
    });
  });

  describe("buyNFT", () => {
    it("buys NFT correctly", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      const tokenID = await nftM._tokenIDs();

      const txList = await nftM.connect(user1).listNFT(tokenID, price);
      await txList.wait();

      const txBuy = await nftM.connect(user2).buyNFT(tokenID, { value: price });
      await txBuy.wait();

      const NFTItem = await nftM.items(tokenID);

      const nftOwner = await nftM.ownerOf(tokenID);
      expect(nftOwner).to.equal(user2.address);

      const createdTokenURI = await nftM.tokenURI(tokenID);

      expect(NFTItem.tokenId).to.equal(tokenID);
      expect(NFTItem.status).to.equal(2);
      expect(NFTItem.tokenURI).to.equal(createdTokenURI);
      expect(NFTItem.price).to.equal(0);
    });

    it("emit NFTTransfer event", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();
      const tokenID = await nftM._tokenIDs();

      const txList = await nftM.connect(user1).listNFT(tokenID, price);
      await txList.wait();

      const txBuy = await nftM.connect(user2).buyNFT(tokenID, { value: price });
      await expect(txBuy)
        .to.emit(nftM, "NFTTransfer")
        .withArgs(tokenID, nftM.address, user2.address);
    });

    it('reverts if "NFTMarket: nft not listed for sale"', async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      await expect(
        nftM.connect(user2).buyNFT(1, { value: price })
      ).to.be.revertedWith("NFTMarket: nft not listed for sale");
    });

    it("reverts if value not equal to the NFT price", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      const txList = await nftM.connect(user1).listNFT(1, price);
      await txList.wait();

      await expect(
        nftM.connect(user2).buyNFT(1, { value: 100 })
      ).to.be.revertedWith("NFTMarket: incorrect price");
    });

    it("transfers ownership to the buyer and send the price to the seller", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 123;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      const txList = await nftM.connect(user1).listNFT(1, price);
      await txList.wait();
      const sellerProfit = Math.floor((price * 95) / 100);

      await expect(
        await nftM.connect(user2).buyNFT(1, { value: price })
      ).to.changeEtherBalance(user1, sellerProfit);

      const nftOwner = await nftM.ownerOf(1);
      expect(nftOwner).to.equal(user2.address);
    });
  });

  describe("withdrawFunds", () => {
    it("withdraws funds correctly", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 100;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      const txList = await nftM.connect(user1).listNFT(1, price);
      await txList.wait();

      const txBuy = await nftM.connect(user2).buyNFT(1, { value: price });
      await txBuy.wait();

      const ownerProfit = Math.floor((price * 5) / 100);
      await expect(
        await nftM.connect(owner).withdrawFunds()
      ).to.changeEtherBalance(owner, ownerProfit);
    });

    it("reverts if called not by the owner", async function () {
      const tokenURI = "https://some-token.uri/";
      const price = 100;
      const txCreate = await nftM.connect(user1).createNFT(tokenURI);
      await txCreate.wait();

      const txList = await nftM.connect(user1).listNFT(1, price);
      await txList.wait();

      const txBuy = await nftM.connect(user2).buyNFT(1, { value: price });
      await txBuy.wait();

      await expect(nftM.connect(user2).withdrawFunds()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
    it("reverts if called not by the owner", async function () {
      await expect(nftM.connect(owner).withdrawFunds()).to.be.revertedWith(
        "NFTMarket: balance is zero"
      );
    });
  });
});
