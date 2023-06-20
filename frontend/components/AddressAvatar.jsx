import { useMemo } from "react";
import Blockies from "react-blockies";
import { minifyAddress } from "../helpers";

const AddressAvatar = ({ address }) => {
  const shortAddress = useMemo(() => minifyAddress(address), [address]);

  return (
    <div className="flex h-10 items-center">
      <Blockies
        scale={3}
        seed={address.toLowerCase()}
        className="mr-2 rounded-md"
      />
      <span className="text-xs font-semibold">{shortAddress}</span>
    </div>
  );
};

export default AddressAvatar;
