import Image from "next/image"
import Link from "next/link"
export default function NavButton({path, text, icon}){

    return(
        <button>
            <Image src={icon === null ? "/arrowBack.svg" : icon} width={30} height={15} />
            <Link href={path}>{text}</Link>
        </button>
    )
}