import { ImLinkedin } from "react-icons/im";
const Footer = () => {
  return (
    <div className="flex w-full justify-between items-center px-4 py-4 border border-solid border-t-black shadow-2xl bg-[#e5dd99]">
      <a
        href="https://www.linkedin.com/in/kirill-ermakovich-b80989264/"
        className="flex items-center"
      >
        <ImLinkedin />
        <p className="text-sm ml-[2px]">My LinkedIn</p>
      </a>
      <p className="text-sm">Kirill Ermakovich 2023©</p>
    </div>
  );
};

export default Footer;
