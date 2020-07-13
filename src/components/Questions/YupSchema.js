import * as Yup from "yup";

const YupSchema = Yup.object({


    new_question: Yup.string()
        .min(2, "Закоротке запитання")
        .required("Поле обов'язкове"),
    new_answer_1: Yup.string()
        .required("Поле обов'язкове"),
    new_answer_2: Yup.string()
        .required("Поле обов'язкове"),
    new_answer_3: Yup.string()
        .required("Поле обов'язкове"),
    new_answer_4: Yup.string()
        .required("Поле обов'язкове"),
    correct_answer: Yup.string()
        .oneOf([Yup.ref('new_answer_1'), null], "Співпадіння відсутні ")
        .oneOf([Yup.ref('new_answer_2'), null], "Співпадіння відсутні ")
        .oneOf([Yup.ref('new_answer_3'), null], "Співпадіння відсутні ")
        .oneOf([Yup.ref('new_answer_4'), null], "Співпадіння відсутні ")
        .required("Поле обов'язкове"),

});
export default YupSchema;