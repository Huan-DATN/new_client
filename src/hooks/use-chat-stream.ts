'use client';

import { ChatStreamEvent } from '@/api/chatRequest';
import envConfig from '@/config';
import { useEffect, useRef, useState } from 'react';

interface UseChatStreamOptions {
	onMessage?: (message: string) => void;
	onMetadata?: (metadata: any) => void;
	onDone?: () => void;
	onError?: (error: string) => void;
}

export default function useChatStream({
	onMessage,
	onMetadata,
	onDone,
	onError,
}: UseChatStreamOptions = {}) {
	const [isStreaming, setIsStreaming] = useState(false);
	const [currentMessage, setCurrentMessage] = useState('');
	const eventSourceRef = useRef<EventSource | null>(null);

	const startStream = async (prompt: string, conversationId?: string) => {
		// Close existing connection if any
		if (eventSourceRef.current) {
			eventSourceRef.current.close();
			eventSourceRef.current = null;
		}

		setIsStreaming(true);
		setCurrentMessage('');

		// Get authentication token
		const token = localStorage.getItem('sessionToken');
		if (!token) {
			setIsStreaming(false);
			if (onError) onError('Authentication required');
			return;
		}

		// Build the URL for the SSE endpoint
		const apiUrl = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/chat/stream`;

		try {
			// Create a new request to initiate the stream
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					prompt,
					conversationId,
				}),
			});

			if (!response.ok) {
				setIsStreaming(false);
				const errorData = await response.json();
				if (onError)
					onError(errorData.message || 'Failed to start chat stream');
				return;
			}

			// Initialize EventSource for the SSE connection
			const eventSource = new EventSource(
				`${apiUrl}?${new URLSearchParams({
					token,
					...(conversationId && { conversationId }),
				})}`
			);

			eventSourceRef.current = eventSource;

			// Handle incoming SSE events
			eventSource.onmessage = (event) => {
				try {
					const parsedEvent: ChatStreamEvent = JSON.parse(event.data);

					switch (parsedEvent.type) {
						case 'message':
							setCurrentMessage(parsedEvent.data);
							if (onMessage) onMessage(parsedEvent.data);
							break;

						case 'metadata':
							if (onMetadata) onMetadata(parsedEvent.data);
							break;

						case 'done':
							if (onDone) onDone();
							setIsStreaming(false);
							eventSource.close();
							eventSourceRef.current = null;
							break;

						case 'error':
							if (onError) onError(parsedEvent.data.message || 'Stream error');
							setIsStreaming(false);
							eventSource.close();
							eventSourceRef.current = null;
							break;
					}
				} catch (error) {
					console.error('Error parsing SSE event', error);
					if (onError) onError('Error processing response');
					setIsStreaming(false);
					eventSource.close();
					eventSourceRef.current = null;
				}
			};

			eventSource.onerror = (error) => {
				console.error('SSE connection error', error);
				if (onError) onError('Connection error');
				setIsStreaming(false);
				eventSource.close();
				eventSourceRef.current = null;
			};
		} catch (error) {
			console.error('Error starting chat stream:', error);
			if (onError) onError('Failed to connect to chat service');
			setIsStreaming(false);
		}
	};

	// Clean up on unmount
	useEffect(() => {
		return () => {
			if (eventSourceRef.current) {
				eventSourceRef.current.close();
				eventSourceRef.current = null;
			}
		};
	}, []);

	return {
		isStreaming,
		currentMessage,
		startStream,
	};
}
