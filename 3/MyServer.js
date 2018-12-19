async function getPrologRequest(requestString, onSucess, port)
{
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

    onSucess =  getResponse() || onSucess;

    request.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            onSucess();
        }
        else
        {
            console.log("Error!");
        }
    };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
    
    let data = await request.onreadystatechange;
    return data;
}

function makeRequest(requestString)
{    
    // Make Request
    return getPrologRequest(requestString);
}

function getInitialBoard()
{
    let response = getPrologRequest("kl", getResponseArray);

    return response;
}

function getResponse()
{
    return this.responseText;
}


function getResponseArray()
{
    return JSON.parse(fixList(this.returnText));
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