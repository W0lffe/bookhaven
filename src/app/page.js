import NavBar from "./components/NavBar/NavBar";

export default function Home() {

  return (
    <main>

      <NavBar />

      <header>
        <h1>BookHaven</h1>
        <strong>Keep your collection within reach.</strong>
      </header>

      <section>
        <h2>
          What is <strong>BookHaven?</strong>
        </h2>
        <p>
          <strong>BookHaven</strong> is your personal space to keep track of the books you own, and manage your collection in one place.
          Whether you're a casual reader or a dedicated book collector,
          BookHaven makes it easy to organize your library and keep all your books and their information at your fingertips.
        </p>
      </section>

    </main>
  );
}
