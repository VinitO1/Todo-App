import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getDate, getDay } from './date.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = [];
let workItems = [];

// Home route for the default to-do list
app.get('/', (req, res) => {
    let day = getDate();

    res.render('list', { listTitle: day, newListItems: items });
});

// Route to handle new items from the form submission
app.post('/', (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
}
);

// Route for the work to-do list
app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Work List', newListItems: workItems });
});

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
}
);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
