import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Star } from 'lucide-react';
import CommentsList from './comments-list';
import RatingsAverage from './ratings-average';

function RatingsSection({ id }: { id: number }) {
	return (
		<Tabs defaultValue="ratings" className="w-full">
			<TabsList className="w-full bg-gray-50 border-b">
				<TabsTrigger
					value="ratings"
					className="flex items-center gap-1.5 data-[state=active]:bg-white"
				>
					<Star className="h-4 w-4" />
					Đánh giá
				</TabsTrigger>
				<TabsTrigger
					value="comments"
					className="flex items-center gap-1.5 data-[state=active]:bg-white"
				>
					<MessageSquare className="h-4 w-4" />
					Bình luận
				</TabsTrigger>
			</TabsList>
			<TabsContent value="ratings" className="p-4">
				<RatingsAverage id={id} />
			</TabsContent>
			<TabsContent value="comments" className="p-4">
				<CommentsList id={id} />
			</TabsContent>
		</Tabs>
	);
}

export default RatingsSection;
