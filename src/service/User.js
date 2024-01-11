//דף של כל הפונקציות שניגשות לשרת
//ספרייה שאחראית על פתיחות בקשות לשרת
import axios from "axios";

export const login=(user)=>{
    return axios.post("http://localhost:8080/userRouter/login", user)

}

export const getAllContactNotPerform = () => {
    return axios.get("http://localhost:8080/contactRouter/getAllContactNotPerform")
}

export const FuncDeleteContact = (id) => {
    return axios.put("http://localhost:8080/contactRouter/deleteContact/"+id)
}


//  שליפת כל חוות הדעת  המאושרות
export const FuncOpinion=()=>{
    return axios.get("http://localhost:8080/opinionRouter/getAllOpinionApproval") 
}

//הוספת חוות דעת
export const AddOpinion=(id)=>{
    return axios.post("http://localhost:8080/opinionRouter/addOpinion/"+id) 
}


//הוספת צור קשר
export const AddContact=(data)=>{
    return axios.post("http://localhost:8080/contactRouter/addContactUs",data)
}


