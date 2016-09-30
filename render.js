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
       var extract     = [];
       tagname = tagname.replace(/[.#]([^.#\s]+)/g, function(word){
           extract.push(word);
           return "";
       });
       var attrs       = [].concat.call([], arr.filter((x) => !isString(x) && !isArray(x))); 
       var children    = arr.filter((x) => isString(x) || isArray(x));
       var el          = document.createElement(tagname);
       extract.forEach(function(e){
           if(e[0] == "#") el.setAttribute("id", e.substr(1));
           else if(e[0] == ".") el.classList.add(e.substr(1));
       });
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
