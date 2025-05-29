import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CovidSummary, CovidTimelineItem } from '@/types/covid';
import { Head } from '@inertiajs/react';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    summary: CovidSummary;
    timeline: CovidTimelineItem[];
}

export default function Dashboard({ summary, timeline }: Props) {
    const labels = timeline.map((item) => item.date);
    const confirmedData = timeline.map((item) => item.confirmed_diff);
    const recoveredData = timeline.map((item) => item.recovered_diff);
    const deathsData = timeline.map((item) => item.deaths_diff);
    const data = {
        labels,
        datasets: [
            {
                label: 'Kasus Positif',
                data: confirmedData,
                borderColor: 'rgb(251, 146, 60)', // orange
                backgroundColor: 'rgba(251, 146, 60, 0.5)',
                fill: false,
            },
            {
                label: 'Sembuh',
                data: recoveredData,
                borderColor: 'rgb(34, 197, 94)', // green
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                fill: false,
            },
            {
                label: 'Kematian',
                data: deathsData,
                borderColor: 'rgb(239, 68, 68)', // red
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                fill: false,
            },
        ],
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Kasus Positif</CardTitle>
                                <p className="text-muted-foreground text-sm">
                                    Data terakhir diupdate:{' '}
                                    {new Date(summary.last_update).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-orange-600">{summary.confirmed.toLocaleString('id-ID')}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Sembuh</CardTitle>
                                <p className="text-muted-foreground text-sm">
                                    Data terakhir diupdate:{' '}
                                    {new Date(summary.last_update).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-green-600">{summary.recovered.toLocaleString('id-ID')}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Kematian</CardTitle>
                                <p className="text-muted-foreground text-sm">
                                    Data terakhir diupdate:{' '}
                                    {new Date(summary.last_update).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-red-600">{summary.deaths.toLocaleString('id-ID')}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <Card>
                            <CardHeader>
                                <CardTitle>Persentase Potensi Positif</CardTitle>
                                <p className="text-muted-foreground text-sm">
                                    Data terakhir diupdate:{' '}
                                    {new Date(summary.last_update).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-red-600"> {summary.positivity_potential.toFixed(2)}%</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Card>
                        <CardHeader>
                            <CardTitle>Timeline 30 Hari Terakhir</CardTitle>
                            <p className="text-muted-foreground text-sm">
                                Data terakhir diupdate:{' '}
                                {new Date(summary.last_update).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] w-full">
                                <Line data={data} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
