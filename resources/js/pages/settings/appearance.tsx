import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { LayoutToggleTab } from '@/components/layout-tabs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Tampilan',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Tampilan" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Tema" description="Pilih tema tampilan yang sesuai dengan preferensi Anda." />
                    <AppearanceTabs />
                </div>
                <div className="space-y-6">
                    <HeadingSmall title="Tata Letak" description="Pilih tata letak tampilan yang sesuai dengan preferensi Anda." />
                    <LayoutToggleTab />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
