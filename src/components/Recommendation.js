//import "./ScssComponets/Recommendation.scss";

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





// import SingleOpinion from "./SingleOpinion";
// import { getOpinionsByAttrctionId } from "../store/action/user";
// import { useEffect, useState } from "react";
// import { Fragment } from "react";

// const Opinions = ({ attractionId }) => {
//     const [opinionsArr, setOpioniosArr] = useState([]);
//     useEffect(() => {
//         getOpinionsByAttrctionId(attractionId)
//             .then(x => setOpioniosArr(x.data))
//             .catch(err => console.log(err))
//     }, [attractionId]);

//     return (<Fragment>
//         <div className="opinions-list">
//             {opinionsArr.length > 0 && opinionsArr.map(item => {
//                 return <div key={item.Id} className="container-opinion">
//                     <SingleOpinion opinion={item} />
//                 </div>
//             })}
//         </div>
//     </Fragment>);
// }

// export default Opinions;




















































export default function recommendation() {
  

// שליפת כל חוות הדעת
//   const AllRecommendation=FuncOpinion().then(x=>{
//     console.log(x.data);
//  })
//  .catch(err=>console.log(err));
//   console.log(AllRecommendation);


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
    </div>
   
        
        <div  className="div-one-reco" style={{height:"90px"}}>
         היה לנו העונג לעבוד עם  Delishes לחתונה שלנו
        <br/>
        הצוות היה מקצועי ועשה  הכול
      
         להבטיח שכל אורח יהיה מרוצה.
        <br/>
        אנחנו ממליצים  על  Delishes לכל אירוע.
        </div>

        <div className="div-one-reco" style={{height:"90px"}}>
        לא מזמן שכרנו את  Delishes לבר מצווה של הבן שלנו 
        <br/>
       
        האורחים שלנו התרשמו, האוכל היה מדהים 
        <br/> וקיבלנו מחמאות רבות על האוכל והשירות.
        </div>

        <div className="div-one-reco" style={{height:"90px"}}>
         ערכנו לאחרונה את האירוסין שלנו 
          ולא יכולנו להיות מרוצים יותר
          <br/>
          האורחים שלנו התלהבו מהאוכל
           והשירות היה יוצא דופן.
           <br/>
           אנו ממליצים עליהם בחום.
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
