//模板语法
let a = 1
let str =  `
hahah ${a}
sanka ${function(a){
    return a
}(a)}

`
console.log(str);

//结构赋值

//字符串
let [b,c,d,e] = '1234'
console.log(b,c,d,e);

//数组
let [f,g,h] = [1,2,3]

console.log(f,g,h);

//对象

let {name,age,gender} = {
    name:'sanka',
    age:18,
    gender:'male'
}

console.log(name,age,gender);

//对象一些赋值方式
fo = {name,age,gender}

console.log(fo);

