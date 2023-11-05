//דף של כל הפונקציות שניגשות לשרת
//ספרייה שאחראית על פתיחות בקשות לשרת
import axios from "axios";

const login=(user)=>{
    return axios.post("localhost:8080/userRouter/AddUser"+user)

}