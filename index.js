const path = require('path')
const express = require('express')
const ejs = require('ejs')
const app = express()
const PORT = 3000

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.engine('html', ejs.renderFile)

app.get('/', (req, res) => {
	res.render('index', {
		time: new Date()
	})
})

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
