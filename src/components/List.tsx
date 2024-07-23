import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { IUser } from '@homework-task/interfaces/IUser';

export const List = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => {
                throw new Error(error);
            });
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul className={clsx('list-disc pl-5 space-y-2')}>
                {users.map((user) => (
                    <li key={user.id} className="text-lg font-medium">
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
