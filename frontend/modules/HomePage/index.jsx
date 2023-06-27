import NFTCard from "@/components/NFTCard";
import useSigner from "@/state/signer";
import useNFTs from "@/state/useNFTs";

const HomePage = () => {
  const { lsNFTs } = useNFTs();
  const { signer } = useSigner();

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
      {signer && (
        <>
          <div className="flex items-center justify-center my-2 w-full xs:mb-2">
              <a
              href="https://www.youtube.com/channel/UC_7OQZMa8eHONCjMklrYvZg"
              target="_blank"
              className="bg-[#e85a4f] rounded-full px-2"
              >
                <p className="text-lg text-white font-mono font-semibold">VIDEO GUIDE</p>
              </a>
          </div>
          <div className="my-6 relative h-[1px] w-full flex-shrink-0 bg-[#e85a4f] xs:mb-2">
            <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-black bg-inherit rounded-full px-2 font-mono font-semibold">
              MARKETPLACE
            </div>
          </div>
          <div className="my-4 mx-auto xs:my-2">
            <p className="text-center bg-[#e85a4f] px-2 font-mono font-semibold rounded-full inline-block xxs:text-xs">
              ⬇⬇⬇ Here you can buy some cool NFTs ⬇⬇⬇
            </p>
          </div>
        </>
      )}
      <div className="flex flex-wrap sm:items-center sm:justify-center">
        {signer &&
          lsNFTs &&
          lsNFTs.map((event, i) => (
            <NFTCard
              nft={lsNFTs[i]}
              key={lsNFTs[i].tokenId}
              className="my-2 mx-2"
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
