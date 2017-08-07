/**
 * Created by hai on 28/06/2017.
 */
const fs = require("fs");
const uuid = require('node-uuid');

module.exports = {
    fileUpload: (req, res) => {
        if (!req.body.image) {
            return res.error(400).send('No files were uploaded.');
        }
        else {
            let file = req.body.image.replace(/^data:image\/png;base64,/, "");
            let  fileUrl = 'public/images/' + uuid.v4() + '.png';
            fs.writeFile(fileUrl, file, 'base64', function(err) {
                if (err)
                    return res.error(400).send(err);
                else
                    return res.json({imageUrl: fileUrl})
            });
        }
    },
};