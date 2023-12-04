import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux';
import { FuncOpinion } from "../service/User";
import "./Recommendation.scss";
//npm install @mui/icons-material @mui/material @emotion/styled @emotion/react


export default function recommendation() {
  
  const AllRecommendation=FuncOpinion().then(x=>{
    console.log(x.data);
 })
 .catch(err=>console.log(err));
  console.log(AllRecommendation);


  return (
    <>
    <h2>לקוחות ממליצים</h2>
    <div id="star" style={{color:"yellow"}}>
    <StarBorderIcon style={{height:"50px"}}/>
    <StarBorderIcon/>
    <StarBorderIcon/>
    <StarBorderIcon/>
    <StarBorderIcon/>
    </div>
     <div id="bigDiv">
      <div>
       <bottom>< KeyboardDoubleArrowRightIcon/></bottom>
      </div>
      
      <div>

      
       {/* {AllRecommendation.length > 0 &&
        AllRecommendation.map((item, index) => {
          return (
            <div key={item.id} >
             {item.OpinionWrite}
             
            </div>
          );
        })} */}
        </div>




       <div>
       <bottom>< KeyboardDoubleArrowLeftIcon/></bottom>
        </div>
    </div>
    </>
  );
}
