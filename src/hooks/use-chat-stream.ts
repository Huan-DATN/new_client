'use client';

import { ChatStreamEvent } from '@/api/chatRequest';
import envConfig from '@/config';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useEffect, useRef, useState } from 'react';

interface UseChatStreamOptions {
	onMessage?: (message: string) => void;
	onMetadata?: (metadata: any) => void;
	onDone?: () => void;
	onError?: (error: string) => void;
	sessionToken?: string;
}

export default function useChatStream({
	onMessage,
	onMetadata,
	onDone,
	onError,
	sessionToken,
}: UseChatStreamOptions = {}) {
	const [isStreaming, setIsStreaming] = useState(false);
	const [currentMessage, setCurrentMessage] = useState('');
	const abortControllerRef = useRef<AbortController | null>(null);

	const startStream = async (prompt: string, conversationId?: string) => {
		// Check if session token is available
		if (!sessionToken) {
			if (onError) onError('Authentication token is required');
			return;
		}

		// Cancel existing connection if any
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}

		setIsStreaming(true);
		setCurrentMessage('');

		// Build the URL for the SSE endpoint
		const apiUrl = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/chat/stream`;

		try {
			// Create abort controller for this request
			const abortController = new AbortController();
			abortControllerRef.current = abortController;

			// Use fetch-event-source with headers support
			await fetchEventSource(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionToken}`,
				},
				body: JSON.stringify({
					prompt,
					...(conversationId && { conversationId }),
				}),
				signal: abortController.signal,
				onmessage: (event) => {
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
								abortController.abort();
								abortControllerRef.current = null;
								break;

							case 'error':
								if (onError)
									onError(parsedEvent.data.message || 'Stream error');
								setIsStreaming(false);
								abortController.abort();
								abortControllerRef.current = null;
								break;
						}
					} catch (error) {
						console.error('Error parsing SSE event', error);
						if (onError) onError('Error processing response');
						setIsStreaming(false);
						abortController.abort();
						abortControllerRef.current = null;
					}
				},
				onerror: (error) => {
					console.error('SSE connection error', error);
					if (onError) onError('Connection error');
					setIsStreaming(false);
					abortController.abort();
					abortControllerRef.current = null;
					// Don't retry
					throw error;
				},
				onclose: () => {
					console.log('SSE connection closed');
					setIsStreaming(false);
					abortControllerRef.current = null;
				},
			});
		} catch (error) {
			console.error('Error starting chat stream:', error);
			if (onError) onError('Failed to connect to chat service');
			setIsStreaming(false);
		}
	};

	// Clean up on unmount
	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
				abortControllerRef.current = null;
			}
		};
	}, []);

	return {
		isStreaming,
		currentMessage,
		startStream,
	};
}
