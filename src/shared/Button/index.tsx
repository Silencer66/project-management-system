import { cn } from "../../lib/twMerge";

interface IButtonProps {
    children?: React.ReactNode; // Вместо text используем children
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export const Button = (props: IButtonProps) => {
    const {
        children, // Теперь получаем детей компонента
        onClick,
        className,
        type = "button",
    } = props;

    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(
                `flex items-center justify-center px-[16px] py-[10px] gap-0.5 rounded-[5px] transition-all duration-200`,
                className
            )}
        >
            {children}
        </button>
    );
};
