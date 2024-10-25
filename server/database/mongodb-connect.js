import mongoose from "mongoose";

export default function connect() {
    const database = "mongodb+srv://lsjardeleza:anOBvR1CmHEfWbPT@todocluster.byzxn.mongodb.net/?retryWrites=true&w=majority&appName=TodoCluster";
    mongoose
    .connect(database)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log(error);
    });
}