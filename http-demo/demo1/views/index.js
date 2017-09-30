/**
 * Created by Administrator on 2015/3/26.
 */
exports.index = function(res){
    res.writeHead(200,{
        'Content-type':"text/html"});
    res.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
        +'床前明月光');
    res.end();
};