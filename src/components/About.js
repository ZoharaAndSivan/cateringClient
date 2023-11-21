import NavBar from "./NavBar"
import "./About.scss"
export default function About()
{
    //<NavBar/>
    return(
        <>
    <div style={{height:"100px"}}></div>
    <div id="bigDivAbout">
    <div className="divAbout" >
    <h2>קצת עלינו</h2>
    <p>delishes המקום שבו טעמים משובחים וחויה קולינרית מוקפדת ומקוריתנפגשים יחד.
        <br/>
        delishes קיים כבר 12 שנה ומרכיב עבורכם תפריטים לבחירה לכל סוג אירוע ברמות תקציב שונות שאתם מעונינים.
        <br/>
        אנו עומדים לרשותכם בכל זמן
    </p>
    </div>
    <div id="divAboutImg"  className="divAbout">
     <img id="aboutImg" src="../../images/שבע ברכות.jpg"/>
    </div >
    </div>
    <hr/>
    <br/>
    <div style={{height:"100px"}}></div>
    <div id="divAboutColumn">
        <div className="aboutColumn">
            <img className="vImage" src="../../images/v.svg"/>
            <h5>אוכל טרי</h5>
            אנו מקפידים על איכות חומרי הגלם הגבוהה ביותר, וטריות של כל המרכיבים.
            <br/>
            רק כך אנו משיגים את התוצאה שאותה אנו שמחים לספק ושמעלה חיוך על פני לקוחותינו
        </div>

        <div className="aboutColumn">
        <img className="vImage" src="../../images/v.svg"/>
        <h5>תפריט מגוון</h5>
            שנים של ניסיון בכל סוגי האירועים מאפשרים לנו לעזור לכם לבחור את התפריט הנכון בשביל האירוע שלכם.
            <br/>
            שילוב נכון של מנות שיעשה לכם אירוע שלא תשכחו.
        </div>

        <div className="aboutColumn" style={{padding:"4px"}}>
        <img className="vImage" src="../../images/v.svg"/>
        <h5>שירות מעל הכל</h5>
            השירות שאנו מספקים חשוב לנו כמו האוכל שאנחנו מבשלים.
            <br/>
            בכל רגע אנחנו כאן בשבילכם, לענות לכל שאלה ולהפוך אתכם לממליצים הבאים שלנו.
        </div>

        <div className="aboutColumn" style={{padding:"18px"}}>
        <img className="vImage" src="../../images/v.svg"/>
        <h5>כשרות</h5>
            אצלנו מקפידים על תעודת כשרות מהודרת, והכל כשר למהדרין כבר ברכישת חומרי הגלם בכל שלבי ההכנה.
            <br/>
            בזמן שאתם נהנים מהמנות 
            </div>
    </div>
        </>
    )
}