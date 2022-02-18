const express = require('express')
const axios = require('axios')

const app = express()

const PORT = process.env.PORT || 5655

app.use(express.json())

app.post('/message', (req, res) => {
    let result = req.body
    let data = {
        text: result.text,
        desp: `基本数据：${result.desp}`
    }
    axios.post('https://hs.jkgblog.com/api.php', data).then(res => {
        console.log(res)
    }).catch(err => err)

    res.set({
        "Access-Control-Allow-Origin": "*"
        , "Access-Control-Allow-Methods": "POST"
        , "Access-Control-Allow-Credentials": "true"
    });

    res.json({
        status: 200,
        msg: '发送信息成功'
    }).end()
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
        if (response) {
            let dataNum = await response.data
            return res.json(dataNum)
        }
    }).catch(err => {
        console.log(err)
    })

});


app.listen(PORT, () => {
    console.log('服务运行中~')
})