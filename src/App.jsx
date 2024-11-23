import { AiOutlineSolution } from "react-icons/ai";
import ToDoHelp from "./pages/to-do-help/to-do-help";
import { useEffect, useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve saved theme from localStorage or use system preference
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    // Add or remove dark class on the HTML element
    document.documentElement.classList.toggle("dark", isDarkMode);

    // Save preference in localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <div className="font-serif">
      <div className="flex flex-row">
        <div className="w-fit bg-gray-100 dark:bg-slate-700 p-2">
          {/* logosection */}
          <div className="text-black dark:text-white font-bold text-sm flex flex-row items-center gap-2">
            <img src="/icon.png" alt="logo" width={30} />
            My TODOs help
          </div>
          {/* bar section */}
          <div className="m-2 p-1">
            <ul>
              <li className="bg-white dark:bg-slate-800 text-black dark:text-white font-black flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 p-3 rounded-xl hover:bg-gray-600">
                <AiOutlineSolution />
                Tasks
              </li>
            </ul>
          </div>
          {/* setting section */}
          {/* Setting Section */}
          <div className="mt-5">
            <button
              className="btn btn-default dark:bg-slate-800 bg-gray-100 text-black dark:text-white rounded-md p-2"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        </div>

        <div className="flex-grow dark:bg-slate-800 bg-gray-100">
          <ToDoHelp />
        </div>
      </div>
      {/* footer */}
      <div className="bg-black text-white position-relative bottom-0 text-center">
        @my-to-dos-help
      </div>
    </div>
  );
}

export default App;
