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
          <div className="flex items-center justify-center my-4 w-full xs:mb-2">
              <a
              href="https://youtu.be/VB2EB1s_jOg"
              target="_blank"
              className="bg-[#e85a4f] rounded-full px-2"
              >
                <p className="text-lg text-white font-mono font-semibold">VIDEO GUIDE</p>
              </a>
          </div>
          <div className="mx-auto mb-4">
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
