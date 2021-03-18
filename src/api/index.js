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
    update(id,title,bgColor){
        return request(`boards/${id}`,'put',{title,bgColor})
    },
    delete(id){
        return request(`boards/${id}`,'delete')
    }

}

export const list={
    create(payload){
        return request('lists','post',payload)
    },
    update(id,payload){
        return request(`lists/${id}`,'put',payload)
    }
}

export const card={
    fetch(id){
        return request(`cards/${id}`,'get')
    },
    create(title,listId,pos){
        return request('cards','post',{title,listId,pos})
    },
    update(id,payload){
        return request(`cards/${id}`,'put',payload)
    },
    delete(id){
        return request(`cards/${id}`,'delete')
    }
}