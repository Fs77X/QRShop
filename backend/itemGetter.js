const AWS = require('aws-sdk')
const { query } = require('express')
// const { v4: uuidv4 } = require('uuid');

var docClient
//init  dynamo
const initDynamao = function(){
    const awsConfig = {
        "region": "us-west-2",
        "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
        "accessKeyId": process.env.KACC_Key, "secretAccessKey": process.env.KSEC_Key
    
    }
    console.log(awsConfig)
    AWS.config.update(awsConfig)
    docClient = new AWS.DynamoDB.DocumentClient()

}

initDynamao();
//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTable-property to get count of all orders for stats purpose

const add_order = async function (req, res) {
    const table = 'GSEOrder'
    const stamp = Date.now()
    try{
        console.log(req.body)
        if(!req.body.items || !req.body.name || !req.body.store){
            res.status(403).send({message: "Missing body info please try again"})
            return;
        }
        

        const params = {
            TableName:table,
            Item:{
                "Store": req.body.Store,
                "OrderID": stamp,
                "items": JSON.parse(req.body.items),
                "Name": req.body.name
            }
        };
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                res.status(200).send({"message": "recieved payload"})
            }
        });
        
        
    }catch(err){
        try{
            res.status(500).send(err)
            console.log('err sent is ', err)
        }catch(err){
            console.log('err not sent is ', err)
        }
    }

}

const add_delivery = async function(req, res) {
    const table = 'GSEDeliver'
    const stamp = Date.now()

    try{
        console.log(req.body)
        if(!req.body.items || !req.body.name || !req.body.store){
            res.status(403).send({message: "Missing body info please try again"})
            return;
        }
        

        const params = {
            TableName:table,
            Item:{
                "Store": req.body.Store,
                "OrderID": stamp,
                "items": JSON.parse(req.body.items),
                "Name": req.body.name,
                "status": "initiated",
            }
        };
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                res.status(200).send({"message": "recieved payload"})
            }
        });
        
        
    }catch(err){
        try{
            res.status(500).send(err)
            console.log('err sent is ', err)
        }catch(err){
            console.log('err not sent is ', err)
        }
    }

}
const add_item = async function (req, res) {
    const table = 'GoldenShoppingExperienceInventory'
    try{
        console.log(req.body)
        if(!req.body.info || !req.body.Store || !req.body.itemID){
            res.status(403).send({message: "Missing body info please try again"})
            return;
        }

        console.log(req.body.info)
        

        const params = {
            TableName:table,
            Item:{
                "Store": req.body.Store,
                "ItemID": req.body.itemID,
                "info": JSON.parse(req.body.info)
            }
        };
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                res.status(200).send({"message": "recieved payload"})
            }
        });
        
        
    }catch(err){
        try{
            res.status(500).send(err)
            console.log('err sent is ', err)
        }catch(err){
            console.log('err not sent is ', err)
        }

    }
}


const get_inventory = async function (req, res) {
    const table = 'GoldenShoppingExperienceInventory'
    try{
        console.log('ayy')
        if(!req.query.store){
            res.status(403).send({message: "Missing query please try again"})
            return;
        }

        const params = {
            KeyConditionExpression: '#st = :store_name',
            ExpressionAttributeNames:{
                "#st": "Store"
            },
            ExpressionAttributeValues : {
                ':store_name': req.query.store

            },
            TableName: table,
        }
        console.log('params done')

        await docClient.query(params, function(err, data) {
            console.log('we here')
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                res.status(403).send(err)
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                res.status(200).send(data)
            }
        });

    } catch(err){
        try{
            res.status(500).send(err)
            console.log('err sent is ', err)
        }catch(err){
            console.log('err not sent is ', err)
        }

    }
}



//get_item from store and itemID
const get_item = async function (req, res) {
    const table = 'GoldenShoppingExperienceInventory'
    try{
        if(!req.query.itemID || !req.query.store){
            res.status(403).send({message: "Missing query please try again"})
            return;
        }

        const params = {
            TableName: table,
            Key:{
                "Store": req.query.store,
                "ItemID": req.query.itemID
            }
        }

        docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                res.status(403).send(err)
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                res.status(200).send(data)
            }
        });



    } catch(err){
        try{
            res.status(500).send(err)
            console.log('err sent is ', err)
        }catch(err){
            console.log('err not sent is ', err)
        }

    }
}

module.exports = {
    get_item,
    initDynamao,
    get_inventory,
    add_item,
    add_order,
    add_delivery
}