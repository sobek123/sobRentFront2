import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./SocialMedia.css";
import { Link } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import {useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import AuthService from '../services/AuthService';
import { Card, CardActions, CardContent, CardHeader, InputAdornment} from '@mui/material';
import { Label } from '@mui/icons-material';
import { TextField } from "formik-material-ui"
import { Button } from '@mui/material';
import { CustomTextFields } from './CustomTextFields';
import UserService from '../services/UserService';
import { Successful } from './Successful';
import { Footer } from './Footer';
import { Spinner } from 'react-bootstrap';
// import { CustomTextField } from './CustomTextFields';
export function AddWorker(){
    
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')

    const [showPassword,setShowPassword] = useState(true)
    const [showPassword2,setShowPassword2] = useState(true)
    const [pesel, setPesel] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showButton,setShowButton] = useState(true)
    const [loading,setLoading] = useState(false)
    const navigaye = useNavigate()
    const [passwordScore,setPasswordScore] = useState()
    const onSubmit = (values) => {
        UserService.saveWorker(values)
        .then((response) => {
        navigaye("/pracownicy");
        document.getElementById("form").hidden = false

        })
        .catch((error) => {
        });
      }
    return <div>
        <Card style={{marginTop:80, borderRadius:15,boxShadow: '10 10 5 black', height: 900}}>
            <CardHeader title="Rejestracja" style={{textAlign:'center'}} ></CardHeader>
        <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    postCode: '',
                    street: '',
                    city: '',
                    dateOfBirth: '',
                    phoneNumber: '',
                    pesel: '',
                    numberOfStreet: '',
                    numberOfFlat: '',
                    password: '',
                    confirmPassword: '',
                    acceptTerms: false
                }}
                validationSchema={
                    Yup.object().shape({
                    name: Yup.string()
                        .required('Imi?? jest wymagane'),
                    surname: Yup.string()
                        .required('Nazwisko jest wymagane'),
                    email: Yup.string()
                        .email('E-mail jest nieprawid??owy')
                        .test("email", "Podany adres e-mail ju?? istnieje", (value) => {
                            UserService.findByEmail(value).then((response) =>{
                                setEmail(response.data)
                            })
                            .catch((error) => {
                            });

                            return !email
                            })
                        .required('E-mail jest wymagany'),
                    postCode: Yup.string()
                        .required('Kod pocztowy jest wymagany')
                        .matches('[0-9]{2}-[0-9]{3}', 'Kod pocztowy jest niepoprawny'),
                    street: Yup.string()
                        .required('Ulica jest wymagana'),
                    city: Yup.string()
                        .required('Miasto jest wymagane')
                        .matches('[a-z]+([ -][A-Z][a-z]+)?','Miasto jest niepoprawne'),
                    phoneNumber: Yup.string()
                        .required('Numer telefonu jest wymagany')
                        .min(9, "Numer telefonu ma nieprawid??ow?? ilo???? znak??w")
                        .max(12, "Numer telefonu ma nieprawid??ow?? ilo???? znak??w")
                        .test("phoneNumber", "Podany numer telefonu ju?? istnieje", async (value) => {
                            const response = UserService.findByPhoneNumber(value)
                            .then(response =>{
                                setPhoneNumber(response.data)
                            })
                            .catch(error => {})

                            return !phoneNumber
                        })
                        .matches('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$', 'Numer telefonu jest niepoprawny'),
                        // .matches('[0-9]{3}-[0-9]{3}-[0-9]{3}', 'Numer telefonu jest niepoprawny')
                        // .matches('[0-9]{9}', "Numer telefonu jest nieprawid??owy"),
                    dateOfBirth: Yup.date()
                        .required('Data urodzenia jest wymagana')
                        .test("dateOfBirth", "Niepoprawny wiek", function (value) {
                            const diffTime = Math.abs(new Date() - new Date(value));
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                            return diffDays >= 18;
                          }),
                    pesel: Yup.string()
                        .min(11, "Numer PESEL ma nieprawid??ow?? ilo???? znak??w")
                        .max(11, "Numer PESEL ma nieprawid??ow?? ilo???? znak??w")
                        .matches('[0-9]{11}', "Numer PESEL jest nieprawid??owy")
                        .test("pesel", "Podany numer PESEL ju?? istnieje", function (value) {
                            const response = UserService.findByPesel(value)
                            .then(response =>{
                                setPesel(response.data)
                            })
                            .catch(error => {})

                            return !pesel
                          })
                        .required('Numer PESEL jest wymagany'),
                    numberOfStreet: Yup.string()
                        .required('Numer domu/bloku jest wymagany')
                        .min(1, 'Nieprawid??owy numer domu/bloku'),
                        // .matches('[0-9]+[A-Z]?[0-9]+[A-Z]?', 'Numer domu/bloku jest niepoprawny'),
                    numberOfFlat: Yup.number()
                        .min(1, 'Nieprawid??owy numer mieszkania'),
                    password: Yup.string()
                        .min(8, 'Has??o musi mie?? co najmniej osiem znak??w')
                        // .matches("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/", "Has??o musi zawiera?? co najmniej jedn?? wielka liter??, ma???? liter??, cyfr?? oraz znak specjalny")
                        .required('Has??o jest wymagane'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Has??a musz?? si?? zgadza??')
                        .required('Powt??rzenie has??a jest wymagane'),
                    acceptTerms: Yup.bool().oneOf([true], "Wyra??enie zgody na przetwarzanie danych osobowych jest wymagane")
                })
            }
                onSubmit={onSubmit}
                >
                    {({ dirty, isValid, values, handleChange, handleBlur, errors, status, touched }) => {
              return (
                
                
                  <div className="row" style={{display: 'flex'}}>
                    <Form >
                        <CardContent>
                            <h6 style={{color:'blue', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}} id="form" hidden>Aby doko??czy?? rejestracj??, przejd?? do swojej skrzynki pocztowej</h6>
                            <h6 id="error" style={{color:'red', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}} hidden>Co?? posz??o nie tak. Spr??buj jeszcze raz</h6>
                        <br></br>
                        <div id="f">
                        <div className="column" style={{float:'left', display:'inline', width: '35%',marginRight:50,marginLeft: 100}}>
                            <div className="form-group" >
                                <Field label={<span>Imi??<span style={{color:'red'}}>*</span></span>} variant="outlined" fullWidth name="name" disabled={false} value={values.firstName} component={TextField} />
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Nazwisko<span style={{color:'red'}}>*</span></span>} variant="outlined" disabled={false} fullWidth name="surname" value={values.lastName} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>E-mail<span style={{color:'red'}}>*</span></span>} variant="outlined" disabled={false} fullWidth name="email" value={values.email} component={TextField} />
                            </div>
                             <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>PESEL<span style={{color:'red'}}>*</span></span>} disabled={false} variant="outlined" fullWidth name="pesel" value={values.pesel} component={TextField} />
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Data urodzenia<span style={{color:'red'}}>*</span></span>} name="dateOfBirth" type="date"  fullWidth placeholder="" value={values.dateOfBirth} component={TextField} InputLabelProps={{ shrink: true }}/>
                            </div>
                            
                            <div className="form-group form-check" style={{marginTop: 40,display:'block',marginLeft: 0}}>
                                <Field type="checkbox" name="acceptTerms"  style={{display:'inline'}}  disabled={false} className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')}/>
                                <label htmlFor="acceptTerms" className="form-check-label" style={{display:'block',marginLeft: 5,marginTop:-23}}>Wyra??am zgod?? na przetwarzanie moich danych osobowych zgodnie z ustaw?? o ochronie danych osobowych w zwi??zku z (np. wys??aniem zapytania przez formularz kontaktowy).
                                Podanie danych jest dobrowolne, ale niezb??dne do przetworzenia zapytania. Zosta??em poinformowany, ??e przys??uguje mi prawo dost??pu do swoich danych, mo??liwo??ci ich poprawiania, ????dania zaprzestania ich przetwarzania.
                                Administratorem danych osobowych jest SobRent Wypo??yczalnia Sp. z o.o z siedzib??  w  Bia??ymstoku na ul.Branickiego 30/34, 15-654 Bia??ystok, NIP: 5423313186<span style={{color:'red'}}>*</span></label>
                                <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                            </div> 
                            <p><span style={{color:'red'}}>*</span> - pola s?? wymagane</p>
                            <CardActions>
                            <div className="form-group" style={{marginTop:10}}>
                            {showButton ? <Button type="Submit">Utw??rz nowe konto</Button> : ''}
                            {loading ? <Spinner animation="border" role="status" style={{marginLeft: 'auto', marginRight: 'auto'}}></Spinner> : ''}
                            </div>
                            </CardActions>
                         </div>
                        <div className="column" style={{float:'left', display:'inline', width: '35%', marginLeft:100}}>
                            <div className="form-group" >
                                <Field label={<span>Miejscowo????<span style={{color:'red'}}>*</span></span>} name="city" disabled={false} type="text"  fullWidth  value={values.city} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Ulica<span style={{color:'red'}}>*</span></span>} name="street" type="text"  disabled={false} fullWidth  value={values.street} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Numer domu/bloku<span style={{color:'red'}}>*</span></span>} name="numberOfStreet" type="text" disabled={false}  fullWidth value={values.numberOfStreet} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label="Numer mieszkania" name="numberOfFlat" type="number" min="1"  fullWidth value={values.numberOfFlat} disabled={false} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Kod pocztowy<span style={{color:'red'}}>*</span></span>} name="postCode" type="text"  fullWidth  disabled={false} value={values.postCode} component={TextField}/>
                            </div>
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Numer telefonu<span style={{color:'red'}}>*</span></span>} name="phoneNumber" type="tel"  fullWidth  disabled={false} value={values.phoneNumber} component={TextField}/>
                            </div>
                        
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Has??o<span style={{color:'red'}}>*</span></span>} name="password" type={showPassword ? "password" : "text"} disabled={false} fullWidth spellCheck="false" value={values.password} onKeyUp={(e) => {setPassword(e.currentTarget.value);}} component={TextField} InputProps={{
      endAdornment: (
          <InputAdornment position="end">
              { showPassword ? <FaEye size={20} onClick={ () => setShowPassword(false)}/> : <FaEyeSlash size={20}  onClick={ () => setShowPassword(true)}></FaEyeSlash>} 
          </InputAdornment>
      )}}/>
                                <PasswordStrengthBar password={values.password} onChangeScore={setPasswordScore} scoreWords={["brak","bardzo s??abe","s??abe", "??rednie", "mocne", "bardzo mocne"]}></PasswordStrengthBar>
                            </div>
                        
                            <div className="form-group" style={{marginTop:20}}>
                                <Field label={<span>Powt??rz has??o<span style={{color:'red'}}>*</span></span>} disabled={false} name="confirmPassword" type={showPassword2 ? "password" : "text"} fullWidth spellCheck="false" value={values.confirmPassword} onKeyUp={(e) => {setPassword2(e.currentTarget.value);}} component={TextField} InputProps={{ endAdornment: (
          <InputAdornment position="end">
              { showPassword2 ? <FaEye size={20} onClick={ () => setShowPassword2(false)}/> : <FaEyeSlash size={20}  onClick={ () => setShowPassword2(true)}></FaEyeSlash>} 
          </InputAdornment>
      )}}/>
                            </div>

                           
                        </div>
                        </div>
                        </CardContent> 
                    </Form>
                    </div>)}}</Formik></Card>
                
                
            
            
            <br></br>
            <Footer></Footer>
        </div>
}