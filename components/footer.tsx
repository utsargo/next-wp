import Link from "next/link";
import Container from "./container";

const Footer = () => {
    return (
        <footer className="w-full flex flex-row items-center justify-center p-4 max-[767px]:mb-[52px] bg-slate-200 md:bottom-0 mt-auto">
            <Container className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-1">
        <p className="text-sm">Developed by <Link href="https://royutsargo.vercel.app/" target="_blank">Utsargo Roy.</Link></p> <p className="text-sm">Built with <Link href="https://nextjs.org/" target="_blank">Next.js</Link> and <Link href="https://wordpress.org/" target="_blank">WordPress</Link></p> <p className="text-sm"><Link href="/privacy-policy">Privacy Policy</Link></p>
        </Container>
        </footer>
    );
    }

export default Footer;