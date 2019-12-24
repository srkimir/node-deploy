const path = require('path')
const express = require('express')
const ejs = require('ejs')
const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.engine('html', ejs.renderFile)

app.get('/', (req, res) => {
	res.render('index', {
		time: new Date(),
		environment: process.env.NODE_ENV,
		port: process.env.PORT
	})
})

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
