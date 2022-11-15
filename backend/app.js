const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const { body, validationResult } = require("express-validator/check");
const User = require("./models/user");
const app = express();
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((error, req, res, next) => {
  console.log("21", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.post(
  "/upload",

  body("firstname")
    .not()
    .isEmpty()
    .isLength({ max: 9 })
    .withMessage("First name should maximum have 9 characters"),
  body("lastname").isLength({ max: 10 }).optional(),
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("department").not().isEmpty().withMessage("Required"),
  body("subject").not().isEmpty().withMessage("Required"),
  body("phonenumber").trim().isLength(10).withMessage("Required"),
  body("date").not().isEmpty().withMessage("Required"),

  (req, res, next) => {
    console.log("body", req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      console.log("err", error.data);
      console.log(error.data[0]);
      console.log("55", error.data[0].msg);
      throw res.status(error.statusCode).json(error.data);
    }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const department = req.body.department;
    const subject = req.body.subject;
    const phonenumber = req.body.phonenumber;
    const date = req.body.date;

    //console.log(firstname);

    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      department: department,
      subject: subject,
      phonenumber: phonenumber,
      date: date,
    });
    return user
      .save()

      .then((result) => {
        console.log(result);
        res.status(201).json({ message: "Form successfully submitted" });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
);

mongoose
  .connect(
    "Your mongo URI",

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

// const path = require("path");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const express = require("express");
// const { body, validationResult } = require("express-validator/check");
// const User = require("./models/user");
// const app = express();
// app.use(bodyParser.json()); // application/json

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;
//   res.status(status).json({ message: message, data: data });
// });

// app.post("/validEmail", (req, res) => {
//   console.log("Request: ", req.body);
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (user) {
//         console.log({ msg: "Username already been taken" });
//         return res.json({ msg: "Username already been taken" });
//       }

//       console.log({ msg: "Username available." });
//       return res.json({ msg: "Username available." });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(400).json("Error: " + err);
//     });
// });

// app.post(
//   "/validFirstname",
//   body("firstname").not().isEmpty().isLength({ max: 9 }),
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({ msg: "firstname should have maximum of 9 characters" });
//     } else {
//       return res.json({ msg: "firstname success" });
//     }
//   }
// );

// app.post(
//   "/validFirstname",
//   body("firstname").not().isEmpty().isLength({ max: 9 }),
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({ msg: "firstname should have maximum of 9 characters" });
//     } else {
//       return res.json({ msg: "firstname success" });
//     }
//   }
// );

// app.post(
//   "/validDepartment",
//   body("department").not().isEmpty().withMessage("Department is required"),
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({ msg: "department is a required field" });
//     } else {
//       return res.json({ msg: "No errors" });
//     }
//   }
// );

// app.post(
//   "/validSubject",
//   body("subject").not().isEmpty().withMessage("Subject is required"),
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({ msg: "subject is a required field" });
//     } else {
//       return res.json({ msg: "No errors" });
//     }
//   }
// );

// app.post(
//   "/validPhonenumber",
//   body("phonenumber")
//     .trim()
//     .isLength(10)
//     .withMessage("phonenumber is required"),
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({ msg: "phonenumber is a required field" });
//     } else {
//       return res.json({ msg: "No errors" });
//     }
//   }
// );

// app.post(
//   "/validDate",
//   body("date").not().isEmpty().withMessage("date is required"),
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({ msg: "date is a required field" });
//     } else {
//       return res.json({ msg: "No errors" });
//     }
//   }
// );

// app.post(
//   "/upload",

//   (req, res) => {
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const email = req.body.email;
//     const department = req.body.department;
//     const subject = req.body.subject;
//     const phonenumber = req.body.phonenumber;
//     const date = req.body.date;

//     console.log(firstname);

//     const user = new User({
//       firstname: firstname,
//       lastname: lastname,
//       email: email,
//       department: department,
//       subject: subject,
//       phonenumber: phonenumber,
//       date: date,
//     });
//     return user
//       .save()

//       .then((result) => {
//         console.log(result);
//         res.status(201).json({ message: "Form successfully submitted" });
//       });
//   }
// );

// mongoose
//   .connect(
//     "mongodb+srv://Roshini:z45nMQAtxLr57r0Z@cluster0.xpwe9.mongodb.net/shop?retryWrites=true&w=majority",

//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then((result) => {
//     app.listen(8080);
//   })
//   .catch((err) => console.log(err));
