import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './../../icons/logo';

const NavBar: React.FC = () => (
  <nav className="bg-[#222] shadow-md">
    <div className="flex flex-wrap items-center justify-between p-4">
      <Link to="/">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#3D9939]">News</span>
        </div>
      </Link>
      <Link to="/Personal">
        <div className="block py-2 px-3 text-[#3D9939] md:p-0" aria-current="page">Personalized</div>
      </Link>
    </div>
  </nav>
);

export default NavBar;
