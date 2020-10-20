  function myFunction() {
    document.getElementById("selectShape").disabled = true;
    if (nameValidationInput.value !== ''){
      document.getElementById("selectShape").disabled = false;
    }
  }


  document.getElementById("searchTxt").addEventListener("keyup", function() {
    var nameInput = document.getElementById('searchTxt').value;
    if (nameInput != "") {
      document.getElementById('selectShape').removeAttribute("disabled");
    } else {
      document.getElementById('selectShape').setAttribute("disabled", null);
    }
  });


  function refreshPage(){
    window.location.reload();
  } 


  var nameValidationInput = document.getElementById('searchTxt');
  var NameValue;
  function useValue() {
    NameValue = nameValidationInput.value.toUpperCase();
  }
  nameValidationInput.onchange = useValue;  




  const pickr = Pickr.create({
    el: '.color-picker',
        theme: 'nano', // or 'monolith', or 'nano'
        comparison: false,
        showAlways: false,
        default: 'rgba(233, 30, 99, 0.95)',
        swatches: [
        'rgba(233, 30, 99, 0.95)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)'
        ],

        components: {
        // Main components
          preview: true,
          opacity: true,
          hue: true,

        // Input / output Options
          interaction: {
            hex: false,
            rgba: true,
            input: false,
            clear: false,
            save: false
            }
          }
          });


  let colorPckr;

    // getting rgba value for selected color from pickr 

  pickr.on('change', (...args) => {
    colorPckr = args[0].toRGBA().toString();
  });

  let shapeItem;


  let width = window.innerWidth;
  let height = window.innerHeight/3;

  let stage = new Konva.Stage({
    container: 'contain',
    width: width,
    height: height,
  });

  let layer = new Konva.Layer();
  stage.add(layer);



    // creating shapes, text node and adding over layer/stage based on selected option

  let currentShape;
  
  selectShape.addEventListener("change", function() {

      if(document.getElementById("Rect").selected)
          {
            let shapeItem = new Konva.Group({
            x: 30, 
            y: 25, 
            width: 100,
            height: 50,
            draggable: true,
          }); 

            shapeItem.add(new Konva.Rect({
            width: 100,
            height: 40,
            stroke: 'white',
            shadowBlur: 5,
            cornerRadius: 5,
            fill: colorPckr
          }));

            shapeItem.add(new Konva.Text({
            text:NameValue,
            x: 5, 
            y: 5,
            fontSize: 14,
            fontFamily: 'Lato',
            fill: '#000',
            width: 90,
            padding: 5,
            align: 'center'
          }));

           layer.add(shapeItem);
           layer.draw();
         }


      if(document.getElementById("Cir").selected)
        {
            let shapeItem = new Konva.Group({
            x: 220,
            y: 60,
            radius: 50,
            draggable: true,
          }); 

            shapeItem.add(new Konva.Circle({
            radius: 50,
            fill: colorPckr,
            stroke: 'white',
            shadowBlur: 5,
            strokeWidth: 4,
          }));

            shapeItem.add(new Konva.Text({
            text:NameValue,
            fontSize: 14,
            fontFamily: 'Lato',
            x: -40, 
            y: -15,
            fill: '#000',
            width: 90,
            padding: 5,
            align: 'center'
          }));

          layer.add(shapeItem);
          layer.draw();
        }



        if(document.getElementById("Sqr").selected)
          {
            let shapeItem = new Konva.Group({
            x: 80,
            y: 125,
            width: 100,
            height: 50,
            draggable: true,
          }); 

            shapeItem.add(new Konva.Rect({
            width: 100,
            height: 100,
            fill: colorPckr,
            stroke: 'white',
            shadowBlur: 5,
            cornerRadius: 5,
          }));

            shapeItem.add(new Konva.Text({
            text:NameValue,
            fontSize: 14,
            fontFamily: 'Lato',
            fill: '#000',
            x: 30, 
            y: 35,
            padding: 5,
            align: 'center'
          }));

          layer.add(shapeItem);
          layer.draw();
        }



      if(document.getElementById("Tri").selected)
        {
          let shapeItem = new Konva.Group({
          x: 300,
          y: 165,
          sides: 3,
          radius: 80,
          draggable: true,
        }); 

          shapeItem.add(new Konva.RegularPolygon({
          sides: 3,
          radius: 80,
          fill: colorPckr,
          stroke: 'white',
          shadowBlur: 5,
          cornerRadius: 5,
        }));

          shapeItem.add(new Konva.Text({
          text:NameValue,
          fontSize: 14,
          fontFamily: 'Lato',
          fill: '#000',
          x: -15, 
          y: -13,
          padding: 5,
          align: 'center'
        }));

         layer.add(shapeItem);
         layer.draw();
       }
  });


      // logic for the delete button on clicking the shape

    let deleteIconNode = document.getElementById('menu');
        document.getElementById('delete-button').addEventListener('click', () => {
            currentShape.destroy();
            console.log('destroyed!');
            layer.draw();
          });

          window.addEventListener('click', () => {
              // hide menu
            deleteIconNode.style.display = 'none';
          });

          stage.on('contextmenu', function (e) {
            // prevent default behavior
            e.evt.preventDefault();
            if (e.target === stage) {
                // if canvas is empty
                  return;
                }
          
            currentShape = e.target;
            // show destroy icon
            deleteIconNode.style.display = 'initial';
            var containerRect = stage.container().getBoundingClientRect();
            deleteIconNode.style.top =
            containerRect.top + stage.getPointerPosition().y + 4 + 'px';
            deleteIconNode.style.left =
            containerRect.left + stage.getPointerPosition().x + 4 + 'px';

});