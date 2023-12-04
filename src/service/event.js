import axios from "axios";

export const getAllTasksByIdUser=(id)=>{
    return axios.get("http://localhost:8080/taskRouter/getTaskById/"+id);
}

export const getMenuTypes = () => {
    return axios.get("http://localhost:8080/menuTypeRouter/getAllMenuType")
}

export const getEventsType = () => {
    return axios.get("http://localhost:8080/eventTypeRouter/getAllEventType")
}

export const getMenuEvents = () => {
    return axios.get("http://localhost:8080/menuEventTypeRouter/getAllMenuEventType")
}

export const updateActiveEventType = (id) => {
    return axios.put("http://localhost:8080/eventTypeRouter/updateActive/"+id);
}

export const updateEventType = (id, event) => {
    return axios.put(`http://localhost:8080/eventTypeRouter/update/${id}`, event);
}

export const addEventType = (event) => {
    return axios.post(`http://localhost:8080/eventTypeRouter/addEventType`, event);
}

export const changeActiveFood = (id) => {
    return axios.put(`http://localhost:8080/foodRouter/updateActive/${id}`);
}

export const getAllFood = () => {
    return axios.get(`http://localhost:8080/foodRouter/getAllFood`);
}

export const getAllFoodType = () => {
    return axios.get(`http://localhost:8080/foodsTypeRouter/getAllFoodsType`);
}

export const addFood = (food) => {
    return axios.post(`http://localhost:8080/foodRouter/addFood`, food);
}

export const updateActiveMenuType = (id) => {
    return axios.put(`http://localhost:8080/menuEventTypeRouter/updateActive/${id}`);
}

export const addMenuEventType = (menuEvent) => {
    return axios.post(`http://localhost:8080/menuEventTypeRouter/addMenuEventType`, menuEvent);
}


