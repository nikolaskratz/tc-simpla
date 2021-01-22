const AddBtn4 = document.querySelector('#Add4')

const GoBtn = document.querySelector('#Go')

GoBtn.addEventListener('click', () => {
        window.open("3d_container.html", "_self")
    
})
/*
AddBtn4.addEventListener('click', () => {
    addTolist("Palette", 1)
})*/

// let Selected_items = {"Palette1": 1, "Box": 2};


// document.querySelector('#Add4').addEventListener('click', addToList);
// document.querySelector('#AddPalette').addEventListener('click', addToList);
// document.querySelector('#AddGitterbox').addEventListener('click', addToList);
// document.querySelector('#AddCustom').addEventListener('click', addToList);

 

// function addToList() {
//     var arg = this.id;
//     let package = document.getElementById(arg).className;
//     let amount = 1;
    
//     let li = document.createElement("li");
//     li.textContent = amount + 'x ' + package ;
//     document.getElementById("List").appendChild(li);
//     }
      

// document.querySelector('#berechnen').addEventListener('click', berechne_Volumen);
 
//   function berechne_Volumen () {
// 	var Height = parseInt(document.getElementById("Height").value),
//         Width = parseInt(document.getElementById("Width").value),
//         Depth = parseInt(document.getElementById("Depth").value),
// 	    Volume = Math.round(Height*Width*Depth);
				
// 	document.querySelector("output").textContent = Volume ;
//   }

/*document.querySelector('.results').innerHTML = 'Hello World!';
*/

//-----------------------------------------------------------------------
//Niko Versuch
//-----------------------------------------------------------------------

const add_custom = document.querySelector('#AddCustom')
const add_Gitterbox = document.querySelector('#AddGitterbox')
const add_Palette = document.querySelector('#AddPalette')
const add_box4 = document.querySelector('#Add4')
var table = document.getElementById("table_selected");

//hardcoded Reihenfolge: custom, gitter, Palette, no4
var selected_packages = [0, 0, 0, 0]

add_custom.addEventListener('click', () => {
  updateTable(0)
})

add_Gitterbox.addEventListener('click', () => {
  console.log('Gitter clicked')
  updateTable(1)
})

add_Palette.addEventListener('click', () => {
  updateTable(2)
})

add_box4.addEventListener('click', () => {
  updateTable(3)
})

function updateTable (input) {
  switch(input) {
    case 0:
      if(selected_packages[input]==0) {
        addNewRow(input)
        selected_packages[input]=1
      } else {
        selected_packages[input] += 1
        document.getElementById(input).innerHTML = selected_packages[input]
      }
      break
    case 1:
      if(selected_packages[input]==0) {
        addNewRow(input)
        selected_packages[input]=1
      } else {
        selected_packages[input] += 1
        document.getElementById(input).innerHTML = selected_packages[input]
      }
      break
    case 2: 
      if(selected_packages[input]==0) {
        addNewRow(input)
        selected_packages[input]=1
      } else {
        selected_packages[input] += 1
        document.getElementById(input).innerHTML = selected_packages[input]
      }
      break
    case 3:
       if(selected_packages[input]==0) {
         addNewRow(input)
         selected_packages[input]=1
       } else {
         selected_packages[input] += 1
         document.getElementById(input).innerHTML = selected_packages[input]
       }
       break
  }

  
}

function addNewRow (input) {
  
  var row = table.insertRow(0)
  var cell1 = row.insertCell(0)
  var cell2 = row.insertCell(1)

  switch(input){
    case 0:
      cell1.innerHTML = "Custom"
      cell2.id = input
      break
    case 1:
      cell1.innerHTML = "Gitterbox"
      cell2.id = input
      break
    case 2:
      cell1.innerHTML = "Palette"
      cell2.id = input
      break
    case 3:
      cell1.innerHTML = "Box4"
      cell2.id = input
      break

  }

  cell2.innerHTML = "1"
}
