'use client';

import chatRequest, {
	ChatConversation,
	ChatHistoryParams,
} from '@/api/chatRequest';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatSidebar } from '@/components/chat/chat-sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import useChatStream from '@/hooks/use-chat-stream';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ChatPage() {
	const router = useRouter();
	const params = useParams();
	const [conversations, setConversations] = useState<ChatConversation[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchParams, setSearchParams] = useState<ChatHistoryParams>({});
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Set up chat stream
	const { isStreaming, startStream } = useChatStream({
		onDone: () => {
			fetchConversations();
		},
		onError: (error) => {
			toast({
				title: 'Lỗi',
				description: error,
				variant: 'destructive',
			});
		},
	});

	// Fetch conversations
	const fetchConversations = async () => {
		try {
			setLoading(true);
			const response = await chatRequest.getChatHistory(searchParams);
			setConversations(response.payload.data.items);
		} catch (error) {
			console.error('Error fetching conversations:', error);
			toast({
				title: 'Lỗi',
				description: 'Không thể tải cuộc trò chuyện',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	// Handle search
	const handleSearch = (term: string) => {
		setSearchParams({
			...searchParams,
			search: term,
		});
	};

	// Handle sending a new message
	const handleSendMessage = async (message: string) => {
		try {
			// Start the stream for the new message
			await startStream(message);

			// Scroll to bottom
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		} catch (error) {
			console.error('Error sending message:', error);
			toast({
				title: 'Lỗi',
				description: 'Không thể gửi tin nhắn',
				variant: 'destructive',
			});
		}
	};

	// Handle selecting a conversation
	const handleSelectConversation = (conversationId: string) => {
		router.push(`/${params.locale}/buyer/chatbot/${conversationId}`);
	};

	// Load conversations on mount and when search params change
	useEffect(() => {
		fetchConversations();
	}, [searchParams]);

	return (
		<div className="flex h-[calc(100vh-80px)] max-w-7xl mx-auto shadow-lg">
			{/* Sidebar */}
			<div className="w-80 border-r h-full bg-background">
				<ChatSidebar
					conversations={conversations}
					onSelect={handleSelectConversation}
					onSearch={handleSearch}
					onRefresh={fetchConversations}
					loading={loading}
				/>
			</div>

			{/* Chat area */}
			<div className="flex-1 flex flex-col">
				<div className="flex-1 p-4 overflow-hidden flex flex-col">
					<ScrollArea className="flex-1">
						<div className="flex flex-col justify-center items-center h-full min-h-[400px]">
							<div className="text-center max-w-md p-8">
								<h2 className="text-2xl font-bold mb-4">
									Chào mừng đến với Trợ lý ảo
								</h2>
								<p className="text-muted-foreground mb-6">
									Hãy đặt câu hỏi và nhận hỗ trợ ngay lập tức. Cuộc trò chuyện
									của bạn được bảo mật và an toàn.
								</p>
								<div className="space-y-4 text-left">
									<div className="p-3 bg-muted rounded-md">
										<h3 className="font-medium">Ví dụ câu hỏi:</h3>
										<ul className="list-disc list-inside text-sm space-y-2 mt-2">
											<li>
												Bạn có thể giới thiệu sản phẩm phù hợp giá bao nhiêu ?
											</li>
											<li>OCOP là gì?</li>
											<li>
												Sản phẩm nào có giá tốt nhất và đáng giá tốt nhất ?
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</ScrollArea>
				</div>

				{/* Input area */}
				<div className="p-4 border-t">
					<ChatInput
						onSendMessage={handleSendMessage}
						disabled={isStreaming}
						placeholder="Nhập tin nhắn của bạn..."
					/>
					{isStreaming && (
						<div className="flex items-center justify-center mt-2">
							<Loader2 className="h-4 w-4 animate-spin mr-2" />
							<span className="text-sm text-muted-foreground">
								Đang xử lý yêu cầu của bạn...
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
