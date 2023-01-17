const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to Qomit')
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})