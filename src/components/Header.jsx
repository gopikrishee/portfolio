import { useState } from "react";

export default function Header() {
  const [selectedMenu, setMenu] = useState();

  function onChangeOption(menuName) {
    setMenu(menuName);
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/100 text-white font-bold text-xl">
          G
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {["Portfolio", "Blog"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="group text-sm font-semibold text-gray-900 hover:text-gray-500 transition-colors"
            onClick={()=>onChangeOption(item)}
          >
            {item}
            <div className={`h-0.5 w-0 group-hover:w-full bg-sky-500/100 transition-all duration-300 ${selectedMenu === item ? 'w-full' : ''}`}></div>
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <div>
        <button className="rounded-full bg-sky-500/100 px-8 py-2.5 text-sm font-medium text-white hover:bg-sky-500/75 transition-all shadow-md active:scale-95">
          Resume
        </button>
      </div>
    </nav>
  );
}
