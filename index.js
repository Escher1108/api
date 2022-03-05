const express = require('express')
const axios = require('axios')
const { response } = require('express')

const app = express()

const PORT = process.env.PORT || 5655

app.use(express.json())

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
    axios.post('https://hs.jkgblog.com/api.php', data).then(response => {
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

    let url = 'https://restapi.amap.com/v3/geocode/regeo'
    axios.get(url, { params: gpsInfo }).then(async (response) => {
        let dataNum = await response.data
        return res.json(dataNum)
    }).catch(err => {
        return res.send({ msg: '非法访问' })
    })

});


app.post('/privacy', (req, res) => {
    let result = req.body
    let data = {
        value:result.value
    }

    res.set({
        "Access-Control-Allow-Origin": "*"
        , "Access-Control-Allow-Methods": "POST"
        , "Access-Control-Allow-Credentials": "true"
    });

    let url = 'https://privacy.aiuys.com/api/query'
    axios.get(url, { params: data }).then(async (response) => {
        let dataNum = await response.data
        return res.json(dataNum)
    }).catch(err => {
        return res.send({ msg: '非法访问' })
    })

});


app.listen(PORT, () => {
    console.log('服务运行中~')
})