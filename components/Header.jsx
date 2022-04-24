import React from 'react';

function Header() {
  return (
    <header className="bg-[#524153] py-2 px-5 md:px-10">
      <div className="flex place-content-between place-items-center">
        <div className="">
          <img src="/img/logo/International_Pokemon_logo.png" alt="" />
        </div>
        <div className="w-8/12">
          <input
            className="flex w-full py-2 px-5 outline-none rounded-md"
            type="search"
            name=""
            id=""
          />
        </div>
        <div>
          <button className="bg-[#7E7394] text-white border-2 border-[#100B16] py-2 px-8 rounded-md">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
