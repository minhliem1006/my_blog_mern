import {Container, Card} from "react-bootstrap";
import {Link} from "react-router-dom"
import style from "./DashBoard.module.css";
import circle_question from "../../assets/question-circle-regular.svg"
const NotFound = () => {
    return (
        <div className="background-login">
            <Container>
                <div className={style.header_404}>
                    <div className={style.body_404}>
                        <div className={style.err}>4</div>
                        <div className={style.err2}>
                            <img className={style.errImage} src={circle_question} alt="circle_question"/>    
                        </div> 
                        <div className={style.err}>4</div>
                    </div>
                    <Card style={{backgroundColor:"transparent"}}>
                        <Card.Body className={style.footer_404}>
                            Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
                            <p className={style.footer_p} >Let's go 
                            <Link className={style.footer_span} to="/">
                                home
                            </Link>
                            and try from there.</p>
                        </Card.Body>
                    </Card>    
                </div>
            </Container>
        </div>
    )
}

export default NotFound
