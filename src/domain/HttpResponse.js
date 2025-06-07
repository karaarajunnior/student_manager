export class HttpResponse {
	timestamp;

	constructor(httpStatus, Code, message, data) {
		this.timestamp = new Date().getFullYear().toLocaleString();
		this.httpStatus = httpStatus;
		this.Code = Code;
		this.message = message;
		this.data = data;
	}
}
