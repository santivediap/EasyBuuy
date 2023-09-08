const express = require('express');
const path = require('path');
require('dotenv').config()

const productsApiRouter = require("./routes/productsApiRoutes")

const app = express();
app.use(express.json({ extended: false }));

app.get("/test", (req, res) => {
  res.json({
    msg: "El Backend funciona perfectamente!"
  })
})

app.use("/api/products", productsApiRouter)

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started port ${PORT}`));
