import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NFTMarket from "../utils/NFTMarket.json";

const useNFTs = () => {
  const [ownedNFTsLogs, setOwnedNFTsLogs] = useState([]);
  const [listedNFTsLogs, setListedNFTsLogs] = useState([]);
  const [boughtNFTsLogs, setBoghtNFTsLogs] = useState([]);

  const distributeNFTItems = async () => {
    const NFT_MARKET_ADDRESS = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const nftContract = new ethers.Contract(
      NFT_MARKET_ADDRESS,
      NFTMarket.abi,
      provider
    );
    const ownedNFT = [];
    const listedNFT = [];
    const boughtNFT = [];

    for (let i = 1; i <= (await nftContract._tokenIDs()); i++) {
      const item = await nftContract.items(i);
      if (item.status == 0) {
        console.log(0);
        ownedNFT.push(item);
      }
      if (item.status == 1) {
        console.log(1);
        listedNFT.push(item);
      }
      if (item.status == 2) {
        console.log(2);
        boughtNFT.push(item);
      }
    }

    setOwnedNFTsLogs((oldState) => [...oldState, ownedNFT]);
    setListedNFTsLogs((oldState) => [...oldState, listedNFT]);
    setBoghtNFTsLogs((oldState) => [...oldState, boughtNFT]);
  };

  const owNFTs = ownedNFTsLogs[0];
  const lsNFTs = listedNFTsLogs[0];
  const btNFTs = boughtNFTsLogs[0];

  useEffect(() => {
    distributeNFTItems();
  }, []);

  return { owNFTs, lsNFTs, btNFTs };
};

export default useNFTs;
