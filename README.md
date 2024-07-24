## Complete the following tasks

### Transfer the project to TypeScript

Your first task involves transitioning this project 
from JavaScript to TypeScript. To ensure a robust 
and type-safe codebase, please configure TypeScript
with the following compiler options:
* "noImplicitAny": true
* "strict": true
* "strictNullChecks": true
* "noImplicitThis": true

Additionally, implement import aliases in your project
configuration. Set up your imports to use the format
***@homework-task/path/to/file.ts***.

In the ***src/components*** folder, you will find several
components. Your goal is to enhance these components with
appropriate TypeScript interfaces and types.

@minja:
This task was pretty straightforward. I started with changing
all of the jsx to tsx, added tsconfig and installed TS related
packages. After that I started to work on interfaces, so that
all existing components can have interfaces that TS requires.

### Create a List Component

Develop a React component that is both scalable and reusable,
designed to fetch and display data from an API in a list
format. The specific API endpoint to be used is
https://jsonplaceholder.typicode.com/users. For each item 
in the list, ensure that the following keys are displayed:
***id***, ***name***, ***email***, ***dateOfBirth***, and ***phone***.

@minja
This was an easy task. Fetch from API and display in ul
with li elements. I added interfaces for the data that is
being fetched and displayed and loading when the data is being fetched.
Also there is an issue with this read file and word file, since there is 
no date of birth.

### Create a Form Generator Component

1. Develop a scalable and reusable React component with the
following capabilities:

* **Validation Schema:** Accept a validation schema prop to ensure form data adheres to specified rules.
* **API Hook Call:** Incorporate an API hook that handles states such as data, isLoading, and isError.
* **Callback Function for Form Rendering:** Implement a callback function prop (renderForm) that renders the form elements and handles their state appropriately.

2. Component Implementation:
* Utilize this component to create a form with two fields:
  * Input Field (‘title’): A required field with a maximum character limit.
  * Textarea Field (‘body’): Also a required field with a maximum character limit.
* Both fields should display error messages if the input doesn't meet the criteria set by the validation schema.
* For form submissions, use the POST method at https://jsonplaceholder.typicode.com/posts.

Recommended libraries, but you can use whatever you prefer:
* ***React Query:*** For handling API calls.
* ***Zod:*** For defining the validation schema.
* ***React Hook Form:*** For managing form state, submission, and logic.

Alternatively, you're free to use any library or custom solution that aligns with the above requirements.

Component Example **(this does not have to be the exact implementation)**:

```tsx
<CreateForm<ICreateCycleFormInputs>
    useMutation={useSomeMutation}
    validationSchema={someSchema}
    successMessage="Successfully created something"
    renderForm={({ register, errors }) => (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                autoFocus
                {...register('name')}
            />
        </>
    )}
/>
```

@minja
Well this was the one that that took me the most time. I do not have
experience with zod, mostly been using yup, but at the time I was ok,
let's try it out and see what happens. And oh boy did I get stuck on this one.
After second iteration from scratch I finally managed to finish this one.
In the end, typescript gave the biggest headache due to not allowing 
any, and first iteration failed because of that one TS issue.

### Create a Page Generator Component
Your task is to create a reusable React component for
building web pages. This component should be designed 
to handle a variety of page layouts and components 
dynamically, based on the props it receives.
* ***Dynamic Layout Handling:*** The component must handle different page layouts.
* ***Scalability and Reusability:*** It should be easily scalable to accommodate future layout types and be reusable across different pages.
* ***Prop Structure:*** The main prop is an array of objects, each representing a section of the page with its own layout and components.
  * Each object in this array contains:
    * type: identifying the layout type.
    * components: an array of objects, each describing a component to be rendered in this section.
    * props: properties specific to that layout (ex. background color)
  * Each component object has:
    * type: the type of the component (e.g., 'componentHero').
    * props: properties specific to that component.

You can use the components provided in src/components. If you desire, you can 
add your own components or change the existing ones.

Here is an example of the props that the component should accept:

```ts
const data = [
    {
        type: 'layoutSection',
        props: { ...layoutProps},
        components: [
            {
                type: 'componentHero',
                props: {...componentProps},
            },
        ],
    },
    {
        type: 'layoutSection',
        props: { ...layoutProps},
        components: [
            {
                type: 'componentItemsShowcase',
                props: {...componentProps},
            },
            {
                type: 'componentTrustBar',
                props: {...componentProps},
            },
        ],
    },
];

```

@minja
This one was a simple one to finish, but a lot of work to make it work
with TS, due to different types of components that could be outputted.
I really liked this one, good task, cudos to the people that came up with it.

### Additional Requirements
You will have to complete all of these for your task to be considered done.

* Follow the eslint and prettier rules set by the project; you must not use any ts-ignore or disable eslint.
* It must contain a Readme.md file that has instructions on how to run the project as well as a brief explanation of how you have implemented these features. In the project, there is already a Readme.md file present feel free to override it completely.
* Your code must follow the latest rules and conventions
* You have to have checks for typescript and eslint that disallow you to commit any changes that cause errors.
* There should be no TypeScript or Eslint errors in your code.
* Feel free to add your own touch to these tasks
* Keep in mind that you will have to expand upon this solution in the technical interview


### Note: You can override this document

@minja
This is all from me for this time. I edited a lot, wrote down my thoughts and had fun with this test.
I hope you will like it :)
```
