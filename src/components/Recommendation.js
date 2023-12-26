import "./ScssComponets/Recommendation.scss";

import StarBorderIcon from '@mui/icons-material/StarBorder';

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
import { FuncOpinion } from "../service/User";





export default function recommendation() {
  

//שליפת כל חוות הדעת
//   const AllRecommendation=FuncOpinion().then(x=>{
//     console.log(x.data);
//  })
//  .catch(err=>console.log(err));
//   console.log(AllRecommendation);


  return (
    <> 
   

    <div className="divvvvvvvv">
      
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
    </div>
   
        
        <div  className="div-one-reco" style={{height:"90px"}}>
sbvwxbsbxb 
        </div>

        <div className="div-one-reco" style={{height:"90px"}}>
sbvwxbsbxb 
        </div>

        <div className="div-one-reco" style={{height:"90px"}}>
sbvwxbsbxb 
        </div>


        <div>..........</div>

      
       {/* {AllRecommendation.length > 0 &&
        AllRecommendation.map((item, index) => {
          return (
            <div key={item.id} >
             {item.OpinionWrite}
             
            </div>
          );
        })} */}





       <div>
       {/* <bottom>< KeyboardDoubleArrowLeftIcon/></bottom> */}
        </div>
   
   
    </>
  );
}
