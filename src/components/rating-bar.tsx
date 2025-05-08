import { Progress } from './ui/progress';

function RatingBar({
	value,
	totalRatings,
}: {
	value: number;
	totalRatings: number;
}) {
	// This component is a simple progress bar that shows the rating value.
	// The value prop is expected to be a number between 0 and 100.
	// The progress bar will fill up to the specified value.
	// You can customize the color and size of the progress bar using Tailwind CSS classes.
	// For example, you can change the color to green by adding "bg-green-500" to the className.
	if (totalRatings === 0) {
		return <Progress value={0} />;
	}

	return (
		<Progress value={(value / totalRatings) * 100} className="text-green-200" />
	);
}

export default RatingBar;
