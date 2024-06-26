import { Link, Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  let links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
  ];
  return (
    <header className="border-b-2 p-4">
      <h1 className="text-center text-3xl">Welcome to Remix Fundamentals</h1>
      <nav className="mt-2 flex justify-between pl-[25%] pr-[25%]">
        {links.map((l) => (
          <div key={l.href} className="grow text-center underline">
            <Link to={l.href} className="text-sm">
              {l.title}
            </Link>
          </div>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 p-4">
      <p className="text-center">Footer</p>
    </footer>
  );
}
