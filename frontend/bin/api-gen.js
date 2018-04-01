#!/usr/bin/env node
const argv = require('yargs').argv
const fs = require('fs-extra')
const path = require('path')
const request = require('request')
const unzip = require('unzip2')
const { spawn } = require('child_process')


const swaggerUrl = argv.swaggerUrl
if (!swaggerUrl) {
  throw new Error('Cannot find swagger file')
}
const outDir = argv.outDir || 'build/apis'

const https = swaggerUrl.startsWith('https') ? require('https') : require('http')

downloadSwaggerFile()

function downloadSwaggerFile() {
  var file = fs.createWriteStream('./bin/swagger.json')
  https.get(swaggerUrl, function (response) {
    response
      .pipe(file)
      .on('finish', function () {
        console.log('Download swagger.json complete.')
        generatorSource()
      })
  })
}

function generatorSource() {
  var swaggerObj = require('./swagger.json')
  var codeGenEndpoint = 'http://generator.swagger.io/api/gen/clients'
  var language = 'typescript-fetch'

  var postBody = {
    spec: swaggerObj,
    options: {
      supportsES6: true,
      modelPropertyNaming: 'original',
      npmName: 'GetLinks',
      npmVersion: swaggerObj.version,
    },
  }

  fs.removeSync(outDir)

  request.post({
    url: codeGenEndpoint + '/' + language,
    body: JSON.stringify(postBody, {
      encoding: 'utf8',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }, function (error, response, body) {
    if (error) {
      throw error
    }

    if (response.statusCode !== 200) {
      throw new Error('Response code was not 200. ' + body)
    }

    var responseObj = JSON.parse(body)

    request({
      'rejectUnauthorized': false,
      url: responseObj.link,
      encoding: null,
    })
      .pipe(
        unzip.Extract({
          path: '.',
        })
      )
      .on('close', function () {
        const tsCompile = spawn('tsc', ['-p', 'typescript-fetch-client/tsconfig.json', '--outDir', outDir])
        tsCompile.on('close', function () {
          fs.removeSync('scripts/swagger.json')
          fs.removeSync('typescript-fetch-client')

          console.log('Generate client api complete.')
        })
      })
  })
}
