import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 px-6 py-12">
                    <div className="max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
                            Selamat Datang di <span className="text-orange-600">Covid Stats</span>
                        </h1>
                        <p className="mb-8 text-lg text-gray-600">
                            Pantau statistik Covid-19 di Indonesia dan dunia — dari kasus positif, kesembuhan, kematian, hingga timeline 30 hari
                            terakhir.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-block rounded-lg bg-orange-600 px-6 py-3 text-lg font-medium text-white shadow-md transition hover:bg-orange-700"
                        >
                            Lihat Dashboard
                        </Link>
                    </div>
                    <footer className="absolute bottom-6 text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Covid Stats • Data terakhir dari 2023-03-09
                    </footer>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
