// The code mostly follows https://www.bezkoder.com/node-js-express-login-mongodb/ "app/server.js"

import { db } from './index';

db.mongoose
    .connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the database!");
        createRoles(); // Muokkaa tämä muunlaiseksi
    }).catch((e: any) => {
        console.log("Error establishing MongoDB-connection!");
        console.log(e)
        process.exit();
    });

// Creating pre-defined roles:
// Improve and set types properly
const createRoles = () => {

    db.Role.estimatedDocumentCount((err: any, count: number) => {
        if (!err && count === 0) {
            new db.Role({
                name: "limited"
            }).save((err: any) => {
                if (err) {
                    console.log("Error found!");
                    console.log(err);
                } else {
                    console.log("Added new role (limited)!");
                }
            })

            new db.Role({
                name: "user"
            }).save((err: any) => {
                if (err) {
                    console.log("Error found!");
                    console.log(err);
                } else {
                    console.log("Added new role (user)!");
                }
            })

            new db.Role({
                name: "fulluser"
            }).save((err: any) => {
                if (err) {
                    console.log("Error found!");
                    console.log(err);
                } else {
                    console.log("Added new role (fulluser)!");
                }
            })

            new db.Role({
                name: "admin"
            }).save((err: any) => {
                if (err) {
                    console.log("Error found!");
                    console.log(err);
                } else {
                    console.log("Added new role (admin)!");
                }
            })
        }
    })
}

export { createRoles }