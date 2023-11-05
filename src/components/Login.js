//ייבוא סיפריה שמטפלת בטפסים
import { useForm } from "react-hook-form"
import './Login.scss'
//קומפוננטת התחברות

export default function Login() {

    let { register, handleSubmit, formState: { isValid, errors } } = useForm({ mode: "all" });


    //פונקצייה שמקבלת את הנתונים שהמשתמש הקליד בתוך תיבת טקסט
    const save = (details) => { 
        //ימנע את שליחת הטופס האוטומטית 
        details.preventDefault();
        alert(details);
        console.log(details);
        
    }
    return <>
        <h1>התחברות</h1>

        <form onSubmit={handleSubmit(save)}>
            <div>
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
            </div>

            <div>
                <label>e-mail</label><br />
                <input type="text" {...register("Email", { required: true, pattern: /^[0-9a-zA-Z]{1,}@$/ })} />
                {errors.Email?.type=="pattern"&&
                <div>
                    *מייל לא בתבנית הנכונה
                </div>
                }
                  {errors.Email?.type=="required"&&
                <div>
                   *שדה זה הוא שדה חובה
                </div>
                }
            </div>

            <div>
                <label>סיסמא</label><br />
                <input type="text" {...register("Password", { minLength: 6, maxLength: 15, required: true })} />
                {errors.Password?.type=="maxLength"&&
                <div>
                    *סיסמא תכיל מקסימום 15 תווים
                </div>
                }
                {errors.Password?.type=="minLength"&&
                <div>
                    *סיסמא תכיל מינימום 6 תווים
                </div>
                }
                {errors.Password?.type=="required"&&
                <div>
                   *שדה זה הוא שדה חובה
                </div>
                }
            </div>

            <input type="submit" value="התחבר" disabled={!isValid} />
        </form>
    </>
}