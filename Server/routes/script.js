const express = require('express')
const PDFDocument = require('pdfkit')
const moment = require('moment')

const router = new express.Router()


router.post("/", (req, res) => {

    const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
    });

    const name = req.body.name;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${name}.pdf`);
    doc.pipe(res);

    doc.image("images/certificate.png", 0, 0, { width: 900});

    doc.font("fonts/DancingScript-VariableFont_wght.ttf");

    doc.fontSize(60).text(name, 20, 265, {
        align: "center"
    });

    doc.fontSize(17).text(moment().format("MMMM Do YYYY"), -275, 430, {
        align: "center"
    });

    doc.end();
})