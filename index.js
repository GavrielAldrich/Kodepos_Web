import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => { 
    console.log(`Listening to port: ${port}`); 
});

const API_Link = "https://kodepos.cyclic.app/search/?q="

// GET: "/"
app.get("/", async (req, res) =>{
    try {
        res.render("index.ejs", {content : ""})
    } catch (error) {
        console.log(error)
    }
})

// POST: "/"
app.post("/", async (req, res) => {
    try {
        let userInput = req.body.search;
        let result, response;
        switch (userInput) {
            // If the user input is empty, then we make the result empty
            // so it doesnt break the response.data.data
            case "":
                result = "empty-input";
                break;
            default:
                response = await axios.get(API_Link + userInput);
                result = response.data;
                break;
        }
        res.render("index.ejs", {content: result});
    } catch (error) {
        console.log(error);
        res.render("index.ejs", { content: "Error fetching data" });
    }
});
