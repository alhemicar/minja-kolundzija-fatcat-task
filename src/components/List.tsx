import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { IUser } from '@homework-task/interfaces/IUser';

export const List = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => {
                // testing loading
                // setTimeout(() => {
                setUsers(data);
                setIsLoading(false);
                // }, 2000);
            })
            .catch((error) => {
                setIsLoading(false);
                throw new Error(error);
            });
    }, []);

    return (
        <div className="p-8">
            <h1 className={clsx('text-2xl font-bold mb-4')}>User List</h1>
            <ul className={clsx('list-disc pl-5 space-y-2 list-none')}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <ul className={clsx('list-disc pl-5 space-y-2 list-none')}>
                        {users.map((user) => (
                            <li key={user.id} className="text-lg font-medium">
                                {user.id}, {user.name}, {user.username},{' '}
                                {user.email}, {user.phone}
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        </div>
    );
};
