//קומפוננטת הרשמה
//ייבוא סיפריה שמטפלת בטפסים
import { useState } from "react";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";
import { addUser } from "../store/action/user";
import "./Register.scss";

//export default function RegisterUser()

const RegisterUser = (props) => {
  const { users } = useSelector;
  //navigation = useNavigate();
  //let user = useState((state) => state.user);
  let {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "all" }); //בכל מצב תוצג השגיאה בתיבת טקסט
  let p = props;
  //פונקצייה שמקבלת את הנתונים שהמשתמש הקליד בתוך תיבת טקסט
  const save = (details) => {
    //navigation(addUser(details));

    alert(details);
    console.log(details);
  };
  return (
    <>
      <h1>הרשמה</h1>
      <form onSubmit={handleSubmit(save)}>
        <div>
          <label>שם פרטי</label>
          <br />
          <input
            type="text"
            {...register("FirstName", {
              minLength: 2,
              required: true,
              pattern: /^[a-zA-Zא-ת]/,
            })}
          />
          {/* {errors.FirstName?.type=="pattern"&&errors.FirstName.type=="minLength"&&
                <div>שםמכיל אותיות בלבד</div>
                } */}

          {errors.FirstName?.type == "minLength" && (
            <div>*שם מכיל לפחות 2 אותיות</div>
          )}
          {errors.FirstName?.type == "required" && (
            <div>*שדה זה הוא שדה חובה</div>
          )}
          {errors.FirstName?.type == "pattern" && (
            <div>*שם מכיל אותיות בלבד</div>
          )}
        </div>

        <div>
          <label>שם משפחה</label>
          <br />
          <input
            type="text"
            {...register("LastName", {
              minLength: 2,
              required: true,
              pattern: /^[a-zA-Zא-ת]/,
            })}
          />
          {errors.LastName?.type == "minLength" && (
            <div>*שם מכיל לפחות 2 אותיות</div>
          )}
          {errors.LastName?.type == "required" && (
            <div>*שדה זה הוא שדה חובה</div>
          )}
          {errors.LastName?.type == "pattern" && (
            <div>*שם מכיל אותיות בלבד</div>
          )}
        </div>

        <div>
          <label>טלפון</label>
          <br />
          <input
            type="text"
            {...register("Fhone", {
              maxLength: 10,
              minLength: 10,
              required: true,
              pattern: /^[0-9]/,
            })}
          />
          {errors.Fhone?.type == "maxLength" && (
            <div>*מספר טלפון יכיל רק 10 ספרות</div>
          )}
          {errors.Fhone?.type == "minLength" && (
            <div>*מספר טלפון מכיל 10 ספרות</div>
          )}
          {errors.Fhone?.type == "required" && <div>*שדה זה הוא שדה חובה</div>}
          {errors.Fhone?.type == "pattern" && (
            <div>*מספר טלפון מכיל ספרות בלבד</div>
          )}
        </div>
        <div>
          <label>כתובת</label>
          <br />
          <input type="text" {...register("Address", { required: true })} />
          {errors.Address?.type == "required" && (
            <div>*שדה זה הוא שדה חובה</div>
          )}
        </div>
        <div>
          <label>e-mail</label>
          <br />
          <input
            type="text"
            {...register("Email", {
              required: true,
              pattern: /^[0-9a-zA-Z]{1,}@$/,
            })}
          />
          {errors.Email?.type == "pattern" && <div>*מייל לא בתבנית הנכונה</div>}
          {errors.Email?.type == "required" && <div>*שדה זה הוא שדה חובה</div>}
        </div>
        <div>
          <label>סיסמא</label>
          <br />
          <input
            type="text"
            {...register("Password", {
              maxLength: 15,
              minLength: 6,
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

        {/* {isValid} */}
        {/* הטופס ישלח רק אם הטופס תקין */}
        <input type="submit" value="הרשם" disabled={!isValid} />
        <br />
      </form>
    </>
  );
};

export default connect(null, { addUser })(RegisterUser);
