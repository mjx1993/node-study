var nodemailer = require('nodemailer');

//配置邮件
var transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    port: 25,
    auth: {
        user: 'a_shepherd@163.com',
        pass: '83866595a',
    }
});

function sendmail(data) {
    var option = {
        from: 'a_shepherd@163.com',
        to: data.to,
        // cc          : ''    //抄送
        // bcc         : ''    //密送
    };
    option.subject = data.title;
    option.html = data.html;
    transporter.sendMail(option, function(error, response){
        if(error){
            console.log("fail: " + error);
        }else{
            console.log("success: " + response.accepted);
        }
    });
}

//调用发送邮件
var data = {
    to: '464471063@qq.com',
    title: '好好学习，天天向上',
    html: '邮件内容：<br/>My goal for 2015 is to accomplish the goals of 2014 which I should have done in 2013 because I made a promise in 2012 & planned in 2011！'
}
sendmail(data);