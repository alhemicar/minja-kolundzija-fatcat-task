interface Card {
    title: string;
    text: string;
    link: string;
}

export const Card = ({ title, text, link }: Card) => (
    <div className={'flex flex-col gap-4 p-4 bg-white py-6 px-4 rounded-2xl'}>
        <h2 className={'text-black text-2xl leading-normal font-medium'}>
            {title}
        </h2>
        <p className={'text-gray80 text-base leading-relaxed'}>{text}</p>
        <a
            href={link}
            className={'mt-auto flex items-center text-primary gap-2.5'}
        >
            Read more
            <img src="/media/landing/arrow-purple.svg" alt="" />
        </a>
    </div>
);
