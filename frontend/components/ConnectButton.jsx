import useSigner from "@/state/signer";
import AddressAvatar from "./AddressAvatar";

const ConnectButton = () => {
  const { address, loading, connectWallet } = useSigner();

  if (address) return <AddressAvatar address={address} />;
  return (
    <button
      className="flex h-10 items-center justify-center rounded-full bg-black px-4 font-semibold text-white xs:px-0 xs:ml-2 xs:w-[110px] xs:text-sm"
      onClick={connectWallet}
      disabled={loading}
    >
      {loading ? "busy..." : "Connect wallet"}
    </button>
  );
};

export default ConnectButton;
