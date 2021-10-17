export interface Student {
    id?: string;
    name: string;
    age: string;
    mark: string;
    gender: 'male' | 'female';
    city: string;

    createdAt?: string;
    updatedAt?: string;
}