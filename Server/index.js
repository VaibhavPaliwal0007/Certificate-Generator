const express = require('express')
const png = require('./routes/png')
const xlsx = require('./routes/xlsx')
// require('./Database/db')

const app = express()
const port = 8000

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

app.use(png)
app.use(xlsx)

app.listen(port, () => console.log(`Server is running on port ${port}`))