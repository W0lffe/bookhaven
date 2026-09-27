"use client";
import { usePathname } from "next/navigation";
import NavButton from "../NavButton/NavButton";

export default function NavBar() {

    const currentPath = usePathname();

    const paths = {
        "/": [
            { path: "/login", text: "Login", icon: "/login.svg" },
            { path: "/register", text: "Register", icon: "/register.svg" }
        ],
        "/register": { path: "/", text: "Home"},
        "/login": { path: "/", text: "Home"}
    }

    //console.log(paths[currentPath])

    return (
        <nav>
            {Array.isArray(paths[currentPath]) ? (
                paths[currentPath].map((route) => (
                    <NavButton {...route} />
                ))
            ) : (
                <NavButton {...paths[currentPath]} />
            )}
        </nav>
    )
}