import { DataTable } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PaginationMeta } from '@/types/pagination';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

function getColumns(onView: (user: User) => void): ColumnDef<User>[] {
    return [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-center gap-2.5">
                    <button onClick={() => onView(row.original)} className="text-blue-500 hover:underline">
                        View
                    </button>
                    <DeleteButton userId={row.original.id} />
                </div>
            ),
        },
    ];
}

// const columns: ColumnDef<User>[] = [
//     {
//         accessorKey: 'name',
//         header: 'Name',
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email',
//     },
//     {
//         id: 'actions',
//         header: 'Actions',
//         cell: ({ row }) => (
//             <div className="flex justify-center gap-2.5">
//                 <button onClick={() => onView(row)} className="text-blue-500 hover:underline">
//                     View
//                 </button>
//                 <DeleteButton userId={row.original.id} />
//             </div>
//         ),
//     },
// ];

interface Props {
    users: {
        data: User[];
    } & PaginationMeta;
}

const DeleteButton = ({ userId }: { userId: number }) => {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(route('users.destroy', userId));
        }
    };

    return (
        <button onClick={() => handleDelete()} className="text-blue-500 hover:underline">
            Delete
        </button>
    );
};

type CreateUserFormProps = {
    formData: {
        id?: number;
        name: string;
        email: string;
        password: string;
    };
    isEdit: boolean;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};

type FormKey = 'name' | 'email' | 'password';

function CreateUserForm({ formData, isEdit, setFormData }: CreateUserFormProps) {
    const { data, setData, post, put, processing, errors } = useForm(formData);

    useEffect(() => {
        setData(formData); // sinkronkan ketika formData berubah
    }, [formData]);

    const handleChange = (key: FormKey, value: string) => {
        setData(key, value);
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            post(route('users.store'));
        } else {
            put(route('users.update', formData.id));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Name</label>
                <input type="text" value={data.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full border p-2" />
                {errors.name && <div className="text-red-500">{errors.name}</div>}
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={data.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full border p-2" />
                {errors.email && <div className="text-red-500">{errors.email}</div>}
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full border p-2"
                />
                {errors.password && <div className="text-red-500">{errors.password}</div>}
            </div>
            <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white" disabled={processing}>
                Save
            </button>
        </form>
    );
}

const UserPage = ({ users }: Props) => {
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        email: '',
        password: '',
    });

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleView = (user: User) => {
        setIsEdit(isEdit);
        setFormData({
            id: user.id,
            name: user.name,
            email: user.email,
            password: '', // kosongkan password demi keamanan
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-4">
                <div className="mb-6">
                    <CreateUserForm formData={formData} setFormData={setFormData} isEdit={isEdit} />
                </div>
                <h1 className="mb-4 text-xl font-bold">User List</h1>
                <DataTable data={users.data} columns={getColumns(handleView)} pagination={users} />
            </div>
        </AppLayout>
    );
};

export default UserPage;
