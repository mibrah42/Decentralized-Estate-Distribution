// let express = require('express');
// bodyParser = require('body-parser');

// let port = process.env.PORT || 3000;
// let app = express();

// app.use(express.static(__dirname + './views'));
// app.use('/css', express.static('css'));
// app.use('/img', express.static('img'));
// app.use('/js', express.static('js'));
// app.use('/scss', express.static('scss'));
// app.use('/vendor', express.static('vendor'));

// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(bodyParser.json());

// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.render('index');
// })

// app.get('/account', (req, res) => {
//     res.render('account');
// })

// app.get('/add', (req, res) => {
//     res.render('add');
// })

// app.get('*', (req, res) => {
//     res.render('four');
// })

// app.listen(port, () => {
//     console.log(`Server is up on port ${port}`);
// });
