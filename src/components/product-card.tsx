'use client';
import Image from 'next/image';

function ProductCard({ data }: { data: any }) {
	return (
		<div>
			<Image
				src="https://placehold.co/600x400/png"
				alt="Product Image"
				width={600}
				height={400}
			/>
		</div>
	);
}

export default ProductCard;
