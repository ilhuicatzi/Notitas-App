function AboutPage() {
  return (
    <section className="mt-10 min-[500px]:m-10 md:m-20 flex flex-col items-center justify-center">
      <article className=" w-3/4 xl:w-2/3 rounded-lg min-[500px]:p-10 shadow hover:bg-zinc-50/70 dark:hover:bg-zinc-900/60 group  ">
        <h1 className="sm:text-4xl text-2xl mb-10 font-medium">
          Acerca de Noties
        </h1>
        <div className="flex justify-center items-center shadow-md hover:shadow-xl dark:hover:shadow-zinc-800 p-2  ">
          <div className="hidden lg:flex">
            <img
              src="/img/bg_3.jfif"
              alt="imagen de login"
              className="w-64 h-64 rounded-lg object-cover opacity-20 brightness-110 group-hover:opacity-80 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="p-5 w-full lg:w-1/2 text-sm sm:text-base">
            <p className="mb-4">
              Noties es una aplicación de notas que te permite guardar tus notas
              en cualquier lugar y en cualquier momento.
            </p>
            <p className="mb-4">
              Noties es una aplicación de código abierto, puedes encontrar el
              código fuente en{" "}
              <a
                href="#" // Replace with the URL of the GitHub repository
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:underline"
              >
                GitHub
              </a>
              .
            </p>
            <p>
              Noties es una aplicación full stack desarrollada por{" "}
              <a
                href="https://gonzdev.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:underline"
              >
                GonzDev {""}
              </a>
              usando el stack PERN (PostgreSQL, Express, React, Node.js).
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default AboutPage;
