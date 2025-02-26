const express = require("express")
const bodyParser = require("body-parser")
const { Sequelize, Model, DataTypes, Op } = require("sequelize")
const {
  convertNameIntoUrlSnippet,
  trimIdFromSnippet
} = require("./helpers/convertNameIntoUrlSnippet")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/db.sqlite"
})

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  { sequelize, modelName: "category" }
)

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    urlSnippet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { sequelize, modelName: "item" }
)

Category.hasMany(Item)
Item.belongsTo(Category)

sequelize.sync()

const app = express()
const port = 8080

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  )
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  next()
})

app.get("/items", async (req, res) => {
  const { archived, sortBy, search } = req.query
  const order = sortBy?.split(":") ?? undefined

  const data = await Item.findAll({
    where: {
      archived: archived === "true",
      name: {
        [Op.substring]: search ?? ""
      }
    },
    order: order ? [order] : undefined
  })
  res.json({
    is_success: true,
    data
  })
})

app.get("/item", async (req, res) => {
  const { urlSnippet } = req.query

  const data = await Item.findOne({
    where: {
      urlSnippet: trimIdFromSnippet(urlSnippet)
    }
  })

  if (data) {
    res.json({
      is_success: true,
      data
    })
  } else {
    res.status(404).json({
      is_success: false,
      message: "Item not found"
    })
  }
})

app.post("/items", async (req, res) => {
  try {
    const data = await Item.create({
      ...req.body,
      urlSnippet: convertNameIntoUrlSnippet(req.body.name)
    })
    res.json({
      is_success: true,
      data
    })
  } catch {
    res.status(400).json({
      is_success: false,
      message: "Invalid data"
    })
  }
})

app.put("/items/:id", async (req, res) => {
  const data = await Item.findByPk(req.params.id)
  if (data) {
    try {
      await data.update(req.body)
      setTimeout(() => {
        res.json({
          is_success: true,
          data
        })
      }, 3000)
    } catch {
      res.status(400).json({
        is_success: false,
        message: "Invalid data"
      })
    }
  } else {
    res.status(404).json({
      is_success: false,
      message: "Item not found"
    })
  }
})

app.get("/categories", async (req, res) => {
  const data = await Category.findAll()
  res.json({
    is_success: true,
    data
  })
})

app.post("/categories", async (req, res) => {
  try {
    const data = await Category.create({
      ...req.body
    })
    res.json({
      is_success: true,
      data
    })
  } catch {
    res.status(400).json({
      is_success: false,
      message: "Invalid data"
    })
  }
})

app.get("/users/:id", async (req, res) => {
  const id = +req.params.id
  if (id === 0 || isNaN(id)) {
    res.status(400).json({
      is_success: false,
      message: "Bad request"
    })
  } else {
    setTimeout(() => {
      res.json({
        is_success: true,
        data: {
          id: 1,
          name: "admin",
          role_id: 1
        }
      })
    }, 2000)
  }
})

app.get("/roles/:id", async (req, res) => {
  const id = req.params.id
  if (id !== "1") {
    res.status(400).json({
      is_success: false,
      message: "Bad request"
    })
  } else {
    res.json({
      is_success: true,
      data: {
        id: 1,
        name: "Admin"
      }
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
