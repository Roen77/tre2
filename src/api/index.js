import axios from 'axios';
import setinterceptor from './interceptors';



const setInstance=()=>{
    const instance =axios.create({
        baseURL:'http://localhost:3000/'
    })
    return setinterceptor(instance);
}

const instance=setInstance();


const request=(url,method,data)=>{
    return instance({
        url,
        method,
        data
    })
};

export const auth={
    login(email,password){
        return request('login','post',{email,password})
    }
}

export const board={
    fetch(id){
        return id?request(`boards/${id}`,'get'):request('boards','get');
    },
    create(title){
        return request('boards','post',{title})
    },
    update(id,title){
        return request(`boards/${id}`,'put',{title})
    }

}

export const card={
    fetch(id){
        return request(`cards/${id}`,'get')
    },
    create(title,listId){
        return request('cards','post',{title,listId})
    },
    update(id,payload){
        return request(`cards/${id}`,'put',payload)
    }
}