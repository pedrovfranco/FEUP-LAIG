function getPrologRequest(requestString, onSucess, port)
{
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, false);

    onSucess = onSucess || getResponse;

    request.onload = function(data)
    {
        if (data != null && data != undefined)
        {
            if (data.target.response == "error")
                console.error("Prolog error");
            else
                this.returnVar = onSucess(data.target.response);
        } 
    };

    request.onerror = function()
    {
        console.error("Error waiting for response");
    };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
    
    let data = request.returnVar;
    return data;
}

function makeRequest(requestString)
{    
    return getPrologRequest(requestString);
}

function getResponse(responseText)
{
    return responseText;
}


function getResponseArray(responseText)
{
    return JSON.parse(fixList(responseText));
}

function fixList(input)
{
    let ret = "";
    for (let i = 0; i < input.length; i++)
    {
        if ( (input[i] >= 'a' && input[i] <= 'z') || (input[i] >= 'A' && input[i] <= 'Z') )
        {
            ret += "\"";
            ret += input[i];
            ret += "\"";
        }
        else
        {
            ret += input[i];
        }
    }

    return ret;
}