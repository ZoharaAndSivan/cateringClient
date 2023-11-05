//ייבוא סיפריה שמטפלת בטפסים
import { useForm } from "react-hook-form";

//import "./ContactUs.scss";
//קומפוננטת צור קשר
export default function ContactUs() {
  let {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "all" });

  //פונקצייה שמקבלת את הנתונים שהמשתמש הקליד בתוך תיבת טקסט
  const save = (details) => {
    alert(details);
    console.log(details);
  };
  return (
    <>
      <form onSubmit={handleSubmit(save)}>
        <h2>צור קשר</h2>

        <div>
          <label>שם מלא</label>
          <br />
          <input
            type="text"
            {...register("Name", {
              minLength: 2,
              required: true,
              pattern: /^[a-zA-Zא-ת]/,
            })}
          />
          {errors.Name?.type == "minLength" && (
            <div>*שם מכיל לפחות 2 אותיות</div>
          )}
          {errors.Name?.type == "required" && <div>*שדה זה הוא שדה חובה</div>}
          {errors.Name?.type == "pattern" && <div>*שם מכיל אותיות בלבד</div>}
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
          <label>אימייל</label>
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
          <label>הודעה</label>
          <br />
          <input type="text" {...register("Message")} />
        </div>

        <input type="submit" value="שלח" disabled={!isValid} />
      </form>
    </>
  );
}
