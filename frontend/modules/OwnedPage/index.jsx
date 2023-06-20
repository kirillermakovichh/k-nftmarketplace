import NFTCard from "@/components/NFTCard";
import useSigner from "@/state/signer";
import useNFTs from "@/state/useNFTs";

const OwnedPage = () => {
  const { owNFTs, lsNFTs, btNFTs } = useNFTs();
  const { signer, address } = useSigner();

  const owLsNFTs = [];
  if (lsNFTs) {
    lsNFTs.filter((el, i) => {
      if (lsNFTs[i].owner == address) {
        owLsNFTs.push(lsNFTs[i]);
      }
    });
  }

  return (
    <div className="flex w-full flex-col ">
      {!signer && (
        <>
          <div className="text-center my-10">
            <span className="bg-[#e85a4f] rounded-full font-bold text-xl px-2 py-1">
              Connect your wallet please:)
            </span>
          </div>
        </>
      )}
      {signer && owNFTs && (
        <>
          <div className="my-6 relative h-[1px] w-full flex-shrink-0 bg-[#e85a4f]">
            <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-black bg-inherit px-2 font-mono font-semibold rounded-full">
              OWNED
            </div>
          </div>
        </>
      )}
      <div className="flex flex-wrap sm:items-center sm:justify-center">
        {signer &&
          owNFTs &&
          owNFTs.map((event, i) => (
            <NFTCard
              nft={owNFTs[i]}
              key={owNFTs[i].tokenId}
              className="my-2 mx-2"
            />
          ))}
      </div>
      {signer && btNFTs && (
        <>
          <div className="my-6 relative h-[1px] w-full flex-shrink-0 bg-[#e85a4f]">
            <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-black bg-inherit px-2 font-mono font-semibold rounded-full">
              PURCHASES
            </div>
          </div>
        </>
      )}
      <div className="flex flex-wrap sm:items-center sm:justify-center">
        {signer &&
          btNFTs &&
          btNFTs.map((event, i) => (
            <NFTCard
              nft={btNFTs[i]}
              key={btNFTs[i].tokenId}
              className="my-2 mx-2"
            />
          ))}
      </div>
      {signer && lsNFTs && (
        <>
          <div className="my-6 relative h-[1px] w-full flex-shrink-0 bg-[#e85a4f]">
            <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-black bg-inherit px-2 font-mono font-semibold rounded-full">
              FOR SALE
            </div>
          </div>
        </>
      )}
      <div className="flex flex-wrap sm:items-center sm:justify-center">
        {signer &&
          lsNFTs &&
          owLsNFTs.map((event, i) => (
            <NFTCard
              nft={owLsNFTs[i]}
              key={owLsNFTs[i].tokenId}
              className="my-2 mx-2"
            />
          ))}
      </div>
    </div>
  );
};

export default OwnedPage;
