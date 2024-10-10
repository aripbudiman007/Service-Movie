const express = require('express')
const setupSwagger = require('./swagger');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const PORT = 3000 || process.env.PORT

const app = express()

const router = require('./routes')

app.use(cors());
app.use(express.json())

setupSwagger(app);

app.use("/api", router)
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app