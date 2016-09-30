var isType = function(type){
    var typestr = "[object " + type + "]";
    return function(obj){
       return Object.prototype.toString.call(obj) === typestr;
    };
};

var isString = isType("String"),
    isArray  = isType("Array");

var render = function(arr){
   if(isString(arr)){
     return document.createTextNode(arr);
   }
   arr = arr.slice();
   var tagname     = arr.shift();
   var attrs      = [].concat.call([], arr.filter((x) => !isString(x) && !isArray(x))); 
   var children    = arr.filter((x) => isString(x) || isArray(x));
   var el        = document.createElement(tagname);
   attrs.forEach( function(attr){
     Object.keys(attr).forEach(function(key){
       el.setAttribute(key, attr[key]); 
     });
   });
   children.forEach(function(ch){
       var e = render(ch);
       el.appendChild(e);
   });
   return el;
};
