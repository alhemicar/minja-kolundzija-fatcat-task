import React, { useEffect, useState } from 'react';

import { useMutation } from 'react-query';
import z from 'zod';

interface Field {
    type: string;
    name: string;
    label: string;
    placeholder: string;
    validation?: ValidationObject;
}

interface ValidationObject {
    required?: string;
    minLength?: {
        value: number;
        message: string;
    };
}

interface FormProps {
    formFields: Field[];
}

interface FormData {}

export const Form = ({ formFields }: FormProps) => {
    const [formData, setFormData] = useState({});
    const [formSchema, setFormSchema] = useState<z.ZodType<FormData>>();
    const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);
    const [requestStatus, setRequestStatus] = useState<
        'idle' | 'pending' | 'success' | 'error'
    >('idle');

    useEffect(() => {
        const schemaObject: { [key: string]: z.ZodType<FormData> } = {};
        formFields.forEach((field) => {
            let fieldSchema: z.ZodType<FormData> = z.any();
            switch (field.type) {
                case 'number':
                    fieldSchema = z.number();
                    break;
                default:
                    fieldSchema = z.string();
                    break;
            }

            if (field.validation) {
                if (
                    field.validation.required &&
                    fieldSchema instanceof z.ZodString
                ) {
                    fieldSchema = fieldSchema.min(1);
                }
                if (
                    field.validation.minLength &&
                    fieldSchema instanceof z.ZodString
                ) {
                    fieldSchema = fieldSchema.min(
                        field.validation.minLength.value,
                        field.validation.minLength.message
                    );
                }
            }
            schemaObject[field.name] = fieldSchema;
        });
        setFormSchema(z.object(schemaObject));
    }, [formFields]);

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const mutation = useMutation(async (formData: FormData) => {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts',
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!formSchema) return;

        const result = formSchema.safeParse(formData);
        if (!result.success) {
            setValidationErrors(result.error.issues);
            return;
        }

        setValidationErrors([]);
        mutation.mutate(formData, {
            onSuccess: () => {
                setRequestStatus('success');
            },
            onError: (error) => {
                setRequestStatus('error');
                throw new Error(`Form submission error: "${error}"`);
            },
        });
    };

    return (
        <>
            <form className="p-8 w-full" onSubmit={handleSubmit}>
                {formFields.map((field) => (
                    <div key={field.name} className="my-4">
                        <label>{field.label}</label>
                        {field.type === 'textarea' ? (
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                            />
                        )}
                        {validationErrors.length > 0 && (
                            <div>
                                <ul>
                                    {validationErrors
                                        .filter(
                                            (error) =>
                                                error.path[0] === field.name
                                        )
                                        .map((error, index) => (
                                            <li
                                                className="text-red"
                                                key={index}
                                            >
                                                {error.message}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-black font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-blue-300"
                >
                    Submit
                </button>

                <div className="my-4">
                    {requestStatus === 'pending' && <p>Submitting...</p>}
                    {requestStatus === 'success' && (
                        <p className="text-mainGreen">
                            Form submitted successfully!
                        </p>
                    )}
                    {requestStatus === 'error' && (
                        <p className="text-red">Form submission failed.</p>
                    )}
                </div>
            </form>
        </>
    );
};
