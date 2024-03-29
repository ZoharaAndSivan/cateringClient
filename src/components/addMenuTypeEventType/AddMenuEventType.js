import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addMenuEventType,
  getAllFood,
  getAllFoodType,
} from "../../service/event";
import FoodTypeDetails from "./FoodTypeDetails";
import FormInput from "../FormInput";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addMenuEvents, addMenuTypes, getAllFoodByMenuId, saveEventsType, saveMenuEvents, saveMenuTypes } from "../../store/action/event";
import Swal from "sweetalert2";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eventId, menuId, type } = useParams();
  const [foodsTypeArr, setFoodsTypeArr] = useState([]);
  const [foodsArr, setFoodsArr] = useState([]);
  const [menu, setMenu] = useState(null);
  const [productsToMenu, setProductsToMenu] = useState([]);
  const [menuType, setMenuType] = useState([]);
  let x = [];

  const { menusEvents, user, menuTypes } = useSelector((state) => {
    return {
      menusEvents: state.catering.menusEvents,
      menuTypes: state.catering.menuTypes,
      user: state.user.currentUser,
    };
  }, shallowEqual);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { menu },
  });

  useEffect(() => {
    if (type == "edit") {
      const temp = menusEvents.find((x) => x.Id == menuId);
      setMenu(temp);
      setMenuType(menuTypes.filter((x) => x.MenuId == menuId));
      arr.forEach((x) => setValue(x.name, temp[x.name]));

      getAllFoodByMenuId(menuId)
        .then((res) => {
          console.log(res.data);
          setProductsToMenu(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    getAllFoodType()
      .then((res) => {
        setFoodsTypeArr(res.data);
      })
      .catch((err) => console.log(err));

    getAllFood()
      .then((res) => {
        setFoodsArr(res.data.filter((x) => x.Active.data[0] == true));
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    console.log(menuType,y, "ppppppppppp");
    data.EventId = eventId;
    const obj = { menuEventType: data, productsToMenu, menuType };
    console.log(obj);
    addMenuEventType(obj)
      .then((res) => {
        console.log(res.data);
         dispatch(addMenuEvents(res.data.menuEventType));
         dispatch(addMenuTypes(res.data.menuTypes));
        Swal.fire({icon:"success", title:"נוסף בהצלחה!"});
        navigate("/menuType/"+eventId);
      })
      .catch((err) => console.log(err));
  };
let y=[];
  const changeProducts = async (e, product) => {
    let arr;
    if (e.target.checked) {
      arr = [
        ...productsToMenu,
        { FoodId: product.Id, FoodTypeId: product.FoodTypeId },
      ];
      y= [...y, { FoodId: product.Id, FoodTypeId: product.FoodTypeId },]
    } else {
      arr = productsToMenu.filter((x) => x.FoodId != product.Id);
    }
    console.log("yyyyyy", y)
    console.log(arr,e.target.checked);
    setProductsToMenu(y);
    setFoodsArr(productsToMenu);
  };

  const changeMenuTypes = (e, foodType) => {
    const { name, value } = e.target;
    const index =
      type == "edit"
        ? x.findIndex((x) => x.FoodTypeId.Id == foodType.Id)
        : x.findIndex((x) => x.FoodTypeId.Id == foodType.Id);
    if (index != -1) {
      let object = x[index];
      object[name] = value;
      let arr = [...x];
      arr[index] = object;
      setMenuType(arr);
      x=[...arr];
      setMenuType([...arr])
      console.log(arr,x)
      // menuType[index] = object;
    } else {
      let obj = { FoodTypeId: {Id:foodType.Id, Name:foodType.Name}, Amount: 0, ExtraPrice: 0 };
      obj[name] = parseInt(value);
      console.log(obj)
      let arr = [...x, obj];
      console.log(arr)
      setMenuType(arr);
      x=[...arr];
      setMenuType([...arr])
      console.log(arr, menuType, x)
      // menuType = [...menuType, obj];
    }
    // console.log(arr, menuType, "llllllll");
  };

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
          {foodsTypeArr.length > 0 &&
            foodsTypeArr.map((item) => (
              <div key={item.Id} style={{ width: "48%", marginBottom: "4rem" }}>
                <FoodTypeDetails
                  foodType={item}
                  foods={foodsArr}
                  change={changeProducts}
                  changeMenuTypes={changeMenuTypes}
                  chosenFoods={productsToMenu}
                  type={type}
                  menuType={menuType}
                />
              </div>
            ))}
        </div>
        <Button variant="contained" type="submit">
          הוסף
        </Button>
      </form>
    </div>
  );
};
export default AddMenuEventType;
