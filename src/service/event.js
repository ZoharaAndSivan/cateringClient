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



