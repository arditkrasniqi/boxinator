import http from './http';

class Service {
    static getBoxes() {
        return http.get('boxes/list')
    }

    static getCountries() {
        return http.get('boxes/countries')
    }

    static addBox(...data) {
        return http.post('boxes/create', ...data)
    }
}

export default Service;