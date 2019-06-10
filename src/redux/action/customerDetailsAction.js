import {LOAD_CUSTOMER} from './../../constants/constants';

export function loadCustomer(customerDatas){
    return {
        type: LOAD_CUSTOMER, customerDatas
    }
}