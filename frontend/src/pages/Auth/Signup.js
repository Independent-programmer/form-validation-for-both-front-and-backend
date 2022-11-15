import React, { useState } from "react";
//import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
//import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
//import Auth from "./Auth";
import "./Signup.css";
import TextError from "./TextError";
// import Button from "@material-ui/core/Button";

const Signup = (props) => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    subject: "",
    phonenumber: "",
    date: "",
  };
  const [errorMsg, setErrorMsg] = useState(null);
  const [error, setError] = useState();
  const [firstErr, setFirstErr] = useState("");
  const [lastErr, setLastErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [departmentErr, setDepartmentErr] = useState("");
  const [subjectErr, setSubjectErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [dateErr, setDateErr] = useState("");

  const onSubmit = async (values, submitProps) => {
    try {
      console.log("Form data", values.firstname);

      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          department: values.department,
          subject: values.subject,
          phonenumber: values.phonenumber,
          date: values.date,
        }),
      });

      if (res.status === 422) {
        const result = await res.json();
        console.log(result);
        // console.log("47",result.error.msg);
        // setErrorMsg(result.error.msg);
        //setError(result);
        result.forEach((error) => {
          console.log("error:", error.param);
          // Check each error to see which input it belongs to
          // NOTE: please also consider using error.name instead, if error.message is invalid, thanks!
          if (error.param === "firstname") {
            setFirstErr(error.msg);
          }
          if (error.param === "lastname") {
            setLastErr(error.msg);
          }
          if (error.param === "email") {
            setEmailErr(error.msg);
          }
          if (error.param === "department") {
            setDepartmentErr(error.msg);
          }
          if (error.param === "subject") {
            setSubjectErr(error.msg);
          }
          if (error.param === "phonenumber") {
            setPhoneErr(error.msg);
          }
          if (error.param === "date") {
            setDateErr(error.msg);
          }
          console.log(firstErr);
          submitProps.setSubmitting(false);
          // if(error.message.indexOf('lastName') != -1){
          //   lastErr = error.message
          // }
        });

        throw new Error(result.error);
      }
      return res.json().then((resData) => {
        console.log("resData", resData.message);
        setFirstErr("");
        setLastErr("");
        setEmailErr("");
        setDepartmentErr("");
        setSubjectErr("");
        setPhoneErr("");
        setDateErr("");
        submitProps.resetForm();
      });
    } catch (err) {
      console.log("err", err);
    }

    //setTimeout(resetForm(), 2000);
    //submitProps.setSubmitting(false);
    //submitProps.resetForm();
  };

  const phReg = /^\d{10}$/;

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required("Required")
      .max(10, "Must be 10 characters or less"),
    lastname: Yup.string().max(10, "Must be 10 characters or less"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    department: Yup.string().required("Required"),
    subject: Yup.string().required("Required"),
    phonenumber: Yup.string()
      .matches(phReg, "Phone number is not valid")
      .required("Required"),
    date: Yup.date().required("Required"),
  });

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     console.log(JSON.stringify(values, null, 2));
  //     props.onLog({
  //       firstname: formik.values.firstname,
  //       lastname: formik.values.lastname,
  //       email: formik.values.email,
  //       department: formik.values.department,
  //       subject: formik.values.subject,
  //       phonenumber: formik.values.phonenumber,
  //       date: formik.values.date,
  //     });
  //   },
  // });

  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        // initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          //console.log("Formik props", formik);
          return (
            <Form onSubmit={formik.handleSubmit}>
              <div className="form-control">
                <label htmlFor="firstname">First Name</label>
                <Field
                  type="text"
                  id="firstname"
                  name="firstname"
                  // validate={validateFirstname}
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                />
                {firstErr ? (
                  // (formik.errors.firstname = errorMsg)
                  <div className="error">{firstErr}</div>
                ) : (
                  <ErrorMessage name="firstname" component={TextError} />
                )}
                {/* {firstErr && formik.touched.firstname && setFirstErr("")} */}
              </div>
              <div className="form-control">
                <label htmlFor="lastname">Last Name</label>
                <Field
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                />
                {lastErr ? (
                  // (formik.errors.firstname = errorMsg)
                  <div className="error">{lastErr}</div>
                ) : (
                  <ErrorMessage name="lastname" component={TextError} />
                )}
              </div>

              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {emailErr ? (
                  // (formik.errors.firstname = errorMsg)
                  <div className="error">{emailErr}</div>
                ) : (
                <ErrorMessage name="email">
                  {(error) => <div className="error">{error}</div>}
                </ErrorMessage>)}
              </div>

              <div className="form-control">
                <label htmlFor="department">Department</label>
                <Field
                  as="select"
                  id="department"
                  type="text"
                  name="department"
                  placeholder="Select your department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="Core">Core</option>
                  <option value="Elective">Elective</option>
                </Field>
                {departmentErr ? (
                  // (formik.errors.firstname = errorMsg)
                  <div className="error">{departmentErr}</div>
                ) : (
                <ErrorMessage name="department" component={TextError} />)}
              </div>

              {formik.values.department === "Core" ? (
                <div className="form-control">
                  <label htmlFor="subject">Subject</label>
                  <Field
                    as="select"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Select your subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="Information Technology Essentials">
                      Information Technology Essentials
                    </option>
                    <option value="Data Structures and algorithms">
                      Data Structures and algorithms
                    </option>
                  </Field>
                  {subjectErr ? (
                  // (formik.errors.firstname = errorMsg)
                  <div className="error">{subjectErr}</div>
                ) : (
                  <ErrorMessage name="subject" component={TextError} />)}
                </div>
              ) : (
                <div className="form-control">
                  <label htmlFor="subject">Subject</label>
                  <Field
                    as="select"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Select your subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="Hospital management">
                      Hospital management
                    </option>
                    <option value="Electronic commerce">
                      Electronic commerce
                    </option>
                  </Field>
                  {subjectErr ? (
                  // (formik.errors.firstname = errorMsg)
                  <div className="error">{subjectErr}</div>
                ) : (
                  <ErrorMessage name="subject" component={TextError} />)}
                </div>
              )}

              <div className="form-control">
                <label htmlFor="phonenumber">Phone Number</label>
                <Field
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  //validate={validateComments}
                />
                {phoneErr ? (
                  // (formik.errors.firstname = errorMsg)
                  <div className="error">{phoneErr}</div>
                ) : (
                <ErrorMessage name="phonenumber" component={TextError} />)}
              </div>

              <div className="form-control">
                <label htmlFor="date">Date</label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  //validate={validateComments}
                />
                {dateErr ? (
                  // (formik.errors.firstname = errorMsg)
                  <div className="error">{dateErr}</div>
                ) : (
                <ErrorMessage name="date" component={TextError} />)}
              </div>

              <Button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                color="primary"
                variant="contained"
                fullWidth
                //{!formik.isValid || formik.isSubmitting}
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import TextError from "./TextError";
// import Button from "@material-ui/core/Button";

// import "./Signup.css";

// function Signup(props) {
//   //const formik=useFormik();
//   const axios = require("axios").default;

//   const initialValues = {
//     firstname: "",
//     lastname: "",
//     email: "",
//     department: "",
//     subject: "",
//     phonenumber: "",
//     date: "",
//   };

// const onSubmit = async (values, submitProps) => {
//   try {
//     console.log("Form data", values.firstname);

//     const res = await fetch("http://localhost:8080/upload", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify({
//         firstname: values.firstname,
//         lastname: values.lastname,
//         email: values.email,
//         department: values.department,
//         subject: values.subject,
//         phonenumber: values.phonenumber,
//         date: values.date,
//       }),
//     });

//     if (res.status === 422) {
//       const result = await res.json();

//       throw new Error(result.error[0].msg);
//     }
//     return res.json().then((resData) => {
//       console.log("resData", resData.message);
//     });
//   } catch (err) {
//     console.log("err", err);
//   }

//   //setTimeout(resetForm(), 2000);
//   submitProps.setSubmitting(false);
//   submitProps.resetForm();
// };

//   const phReg = /^\d{10}$/;

//   const validationSchema = Yup.object({
//     firstname: Yup.string()
//       .required()
//       .max(10, "Must be 10 characters or less")
//       .test(
//         "firstname can maximum have 9 characters",
//         "firstname can maximum have 9 characters",
//         function(value) {
//           return new Promise((resolve, reject) => {
//             axios
//               .post("http://localhost:8080/validFirstname", {
//                 firstname: value,
//               })
//               .then((res) => {
//                 //console.log(res);
//                 if (
//                   res.data.msg ===
//                   "firstname should have maximum of 9 characters"
//                 ) {
//                   resolve(false);
//                 }
//                 resolve(true);
//               });
//           });
//         }
//       ),
//     lastname: Yup.string().max(10, "Must be 10 characters or less"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required()
//       .test("Unique Email", "Email already in use", function(value) {
//         return new Promise((resolve, reject) => {
//           axios
//             .post("http://localhost:8080/validEmail", { email: value })
//             .then((res) => {
//               //console.log(res);
//               if (res.data.msg === "Username already been taken") {
//                 resolve(false);
//               }
//               resolve(true);
//             });
//         });
//       }),
//     department: Yup.string()
//       .required()
//       .test("department required", function(value) {
//         return new Promise((resolve, reject) => {
//           axios
//             .post("http://localhost:8080/validDepartment", {
//               department: value,
//             })
//             .then((res) => {
//               //console.log(res);
//               if (res.data.msg === "department is a required field") {
//                 resolve(false);
//               }
//               resolve(true);
//             });
//         });
//       }),
//     subject: Yup.string()
//       .required()
//       .test("subject required", function(value) {
//         return new Promise((resolve, reject) => {
//           axios
//             .post("http://localhost:8080/validSubject", { subject: value })
//             .then((res) => {
//               //console.log(res);
//               if (res.data.msg === "subject is a required field") {
//                 resolve(false);
//               }
//               resolve(true);
//             });
//         });
//       }),
//     phonenumber: Yup.string()
//       .matches(phReg, "Phone number is not valid")
//       .required()
//       .test("phonenumber required", function(value) {
//         return new Promise((resolve, reject) => {
//           axios
//             .post("http://localhost:8080/validPhonenumber", {
//               phonenumber: value,
//             })
//             .then((res) => {
//               //console.log(res);
//               if (res.data.msg === "phonenumber is a required field") {
//                 resolve(false);
//               }
//               resolve(true);
//             });
//         });
//       }),
//     date: Yup.date()
//       .required()
//       .test("date required", function(value) {
//         return new Promise((resolve, reject) => {
//           axios
//             .post("http://localhost:8080/validDate", { date: value })
//             .then((res) => {
//               // console.log(res);
//               if (res.data.msg === "date is a required field") {
//                 resolve(false);
//               }
//               resolve(true);
//             });
//         });
//       }),
//   });

//   return (
// <div className="App">
//   <Formik
//     initialValues={initialValues}
//     // initialValues={formValues || initialValues}
//     validationSchema={validationSchema}
//     onSubmit={onSubmit}
//     enableReinitialize
//   >
//     {(formik) => {
//       //console.log("Formik props", formik);
//       return (
//         <Form onSubmit={formik.handleSubmit}>
//           <div className="form-control">
//             <label htmlFor="firstname">First Name</label>
//             <Field
//               type="text"
//               id="firstname"
//               name="firstname"
//               // validate={validateFirstname}
//               value={formik.values.firstname}
//               onChange={formik.handleChange}
//             />

//             <ErrorMessage name="firstname" component={TextError} />
//           </div>
//           <div className="form-control">
//             <label htmlFor="lastname">Last Name</label>
//             <Field
//               type="text"
//               id="lastname"
//               name="lastname"
//               value={formik.values.lastname}
//               onChange={formik.handleChange}
//             />
//             <ErrorMessage name="lastname" component={TextError} />
//           </div>

//           <div className="form-control">
//             <label htmlFor="email">Email</label>
//             <Field
//               type="email"
//               id="email"
//               name="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//             />
//             <ErrorMessage name="email">
//               {(error) => <div className="error">{error}</div>}
//             </ErrorMessage>
//           </div>

//           <div className="form-control">
//             <label htmlFor="department">Department</label>
//             <Field
//               as="select"
//               id="department"
//               type="text"
//               name="department"
//               placeholder="Select your department"
//               value={formik.values.department}
//               onChange={formik.handleChange}
//               required
//             >
//               <option value="">Choose...</option>
//               <option value="Core">Core</option>
//               <option value="Elective">Elective</option>
//             </Field>
//             <ErrorMessage name="department" component={TextError} />
//           </div>

//           {formik.values.department === "Core" ? (
//             <div className="form-control">
//               <label htmlFor="subject">Subject</label>
//               <Field
//                 as="select"
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 placeholder="Select your subject"
//                 value={formik.values.subject}
//                 onChange={formik.handleChange}
//                 required
//               >
//                 <option value="">Choose...</option>
//                 <option value="Information Technology Essentials">
//                   Information Technology Essentials
//                 </option>
//                 <option value="Data Structures and algorithms">
//                   Data Structures and algorithms
//                 </option>
//               </Field>
//               <ErrorMessage name="subject" component={TextError} />
//             </div>
//           ) : (
//             <div className="form-control">
//               <label htmlFor="subject">Subject</label>
//               <Field
//                 as="select"
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 placeholder="Select your subject"
//                 value={formik.values.subject}
//                 onChange={formik.handleChange}
//                 required
//               >
//                 <option value="">Choose...</option>
//                 <option value="Hospital management">
//                   Hospital management
//                 </option>
//                 <option value="Electronic commerce">
//                   Electronic commerce
//                 </option>
//               </Field>
//               <ErrorMessage name="subject" component={TextError} />
//             </div>
//           )}

//           <div className="form-control">
//             <label htmlFor="phonenumber">Phone Number</label>
//             <Field
//               type="number"
//               id="phonenumber"
//               name="phonenumber"
//               value={formik.values.phonenumber}
//               onChange={formik.handleChange}
//               //validate={validateComments}
//             />
//             <ErrorMessage name="phonenumber" component={TextError} />
//           </div>

//           <div className="form-control">
//             <label htmlFor="date">Date</label>
//             <Field
//               type="date"
//               id="date"
//               name="date"
//               value={formik.values.date}
//               onChange={formik.handleChange}
//               //validate={validateComments}
//             />
//             <ErrorMessage name="date" component={TextError} />
//           </div>

//           <Button
//             type="submit"
//             disabled={!(formik.isValid && formik.dirty)}
//             color="primary"
//             variant="contained"
//             fullWidth
//             //{!formik.isValid || formik.isSubmitting}
//           >
//             Submit
//           </Button>
//         </Form>
//       );
//     }}
//   </Formik>
// </div>
//   );
// }

// export default Signup;

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// import TextField from "@material-ui/core/TextField";
// import Auth from "./Auth";
// import "./Signup.css";

// const Signup = (props) => {
//   const initialValues = {
// firstname: "",
// lastname: "",
// email: "",
// department: "Core",
// subject: "",
// phonenumber: "",
// date: "",
//   };

//   const phReg = /^\d{10}$/;

//   const validationSchema = Yup.object({
// firstname: Yup.string()
//   .required()
//   .max(10, "Must be 10 characters or less"),
// lastname: Yup.string().max(10, "Must be 10 characters or less"),
// email: Yup.string()
//   .email("Invalid email address")
//   .required("Required"),
// department: Yup.string().required("Required"),
// subject: Yup.string().required("Required"),
// phonenumber: Yup.string()
//   .matches(phReg, "Phone number is not valid")
//   .required("Required"),
// date: Yup.date().required("Required"),
//   });

// const formik = useFormik({
// initialValues: initialValues,
// validationSchema: validationSchema,
//   onSubmit: (values) => {
//     console.log(JSON.stringify(values, null, 2));
//     props.onLog({
//       firstname: formik.values.firstname,
//       lastname: formik.values.lastname,
//       email: formik.values.email,
//       department: formik.values.department,
//       subject: formik.values.subject,
//       phonenumber: formik.values.phonenumber,
//       date: formik.values.date,
//     });
//   },
// });

//   return (
//     <Auth>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="form-group">
//           <br />
//           <label>First Name</label>
//           <TextField
//             fullWidth
//             id="firstname"
//             name="firstname"
//             onChange={formik.handleChange}
//             value={formik.values.firstname}
// error={
//   formik.touched.firstname
//     ? true
//     : false
// }
// helpertext={formik.touched.firstname && formik.errors.firstname}
//             required
//           />

//           {formik.errors.firstname && (
//             <div className="validation-error-message">
//               {formik.errors.firstname}
//             </div>
//           ) }
//         </div>
//         <div className="form-group">
//           <br />
//           <label>Last Name</label>
//           <TextField
//             fullWidth
//             id="lastname"
//             name="lastname"
//             //label="Last Name"
//             onChange={formik.handleChange}
//             value={formik.values.lastname}
//             error={
//               formik.touched.lastname
//                 ? Boolean(formik.errors.lastname)
//                 : undefined
//             }
//             helpertext={formik.touched.lastname && formik.errors.lastname}
//             required
//           />
//           {formik.errors.lastname ? (
//             <div className="validation-error-message">
//               {formik.errors.lastname}
//             </div>
//           ) : null}
//         </div>
//         <div className="form-group">
//           <br />
//           <label>Email</label>
//           <TextField
//             fullWidth
//             id="email"
//             name="email"
//             //label="Email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.email ? Boolean(formik.errors.email) : undefined
//             }
//             helpertext={formik.touched.email && formik.errors.email}
//             required
//           />
//           {formik.errors.email ? (
//             <div className="validation-error-message">
//               {formik.errors.email}
//             </div>
//           ) : null}
//         </div>
//         <div className="form-group">
//           <br />
//           <label>Select Department</label>
//           <br />
//           <br />
//           <select
//             id="department"
//             name="department"
//             value={formik.values.department}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.department
//                 ? Boolean(formik.errors.department)
//                 : undefined
//             }
//             helpertext={formik.touched.department && formik.errors.department}
//             required
//           >
//             {/* <option value="">Choose...</option> */}
// <option value="Core">Core</option>
// <option value="Elective">Elective</option>
//           </select>
//           {formik.errors.department ? (
//             <div className="validation-error-message">
//               {formik.errors.department}
//             </div>
//           ) : null}
//         </div>
//         {formik.values.department === "Core" ? (
//           <div className="form-group">
//             <br />
//             <label>Select Subject</label>
//             <br />
//             <br />
//             <select
//               id="subject"
//               name="subject"
//               label="Select core"
//               value={formik.values.subject}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.subject
//                   ? Boolean(formik.errors.subject)
//                   : undefined
//               }
//               helpertext={formik.touched.subject && formik.errors.subject}
//               required
//             >
// <option value="">Choose...</option>
// <option value="Information Technology Essentials">
//   Information Technology Essentials
// </option>
// <option value="Data Structures and algorithms">
//   Data Structures and algorithms
// </option>
//             </select>
//             {formik.errors.subject ? (
//               <div className="validation-error-message">
//                 {formik.errors.subject}
//               </div>
//             ) : null}
//           </div>
//         ) : (
//           <div className="form-group">
//             <br />
//             <label>Select Subject</label>
//             <br />
//             <br />
//             <select
//               id="subject"
//               name="subject"
//               label="Select elective"
//               value={formik.values.subject}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.subject
//                   ? Boolean(formik.errors.subject)
//                   : undefined
//               }
//               helpertext={formik.touched.subject && formik.errors.subject}
//               required
//             >
// <option value="">Choose...</option>
// <option value="Hospital management">Hospital management</option>
// <option value="Electronic commerce">Electronic commerce</option>
//             </select>
//             {formik.errors.subject ? (
//               <div className="validation-error-message">
//                 {formik.errors.subject}
//               </div>
//             ) : null}
//           </div>
//         )}
//         <div className="form-group">
//           <br />
//           <label>Phone Number</label>
//           <TextField
//             fullWidth
//             id="phonenumber"
//             name="phonenumber"
//             //label="Phone Number"
//             onChange={formik.handleChange}
//             value={formik.values.phonenumber}
//             error={
//               formik.touched.phonenumber
//                 ? Boolean(formik.errors.phonenumber)
//                 : undefined
//             }
//             helpertext={formik.touched.phonenumber && formik.errors.phonenumber}
//             required
//           />
//           {formik.errors.phonenumber ? (
//             <div className="validation-error-message">
//               {formik.errors.phonenumber}
//             </div>
//           ) : null}
//         </div>

//         <div className="form-group">
//           <br />
//           <label>Date</label>
//           <br />
//           <TextField
//             id="date"
//             name="date"
//             type="date"
//             value={formik.values.date}
//             onChange={formik.handleChange}
//             error={formik.touched.date ? formik.errors.date : null}
//             helpertext={formik.touched.date ? formik.errors.date : null}
//             required
//           />
//           <br />
//           {formik.errors.date ? (
//             <div className="validation-error-message">{formik.errors.date}</div>
//           ) : null}
//         </div>

//         <div className="form-group">
//           <br />{" "}
//           <Button
//             disabled={!(formik.isValid && formik.dirty)}
//             color="primary"
//             fullWidth
//             text="Submit"
//             type="submit"
//             variant="contained"
//           >
//             Submit
//           </Button>
//         </div>
//       </form>
//     </Auth>
//   );
// };

// export default Signup;
