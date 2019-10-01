function addClass(el, className){

    function _addClass(el, className){
        let _classes = el.getAttribute('class'),
            _classesArray = _classes.split(' '),
            _newClasses = null;
        if(_classesArray.indexOf(className) == -1){
            _classesArray.push(className);
        }
        _newClasses = _classesArray.join(' ');
        el.setAttribute('class', _newClasses);
    }

    if(el instanceof Array){
       el.forEach(function(one){
           _addClass(one, className);
       });
    }
    else{
        _addClass(el, className);
    }
    
}

function removeClass(el, className){
    function _removeClass(elem, classNames){
        let _classes = elem.className,
            _classesArray = _classes.split(' '),
            _newClasses = null;
        if(_classesArray.indexOf(classNames) != -1){
            _classesArray.splise(_classesArray.indexOf(classNames), 1);
        }
        _newClasses = _classesArray.join(' ');
        elem.className =  _newClasses;
    }

    if(el instanceof Array){
        el.forEach(function(one){
            _removeClass(one, className);
        });
    }
    else{
        _removeClass(el, className);
    }

}

function hasClass(el, className){
    let _classes = el.className,
        _classesArray = _classes.split(' '),
        _output = (_classesArray.indexOf(className) != -1);

    return _output;
}

