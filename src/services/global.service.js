import AxiosStatic from "axios";

export class GlobalService {
	static get headers() {
		return {
			"Content-Type": "application/json",
		};
	}
	constructor() {
		this.axios = AxiosStatic;
	}
	async getData_Async(url) {
		let response;
		try {
			response = await this.axios({
				url: url,
				method: "GET",
				headers: GlobalService.headers,
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
}
