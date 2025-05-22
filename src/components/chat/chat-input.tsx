'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';

interface ChatInputProps {
	onSendMessage: (message: string) => void;
	disabled?: boolean;
	placeholder?: string;
}

export function ChatInput({
	onSendMessage,
	disabled = false,
	placeholder = 'Type your message...',
}: ChatInputProps) {
	const [message, setMessage] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (!message.trim() || disabled) return;

		onSendMessage(message);
		setMessage('');

		// Reset textarea height
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const handleInput = () => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		// Reset height to auto to properly calculate new height
		textarea.style.height = 'auto';

		// Set the new height (clamped to max-height via CSS)
		textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			<Textarea
				ref={textareaRef}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyDown}
				onInput={handleInput}
				placeholder={placeholder}
				disabled={disabled}
				className="pr-12 min-h-[60px] max-h-[150px] resize-none"
				rows={1}
			/>
			<Button
				type="submit"
				size="icon"
				variant="ghost"
				disabled={!message.trim() || disabled}
				className="absolute right-2 bottom-2 h-8 w-8"
			>
				<Send className="h-4 w-4" />
			</Button>
		</form>
	);
}
