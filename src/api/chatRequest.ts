import http from '../lib/http';

export interface ChatHistoryParams {
	search?: string;
	fromDate?: string;
	toDate?: string;
	sort?: 'ASC' | 'DESC';
	page?: string | number;
	limit?: string | number;
}

export interface ChatSendParams {
	prompt: string;
	conversationId?: string;
}

export interface ChatRenameParams {
	newTitle: string;
}

export interface ChatMessage {
	id: number;
	content: string;
	role: string;
	createdAt: string;
}

export interface ChatConversation {
	id: string;
	title: string;
	lastActive: string;
	createdAt: string;
	messageCount: number;
}

export interface ChatHistoryResponse {
	message: string;
	data: {
		items: ChatConversation[];
		meta: {
			total: number;
			page: number;
			limit: number;
			totalPages: number;
		};
	};
}

export interface ChatMessagesResponse {
	message: string;
	data: {
		items: ChatMessage[];
		meta: {
			total: number;
			page: number;
			limit: number;
			totalPages: number;
		};
	};
}

export interface ChatRenameResponse {
	message: string;
	data: {
		id: string;
		title: string;
	};
}

export interface ChatDeleteResponse {
	message: string;
	data: {
		success: boolean;
	};
}

// Event source types
export interface ChatStreamEvent {
	type: 'message' | 'metadata' | 'done' | 'error';
	data: any;
}

const chatRequest = {
	// Get chat history
	getChatHistory: (params: ChatHistoryParams = {}) => {
		const queryParams = new URLSearchParams();

		if (params.search) queryParams.append('search', params.search);
		if (params.fromDate) queryParams.append('fromDate', params.fromDate);
		if (params.toDate) queryParams.append('toDate', params.toDate);
		if (params.sort) queryParams.append('sort', params.sort);
		if (params.page) queryParams.append('page', params.page.toString());
		if (params.limit) queryParams.append('limit', params.limit.toString());

		const queryString = queryParams.toString();
		return http.get<ChatHistoryResponse>(
			`/chat${queryString ? `?${queryString}` : ''}`
		);
	},

	// Get conversation by ID
	getConversationById: (
		conversationId: string,
		params: { page?: string | number; limit?: string | number } = {}
	) => {
		const queryParams = new URLSearchParams();

		if (params.page) queryParams.append('page', params.page.toString());
		if (params.limit) queryParams.append('limit', params.limit.toString());

		const queryString = queryParams.toString();
		return http.get<ChatMessagesResponse>(
			`/chat/${conversationId}${queryString ? `?${queryString}` : ''}`
		);
	},

	// Rename chat
	renameChat: (conversationId: string, params: ChatRenameParams) => {
		return http.patch<ChatRenameResponse>(`/chat/${conversationId}`, params);
	},

	// Delete chat
	deleteChat: (conversationId: string) => {
		return http.delete<ChatDeleteResponse>(`/chat/${conversationId}`, {});
	},

	// Stream message functionality is implemented in the component level
	// as it requires EventSource for SSE
};

export default chatRequest;
