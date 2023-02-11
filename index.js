const express = require("express");
const app = express();
const mongoose = require("mongoose")
require("./db/dbconnection");
const userRouter = require("./routes/userRouter");
const staticRouter = require("./routes/staticRouter");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRouter");
// const storeRouter = require("./routes/storeRouter")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "Api Deployment",
    version: "2.0.0",
    description: "Swagger API Docs .This is a sample  OpenAPI 2.0.0 specification. You can find out more about Swagger at https://swagger.io ."


  },
  url: `localhost:7000/`,

};
 const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./routes/userRouter.js"],
};
 const swaggerSpec = swaggerJSDoc(options);
 app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
 
 /* Server Listen */
//  app.use("/app/v1/user", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//User Route
app.use("/app/v1/user", userRouter);

//Static Route
app.use("/static", staticRouter);

//Product Route
// app.use("/product", productRouter);


//Category Route
// app.use("/category", categoryRouter);

//Store Route
// app.use("/store", storeRouter);








app.listen(7000, () => {
  console.log("Server is Running on 7000............................");
});
