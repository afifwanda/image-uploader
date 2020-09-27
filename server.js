const express = require('express');
const multer = require('multer');
const cors = require('cors');


const app = express();

app.use("/media",express.static(__dirname+'/destination'))

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './destination')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage })

app.use(cors());

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file)
    res.json({
      imageUrl: `media/${req.file.filename}`
    });
  else 
    res.status("409").json("No Files to Upload.")
});

app.get('/media')

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port: ' + PORT);