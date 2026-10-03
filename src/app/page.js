"use client";
import NavBar from "./components/NavBar/NavBar";
import NavButton from "./components/NavButton/NavButton";

export default function Home() {

  return (
    <>

      <NavBar />
      <div className="flex flex-col items-center gap-5">

        <section className="p-5">
           <p><strong>Keep your collection within reach.</strong></p>
        </section>

        <section className="flex flex-col gap-5 w-3/4 items-center">
          <h2>
            What is <strong>BookHaven?</strong>
          </h2>
          <p className="md:w-1/2">
            <strong>BookHaven</strong> is your personal space to keep track of the books you own, and manage your collection in one place.
            Whether you're a casual reader or a dedicated book collector,
            BookHaven makes it easy to organize your library and keep all your books and their information at your fingertips.
          </p>
        </section>

        <NavButton {...{path: "/register", text: "Get Started", icon: false}} />
      </div>

    </>
  );
}
