//דף של כל הפונקציות שניגשות לשרת
//ספרייה שאחראית על פתיחות בקשות לשרת
import axios from "axios";

const login=(user)=>{
    return axios.post("localhost:8080/userRouter/AddUser"+user)

}

export const getAllContactNotPerform = () => {
    return axios.get("http://localhost:8080/contactRouter/getAllContactNotPerform")
}

export const FuncDeleteContact = (id) => {
    return axios.put("http://localhost:8080/contactRouter/deleteContact/"+id)
}