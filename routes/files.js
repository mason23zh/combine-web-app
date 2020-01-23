const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const router = express.Router();
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const path = require('path');
const {
    ensureAuthenticated
} = require('../helper/auth');
const multer = require('multer');

const mongoURL =
    'mongodb://Zhengyang:Zzy1229!@ds263808.mlab.com:63808/multifunctionweb-dev';
const conn = mongoose.createConnection(
    'mongodb://Zhengyang:Zzy1229!@ds263808.mlab.com:63808/multifunctionweb-dev'
);

conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

//*storage
const storage = new gridFsStorage({
    url: mongoURL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const fileName = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: fileName,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({
    storage
});

//*display image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'file not exists'
            });
        }
        //*check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
            //read output
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'not an image'
            });
        }
    });
});

//*display file by file name
router.get('/displayfiles/:filename', (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'file not exists'
            });
        }
        return res.json(file);
    });
});

//*display route
router.get('/displayFiles', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //check files exist
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        return res.json(files);
    });
});

router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //check files exist
        if (!files || files.length === 0) {
            res.render('files/index', {
                files: false
            });
        } else {
            files.map(file => {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            })
            res.render('files/index', {
                files: files
            });
        }
    });
});

router.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
    // res.json({
    //     file: req.file
    // });
});

// //*multer
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 15000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx|jpg|pdf|jpeg)$/)) {
//             return cb(new Error('File must be doc, docx, jpg, pdf or jpeg. Please check again.'));
//         }
//         cb(undefined, true);
//     }
// });

// router.get('/', (req, res) => {
//     res.render('files/index');
// });

// router.post('/upload', upload.single('upload'), (req, res) => {
//     console.log(req.file);
//     res.send('test upload page');
// }, (error, req, res, next) => {
//     res.status(400).send({
//         error: error.message
//     });
// });

// router.post('/uploadTest', upload.single('upload'), (req, res) => {

// })

// router.post('/uploadFileTest', upload.single('upload'), async (req, res) => {
//     req.user.userFiles = req.file.buffer;
//     await req.user.save()
//     console.log('upload page');
// }, (error, req, res, next) => {
//     res.status(400).send({
//         error: error.message
//     });
// });

// router.get('/uploadFile', ensureAuthenticated, (req, res) => {
//     res.render('files/index');
// })

// router.get('/files/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user || !user.userFiles) {
//             throw new Error()
//         }

//         res.set('Content-Type', 'image/jpg')
//         res.send(user.userFiles);

//     } catch (e) {
//         res.status(404).send();
//     }
// })

module.exports = router;