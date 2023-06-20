import classNames from "classnames";
import CreationForm from "./CreationForm";
import useSigner from "@/state/signer";
import useNFTMarket from "@/state";

const CreationPage = () => {
  const { signer } = useSigner();
  const { createNft } = useNFTMarket();

  return (
    <div className={classNames("flex h-full w-full flex-col pt-4")}>
      {signer ? (
        <CreationForm onSubmit={createNft} />
      ) : (
        <>
          <div className="text-center mt-6">
            <span className="bg-[#e85a4f] rounded-full font-bold text-xl px-2 py-1">
              Connect your wallet please:)
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CreationPage;
