import http from '../lib/http';
import {
	AdminDashboardSystemResType,
	StatisticDashboardResponseSchemaType,
	StatisticResponseType,
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
};

export default statisticRequest;
