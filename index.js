const express = require('express')
const app = express()

app.use(express.json())

const Recipe = require('./model/recipe.model.js')
const fs = require('fs')

const { intailizeDatabase } = require('./db/db.connect.js')
const { error } = require('console')

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


async function readAllRecipeDetail (){
    try {
        const recipe = await Recipe.find()
        return recipe
    } catch (error) {
        throw error
    }
}

app.get('/recipes', async (req,res) => {
    try {
        const recipe = await readAllRecipeDetail()
        res.json(recipe)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: 'Failed to fetch recipe details'})
    }
})

async function readRecipeByTitle (recipeTitle){
    try {
        const recipe = await Recipe.findOne({title: recipeTitle})
        return recipe
    } catch (error) {
        throw error
    }
}

app.get('/recipes/title/:recipeTitle', async (req,res) => {
    try {
        const recipe = await readRecipeByTitle(req.params.recipeTitle)
        if(!recipe){
            res.status(400).json({error: 'Recipe not found'})
        }
        res.status(200).json({message: 'Recipe Data:', book: recipe})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: 'Failed to fetch recipe details'})
    }
})


async function readDetailByDifficulty (recipeLevel){
    try {
        const recipe = await Recipe.findOne({difficulty: recipeLevel})
        return recipe
    } catch (error) {
        throw error
    }
}

app.get('/recipes/difficulty/:recipeLevel', async (req,res) => {
    try {
        const recipe = await readDetailByDifficulty(req.params.recipeLevel)
        if(!recipe){
            res.status(400).json({error: 'Recipe not found'})
        }
        res.status(200).json({message: 'Recipe Data:', book: recipe})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: 'Failed to fetch recipe details'})
    }
})

async function updateRecipeId(recipeId, dataToUpdate) {
    try {
        const book = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
        return book 
    } catch (error) {
        throw error
    }
}

app.post('/recipes/:recipeId', async (req,res) => {
    try {
        const updateRecipe = await updateRecipeId(req.params.bookId, req.body)
       if(!updateRecipe){
           res.status(404).json({ error: "Recipe not found" })
        }else{
            res.status(200).json({ message: "Recipe update successfully", recipe: updateRecipe })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: 'Failed to fetch book data'})
    }
})



const PORT = 3000
app.listen(PORT, () => {
    console.log('Server is running on this ', PORT)
})
