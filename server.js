const express = require('express');
const app = express();
const port = process.env.PORT || 9000
const cors = require('cors')
const BodyParser = require('body-parser')
require('dotenv').config()

const AddFilial = require('./database/addFilial')

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/add-filial', (req, res) => {
  const { n_filial, bandeira, nome, regional, tipo } = req.body

  AddFilial.create({
    n_filial: Number(n_filial),
    bandeira: bandeira,
    nome: nome,
    regional: regional,
    tipo: tipo
  }).then(() =>
    res.sendStatus(200)
  ).catch(() =>
    res.sendStatus(400)
  )

});

app.get('/filiais', async (req, res) => {

  const response = await AddFilial.findAll({
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt']
    },
    order: [
      ['n_filial', 'ASC'],
    ]
  })

  if (response) {
    res.json({ data: response })
  } else {
    res.sendStatus(400)
  }
});

app.post('/del-filial', (req, res) => {
  const { n_filial } = req.body

  AddFilial.destroy({
    where: { n_filial: Number(n_filial) }
  }).then(
    res.sendStatus(200)
  ).catch(
    res.sendStatus(400)
  )
});

app.listen(port);