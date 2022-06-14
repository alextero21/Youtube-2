$(document).ready(function(){

let labelIconoYoutube=$('#label-icono-youtube');
let cajaYoutube_father=$('#container-youtube');
let message=$('#message span');
let deleteText=$('#deleteText');

labelIconoYoutube.keyup(function(){
    var splitUrlYoutube=labelIconoYoutube.val().split('/');


    const widthYoutube='1000';
    const heightYoutube='800';
    const colorSecundary='var(--secundary-color)';
   


    if(splitUrlYoutube.length === 4 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[2] === 'www.youtube.com' || splitUrlYoutube[2] === 'youtube.com' ){//Copiado de la url de Google
        var splitWatchYoutube=splitUrlYoutube[3].split('=');
       
        
       
        if(splitWatchYoutube[0] === 'watch?v' && splitWatchYoutube.length === 2){
            cajaYoutube_father.html(
                `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${splitWatchYoutube[1]}' allowfullscreen>
                </iframe></div>
                `
            );

            

            $('#value-hdn').attr('value',splitWatchYoutube[1]);
            message.html('Video').css('color','var(--secundary-color)');

        }else if(splitWatchYoutube[0] === 'watch?v' && splitWatchYoutube.length === 3){

            typeSplitWatchYoutube=splitWatchYoutube[1].split('&');

           

            if(typeSplitWatchYoutube.length ===2 && typeSplitWatchYoutube[1] === 'list'){//Lista de Yt
                

                cajaYoutube_father.html(
                    `
                    <div id='caja-youtube-realtime'>
                    <iframe width=${widthYoutube} height=${heightYoutube} src="https://www.youtube.com/embed/videoseries?list=${splitWatchYoutube[2]}" 
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe></div>
                
                    `
                );
                message.html('Lista de reproducción').css('color',colorSecundary);

            }else if(typeSplitWatchYoutube.length ===2 && typeSplitWatchYoutube[1] === 'feature'){//De la misma página mia
                splitWatchYoutube= splitWatchYoutube[1].split('&');
                cajaYoutube_father.html(
                    `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${splitWatchYoutube[0]}' allowfullscreen>
                    </iframe></div>
                   
                    `
                );
                message.html('Video').css('color',colorSecundary);
            }else if(typeSplitWatchYoutube.length ===2 && typeSplitWatchYoutube[1] === 't'){
                time=splitWatchYoutube[2].split('s')[0];
                splitWatchYoutube=splitWatchYoutube[1].split('&')[0];
                cajaYoutube_father.html(
                    `<div id='caja-youtube-realtime'>
                    <iframe width=${widthYoutube} height=${heightYoutube} src="https://www.youtube.com/embed/${splitWatchYoutube}?start=${time}" 
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                   
                    `
                );
                message.html('Video').css('color',colorSecundary);
                
            }

            
          
        }else if(splitWatchYoutube[0] === 'playlist?list' && splitWatchYoutube.length === 2){

            cajaYoutube_father.html(
                `
                <div id='caja-youtube-realtime'>
                <iframe width=${widthYoutube} height=${heightYoutube} src="https://www.youtube.com/embed/videoseries?list=${splitWatchYoutube[1]}" 
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe></div>
            
                `
            );
            message.html('Lista de reproducción').css('color',colorSecundary);
            
        }else{//Si no escribe nada, dejalo vacio
            $('#caja-youtube-realtime').remove();
            $('#value-hdn').attr('value','');
            message.html('No video').css('color',colorSecundary);
           
        }

       

    }else if(splitUrlYoutube.length === 4 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[2] === 'youtu.be' ){//Del boton de Yt de compartir
       
        cajaYoutube_father.html(
            `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${splitUrlYoutube[3]}' allowfullscreen>
            </iframe></div>
            `
        );

        $('#value-hdn').attr('value',splitUrlYoutube[3]);
        message.html('Lista de reproducción');
    }else{
        
        $('#caja-youtube-realtime').remove();
        $('#value-hdn').attr('value','');
        message.html('Hay un error').css('color','red');
       
    }

    

    
});

deleteText.click(function(){
    labelIconoYoutube.val('');
});

});

//https://www.youtube.com/watch?v=5E87B3t9cnY&list=RDMM5E87B3t9cnY&start_radio=1

//https://www.youtube.com/watch?v=D38d8SCtYqE&list=PLWtYZ2ejMVJlACGFXj4zpJ8cWdSjF05tm

//https://youtube.com/playlist?list=PLAlO4ySYAMajrLo4kBDs6x5sdMmLe-uut

//https://www.youtube.com/watch?v=t-njAuS7eTQ

//https://www.youtube.com/watch?v=KYKowQrGzAY&feature=emb_rel_end

//https://www.youtube.com/watch?v=DqpL5UtJHus&t=2260s




/*
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLWtYZ2ejMVJlACGFXj4zpJ8cWdSjF05tm" 

title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>


*/


/*

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLAlO4ySYAMajrLo4kBDs6x5sdMmLe-uut" 

title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

*/


/* <iframe width="560" height="315" src="https://www.youtube.com/embed/DqpL5UtJHus?start=2260" 
title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */




