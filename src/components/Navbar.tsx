
import { Link, useLocation } from "react-router-dom";
import { NewspaperIcon } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <NewspaperIcon className="w-8 h-8 text-slate-700" />
            <span className="text-xl font-semibold text-slate-700">Balanced News</span>
          </Link>
          
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                location.pathname === "/" ? "text-slate-900" : "text-slate-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                location.pathname === "/about" ? "text-slate-900" : "text-slate-600"
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
