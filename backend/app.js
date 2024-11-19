require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {generateToDoList} = require('./ai-engine/to-do');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());


app.post('/generate-todo', async (req,res) => {
    try {
        const result = await generateToDoList(req.body.input);
        return res.send(result);
    } catch(error){
        console.error("Error in generative AI: ", error);
    }
})

app.get('/', (req, res) => {
    res.send('To do generator');
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})