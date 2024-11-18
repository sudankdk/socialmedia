import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const nav = useNavigate();

  const handleNavigate = (route) => {
    nav(route);
  };

  return (
    <div className="flex flex-row w-full justify-between items-center p-5 bg-gray-800 text-white h-full">
      {/* JagireNepali on top */}
      <div className="pl-4 font-samarkan text-6xl text-center uppercase tracking-wider text-white">
        <span className="text-6xl">Jagire</span>
        <span className="text-6xl text-green-500">Nepali</span>
      </div>

      {/* Profile at the bottom */}
      <div className="pr-10">
        <h2
          className="text-4xl cursor-pointer hover:text-blue-400 transition duration-200"
          onClick={() => handleNavigate("/profile")}
        >
          <CgProfile />
        </h2>
      </div>
    </div>
  );
};

export default Navbar;
