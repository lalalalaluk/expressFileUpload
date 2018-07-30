let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
const multer = require('multer');

// 上傳到哪個資料夾
const UPLOAD_PATH = './'

let upload = multer({ dest: UPLOAD_PATH })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('hello world');
});

app.post('/upload', upload.single('fileUpload'), function (req, res, next) {
    const {file} = req;
    fs.readFile(file.path, function (err, data) {
        fs.writeFile(`${UPLOAD_PATH}/${file.originalname}`, data, function (err) {
            if (err) res.json({
                err
            })
            res.json({
                msg: '上传成功'
            });
        });
    })
})


app.listen(3300, function () {
    console.log('Example app listening on port 3300!');
});