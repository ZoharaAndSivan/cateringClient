import "./ScssComponets/Recommendation.scss";

import StarBorderIcon from '@mui/icons-material/StarBorder';
 
import { useEffect, useState } from 'react';
//import { useEffect, useState } from "react";
//שליפת חוות דעת 
import { FuncOpinion } from "../service/User";

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { useSelector } from 'react-redux';
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";


export default function Recommendation() {
  //שליפת משתמשים
  const currentUser = useSelector((state) => state.user.currentUser);
  const [opinion, setOpinion] = useState("");
  const [allOpnion, setAllOpnion] = useState([]);


  useEffect(() => {
    FuncOpinion()
      .then((res) => {
        setAllOpnion(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  const addOpinion = () => {
    if(opinion.length<=0){
      Swal.fire({icon:"warning", title:"הכנס חוות דעת"});
    }
    axios.post(`http://localhost:8080/opinionRouter/addOpinion/${currentUser.Id}`, {OpinionWrite:opinion})
    .then(x=>{
      console.log(x.data);
      setOpinion("");
      Swal.fire({icon:"success", title:"חוות הדעת הוגשה בהצלחה!", text:"אנו מודים לך על נתינת דעתך."})
    })
    .catch(err => console.log(err))
  }
  return (
    <> 
   

    <div className="divvvvvvvv">

       <br/>
    <h2  className="h2-reco">לקוחות ממליצים</h2>

    <div className="star">
    <StarBorderIcon />
    <StarBorderIcon/>
    <StarBorderIcon/>
    <StarBorderIcon/>
    <StarBorderIcon/>
    </div>

    <br/>
    <hr className="hr-reco"/>

    <br/>
    <br/>
{console.log(currentUser)}
   {/*משתמש רשום */}
   {currentUser?.UserType == 3 && (
          <div>
            <p>הוסף חוות דעת</p>
            <TextField variant="outlined" label="חוות דעת" onChange={(e)=>{setOpinion(e.target.value)}}/>
            <br/><br/>
            <Button onClick={addOpinion}>הוסף</Button>
          </div>
        )}
    {/* <br/>
    <br/>
    <br/> */}
    </div>
   
        
     
      
        {allOpnion.length > 0 &&
        allOpnion.map((item, index) => {
          return (
            <div key={item.id} className="divOpinion" >

            <p>{item.UserId.FirstName} {item.UserId.LastName}  </p>
             {item.OpinionWrite}
            </div>
          );
        })}

       <div>
       {/* <bottom>< KeyboardDoubleArrowLeftIcon/></bottom> */}
        </div>
   
   
    </>
  );
}
