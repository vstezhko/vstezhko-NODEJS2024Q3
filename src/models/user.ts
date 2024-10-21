interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

let users: User[] = [];

export const createUser = (id: string, username: string, age: number, hobbies: string[]): User => {
    const newUser = { id, username, age, hobbies };
    users.push(newUser);
    return newUser;
};

export const getUser = (id: string): User | undefined => users.find(user => user.id === id);

export const getUsers = (): User[] => users;

export const updateUser = (id: string, updatedFields: { username: string; age: number; hobbies: string[] }): User | undefined => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return undefined;

    const updatedUser = { ...users[userIndex], ...updatedFields };
    users[userIndex] = updatedUser;

    return updatedUser;
};

export const deleteUser = (id: string): boolean => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};
