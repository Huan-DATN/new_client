import { ThemeProvider } from '@/components/them-provider';
import AppProvider from '@/context/app-provider';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import { routing } from '../../i18n/routing';
import './globals.css';
const inter = Inter({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
	title: 'OCOP của dân',
	description: 'OCOP của dân',
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<NextIntlClientProvider>
					<Toaster />
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<AppProvider>{children}</AppProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
