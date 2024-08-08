import Link from "next/link"

type ButtonProps = {
    link: string,
    label: string,
    classNames?: string,
    icon?: React.ReactNode,
}

export const ButtonPrimary: React.FC<ButtonProps> = ({link, label, classNames, icon})=>{
    return (
        <Link
            href={link}
            className={`bg-slate-950 text-slate-50 hover:bg-slate-800 transition-all duration- rounded-sm px-4 py-2 mx-auto ${classNames}`}
        ><span className="text-sm">{icon} </span><span>{label}</span></Link>
    )
}
