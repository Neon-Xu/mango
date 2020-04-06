
import axios from 'axios';

axios.interceptors.request.use(
	function (config) {

    	return config;
  	}, 
  	function (error) {

    	return Promise.reject(error);
  	}
);
axios.interceptors.response.use(
	function(response) {
		if (response.headers['x-error']) {

			console.log(response.headers['x-error']);
		}
	    return response;
	},
	function(error) {

	    return Promise.reject(error);
	}
);

const request = {
	o: (config) => {
		axios.request(config)
	},
	get: (url, params) => {
		axios.get(url, {params: params})
	},
	del: (url,params) => {
		axios.delete(url, {params: params})
	},
	head: (url,params) => {
		axios.head(url, {params: params})
	},
	post: (url,data,config) => {
		axios.post(url, data || {}, config || {})
	},
	put: (url,data,config) => {
		axios.put(url, data || {}, config || {})
	},
	patch: (url,data,config) => {
		axios.patch(url, data || {}, config || {})
	}

}

export default request;

