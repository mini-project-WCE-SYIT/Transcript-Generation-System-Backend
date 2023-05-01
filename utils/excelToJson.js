'use strict';
const excelToJson = require('convert-excel-to-json');
const puppeteer = require('puppeteer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');


const convertExcelToJson = () => {
    const result = excelToJson({
        sourceFile: path.join(__dirname,"..","uploads","mastersheet","mastersheet.xlsx")
    });
    const name = result.Sheet1[0].A;
    const prn = result.Sheet1[1].A;
    const year = result.Sheet1[2].A;
    const sem = result.Sheet1[3].A;
    const studentDetails = [name, prn, year, sem];
    const courseTitles = [result.Sheet1[4]];
    const courseData = [];
    for(let i = 5; i < result.Sheet1.length; ++i){
        courseData.push(result.Sheet1[i]);
    }
    const data = [studentDetails,courseTitles,courseData];
    return result.Sheet1;
}

const htmlToPdf = async() => {
    const template = fs.readFileSync(path.join(__dirname,"..","views","index.ejs"), 'utf-8');
    const data = convertExcelToJson();
    const html = ejs.render(template,{
        name:data[0].A,
        prn: data[1].A
    });
    const css = fs.readFileSync(path.join(__dirname,"..","public","index.css"), 'utf-8');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setContent(html);
    await page.addStyleTag({ content: css });
    await page.pdf({
      path: path.join(__dirname,"..","uploads","Transcript","Transcript.pdf"),
      format: 'A4', // or 'Letter' or 'Legal' etc.
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      }
    });
  
    await browser.close();
}




module.exports = {convertExcelToJson,htmlToPdf}