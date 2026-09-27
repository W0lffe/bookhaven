import Image from "next/image"
import Link from "next/link"
export default function NavButton({ path, text, icon }) {

    if(icon === false) {
        return (
            <button className="flex flex-row gap-1 border p-2 h-fit w-fit rounded-2xl">
                <Link href={path}>{text}</Link>
            </button>
        )
    }

    return (
        <button className="flex flex-row gap-1 border rounded-2xl p-1 h-[35px] items-center max-w-[30px] overflow-hidden hover:max-w-30 hover:p-2 transition-all duration-300 ">
            <Image src={icon === null ? "/arrowBack.svg" : icon} width={30} height={15} alt={`Icon for ${text}`} />
            <Link href={path}>{text}</Link>
        </button>
    )
}