import Api from '../api/';
import {SET_CUSTOMER} from './mutation-types';

export default {
    async login({ commit, state }){
        try {
            const customer = await Api.login(param);
            commit(SET_CUSTOMER, customer.data);
        } catch (error) {
            
        }
    }
};
