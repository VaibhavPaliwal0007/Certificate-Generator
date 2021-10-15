const express = require('express')
const home = require('./routes/home')

const app = express()
const port = 8000

app.use(express.json())
app.use(home)

app.listen(port, () => console.log(`Server is running on port ${port}`))