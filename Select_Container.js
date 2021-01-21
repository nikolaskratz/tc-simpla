const AddBtn4 = document.querySelector('#Add4')

const GoBtn = document.querySelector('#Go')

GoBtn.addEventListener('click', () => {
        window.open("Select_Box.html", "_self")
    
})
/*
AddBtn4.addEventListener('click', () => {
    addTolist("Palette", 1)
})*/

let Selected_items = {"Palette1": 1, "Box": 2};

function addToDict(item, quantity){
    Selected_items.push({
        key: item,
        value: quantity,
    })
}


document.querySelector('#Add4').addEventListener('click', addToList);
    function printList(){
        var list= []
        var Selected_items = {
            "Palette1": 1, 
            "Box": 2
        };

        document.querySelector("output2").textContent(Selected_items) ;
        
        
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

const div = document.querySelector('box2')