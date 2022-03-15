/*
 * @Author: Escher1108
 * @Website: https://jkgblog.com
 * @Date: 2022-03-05 21:42:49
 * @LastEditTime: 2022-03-15 21:56:50
 * @LastEditors: Do not edit
 * @FilePath: \api\index.js
 * @Description: 耶斯莫拉
 */
const express = require('express')
const axios = require('axios')
const { response } = require('express')

const app = express()

const PORT = process.env.PORT || 5655

app.use(express.json())

const base64Arr =['aHR0cHM6Ly9ocy5qa2dibG9nLmNvbS9hcGkucGhw','aHR0cHM6Ly9yZXN0YXBpLmFtYXAuY29tL3YzL2dlb2NvZGUvcmVnZW8='];

app.get('/', (req, res) => {
    res.send({ status: 'API is running', Author: 'Escher1108', website: 'https://jkgblog.com', Email: 'contact@jsproxy.cyou' })
})

app.post('/message', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*"
        , "Access-Control-Allow-Methods": "POST"
        , "Access-Control-Allow-Credentials": "true"
    });

    let result = req.body
    let data = {
        text: result.text,
        desp: `基本数据：${result.desp}`
    }
    
    const buff_one = Buffer.from(base64Arr[0], 'base64');
    const url1 = buff_one.toString('utf-8');
    axios.post(url1, data).then(response => {
        return res.send(response.data)
    }).catch(err => {
        return res.send(response.data)
    })


});

app.post('/gps', (req, res) => {
    let result = req.body
    let gpsInfo = {
        key: '2fbc3ae5d108cb7e59d252327870305c',
        location: result.longitude + ',' + result.latitude,
        output: 'json',
        radius: 1
    }

    res.set({
        "Access-Control-Allow-Origin": "*"
        , "Access-Control-Allow-Methods": "POST"
        , "Access-Control-Allow-Credentials": "true"
    });

    const buff_two = Buffer.from(base64Arr[1], 'base64');
    const url2 = buff_two.toString('utf-8');
    axios.get(url2, { params: gpsInfo }).then(async (response) => {
        let dataNum = await response.data
        return res.json(dataNum)
    }).catch(err => {
        return res.send({ msg: '非法访问' })
    })

});


app.listen(PORT, () => {
    console.log('服务运行中~')
})