//simulate start
function simulate(element, eventName)
{
    //http://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript
    //How to use:
    //simulate(document.getElementById("btn"), "click");
    //OR
    //simulate(document.getElementById("btn"), "click", { pointerX: 123, pointerY: 321 });
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}
//simlate end

//getCount start
window.getCount = function(parent){
    //http://stackoverflow.com/questions/12237529/count-how-many-elements-in-a-div
    //How to use:
    //getCount(document.getElementById('masterTemplate'));
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for(var i=0; i < children; i++){
        if(parent.childNodes[i].nodeType != 3){
            relevantChildren++;
        }
    }
    return relevantChildren;
}
//getCount end


//get the total number of video
var totalVideoNumber = getCount(document.getElementById('masterTemplate'));

setTimeout(function() {
    for (var i=0;i<totalVideoNumber;i++)
    {        
        uploadid = document.getElementById("template-upload_"+i);
        //filename
        fileName = uploadid.getElementsByClassName("fileName")[0].innerHTML;
        uploadid.getElementsByClassName("uploadInputTitle titleTmplField instField")[0].value = fileName;   
        
        //Privacy Settings
        document.getElementById('dropDownTitle_1_'+i).innerHTML = "Private";
        //Choose a Production
        document.getElementById('dropDownTitle_2_'+i).innerHTML = "Homemade";

        //Category click
        simulate(document.getElementById("categoryId_93_"+i), "click");//feet
        simulate(document.getElementById("categoryId_18_"+i), "click");//fetish
        simulate(document.getElementById("categoryId_37_"+i), "click");//teen

        //Save button
        simulate(document.getElementById("uploaderSaveButton_"+i), "click");
    }
}, 1000);