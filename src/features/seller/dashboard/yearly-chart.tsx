'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import statisticRequest from '../../../api/statisticRequest';
import { BarChart } from '../../../components/ui/bar-chart';
import { Button } from '../../../components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { YearlyStatisticsResponseType } from '../../../schemaValidations/response/statistic';

export default function YearlyChart({
	sessionToken,
	year = new Date().getFullYear(),
	onValueChange,
}: {
	sessionToken: string;
	year?: number;
	onValueChange: (value: number | undefined) => void;
}) {
	const [chartData, setChartData] = useState<
		YearlyStatisticsResponseType['data'] | []
	>([]);
	const [loading, setLoading] = useState(true);
	const [selectedYear, setSelectedYear] = useState(year);

	useEffect(() => {
		setLoading(true);
		statisticRequest
			.getYearlyStatistics(sessionToken, selectedYear)
			.then((res) => {
				setChartData(res.payload.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [sessionToken, selectedYear]);

	return (
		<Card className="h-full">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg font-medium">Thống kê theo năm</CardTitle>
				<CardDescription>
					Doanh thu và đơn hàng theo tháng trong năm{' '}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								{selectedYear}
								<ChevronDownIcon className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuRadioGroup
								value={selectedYear.toString()}
								onValueChange={(value) => setSelectedYear(Number(value))}
							>
								{Array.from({ length: 10 }, (_, i) => (
									<DropdownMenuRadioItem key={i} value={(year - i).toString()}>
										{year - i}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardDescription>
			</CardHeader>
			<CardContent className="flex justify-center items-center">
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
					</div>
				) : (
					<BarChart
						className="h-64"
						data={chartData}
						index="date"
						categories={['Doanh thu']}
						colors={['blue']}
						valueFormatter={(value) => `${value.toLocaleString()}`}
						yAxisWidth={100}
						onValueChange={(value) =>
							onValueChange(value?.date ? Number(value.date) : undefined)
						}
					/>
				)}
			</CardContent>
		</Card>
	);
}
