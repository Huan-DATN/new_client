import http from '../lib/http';
import {
	AdminDashboardSystemResType,
	AdminUserMonthlyStatisticsResponseType,
	MonthlyStatisticsResponseType,
	StatisticDashboardResponseSchemaType,
	StatisticResponseType,
	YearlyStatisticsResponseType,
} from '../schemaValidations/response/statistic';
const statisticRequest = {
	getStatistic: (
		sessionToken: string,
		{
			month,
			year,
		}: {
			month: number;
			year: number;
		}
	) => {
		return http.get<StatisticResponseType>(
			`/statistic/daily?month=${month}&year=${year}`,
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		);
	},
	getStatisticDashboard: (sessionToken: string) => {
		return http.get<StatisticDashboardResponseSchemaType>(
			`/statistic/dashboard`,
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		);
	},
	getStatisticAdmin: (sessionToken: string) => {
		return http.get<StatisticResponseType>(`/statistic/admin`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	getStatisticAdminDashboard: (sessionToken: string) => {
		return http.get<AdminDashboardSystemResType>(`/statistic/admin/store`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
	getYearlyStatistics: (
		sessionToken: string,
		year: number = new Date().getFullYear()
	) => {
		return http.get<YearlyStatisticsResponseType>(
			`/statistic/monthly?year=${year}`,
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		);
	},
	getMonthlyStatistics: (
		sessionToken: string,
		{ month, year }: { month: number; year: number }
	) => {
		return http.get<MonthlyStatisticsResponseType>(
			`/statistic/daily?month=${month}&year=${year}`,
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
			}
		);
	},
	getAdminUserMonthlyStatistics: (
		sessionToken: string,
		{ year }: { year: number }
	) => {
		const query = new URLSearchParams();

		if (year) {
			query.append('year', year.toString());
		}

		const url = `/statistic/admin/user/monthly?${query.toString()}`;

		return http.get<AdminUserMonthlyStatisticsResponseType>(url, {
			headers: {
				Authorization: `Bearer ${sessionToken}`,
			},
		});
	},
};

export default statisticRequest;
