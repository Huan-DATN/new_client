'use client';

import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { forwardRef } from 'react';

export interface ChatMessageProps {
	content: string;
	role: string;
	createdAt: string;
	isTyping?: boolean;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
	({ content, role, createdAt, isTyping = false }, ref) => {
		const isUser = role === 'human';
		const isSystem = role === 'system';
		const isAI = role === 'ai';

		// Skip system messages or only show them in a specific way if needed
		if (isSystem && content === 'Conversation started') return null;

		return (
			<div
				ref={ref}
				className={cn(
					'flex w-full gap-3 p-4',
					isUser ? 'flex-row-reverse' : '',
					isSystem ? 'justify-center' : ''
				)}
			>
				{!isAI && (
					<Avatar className={cn('h-8 w-8', isUser ? 'bg-primary' : 'bg-muted')}>
						<span className="text-xs">{isUser ? 'You' : 'AI'}</span>
					</Avatar>
				)}

				<div
					className={cn(
						'flex max-w-[85%] flex-col',
						isUser ? 'items-end' : 'items-start'
					)}
				>
					<Card
						className={cn(
							'px-4 py-3 shadow-sm',
							isUser
								? 'bg-primary text-primary-foreground'
								: isSystem
								? 'bg-muted text-muted-foreground text-center text-sm w-full max-w-md'
								: 'bg-background border'
						)}
					>
						<div className="whitespace-pre-wrap break-words">
							{isTyping ? (
								<span className="flex gap-1 items-center">
									<span className="animate-bounce">•</span>
									<span className="animate-bounce delay-100">•</span>
									<span className="animate-bounce delay-200">•</span>
								</span>
							) : (
								content
							)}
						</div>
					</Card>

					{!isAI && createdAt && (
						<span className="text-xs text-muted-foreground mt-1">
							{format(new Date(createdAt), 'h:mm a, MMM d')}
						</span>
					)}
				</div>
			</div>
		);
	}
);

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
