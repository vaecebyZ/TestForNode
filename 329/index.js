const fs = require('fs')

fs.readFile('./1.txt', 'utf8', (err, data) => {
    if (err) throw err
    console.log('1.txt 读取完成');
    console.log('-------------------------------------------------------------');
})
fs.readFile('./2.txt', 'utf8', (err, data) => {
    if (err) throw err
    console.log('2.txt 读取完成');
    console.log('-------------------------------------------------------------');
})
fs.readFile('./3.txt', 'utf8', (err, data) => {
    if (err) throw err
    console.log('3.txt 读取完成');
    console.log('-------------------------------------------------------------');
})

//let p1 = new Promise()


let fsp = file => new Promise((succ, err) => {
    fs.readFile(file, 'utf8', (errs, data) => {
        if (errs) err(errs)
        succ(data)
    })
})

fsp('1.txt').then(() => {
    console.log('读取完成1');
    return fsp('2.txt')
}).then(() => {
    console.log('读取完成2');
    return fsp('3.txt')
}).then(() => {
    console.log('读取完成3');
})