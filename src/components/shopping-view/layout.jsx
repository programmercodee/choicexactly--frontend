import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden items-center ">
      {/* common header */}

      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>


      <footer class="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800  w-full mx-auto ">
        <div class="w-full mx-auto max-w-screen-xl p-4 flex-col md:flex-row items-center flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" class="hover:underline">ChoiceXactly™</a>. All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
      </footer>

    </div>
  );
}

export default ShoppingLayout;
