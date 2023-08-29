const express = require('express');
const path = require('path');
require('dotenv').config()

const app = express();0
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    msg: "Estás en la home del backend"
  })
})

app.use("/api/products", productsRoutes)

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started port ${PORT}`));
