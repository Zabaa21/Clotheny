const server = require('express').Router();
const { Palette, User } = require("../db.js");
const Sequelize = require('sequelize');

// List all palettes
server.get('/list', async (req, res, next) => {
    try {
        const palettes = await Palette.findAll()
        res.json(palettes);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List one palette
server.get('/list/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const palette = await Palette.findByPk(id)
        res.json(palette);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List active palette by user id
server.get('/active/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if(user){
        if(user.paletteId){
            const palette = await Palette.findByPk(user.paletteId)
            if(!palette){
                const defaultPalette = await Palette.findByPk(1)
                res.json(defaultPalette)
            } else {
                res.json(palette)
            }
        } else {
            const defaultPalette = await Palette.findByPk(1)
            res.json(defaultPalette)
        }
    } else {
        const defaultPalette = await Palette.findByPk(1)
        res.json(defaultPalette)
    }
})

// Create a palette 
server.post('/add', async (req, res, next) => {
    try {
        const {status, name, type, primaryMain, primaryDarker, secondaryMain, secondaryDarker, background} = req.body
        const previousPalette = await Palette.findOne({where: {name}});
        if(previousPalette){
            res.json({message: 'That palette already exists. Choose another name.'})
        } else {
            const obj = {status, name, type, primaryMain, primaryDarker, secondaryMain, secondaryDarker, background}
            const palette = await Palette.create(obj)
            res.json(palette);
        }
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Update a palette
server.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const {status, name, type, primaryMain, primaryDarker, secondaryMain, secondaryDarker, background} = req.body
        const editedPalette = await Palette.update({
            status, name, type, primaryMain, primaryDarker, secondaryMain, secondaryDarker, background
        }, { where: {id} } );
        res.json(editedPalette)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Remove a palette
server.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const palette = await Palette.findByPk(id)
        palette.destroy()
        res.json({message: "The palette was deleted"});
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Associate a palette to an user
server.put('/user/:paletteId/:userId', async (req, res, next) => {
    try {
        const { userId, paletteId } = req.params
        const user = await User.findByPk(userId);
        user.paletteId = paletteId
        user.save()
        res.json(user)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

module.exports = server;