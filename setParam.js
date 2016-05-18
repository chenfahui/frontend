getParam = function(name,url){
    var reg=new RegExp("(^|&|\\?|#)"+name+"=([^&]*?)(&|#|$)"),
        url=url||location.href,
        tempHash=url.match(/#.*/)?url.match(/#.*/)[0]:"";

    url=url.replace(/#.*/,"");
    if(reg.test(tempHash)){
            return decodeURIComponent(tempHash.match(reg)[2]);
    }else if(reg.test(url)){
            return decodeURIComponent(url.match(reg)[2])
    }else return"";
};

setParam = function(name,value,url,isHashMode){
    if(typeof name == 'undefined' || typeof value == 'undefined' || typeof url == 'undefined'){
        return url;
    }
    var reg = new RegExp("(^|&|\\?|#)"+name+"=([^&]*?)(&|#|$)"),
        tempHash=url.match(/#.*/)?url.match(/#.*/)[0]:"";

    url=url.replace(/#.*/,"");
    if(isHashMode===true){
        if(reg.test(tempHash)){
            tempHash=tempHash.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3});
        }else{
            var separator=tempHash.indexOf("#")===-1?"#":"&"; 
            tempHash=tempHash+separator+name+"="+encodeURIComponent(value)
        }
        tempHash=tempHash.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3})
    }else if(reg.test(url)){
        url=url.replace(reg,function(m,r1,r2,r3){return r1+name+"="+encodeURIComponent(value)+r3});
    }else{
        var separator=url.indexOf("?")===-1?"?":"&";
        url=url+separator+name+"="+encodeURIComponent(value)
    }
    return url+tempHash
};
