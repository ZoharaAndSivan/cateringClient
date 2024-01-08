import { useSelector } from "react-redux"
import ClearIcon from '@mui/icons-material/Clear';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
//import TableHead from '@mui/material/ TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { getAllContactNotPerform,FuncDeleteContact } from "../service/User";

import "./ScssComponets/ContactManager.scss";


export default function ContactManager()
{

  //שליפת יצירת קשר בהמתנה
  //getAllContactNotPerform

    // //const allContact=useSelector((state)=>state.user.contactUs);
    // //console.log("allContact",allContact);
    // const [allContactArr,setAllContactArr]=useState([]);
    // const [note,setNote]=useState("");

    // useEffect(()=>{
    //     setAllContactArr(allContact);
    // },[allContact])


    const deleteContact=(id)=>{
     console.log(id);
     FuncDeleteContact(id)
      // .then((response) => {
      //   Swal.fire({
      //     title: "נשלח בהצלחה!",
      //     text: "ניצור איתך קשר בהקדם ",
      //     icon: "success",
      //     confirmButtonText: "סיים",
      //   }).then((result) => {
      //     navigate("/");
      //   });
      // })
      // .catch((err) => console.log(err));

    //  .then(x=>{
    //     console.log(x.data);
    //     const arr=allContactArr.filter(x=>x.Id != id);
    //     setAllContactArr(arr);
    //  })
    //  .catch(err=>console.log(err))

    }

    const change=()=>{
        console.log("mmmm")
    }
   



    return(
<div></div>
//       <>
//       {/* <div style={{height:"200px"}}></div> */}
//       <div className="divContactManager">יצירת קשר-  לקוחות</div>
// <br/>
//  {/* Perform ManegerNote */}
//              <div className="divTableContact">
//              <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell></TableCell>
//             <TableCell align="right">שם</TableCell>
//             <TableCell align="right">טלפון</TableCell>
//             <TableCell align="right">אימייל</TableCell>
//             <TableCell align="right">הערה</TableCell>
//             <TableCell align="right">הוספת הערה</TableCell>
//             <TableCell align="right">סמן אם בוצע</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>

       
//           {allContactArr.map((item) => (
//             <TableRow
//               key={item.Id}
//             //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//                 {/* component="th" scope="row" */}
//               <TableCell align="right"></TableCell>
//               <TableCell align="right">{item.FullName}</TableCell>
//               <TableCell align="right">{item.Phone}</TableCell>
//               <TableCell align="right">{item.Email}</TableCell>
//               <TableCell align="right">{item.Note}</TableCell>
//               <TableCell align="right">

//               <TextField
//         //   label="Size"
//           id="standard-size-normal"
//         //   defaultValue="Normal"
//            variant="standard"
//            onChange={(e)=>setNote(e.target.value)}
//         />
//               </TableCell>
//               <TableCell align="right">
//               <div><ClearIcon onClick={()=>deleteContact(item.Id)}/></div>
              
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </div>
// <br/>
        
   
    //   </>
    )
}