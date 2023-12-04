import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addMenuEventType, getAllFood, getAllFoodType } from "../../service/event";
import FoodTypeDetails from "./FoodTypeDetails";
import FormInput from "../FormInput";
const schema = yup
  .object({
    Name: yup.string().required("שדה זה חובה"),
    MinimumPeople: yup
      .number()
      .positive("מספר לא תקין")
      .typeError("שדה זה חובה")
      .required("שדה זה חובה"),
    Price: yup
      .number()
      .positive("מספר לא תקין")
      .typeError("שדה זה חובה")
      .required("שדה זה חובה"),
  })
  .required();

const arr = [
  { lableName: "שם תפריט", name: "Name", type: "text" },
  { lableName: "מינימום אנשים", name: "MinimumPeople", type: "number" },
  { lableName: "מחיר", name: "Price", type: "number" },
];
const AddMenuEventType = () => {
  const { eventId } = useParams();
  const [foodsTypeArr, setFoodsTypeArr] = useState([]);
  const [foodsArr, setFoodsArr] = useState([]);
  let productsToMenu=[];
  let menuType=[];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: { user, editOrder },
  });

  useEffect(() => {
    getAllFoodType()
      .then((res) => {
        setFoodsTypeArr(res.data);
      })
      .catch((err) => console.log(err));
    
      getAllFood()
      .then((res) => {
        setFoodsArr(res.data.filter(x=>x.Active.data[0]==true));
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    data.EventId = eventId;
    const obj = {menuEventType:data, productsToMenu, menuType};
    console.log(obj)
    addMenuEventType(obj)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const changeProducts = (e, product) => {
    if(e.target.checked) {
      productsToMenu = [...productsToMenu, {FoodId:product.Id, FoodTypeId: product.FoodTypeId}];
    } else {
      productsToMenu = productsToMenu.filter(x=>x.FoodId != product.Id);
    }
  }

  const changeMenuTypes = (e, foodType) => {
    const {name, value} = e.target
    const index = menuType.findIndex(x=>x.FoodTypeId== foodType.Id);
    if(index != -1) {
      let object = menuType[index];
      object[name]=value;
      menuType[index] = object;
    } else {
      let obj = {FoodTypeId:foodType.Id, Amount:0, ExtraPrice:0};
      obj[name] = parseInt(value);
      menuType = [...menuType, obj];
    }
    console.log(menuType)
  }

  return (
    <div className="container p-5">
      <h5> פרטי התפריט </h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        {arr.map((item) => (
          <FormInput
            lableName={item.lableName}
            name={item.name}
            type={item.type}
            errors={errors}
            register={register}
            // expense={food}
            flag={false}
          />
        ))}
        <h5> המוצרים בתפריט </h5>
        <div className="row p-5">
         {foodsTypeArr.length>0 && foodsTypeArr.map(item => <div key={item.Id} style={{width:"48%", marginBottom:"4rem"}}>
         <FoodTypeDetails foodType={item} foods={foodsArr} change={changeProducts} changeMenuTypes={changeMenuTypes}/>
         </div>)}
         </div>
        <Button variant="contained" type="submit">
          הוסף
        </Button>
      </form>
    </div>
  );
};
export default AddMenuEventType;
