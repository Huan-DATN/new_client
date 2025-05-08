import { ChevronDown, Heart, Package, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FormSearch from './form-search';

function BottomHeader({ sessionToken }: { sessionToken: string | undefined }) {

	return (
		<div className="border-b bg-white">
			<div className="max-w-7xl mx-auto py-3 px-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link
						href="/buyer"
						className="flex items-center space-x-2"
					>
						<Image
							src={`/img/logoocop.png`}
							width={150}
							height={48}
							alt="OCOP Logo"
							className="h-12 w-auto object-contain"
						/>
					</Link>

					{/* Categories dropdown */}
					<div className="hidden lg:flex items-center relative mx-4">
						<button className="flex items-center space-x-1 text-green-800 font-medium px-3 py-2 rounded-md hover:bg-green-50 transition-colors">
							<span>Danh mục</span>
							<ChevronDown size={16} />
						</button>
					</div>

					{/* Search */}
					<div className="flex-1 max-w-3xl">
						<FormSearch />
					</div>

					{/* Navigation */}
					<div className="hidden md:flex items-center space-x-5 ml-6">
						{sessionToken ? (
							<>
								<Link
									href="/buyer/wishlist"
									className="flex flex-col items-center text-gray-700 hover:text-green-700 transition-colors"
								>
									<Heart size={22} />
									<span className="text-xs mt-1">Yêu thích</span>
								</Link>

								<Link
									href="/buyer/order/me"
									className="flex flex-col items-center text-gray-700 hover:text-green-700 transition-colors"
								>
									<Package size={22} />
									<span className="text-xs mt-1">Đơn hàng</span>
								</Link>

								<Link
									href="/buyer/cart/me"
									className="flex flex-col items-center text-gray-700 hover:text-green-700 transition-colors relative"
								>
									<div className="relative">
										<ShoppingCart size={22} />
										<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
											0
										</span>
									</div>
									<span className="text-xs mt-1">Giỏ hàng</span>
								</Link>

								<Link
									href="/buyer/profile"
									className="flex flex-col items-center text-gray-700 hover:text-green-700 transition-colors"
								>
									<User size={22} />
									<span className="text-xs mt-1">Tài khoản</span>
								</Link>
							</>
						) : (
							<div className="flex items-center space-x-3">
								<Link
									href="/auth/register"
									className="px-4 py-2 text-green-700 border border-green-700 rounded-md hover:bg-green-50 transition-colors"
								>
									Đăng ký
								</Link>
								<Link
									href="/auth/login"
									className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
								>
									Đăng nhập
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BottomHeader;
