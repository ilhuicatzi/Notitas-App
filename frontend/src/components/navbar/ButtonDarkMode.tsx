import { useTheme } from "../../contexts/theme_provider";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function ButtonDarkMode() {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    setTheme(isDark ? "light" : "dark")
   // console.log(isDark);
  }

  return (
    <button onClick={toggleTheme} className="rounded-full p-2 text-lg hover:bg-zinc-200 dark:hover:bg-zinc-800">
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ButtonDarkMode