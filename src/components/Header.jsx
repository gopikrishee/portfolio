import { useState } from "react";

export default function Header() {

  const [selectedMenu, setMenu] = useState();

  function onChangeOption(menuName){
    setMenu(menuName);
  }

  return (
    <nav class="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-center gap-12">
          <a href="#" class="group flex flex-col items-center" onClick={()=>onChangeOption('portfolio')}>
            <span className={`text-lg font-semibold tracking-wide text-gray-900 group-hover:text-indigo-600 transition-colors ${selectedMenu === 'portfolio' ? 'text-indigo-600' : ''}`}>
              Portfolio
            </span>
            <div class={`h-0.5 w-0 group-hover:w-full bg-indigo-600 transition-all duration-300 ${selectedMenu === 'portfolio' ? 'w-full' : ''}`}></div>
          </a>

          <a href="#" class="group flex flex-col items-center"onClick={()=>onChangeOption('blogs')}>
            <span className={`text-lg font-semibold tracking-wide text-gray-900 group-hover:text-indigo-600 transition-colors ${selectedMenu === 'blogs' ? 'text-indigo-600' : ''}`}>
              Blogs
            </span>
            <div className={`h-0.5 w-0 group-hover:w-full bg-indigo-600 transition-all duration-300 ${selectedMenu === 'blogs' ? 'w-full' : ''}`}></div>
          </a>
        </div>
      </div>
    </nav>
  );
}
