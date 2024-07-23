import clsx from 'clsx';

interface Button {
    children: React.ReactNode;
    className: string;
    onClick: () => void;
}

export const Button = ({ children, onClick, className }: Button) => {
    return (
        <button
            className={clsx(
                'rounded-lg',
                'px-4',
                'py-2',
                'bg-black',
                'text-white',
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
