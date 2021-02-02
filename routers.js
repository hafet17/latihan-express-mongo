const express = require('express')
const routers = express.Router();

const multer = require('multer')
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false)
    }
    cb(null, true)
}
const upload = multer({ dest: 'public', fileFilter: imageFilter })


routers.get('/', (req, res) => res.send('Hello World!'))

routers.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file
    if (file) {
        const target = path.join(__dirname, 'public', file.originalname)
        fs.renameSync(file.path, target)
        res.send('file berhasil diupload')
    } else {
        res.send('file gagal diupload')
    }
})


routers.post('/register', upload.single('avatar'), (req, res) => {
    const name = req.body.name
    const avatar = req.file
    res.send({ name: name, avatar: avatar })
})



// req semua method
routers.all('/universal', function (req, res) {
    res.send('request dengan method ' + req.method)
})

// req parameter
routers.get('/post/:id?', (req, res) => {
    if (req.params.id) res.send('artikel-' + req.params.id)
})

// req query
routers.get('/foods', (req, res) => {
    const page = req.query.page ? req.query.page : 1
    res.write('Foods page: ' + page + '\n')
    if (req.query.sort) res.write('Sort by: ' + req.query.sort)
    res.end();
});


// kode routing lainnya

module.exports = routers