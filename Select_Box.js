const AddBtn4 = document.querySelector('#Add4')

const GoBtn = document.querySelector('#Go')

GoBtn.addEventListener('click', () => {
        window.open("3d_container.html", "_self")
    
})
/*
AddBtn4.addEventListener('click', () => {
    addTolist("Palette", 1)
})*/

let Selected_items = {"Palette1": 1, "Box": 2};


document.querySelector('#Add4').addEventListener('click', addToList);
document.querySelector('#AddPalette').addEventListener('click', addToList);
document.querySelector('#AddGitterbox').addEventListener('click', addToList);
document.querySelector('#AddCustom').addEventListener('click', addToList);

 

function addToList() {
    var arg = this.id;
    let package = document.getElementById(arg).className;
    let amount = 1;
    
    let li = document.createElement("li");
    li.textContent = amount + 'x ' + package ;
    document.getElementById("List").appendChild(li);
    }
      

document.querySelector('#berechnen').addEventListener('click', berechne_Volumen);
 
  function berechne_Volumen () {
	var Height = parseInt(document.getElementById("Height").value),
        Width = parseInt(document.getElementById("Width").value),
        Depth = parseInt(document.getElementById("Depth").value),
	    Volume = Math.round(Height*Width*Depth);
				
	document.querySelector("output").textContent = Volume ;
  }

/*document.querySelector('.results').innerHTML = 'Hello World!';
*/