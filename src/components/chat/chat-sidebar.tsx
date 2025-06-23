'use client';

import chatRequest, { ChatConversation } from '@/api/chatRequest';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Edit2, MessageCircle, Search, Trash2, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

interface ChatSidebarProps {
	conversations: ChatConversation[];
	onSelect: (conversationId: string) => void;
	selectedId?: string;
	onSearch: (term: string) => void;
	onRefresh: () => void;
	loading?: boolean;
}

export function ChatSidebar({
	conversations,
	onSelect,
	selectedId,
	onSearch,
	onRefresh,
	loading = false,
}: ChatSidebarProps) {
	const router = useRouter();
	const params = useParams();
	const [searchTerm, setSearchTerm] = useState('');
	const [renameDialog, setRenameDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [activeConversation, setActiveConversation] =
		useState<ChatConversation | null>(null);
	const [newTitle, setNewTitle] = useState('');

	const handleSearch = () => {
		onSearch(searchTerm);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleRename = async () => {
		if (!activeConversation || !newTitle.trim()) return;

		try {
			await chatRequest.renameChat(activeConversation.id, {
				newTitle: newTitle.trim(),
			});
			setRenameDialog(false);
			onRefresh();
		} catch (error) {
			console.error('Error renaming chat:', error);
		}
	};

	const handleDelete = async () => {
		if (!activeConversation) return;

		try {
			await chatRequest.deleteChat(activeConversation.id);
			setDeleteDialog(false);

			// If the deleted conversation is currently selected, redirect to the chat home
			if (selectedId === activeConversation.id) {
				router.push(`/${params.locale}/buyer/chatbot`);
			}

			onRefresh();
		} catch (error) {
			console.error('Error deleting chat:', error);
		}
	};

	const openRenameDialog = (
		conversation: ChatConversation,
		e: React.MouseEvent
	) => {
		e.stopPropagation();
		setActiveConversation(conversation);
		setNewTitle(conversation.title);
		setRenameDialog(true);
	};

	const openDeleteDialog = (
		conversation: ChatConversation,
		e: React.MouseEvent
	) => {
		e.stopPropagation();
		setActiveConversation(conversation);
		setDeleteDialog(true);
	};

	const startNewChat = () => {
		router.push(`/${params.locale}/buyer/chatbot`);
	};

	return (
		<div className="h-full">
			<div className="flex flex-col h-full w-full">
				<div className="p-4 border-b">
					<Button
						onClick={startNewChat}
						variant="outline"
						className="w-full justify-start gap-2"
					>
						<MessageCircle className="h-4 w-4" />
						Đoạn chat mới
					</Button>
				</div>

				<div className="p-4 border-b">
					<div className="relative">
						<Input
							placeholder="Tìm kiếm đoạn chat..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={handleKeyDown}
							className="pr-8"
						/>
						{searchTerm ? (
							<X
								className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
								onClick={() => {
									setSearchTerm('');
									onSearch('');
								}}
							/>
						) : (
							<Search
								className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
								onClick={handleSearch}
							/>
						)}
					</div>
				</div>

				<ScrollArea className="flex-1">
					<div className="p-2">
						{loading ? (
							<div className="text-center text-sm text-muted-foreground p-4">
								Đang tải...
							</div>
						) : conversations.length === 0 ? (
							<div className="text-center text-sm text-muted-foreground p-4">
								Không có đoạn chat nào
							</div>
						) : (
							conversations.map((conversation) => (
								<div
									key={conversation.id}
									onClick={() => onSelect(conversation.id)}
									className={cn(
										'flex flex-col p-3 rounded-md cursor-pointer hover:bg-muted/50 mb-1',
										selectedId === conversation.id ? 'bg-muted' : ''
									)}
								>
									<div className="flex justify-between items-start">
										<h3 className="font-medium truncate flex-1">
											{conversation.title}
										</h3>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon"
												className="h-6 w-6"
												onClick={(e) => openRenameDialog(conversation, e)}
											>
												<Edit2 className="h-3 w-3" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="h-6 w-6 text-destructive"
												onClick={(e) => openDeleteDialog(conversation, e)}
											>
												<Trash2 className="h-3 w-3" />
											</Button>
										</div>
									</div>
									<div className="flex justify-between items-center mt-1">
										<span className="text-xs text-muted-foreground">
											{conversation.messageCount} messages
										</span>
										<span className="text-xs text-muted-foreground">
											{format(new Date(conversation.lastActive), 'MMM d')}
										</span>
									</div>
								</div>
							))
						)}
					</div>
				</ScrollArea>
			</div>

			{/* Rename Dialog */}
			<Dialog open={renameDialog} onOpenChange={setRenameDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Rename Conversation</DialogTitle>
					</DialogHeader>
					<Input
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						placeholder="Enter new title"
						className="mt-4"
						autoFocus
					/>
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button onClick={handleRename} disabled={!newTitle.trim()}>
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Dialog */}
			<Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Conversation</DialogTitle>
					</DialogHeader>
					<p className="py-4">
						Are you sure you want to delete this conversation? This action
						cannot be undone.
					</p>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button variant="destructive" onClick={handleDelete}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
