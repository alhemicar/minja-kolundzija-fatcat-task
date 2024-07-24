import './styles.css';

import {
    ComponentDefinition,
    DynamicComponentLoader,
} from '@homework-task/components/DynamicComponentLoader';
import { Form } from '@homework-task/components/Form';
import { Landing } from '@homework-task/components/landing/Landing';
import { List } from '@homework-task/components/List';

function App() {
    const formFields = [
        {
            name: 'title',
            type: 'text',
            placeholder: 'Enter title',
            label: 'Title',
            validation: {
                required: 'Title is required',
                minLength: {
                    value: 5,
                    message: 'Title must be at least 5 characters',
                },
            },
        },
        {
            name: 'body',
            type: 'textarea',
            placeholder: 'Enter body',
            label: 'Body',
            validation: {
                required: 'Body is required',
                minLength: {
                    value: 10,
                    message: 'Body must be at least 10 characters',
                },
            },
        },
    ];

    const components: ComponentDefinition[] = [
        {
            type: 'layoutSection',
            props: {},
            components: [
                {
                    type: 'componentHero',
                    props: {
                        title: 'We can be heroes, just for one day',
                        image: '/media/hero.png',
                    },
                },
            ],
        },
        {
            type: 'layoutSection',
            props: {},
            components: [
                {
                    type: 'componentItemsShowcase',
                    props: {
                        items: [
                            {
                                title: 'Cat 1',
                                description: 'Cat 1',
                            },
                            {
                                title: 'Cat 2',
                                description: 'Cat 2',
                            },
                            {
                                title: 'Cat 3',
                                description: 'Cat 3',
                            },
                            {
                                title: 'Cat 4',
                                description: 'Cat 4',
                            },
                            {
                                title: 'Cat 5',
                                description: 'Cat 5',
                            },
                            {
                                title: 'Cat 6',
                                description: 'Cat 6',
                            },
                            {
                                title: 'Cat 7',
                                description: 'Cat 7',
                            },
                            {
                                title: 'Cat 8',
                                description: 'Cat 8',
                            },
                            {
                                title: 'Cat 9',
                                description: 'Cat 9',
                            },
                            {
                                title: 'Cat 10',
                                description: 'Cat 10',
                            },
                        ],
                    },
                },
                {
                    type: 'componentTrustBar',
                    props: {
                        images: [
                            '/media/cats/cat_1.png',
                            '/media/cats/cat_2.png',
                            '/media/cats/cat_3.png',
                            '/media/cats/cat_4.png',
                            '/media/cats/cat_5.png',
                            '/media/cats/cat_6.png',
                            '/media/cats/cat_7.png',
                            '/media/cats/cat_8.png',
                            '/media/cats/cat_9.png',
                            '/media/cats/cat_10.png',
                        ],
                    },
                },
            ],
        },
    ];

    return (
        <main>
            <Landing />
            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-1 justify-center">
                    <List />
                </div>
                <div className="flex flex-1 justify-center">
                    <Form formFields={formFields} />
                </div>
            </div>
            <DynamicComponentLoader components={components} />
        </main>
    );
}

export default App;
