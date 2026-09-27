"use client";
import { usePathname } from "next/navigation";
import NavButton from "../NavButton/NavButton";

export default function NavBar() {

    const currentPath = usePathname();

    const paths = {
        "/": [
            { path: "/login", text: "Login", icon: "/login.svg" },
            { path: "/register", text: "Signup", icon: "/register.svg" }
        ],
        "/register": { path: "/", text: "Home" },
        "/login": { path: "/", text: "Home" }
    }

    //console.log(paths[currentPath])

    return (
        <nav className="flex flex-row w-full md:w-3/4 justify-between border-b border-black/30">
            <span className="flex flex-row gap-2 p-2">
                {Array.isArray(paths[currentPath]) ? (
                    paths[currentPath].map((route, i) => (
                        <NavButton {...route} key={`${route.path}-${i}`} />
                    ))
                ) : (
                    <NavButton {...paths[currentPath]} />
                )}
            </span>
            {currentPath === "/" && <h1>BookHaven</h1>}
        </nav>
    )
}