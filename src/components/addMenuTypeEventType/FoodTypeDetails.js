import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllFoodByMenuId } from "../../store/action/event";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function FoodTypeDetails({ foodType, foods, change, type, changeMenuTypes, chosenFoods, menuType }) {
  const [foodsArr, setFoodaArr] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [card, setCard] = useState(null);
  const [itemsChosen, setItemsChosen] = useState([]);

  useEffect(() => {
    const arr = foods?.filter((x) => x.FoodTypeId == foodType.Id);
    setFoodaArr(arr);
    if(chosenFoods) {
      setItemsChosen(chosenFoods.filter((x) => x.FoodTypeId == foodType.Id));
    }
console.log(menuType)
    const x = (
      <React.Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            {bull} {foodType.Name} {bull}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            נא הכנס כמות. ומחיר כשיש צורך בתוספת מחיר
          </Typography>
          <Typography variant="body2">
            <TextField
              id="outlined-basic"
              label="כמות"
              variant="outlined" 
              className="ms-2"
              name="Amount"
              size="small"
              type="number"
              style={{width:"10vw"}}
              onChange={(e) => changeMenuTypes(e, foodType)}
              defaultValue={type?menuType.find(x=>x.FoodTypeId.Id==foodType.Id)?.Amount:null}
            />
            <TextField
              id="outlined-basic"
              label="מינימום מחיר"
              variant="outlined"
              size="small"
              name="ExtraPrice"
              type="number"
              style={{width:"10vw"}}
              onChange={(e) => changeMenuTypes(e, foodType)}
              defaultValue={type?menuType.find(x=>x.FoodTypeId.Id==foodType.Id)?.ExtraPrice:null}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <div><Button size="small" variant="contained" onClick={() => {const x= !isShow; setIsShow(x)}}>
            הכנס פריטים
          </Button> </div>
           {isShow && foodsArr.map((item) => <FormControlLabel
              style ={{width:"16vw"}}
              control={<Checkbox />}
              label={item.Name}
              key={item.Id}
              checked={itemsChosen.find(x=>x.FoodId == item.Id)}
              onChange={(e)=>change(e,item)}
            /> 
          )}
        </CardActions>
      </React.Fragment>
    );
    setCard(x)
  }, [foodType, isShow]);

  useEffect(()=>{},[foodsArr])

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
