import { Contract } from "ethers";
import NFT_MARKET from "../utils/NFTMarket.json";
import useSigner from "./signer";

const NFT_MARKET_ADDRESS = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS;

const useNFTMarket = () => {
  const { signer } = useSigner();
  const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);

  const createNft = async (values) => {
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("image", values.image);
      const response = await fetch("api/nft_storage", {
        method: "POST",
        body: data,
      });
      if (response.status == 201) {
        const json = await response.json();
        const transaction = await nftMarket.createNFT(json.uri);
        await transaction.wait();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const listNFT = async (tokenId, price) => {
    const transaction = await nftMarket.listNFT(tokenId, price);
    await transaction.wait();
  };

  const cancelListing = async (tokenID) => {
    const transaction = await nftMarket.cancelListing(tokenID);
    await transaction.wait();
  };

  const buyNFT = async (nft) => {
    const transaction = await nftMarket.buyNFT(nft.tokenId, {
      value: nft.price.toString(),
    });
    await transaction.wait();
  };

  return { createNft, listNFT, cancelListing, buyNFT };
};

export default useNFTMarket;
