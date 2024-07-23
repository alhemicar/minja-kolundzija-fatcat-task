export interface ItemShowcase {
    title: string;
    description: string;
}

export interface IItemsShowcaseProps {
    items?: ItemShowcase[];
    children?: React.ReactNode;
}
