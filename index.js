const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { log } = require('console');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname , "public")));


app.get('/' , (req, res) => {
    fs.readdir('./files' , (err,files) => {  // files here are use as a parameter to call all the content of files folder
        res.render("index", {fileforejs: files})
    })
})

app.post('/create' , (req, res) => {
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
        res.redirect('/')
   })
})

app.get('/files/:filename' , (req, res) => {
    fs.readFile(`./files/${req.params.filename}` , "utf-8" ,  (err, filedata) => {
        if (err) {
            console.error(err); // Handle error if file reading fails
            res.status(500).send(`${err}`);
            return;
        }
        // console.log(filedata);
        res.render("show" , {title: req.params.filename , content: filedata})
    })
 })
 
 app.get('/edit/:filename', (req, res) => {
    res.render("edit", { title: req.params.filename });
});

app.post('/edit', (req, res) => {
    const previousName = req.body.previous; // Ensure this is sent from the form
    const newName = req.body.new_name;

    fs.rename(`./files/${previousName}`, `./files/${newName}`, (error) => {
        if (error) {
            console.error("Error renaming file:", error);
            return res.status(500).send("An error occurred while renaming the file.");
        }
        res.redirect('/');
    });
});


app.get('/edit/:filename' , (req, res) => {
    res.render("edit", {title: req.params.filename})
})

app.post('/edit' , (req, res) => {
    fs.rename(`./files/${req.body.previous}` , `./files/${req.body.naya}` , (req, res) => {
        res.redirect('/')
    })
})
app.listen(3000, ()=> console.log("index js running on port 3000"));