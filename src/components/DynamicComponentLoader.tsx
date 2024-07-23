import { Hero } from '@components/Hero';
import { ItemsShowcase } from '@components/ItemsShowcase';
import { Layout } from '@components/Layout';
import { TrustBar } from '@components/TrustBar';
import { IHeroProps } from '@homework-task/interfaces/IHero';
import { IItemsShowcaseProps } from '@homework-task/interfaces/IItemShowcase';
import { ITrustBarProps } from '@homework-task/interfaces/ITrustBar';

interface BaseComponentProps {
    children?: React.ReactNode;
}

interface LayoutProps extends BaseComponentProps {
    background?: string;
}

// Component definition interfaces
interface LayoutComponentDefinition {
    type: 'layoutSection';
    props: LayoutProps;
    components?: ComponentDefinition[];
}

interface HeroComponentDefinition {
    type: 'componentHero';
    props: IHeroProps;
    components?: ComponentDefinition[];
}

interface ItemsShowcaseComponentDefinition {
    type: 'componentItemsShowcase';
    props: IItemsShowcaseProps;
    components?: ComponentDefinition[];
}

interface TrustBarComponentDefinition {
    type: 'componentTrustBar';
    props: ITrustBarProps;
    components?: ComponentDefinition[];
}

// Discriminated union of component definitions
export type ComponentDefinition =
    | LayoutComponentDefinition
    | HeroComponentDefinition
    | ItemsShowcaseComponentDefinition
    | TrustBarComponentDefinition;

// Components interface remains the same
export interface Components {
    components: ComponentDefinition[];
}

const componentMapping = {
    layoutSection: Layout,
    componentHero: Hero,
    componentItemsShowcase: ItemsShowcase,
    componentTrustBar: TrustBar,
};

const isHero = (
    component: ComponentDefinition
): component is HeroComponentDefinition => {
    const comp = component as HeroComponentDefinition;

    return (
        typeof comp.props.title !== 'undefined' &&
        typeof comp.props.image !== 'undefined'
    );
};

const isLayout = (
    component: ComponentDefinition
): component is LayoutComponentDefinition => {
    const comp = component as LayoutComponentDefinition;

    return typeof comp.props.background !== 'undefined';
};

const isItemShowcase = (
    component: ComponentDefinition
): component is ItemsShowcaseComponentDefinition => {
    const comp = component as ItemsShowcaseComponentDefinition;

    return typeof comp.props.items !== 'undefined';
};

const isTrustBar = (
    component: ComponentDefinition
): component is TrustBarComponentDefinition => {
    const comp = component as TrustBarComponentDefinition;

    return typeof comp.props.images !== 'undefined';
};

export const DynamicComponentLoader = ({ components }: Components) => {
    return (
        <>
            {components.map((component, index) => {
                let Component = componentMapping[component.type];

                if (!Component) {
                    throw new Error(
                        `No component found for type "${component.type}"`
                    );
                }

                if (isHero(component)) {
                    Component = Component as typeof Hero;
                    component.props = component.props as IHeroProps;
                }

                if (isLayout(component)) {
                    Component = Component as typeof Layout;
                    component.props = component.props as LayoutProps;
                }

                if (isItemShowcase(component)) {
                    Component = Component as typeof ItemsShowcase;
                    component.props = component.props as IItemsShowcaseProps;
                }

                if (isTrustBar(component)) {
                    Component = Component as typeof TrustBar;
                    component.props = component.props as ITrustBarProps;
                }

                return (
                    <Component key={index} {...component.props}>
                        {component.components ? (
                            <DynamicComponentLoader
                                components={component.components}
                            />
                        ) : null}
                    </Component>
                );
            })}
        </>
    );
};
