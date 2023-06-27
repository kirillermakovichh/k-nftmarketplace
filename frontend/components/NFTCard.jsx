import classNames from "classnames";
import { useEffect, useState } from "react";
import useSigner from "state/signer";
import useNFTMarket from "@/state";
import { ipfsToHTTPS } from "../helpers";
import AddressAvatar from "./AddressAvatar";
import SellPopup from "./SellPopup";
import Swal from "sweetalert2";
import Image from "next/image";

const NFTCard = (nft, className) => {
  const { address } = useSigner();
  const { listNFT, cancelListing, buyNFT } = useNFTMarket();
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(false);
  const [sellPopupOpen, setSellPopupOpen] = useState(false);
  useEffect(() => {
    const fetchMetadata = async () => {
      const metadataResponse = await fetch(ipfsToHTTPS(nft.nft.tokenURI));
      if (metadataResponse.status != 200) return;
      const json = await metadataResponse.json();
      setMeta({
        name: json.name,
        description: json.description,
        imageURL: ipfsToHTTPS(json.image),
      });
    };
    void fetchMetadata();
  }, [nft.nft.tokenURI]);

  const onButtonClick = async () => {
    if (nft.nft.owner == address) {
      if (forSale) onCancelClicked();
      else setSellPopupOpen(true);
    } else {
      if (forSale) onBuyClicked();
      else {
        throw new Error(
          "onButtonClick called when NFT is not owned and is not listed, should never happen"
        );
      }
    }
  };

  const onBuyClicked = async () => {
    setLoading(true);
    try {
      await buyNFT(nft.nft);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Purchased!!!',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onCancelClicked = async () => {
    setLoading(true);
    try {
      await cancelListing(nft.nft.tokenId);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Canceled!',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onSellConfirmed = async (price) => {
    setSellPopupOpen(false);
    setLoading(true);
    try {
      await listNFT(nft.nft.tokenId, price);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Listed for sale!',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const forSale = nft.nft.price != "0";

  if (
    //owned
    (nft.nft.status == 0 && nft.nft.owner == address) ||
    //listed
    nft.nft.status == 1 ||
    //bought
    (nft.nft.status == 2 && nft.nft.owner == address)
  ) {
    return (
      <div
        className={classNames(
          "flex w-64 flex-shrink-0 flex-col overflow-hidden rounded-xl border font-semibold shadow-2xl my-2 mx-4 border-black",
          className
        )}
      >
        {meta ? (
          <Image
            src={meta?.imageURL}
            alt={meta?.name}
            className="h-[280px] w-full object-cover object-center border-solid border border-black rounded-t-xl rounded-b-md"
          />
        ) : (
          <div className="flex h-[280px] w-full items-center justify-center">
            loading...
          </div>
        )}
        <div className="flex flex-col p-4">
          <p className="text-lg">{meta?.name ?? "..."}</p>
          <span className="text-sm font-normal flex-auto">
            {meta?.description ?? "..."}
          </span>
          <AddressAvatar address={nft.nft.owner} />
        </div>
        <button
          className={`group flex h-16 items-center justify-center bg-black text-lg font-semibold text-white ${
            nft.nft.owner == address ? "" : ""
          }`}
          onClick={onButtonClick}
          disabled={loading}
        >
          {loading && "Busy..."}
          {!loading && (
            <>
              {!forSale && "SELL"}
              {forSale && nft.nft.owner == address && (
                <>
                  <span className="group-hover:hidden">
                    {nft.nft.price / 10 ** 18} ETH
                  </span>
                  <span className="hidden group-hover:inline">CANCEL</span>
                </>
              )}
              {forSale && nft.nft.owner !== address && nft.nft.status == 1 && (
                <>
                  <span className="group-hover:hidden">
                    {nft.nft.price / 10 ** 18} ETH
                  </span>
                  <span className="hidden group-hover:inline">PURCHASE</span>
                </>
              )}
            </>
          )}
        </button>
        <SellPopup
          open={sellPopupOpen}
          onClose={() => setSellPopupOpen(false)}
          onSubmit={onSellConfirmed}
        />
      </div>
    );
  }
};

export default NFTCard;
