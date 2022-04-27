const express=require("express");
const app=express();
const dotenv=require("dotenv");
const authRoute=require("./routes/auth")
const usersRoute=require("./routes/user")
const productsRoute=require("./routes/product")
const cartsRoute=require("./routes/cart")
const ordersRoute=require("./routes/order")
const stripeRoute=require("./routes/stripe")

const cors=require('cors');
dotenv.config()
const mongoose=require("mongoose");
mongoose.connect(process.env.URL_MONGO).then(()=>{
    console.log("connected successiful to DB");
}).catch(err=>{
    console.log(err);
})
app.use(cors());
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/products",productsRoute);
app.use("/api/carts",cartsRoute);
app.use("/api/orders",ordersRoute);
app.use("/api/checkout",stripeRoute);


app.listen(5000,()=>{
console.log("backend server is running")
})