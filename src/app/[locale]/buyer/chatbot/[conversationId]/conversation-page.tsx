'use client';

import chatRequest, {
	ChatConversation,
	ChatMessage as ChatMessageType,
} from '@/api/chatRequest';
import { ChatInput } from '@/components/chat/chat-input';
import ChatMessage from '@/components/chat/chat-message';
import { ChatSidebar } from '@/components/chat/chat-sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import useChatStream from '@/hooks/use-chat-stream';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ConversationPage({
	sessionToken,
}: {
	sessionToken: string;
}) {
	const router = useRouter();
	const params = useParams();
	const conversationId = params.conversationId as string;
	const [conversations, setConversations] = useState<ChatConversation[]>([]);
	const [messages, setMessages] = useState<ChatMessageType[]>([]);
	const [currentConversation, setCurrentConversation] =
		useState<ChatConversation | null>(null);
	const [loadingMessages, setLoadingMessages] = useState(true);
	const [loadingConversations, setLoadingConversations] = useState(true);
	const [searchParams, setSearchParams] = useState({});
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Set up chat stream
	const { isStreaming, currentMessage, startStream } = useChatStream({
		onMessage: (message) => {
			// Add this message to the state temporarily until refresh
			const tempMessage: ChatMessageType = {
				id: 0,
				content: message,
				role: 'ai',
				createdAt: new Date().toISOString(),
			};
			setMessages((prev) => [...prev, tempMessage]);

			// Scroll to bottom
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		},
		onMetadata: (metadata) => {
			if (metadata && metadata.title) {
				setCurrentConversation((prev) =>
					prev ? { ...prev, title: metadata.title } : null
				);
			}
		},
		onDone: () => {
			// Refresh messages when done
			fetchMessages();
			fetchConversations();
		},
		onError: (error) => {
			toast({
				title: 'Lỗi',
				description: error,
				variant: 'destructive',
			});
		},
		sessionToken: sessionToken,
	});

	// Fetch conversations
	const fetchConversations = async () => {
		try {
			setLoadingConversations(true);
			const response = await chatRequest.getChatHistory(searchParams);
			setConversations(response.payload.data.items);

			// Find current conversation in the list
			const current = response.payload.data.items.find(
				(conv) => conv.id === conversationId
			);

			if (current) {
				setCurrentConversation(current);
			}
		} catch (error) {
			console.error('Error fetching conversations:', error);
			toast({
				title: 'Lỗi',
				description: 'Không thể tải cuộc trò chuyện',
				variant: 'destructive',
			});
		} finally {
			setLoadingConversations(false);
		}
	};

	// Fetch messages for the current conversation
	const fetchMessages = async () => {
		try {
			setLoadingMessages(true);
			const response = await chatRequest.getConversationById(conversationId);
			// Sort messages by creation time (oldest first)
			const sortedMessages = [...response.payload.data.items].sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
			setMessages(sortedMessages);

			// Scroll to bottom of messages on load
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		} catch (error) {
			console.error('Error fetching messages:', error);
			toast({
				title: 'Lỗi',
				description: 'Không thể tải tin nhắn',
				variant: 'destructive',
			});
		} finally {
			setLoadingMessages(false);
		}
	};

	// Handle search
	const handleSearch = (term: string) => {
		setSearchParams({
			...searchParams,
			search: term,
		});
	};

	// Handle sending a message
	const handleSendMessage = async (message: string) => {
		try {
			// Add user message to the UI immediately
			const userMessage: ChatMessageType = {
				id: Date.now(), // Temporary ID
				content: message,
				role: 'human',
				createdAt: new Date().toISOString(),
			};

			setMessages((prev) => [...prev, userMessage]);

			// Scroll to bottom
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 100);

			// Start the message stream
			await startStream(message, conversationId);
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
	const handleSelectConversation = (selectedId: string) => {
		router.push(`/${params.locale}/buyer/chatbot/${selectedId}`);
	};

	// Go back to all chats
	const goBack = () => {
		router.push(`/${params.locale}/buyer/chatbot`);
	};

	// Load data on mount
	useEffect(() => {
		fetchConversations();
		fetchMessages();
	}, [conversationId]);

	// Reload conversations when search params change
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
					selectedId={conversationId}
					onSearch={handleSearch}
					onRefresh={fetchConversations}
					loading={loadingConversations}
				/>
			</div>

			{/* Chat area */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<div className="p-4 border-b flex items-center">
					<Button variant="ghost" size="icon" onClick={goBack} className="mr-2">
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<h2 className="font-semibold">
						{currentConversation
							? currentConversation.title
							: 'Cuộc trò chuyện'}
					</h2>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-hidden">
					<ScrollArea className="h-full">
						{loadingMessages ? (
							<div className="flex justify-center items-center h-full">
								<Loader2 className="h-6 w-6 animate-spin" />
							</div>
						) : messages.length === 0 ? (
							<div className="flex justify-center items-center h-full text-muted-foreground">
								Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
							</div>
						) : (
							<div className="pt-4 pb-2">
								{messages.map((message) => (
									<ChatMessage
										key={message.id}
										content={message.content}
										role={message.role}
										createdAt={message.createdAt}
									/>
								))}
								{isStreaming && (
									<ChatMessage
										content=""
										role="ai"
										createdAt={new Date().toISOString()}
										isTyping
									/>
								)}
								<div ref={messagesEndRef} />
							</div>
						)}
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
								Trợ lý đang trả lời...
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
