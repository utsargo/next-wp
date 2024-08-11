import type { ReactNode } from "react";

const Container = ({
    children,
    className,
    width,
}: {
    children: ReactNode;
    className?: string;
    width?: string;
}) => {
    return (
        <div className={`mx-auto w-full max-w-[100vw] px-4 ${className} ${width || 'md:w-[90%]'}`}>
            {children}
        </div>
    );
};
export default Container;