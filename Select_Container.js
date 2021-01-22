const AddBtn4 = document.querySelector('#Add4')
const GoBtn = document.querySelector('#Go')

GoBtn.addEventListener('click', () => {
        window.open("Select_Box.html", "_self")
    
})

document.querySelector('#Add4').addEventListener('click', addToList);
    
        


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