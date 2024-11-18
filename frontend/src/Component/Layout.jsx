import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
