//ייבוא סיפריה שמטפלת בטפסים
import { useForm } from "react-hook-form";
import "./ScssComponets/Login.scss";
import { login } from "../service/User";
import { useDispatch } from "react-redux";
import { saveUser } from "../store/action/user";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
//קומפוננטת התחברות





export default function Login() {
  let {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "all" });
  const dispatch = useDispatch();
 const nav = useNavigate();

  //פונקצייה שמקבלת את הנתונים שהמשתמש הקליד בתוך תיבת טקסט
  const save = (details) => {
    // alert(details);
    console.log(details);
    login(details)
      .then((res) => {
        console.log(res.data);
        dispatch(saveUser(res.data.user));
        nav("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container center p-5">
        <form onSubmit={handleSubmit(save)} className="form mx-auto pt-5">
          <h2 className="mb-4">היי, טוב לראות אותך</h2>

          {/* <div>
                <label>שם פרטי</label><br />
                <input type="text" {...register("FirstName", { minLength: 2, required: true, pattern: /^[a-zA-Zא-ת]/ })} />
                {errors.FirstName?.type == "minLength" &&
                    <div>
                        *שם מכיל לפחות 2 אותיות
                    </div>
                }
                {errors.FirstName?.type == "required" &&
                    <div>
                        *שדה זה הוא שדה חובה
                    </div>
                }
                {errors.FirstName?.type == "pattern" &&
                    <div>
                        *שם מכיל אותיות בלבד
                    </div>
                }
            </div>

            <div>
                <label>שם משפחה</label><br />
                <input type="text" {...register("LastName", { minLength: 2, required: true, pattern: /^[a-zA-Zא-ת]/})} />
                {errors.LastName?.type == "minLength" &&
                    <div>
                        *שם מכיל לפחות 2 אותיות
                    </div>
                }
                {errors.LastName?.type == "required" &&
                    <div>
                        *שדה זה הוא שדה חובה
                    </div>
                }
                {errors.LastName?.type == "pattern" &&
                    <div>
                        *שם מכיל אותיות בלבד
                    </div>
                }
            </div> */}

          <div>
            <label>e-mail</label>
            <br />
            <input
              type="text"
              {...register("Email", {
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
              })}
            />
            {errors.Email?.type == "pattern" && (
              <div>*מייל לא בתבנית הנכונה</div>
            )}
            {errors.Email?.type == "required" && (
              <div>*שדה זה הוא שדה חובה</div>
            )}
          </div>

          <div>
            <label>סיסמא</label>
            <br />
            <input
              type="text"
              {...register("Password", {
                minLength: 5,
                maxLength: 15,
                required: true,
              })}
            />
            {errors.Password?.type == "maxLength" && (
              <div>*סיסמא תכיל מקסימום 15 תווים</div>
            )}
            {errors.Password?.type == "minLength" && (
              <div>*סיסמא תכיל מינימום 6 תווים</div>
            )}
            {errors.Password?.type == "required" && (
              <div>*שדה זה הוא שדה חובה</div>
            )}
          </div>
          <br />
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid}
          > התחבר </Button>
        </form>
      </div>
    </>
  );
}
