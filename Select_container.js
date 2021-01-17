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

function addTolist(item, quantity){
    Selected_items.push({
        key: item,
        value: quantity,
    })
}

function printList(){
    var Selected_items = {"Palette1": 1, "Box": 2};
    console.log(Selected_items);
    
    
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