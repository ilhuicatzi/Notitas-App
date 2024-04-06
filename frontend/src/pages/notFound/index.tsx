function NotFoundPage() {
  return (
    <section className="mt-10 md:m-20 flex flex-col items-center justify-center">
      <article className=" w-3/4 xl:w-2/3 rounded-l py-10  shadow hover:bg-zinc-50/70 dark:hover:bg-zinc-900/60 group flex flex-col  ">
        <h1 className="sm:text-5xl text-4xl mb-10 font-medium text-center">
          ¡Ups! Algo salió mal.
        </h1>
        <h1 className="sm:text-[100px] text-5xl font-bold md:mb-20 text-center">
          404
        </h1>
        <div className="mt-20 text-center">
          La página que buscas no existe. Por favor, verifica la URL o regresa a
          la página de <a href="/" className="text-yellow-500"> inicio</a>.
        </div>
      </article>
    </section>
  );
}

export default NotFoundPage;
