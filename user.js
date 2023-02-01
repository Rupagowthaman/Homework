
class myglitz{
    id;
    firstname;
    text;
    postedOn;

    constructor(data){
        this.id = data.id;
        this.firstname = data.firstname;
        this.text = data.text;
        this.postedOn = new Date(data.postedOn).toLocaleDateString() +" "+new Date(data.postedOn).toLocaleTimeString();
    }  
    
}

function repeatcard(glitz){
    console.log(glitz.firstname)
    console.log(glitz.text)
    console.log(glitz.postedOn)
    return `

        <div class="uk-container">
                
            <div class="uk-card uk-card-default uk-width-1-3@m text-align:center" style="margin-left:auto; margin-right:auto; margin-bottom: 30px;">
                <div class="uk-card-header" >
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <img class="uk-border-circle" width="40" height="30" src="https://i.pravatar.cc/40" alt="Avatar">                        
                        </div>
                    <div class="uk-width-expand">
                        <h3 class="uk-card-title uk-margin-remove-bottom">${glitz.firstname}</h3>
                        <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">${glitz.postedOn}</time></p>
                    </div>
                    </div>
                </div>
                <div class="uk-card-body">
                    <p>${glitz.text}</p>
                </div>
                <div class="uk-card-footer">
                    <a href="#" class="uk-button uk-button-text">Read more..</a>
                </div>
            </div>
        <div>`
}

function displayGlitts(glitts) {
    document.getElementById("gl-card-container").innerHTML = null

    glitts
        .map(glitz => repeatcard(glitz))
        .forEach(glitz => document.getElementById("gl-card-container").innerHTML += glitz)

}
function saveGlitt() {
    const glittText = document.getElementById("gl-glitt-text").value;
    const glittName = document.getElementById("g1-glitt-firstname").value;
    console.log(glittName)
    console.log(glittText)
    postGlittToBackend(glittName, glittText)
}

function resetForm() {
    document.getElementById("g1-glitt-firstname").value=null;
    document.getElementById("gl-glitt-text").value = null;
    
}

function hideModal() {
    const modalElement = document.getElementById("gl-create-glitt-modal")
    UIkit.modal(modalElement).hide();
}


function getglitzFromBackend(){    
    fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then (json => {
            const glitts = json.map(glitz => new myglitz(glitz))
            displayGlitts(glitts)})
        .catch(error => console.log(error))
                   
 }
 function postGlittToBackend(glittName, glittText) {
    var fetchConfig = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            firstname : glittName,
            text: glittText,
            postedOn: new Date()
            
        })
        
    }

    fetch("http://localhost:3000/users", fetchConfig)
        .then(res => {
            if (res.status === 201) {
                UIkit.notification({
                    message: "Glitt created!",
                    status: "success",
                    pos: "bottom-center",
                    timeout: 3_000
                });
                resetForm()
                getglitzFromBackend()
                hideModal()
            }
        })
}
getglitzFromBackend();
