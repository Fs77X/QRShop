var AWS = require('aws-sdk');
var sns

const table = 'GoldenShoppingExperienceBusinessInfo'
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
const initSNS = function(){
    const awsConfig = {
        "region": 'us-west-2',
        "accessKeyId": process.env.SNSACC_Key, 
        "secretAccessKey": process.env.SNNSEC_Key
    
    }
    AWS.config.update(awsConfig)
    sns = new AWS.SNS()

}
initSNS()
const send_text = async function (req, res) {
    try{
        console.log("Message = " + req.query.message);
        console.log("Number = " + req.query.number);
        console.log("Subject = " + req.query.subject);
        var params = {
            Message: req.query.message,
            PhoneNumber: '+' + req.query.number,
            Subject: req.query.subject
            
        };
    
        var publishTextPromise = new AWS.SNS({endpoint: 'http://sns.us-west-2.amazonaws.com', region: 'us-west-2' }).publish(params).promise();
    
        publishTextPromise.then(
            function (data) {
                res.end(JSON.stringify({ MessageID: data.MessageId }));
            }).catch(
                function (err) {
                    res.end(JSON.stringify({ Error: err }));
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

const get_store_num = async (store) => {
        return new Promise(function(resolve, reject) {
        const params = {
            TableName: table,
            Key:{
                "Store": store
            }
        }
        docClient.get(params, function(err, data){
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2))
                reject(err)
            } else {
                if(Object.entries(data).length === 0){
                    reject({message: "Invalid store, try again"})
                }else{
                    console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
                    resolve(data)
                }

            }
        })
    })
}
//req.query.subject/message/store
const notify_Owner = async function (req, res) {
    try{
        if(!req.query.message || !req.query.store || !req.query.subject){
            res.status(403).send({message: "Missing query please try again"})
            return;
        }
        
        console.log("Message = " + req.query.message);
        console.log("Subject = " + req.query.subject);
        await get_store_num(req.query.store).then(function(data){
            console.log(data)
            console.log("Number = " + data.Item.Number)
            var params = {
                Message: req.query.message,
                PhoneNumber: '+' + data.Item.Number,
                Subject: req.query.subject
                
            };
            
            var publishTextPromise = new AWS.SNS({endpoint: 'http://sns.us-west-2.amazonaws.com', region: 'us-west-2' }).publish(params).promise();
    
            publishTextPromise.then(
                function (data) {
                    res.end(JSON.stringify({ MessageID: data.MessageId }));
                }).catch(
                    function (err) {
                        res.end(JSON.stringify({ Error: err }));
            });
            // res.send(params)

        }, function (err){
            res.status(400).send(err)
        })

    


    }catch(err){
        try{
            res.status(500).send(err)
            console.log('err sent is ', err)
        }catch(err){
            console.log('err not sent is ', err)
        }
    }
}

module.exports = {
    send_text,
    notify_Owner
}