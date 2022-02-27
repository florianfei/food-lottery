import express from "express";
import FoodOption from "../models/food_option.js";

const router = express.Router();

router.route('/')
    .get(getFoodOptions, (req, res) => {
        res.status(200).json(res.foodOptions);
    })
    .post(async (req, res) => {
        const foodOption = new FoodOption({
            name: req.body.name,
        });
        try {
            const newFoodOption = await foodOption.save();
            res.status(201).json(newFoodOption);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

router.get('/decision', getFoodOptions, (req, res) => {
    const data = res.foodOptions.map(opt => opt['name']);
    res.status(200).json({choice: data[Math.floor(Math.random()*data.length)]});
});

router
    .route("/:name")
    .get(getFoodOption, (req, res) => {
        res.send(res.foodOption);
    })
    .delete(getFoodOption, async (req, res) => {
        try {
            await res.foodOption.remove();
            res.status(200).json({ message: 'Food option has been removed!' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

async function getFoodOptions(req, res, next) {
    // let defaultOptions = ['swee choon', 'scissors cut', 'hawker', 'vietnamese', 'kebab + egg tart', 'kuan kuan']
    let foodOptions;
    try {
        foodOptions = await FoodOption.find();
        if (foodOptions == null || foodOptions == undefined) {
            return res
                .status(404)
                .json({ message: "Cannot find any food options" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.foodOptions = foodOptions ? foodOptions : [];
    next();
}

async function getFoodOption(req, res, next) {
    let foodOption;
    try {
        foodOption = await FoodOption.findOne({ name: req.params.name })
        if (foodOption == null || foodOption == undefined) {
            return res
                .status(404)
                .json({ message: "Cannot find any food options" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.foodOption = foodOption;
    next();
}

export { router as foodOptionsRouter };
