const fs = require("fs");
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/user.json";

exports.getAll = (request, response) => {
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const savedData = JSON.parse(data);

        return response.json({ status: true, result: savedData });
    });
};

exports.getOne = (request, response) => {
    const { id } = request.params;

    if (!id)
        return response.json({ status: false, message: "user id not found" });

    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const savedData = data ? JSON.parse(data) : [];

        return response.json({
            status: true,
            result: savedData.find((userItem) => userItem.id == id),
        });
    });
};

exports.create = (request, response) => {
    const { userName, link } = request.body;
    fs.readFile(dataFile, "utf-8", async (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = JSON.parse(data);


        const newPassword = await bcrypt.hash(password, saltRounds);
        console.log(newPassword);
        const newObj = {
            id: uuid.v4(), userName, link,
            productName,
            categoryId,
            price,
            password: newPassword,
            thumbImage,
            images,
            salePercent,
            quantity,
            desc,
        }
        parsedData.push(newObj);

        fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr });
            }

            return response.json({ status: true, result: parsedData });
        });
    });
};

exports.update = (req, res) => {
    const { id, userName, link, position } = request.body;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = JSON.parse(data);

        const updateData = parsedData.map((userObj) => {
            if (userObj.id == id) {
                return { ...userObj, userName, link, position };
            } else {
                return userObj;
            }
        });

        fs.writeFile(dataFile, JSON.stringify(updateData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr });
            }

            return response.json({ status: true, result: updateData });
        });
    });
};

exports.delete = (request, response) => {
    const { id } = request.params;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = JSON.parse(data);

        const deletedData = parsedData.filter((e) => e.id != id);

        fs.writeFile(dataFile, JSON.stringify(deletedData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr });
            }

            return response.json({ status: true, result: deletedData });
        });
    });
};

exports.login = (request, response) => {
    const { email, password } = request.body;

    if (!email || !password)
        return response.json({
            status: false,
            message: "medeellee buren buglunu uu",
        });

    fs.readFile(dataFile, "utf-8", async (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = data ? JSON.parse(data) : [];
        let user;
        for (let i = 0; i < parsedData.length; i++) {
            if (email == parsedData[i].email) {
                const decrypt = await bcrypt.compare(
                    password + myKey,
                    parsedData[i].password
                );

                if (decrypt) {
                    user = {
                        id: parsedData[i].id,
                        email: parsedData[i].email,
                        lastname: parsedData[i].lastname,
                        firstname: parsedData[i].firstname,
                    };
                    break;
                }
            }
        }

        console.log(user);

        if (user) {
            return response.json({
                status: true,
                result: user,
            });
        } else {
            return response.json({
                status: false,
                message: "Tanii email eswel nuuts ug buruu bna",
            });
        }
    });
};