import http from '../lib/http';
import { ImageResType } from '../schemaValidations/response/media';

const mediaRequest = {
	uploadImage: (body: FormData) => {
		return http.post<ImageResType>('/media/upload', body);
	},
};

export default mediaRequest;
