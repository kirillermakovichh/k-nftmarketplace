import TopBar from "./TopBar.jsx/index.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="relative flex h-full w-full flex-col pt-[56px] bg-[#eae7cd]">
      <TopBar />
      <div className="flex flex-col relative min-h-full overflow-y-auto overflow-x-hidden">
        <div className="pb-[90px] px-4 flex-auto">{children}</div>
        <Footer className="absolute bottom-0 w-full" />
      </div>
    </div>
  );
};

export default Layout;
