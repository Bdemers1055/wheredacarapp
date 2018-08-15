import axios from "axios";
import auth from "auth";

const location = {
    create(latitude, longitude) {
        const token = auth.getToken();
        return axios({
            method: post,
            url: '/api/locations',
            data: {
            lat: latitude,
            lon: longitude
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }, //api post
    get() {
        const token = auth.getToken();
        return axios({
            method: get,
            url: '/api/locations',
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }, //api get database location
    delete() {
        const token = auth.getToken();
        return axios({
            method: 'delete',
            url: '/api/locations',
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }, //api delete
    // geolocate(){} //browser 
};

export default location;