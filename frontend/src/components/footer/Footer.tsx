import { SiGithub } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";

function Footer() {
  return (
    <footer className="bg-zinc-200 dark:bg-zinc-950 w-full flex justify-center px-10">
  <section className="container my-5 flex justify-between items-center">
    <article>
        <p className="text-xs font-extralight dark:text-zinc-500 text-zinc-500  mb-1"> <code>g.ilhuicatzi@gmail.com</code></p>
        <p className="flex gap-3 items-center">
          <SiGithub className="w-5 h-5 text-zinc-700 hover:text-zinc-900 dark:text-zinc-700 hover:dark:text-zinc-300  dark:hover:scale-125 hover:scale-125  inline-block transition duration-300" />
          <SiLinkedin className="w-5 h-5 text-zinc-700 hover:text-zinc-900 dark:text-zinc-700 hover:dark:text-zinc-300  dark:hover:scale-125 hover:scale-125  inline-block transition duration-300" />
        </p>
    </article>
    <article className="text-sm font-light dark:text-white">
      Copyright © 2024 Gonzalo
    </article>
  </section>
</footer>
  )
}

export default Footer