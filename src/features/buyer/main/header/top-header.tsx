import Link from 'next/link';

function TopHeader() {
	return (
		<div className="flex flex-row justify-between  w-full bg-green-700 shadow-md p-3">
			<Link href="#" className="flex  text-white">
				Kênh bán hàng
			</Link>
			<div className="flex justify-between items-center gap-3">
				<Link href="#" className="flex text-white">
					Câu hỏi
				</Link>
				<Link href="#" className="flex text-white">
					OCOP Là gì
				</Link>
			</div>
		</div>
	);
}

export default TopHeader;
