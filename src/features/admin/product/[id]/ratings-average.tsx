import ratingRequest from '@/api/ratingRequest';
import { Star } from 'lucide-react';

async function RatingsAverage({ id }: { id: number }) {
	const response = await ratingRequest.getRatingSummary(id);
	const data = response.payload.data;

	// Calculate the star distribution percentages
	const starTotals = data.stars.reduce((sum: number, count: number) => sum + count, 0);

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
				{/* Summary stats */}
				<div className="md:col-span-3 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
					<div className="text-4xl font-bold text-green-600 mb-1">
						{data.rating.toFixed(1)}
					</div>
					<div className="flex items-center gap-1 mb-2">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`h-4 w-4 ${
									star <= Math.round(data.rating)
										? "fill-yellow-400 text-yellow-400"
										: "text-gray-300"
								}`}
							/>
						))}
					</div>
					<div className="text-sm text-gray-500 text-center">
						<span className="font-medium">{data.totalRatings}</span> đánh giá
					</div>
				</div>

				{/* Star distribution */}
				<div className="md:col-span-9">
					<div className="space-y-2">
						{data.stars.map((count: number, index: number) => (
							<div key={index} className="flex items-center gap-3">
								<div className="flex items-center min-w-[90px]">
									<span className="font-medium mr-2">{5 - index}</span>
									<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
								</div>

								<div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
									<div
										className="h-full bg-yellow-400 rounded-full"
										style={{
											width: `${starTotals > 0 ? (count / starTotals) * 100 : 0}%`
										}}
									></div>
								</div>

								<div className="text-sm text-gray-500 min-w-[60px]">
									{count} ({starTotals > 0 ? Math.round((count / starTotals) * 100) : 0}%)
								</div>
							</div>
						)).reverse()} {/* Display 5 stars first */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RatingsAverage;
