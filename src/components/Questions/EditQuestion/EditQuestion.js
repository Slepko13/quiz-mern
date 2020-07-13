import React from 'react';
import './EditQuestion.scss';
import { withRouter } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import YupSchema from '../YupSchema';

const EditQuestion = ({ question, editQuestion, history }) => {
    let { _id: id, question: new_question, answers: [new_answer_1, new_answer_2, new_answer_3, new_answer_4], correct_answers: [correct_answer] } = question;


    return (
        <div className="EditQuestion">
            <Formik
                initialValues={{
                    new_question,
                    new_answer_1,
                    new_answer_2,
                    new_answer_3,
                    new_answer_4,
                    correct_answer
                }}
                validationSchema={YupSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    let { new_question, new_answer_1, new_answer_2, new_answer_3, new_answer_4, correct_answer } = values;
                    setSubmitting(true);
                    editQuestion(id, new_question, new_answer_1, new_answer_2, new_answer_3, new_answer_4, correct_answer);
                    history.push('/questions');
                }}
            >
                {({ errors, touched }) => (
                    <Form className="form"
                    >
                        <div className="title">Відредагуйте запитання</div>
                        <div className="inputWrapper form-group">
                            <Field
                                className="form__question form-control"
                                style={errors.new_question && touched.new_question ? { border: "1px solid red" } : null}
                                name="new_question"
                            />
                            {errors.new_question && touched.new_question ? <div className="error__message">
                                <ErrorMessage name="new_question" />
                            </div> : null}
                        </div>
                        <div className="title">Відредагуйте варіанти відповідей</div>
                        <div className="wrapper row justify-content-between">
                            <div className="inputWrapper col-12 col-md-6 col-lg-3 form-group">
                                <Field
                                    className=" form-control"
                                    style={errors.new_answer_1 && touched.new_answer_1 ? { border: "1px solid red" } : null}
                                    name="new_answer_1"
                                />
                                {errors.new_answer_1 && touched.new_answer_1 ? <div className="error__message">
                                    <ErrorMessage name="new_answer_1" />
                                </div> : null}
                            </div>
                            <div className="inputWrapper form-group col-12 col-md-6 col-lg-3">
                                <Field
                                    className=" form-control"
                                    style={errors.new_answer_2 && touched.new_answer_2 ? { border: "1px solid red" } : null}
                                    name="new_answer_2"
                                />
                                {errors.new_answer_2 && touched.new_answer_2 ? <div className="error__message">
                                    <ErrorMessage name="new_answer_2" />
                                </div> : null}
                            </div>
                            <div className="inputWrapper col-12 col-md-6 col-lg-3 form-group">
                                <Field
                                    className="form-control"
                                    style={errors.new_answer_3 && touched.new_answer_3 ? { border: "1px solid red" } : null}
                                    name="new_answer_3"
                                />
                                {errors.new_answer_3 && touched.new_answer_3 ? <div className="error__message">
                                    <ErrorMessage name="new_answer_3" />
                                </div> : null}
                            </div>
                            <div className="inputWrapper col-12 col-md-6 col-lg-3 form-group">
                                <Field
                                    className=" form-control"
                                    style={errors.new_answer_4 && touched.new_answer_4 ? { border: "1px solid red" } : null}
                                    name="new_answer_4"
                                >
                                </Field>
                                {errors.new_answer_4 && touched.new_answer_4 ? <div className="error__message">
                                    <ErrorMessage name="new_answer_4" />
                                </div> : null}
                            </div>

                        </div>
                        <div className="title">Відредагуйте вірну відповідь(повинна співпадати з одним із варіантів)</div>
                        <div className="row">
                            <div className="inputWrapper col-12 col-md-6 col-lg-3 form-group">
                                <Field
                                    className=" form-control"
                                    style={errors.correct_answer && touched.correct_answer ? { border: "1px solid red" } : null}
                                    name="correct_answer"
                                >
                                </Field>
                                {errors.correct_answer && touched.correct_answer ? <div className="error__message">
                                    <ErrorMessage name="correct_answer" />
                                </div> : null}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3 ">
                                <input
                                    className=" btn btn-primary w-100"
                                    type="submit"
                                    value="Зберегти"
                                /></div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default withRouter(EditQuestion);