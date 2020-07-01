const request = require("request")
const fs = require('fs')
const path = require('path')
const csv=require('csvtojson')

const url = 'https://courses.edx.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+3T2018+type@asset+block/customer-data.csv'
const folderName = 'files'


request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      // save file localy
      fs.writeFileSync(path.join(__dirname, folderName, 'customer-data.csv'), body)
      // convert data to JSON and save it
      let json = ""
      csv({
          noheader:false,
          output: "json"
      })
      .fromString(body)
      .then((csvRow)=>{
        json += JSON.stringify(csvRow, '', 2)
      })
      .then(()=>{
        fs.writeFileSync(path.join(__dirname, folderName, 'customer-data.json'), json)
      })
    }
    else{
      console.log(`Got error: ${error}, statusCode: ${response.statusCode}`)
    }
})
