<!doctype html>
<html>
  <head>
  <title>Youtube2</title>
  <link rel="stylesheet" href="index.css">
  
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  </head>
  <body>
    
    
    
    <!--Aqui comienza la caja de subir link de Youtube-->
    
    <div class='caja-subir-link-youtube'>
                        
        <div id="title"><h1>Youtube</h1></div>

        <div id='span-input-youtube'>
            <span>Link:</span> 
            <input type="text" id='label-icono-youtube' placeholder='Ej: https://youtu.be/5zDoyO2HCRY' value=''>
            <button type='button' id='deleteText'> X </button>
        </div> 

        <div id='message'></div>
        <div id='history'><div id='history_videos'></div></div>
        
        <div id='logo-youtube'>
            <label for='label-icono-youtube'></label>
        </div>
              
    </div>

    
    <!--Aqui termina la caja de subir link de Youtube-->
    
    <div id='container-youtube'></div>

    <div id='caja-youtube-realtime'>
              
    <script src="index.js"></script>

</body>
</html>

