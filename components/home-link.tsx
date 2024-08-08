import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const HomeLink = () => {
    return (
        <Link
            href="/"
            aria-label="Home"
            className="block p-2 bg-slate-950 rounded-lg text-slate-50 h-fit"
        ><HomeIcon className="h-5" /></Link>
    

    );
    }
export default HomeLink;