import express from "express";
import path from 'node:path';
import bodyParser from "body-parser";
import signup from "./routes/register.mjs";

const __dirname = import.meta.dirname;
const app = express();
const port = 80;
const url = `http://192.168.42.130:${port}` || `http://192.168.43.49:${port}`;

app.use(express.json())

app.set(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.get('/', async (req, res) => {
    res.render('register');
});

app.get('/otp', async (req, res) => {
    res.render('otp');
});

app.use('/signup', signup);

try {
    app.listen(port, () => {
        console.log(`Server is running at ${url}`);
    });
} catch (error) {
    console.log(`Error occured while running server at ${url}`);
}