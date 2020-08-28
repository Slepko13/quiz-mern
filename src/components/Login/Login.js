import React from 'react';
import * as Yup from "yup";
import { withRouter } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import './Login.scss';


const Login = ({ login, loginMessage, isAuth }) => {
    return (
        <div className="Login">
            <div className="title">Для продовження роботи необхідна авторизація</div>
            <div className="test">
                <div className="tets__email">Тестова пошта: <b> test@gmail.com</b></div>
                <div className="tets__password">Тестовий пароль: <b>test12345</b> </div>
            </div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Некоректна е-пошта")
                        .required("Поле обов'язкове"),
                    password: Yup.string()
                        .min(6, 'Мінімум 6 символів')
                        .required("Поле обов'язкове"),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    let { email, password } = values;
                    setTimeout(() => {
                        resetForm();
                    }, 400);
                    login(email, password);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="form"
                    >
                        <div className="inputWrapper form-group">
                            <label htmlFor="email">Введіть електронну пошту</label>
                            <Field
                                className=" form-control"
                                style={errors.email && touched.email ? { border: "1px solid red" } : null}
                                name="email"
                                placeholder="Введіть е-пошту"
                            />
                            {errors.email && touched.email ? <div className="error__message">
                                <ErrorMessage name="email" />
                            </div> : null}
                        </div>
                        <div className="inputWrapper form-group">
                            <label htmlFor="password">Введіть пароль</label>
                            <Field
                                className=" form-control"
                                // type="password"
                                style={errors.password && touched.password ? { border: "1px solid red" } : null}
                                name="password"
                                placeholder="Введіть пароль"
                            />
                            {errors.password && touched.password ? <div className="error__message">
                                <ErrorMessage name="password" />
                            </div> : null}
                        </div>
                        <button
                            className=" btn btn-primary button"
                            type="submit"
                        >Увійти</button>
                    </Form>
                )}
            </Formik>
            <div className={isAuth ? "loginMessage success" : "loginMessage error"}>{loginMessage}</div>
        </div >
    );
}

export default Login;