const fs = require("fs")
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/product.json"


exports.create = (request, response) => {
    const {
        productName,
        categoryId,
        price,
        thumbImage,
        images,
        salePercent,
        quantity,
        desc,
    } = request.body;

    fs.readFile(dataFile, "utf-8", (err, data) => {

        if (err) {
            return response.json({ status: false, message: err })
        }
        const parsedData = data ? JSON.parse(data) : [];


        const newObj = { id: uuid.v4(), productName, price, categoryId, thumbImage, images, salePercent, quantity, desc, createdDate: Date.now() }

        parsedData.push(newObj)

        fs.writeFile(dataFile, JSON.stringify(parsedData), (err) => {
            if (err) {
                return response.json({ status: false, message: err })
            }
            return response.json({ status: true, message: "Success" });

        })


    })

}

exports.getAll = (request, response) => {
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const savedData = data ? JSON.parse(data) : [];

        return response.json({ status: true, result: savedData });
    });
};

exports.getOne = (request, response) => {
    const { id } = request.params;

    if (!id) {
        return response.json({ status: false, message: "id not found" });
    }

    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const savedData = JSON.parse(data);

        const oneCategory = savedData.find(item => item.id == id)

        if (oneCategory) {
            return response.json({ status: true, result: oneCategory });
        } else {
            return response.json({ status: false, message: "product not found" });
        }


    });
};



exports.update = (request, response) => {
    const { id } = request.params;
    const { productName, price, image, thumbImage, categoryId, salePercent, quantity, desc } = request.body;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = data ? JSON.parse(data) : [];

        const updateData = parsedData.map((productObj) => {
            if (productObj.id == id) {
                return { ...productObj, productName, price, image, thumbImage, categoryId, salePercent, quantity, desc, updatedDate: Date.now() };
            } else {
                return productObj;
            }
        });

        fs.writeFile(dataFile, JSON.stringify(updateData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr });
            }

            return response.json({ status: true, message: "Success update" });
        });
    });
};

exports.delete = (request, response) => {
    const { id } = request.params;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = data ? JSON.parse(data) : [];

        const deletedData = parsedData.filter((e) => e.id != id);

        fs.writeFile(dataFile, JSON.stringify(deletedData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr });
            }

            return response.json({ status: true, message: "Success delete", result: deletedData });
        });
    });
};