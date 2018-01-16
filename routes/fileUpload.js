/**
 * Created by hai on 28/06/2017.
 */
const fs = require("fs");
const uuid = require('node-uuid');

module.exports = {
    fileUpload: (req, res) => {
        if (!req.body.fileList) {
            return res.error(400).send('No files were uploaded.');
        }
        else {
            let files = getDataUrlWithoutPrefix(req);

            files = files.map((file, index) => {
                return writeFile(file, req.body.fileList[index].type)
            });
            Promise.all(files).then(
                values => {
                    res.json(values);
                },
                err => {
                    res.status(411).send(err)
                });

        }
    }
};

function getDataUrlWithoutPrefix(req) {
    return req.body.fileList.map((file) => {
        return file.dataURL.replace(/^data:image\/\w+;base64,/, "", "")
    });
}

function writeFile(file, fileType) {
    return new Promise((resolve, reject) => {
        let fileUrl = 'public/images/' + uuid.v4() + '.' + fileType;
        fs.writeFile(fileUrl, file, 'base64', function (err) {
            if (err)
                reject(err);
            else
                resolve(fileUrl)
        });
    });
}
