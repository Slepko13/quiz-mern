const app = require('./app');
const mongoose = require('mongoose');
const { PORT, mongoUri } = require('./config/app');


async function start() {
    try {
        await mongoose.connect(
            mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Data base connected...');

        app.listen(PORT, () => console.log(`Server has been  started on port ${PORT}...`));
    } catch (e) {
        console.log('server error', e.message)
        process.exit(1)
    }
}
start();