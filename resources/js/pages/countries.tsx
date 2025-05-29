import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const CountriesPage = () => {
    const [countries, setCountries] = useState<any>([]);

    const getCountries = async () => {
        const result = await fetch('https://restcountries.com/v3.1/name/indonesia');

        const response = await result.json();

        setCountries(response);
    };

    useEffect(() => {
        getCountries();
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Countries" />
            {countries.length > 0 ? (
                <ul>
                    <li>Nama: {countries[0].name.common}</li>
                    <li>Ibukota: {countries[0].capital[0]}</li>
                    <li>Bendera: {countries[0].flag}</li>
                    <li>Bahasa: {countries[0].languages.ind}</li>
                    <li>Populasi: {countries[0].population}</li>
                    <li>Populasi: {countries[0].currencies.IDR.symbol}</li>
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </AppLayout>
    );
};

export default CountriesPage;
