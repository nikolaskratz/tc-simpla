const AddBtn4 = document.querySelector('#Add4')
const GoBtn = document.querySelector('#Go')

GoBtn.addEventListener('click', () => {
        window.open("Select_Box.html", "_self")
    
})

// document.querySelector('#Add4').addEventListener('click', addToList);
    
        


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

const tenFt = document.querySelector('#tenFt')

tenFt.addEventListener('click', () => {
    document.getElementById('tenFt').style.background = "rgba(85, 145, 197, 1)"

})

const twentyFt = document.querySelector('#twentyFt')

twentyFt.addEventListener('click', () => {
    document.getElementById('twentyFt').style.background = "rgba(85, 145, 197, 1)"

})

const fortyFt = document.querySelector('#fortyFt')

fortyFt.addEventListener('click', () => {
    document.getElementById('fortyFt').style.background = "rgba(85, 145, 197, 1)"

})