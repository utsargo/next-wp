import type { ReactNode } from "react";

const Container = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div className={`mx-auto w-full max-w-[100vw] px-4 md:px-[5%] ${className}`}>
            {children}
        </div>
    );
};
export default Container;