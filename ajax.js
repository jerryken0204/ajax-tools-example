/**
 * ajax call
 * {
 *   data,
 *   url,
 *   type
 *   success
 * }
 */
function ajax(option){
    var xhr = new XMLHttpRequest();
    if(option.type =='get' && option.data!=null){
        xhr.open(option.type,option.url+'?'+option.data);
        option.data =null;
    }
    if(option.type == 'post'){
        xhr.open(option.type,option.url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    xhr.onreadystatechange = function(){
        if(this.readyState ==4 && this.status ==200){
            var headerType = this.getResponseHeader('Content-Type');
            if(headerType.indexOf('json')!=-1){
                option.success(JSON.parse(this.responseText));
            }else if(headerType.indexOf('xml')!=-1){
                option.success(this.responseXML);
            }else{
                option.success(this.responseText);
            }
        }
    }
    xhr.send(option.data);
}