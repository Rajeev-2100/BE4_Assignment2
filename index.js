const express = require('express')
const app = express()

app.use(express.json())

const Recipe = require('./model/recipe.model.js')
const fs = require('fs')

const { intailizeDatabase } = require('./db/db.connect.js')

intailizeDatabase()


async function createNewRecipe(newRecipe){
    try {
        const recipe = new Recipe(newRecipe)
        const savedRecipe = await recipe.save()
        return savedRecipe
    } catch (error) {
        throw error
    }
}

app.post('/recipes', async (req, res) => {
    try {
        const recipe = await createNewRecipe(req.body)
        res.json(recipe)
    } catch (error) {
        res.status(500).json({error: 'Failed to Recipe detail'})
    }
})


const PORT = 3000
app.listen(PORT, () => {
    console.log('Server is running on this ', PORT)
})
