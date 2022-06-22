$(document).ready(function(){

    let labelIconoYoutube=$('#label-icono-youtube');
    let cajaYoutube_father=$('#container-youtube');
    let message=$('#message span');
    let deleteText=$('#deleteText');
    const widthYoutube=$(window).width()-20;
    const heightYoutube=$(window).height()-30;
    const colorSecundary='var(--secundary-color)';

    // var jsonUrl=JSON.parse(labelIconoYoutube) || [];
    var objTextUrl = !jQuery.isEmptyObject({}) ? jQuery.parseJSON('['+'"'+labelIconoYoutube+'"'+']') : [];

    var prue=jQuery.parseJSON('[]')

    prue.push('3')
    console.log(prue);

    

    //localStorage.removeItem('url');

    function urlStorage(url){

        console.log(objTextUrl);
        objTextUrl.push(url);
        localStorage.setItem('url', JSON.stringify(objTextUrl));
    
    }

    $(document).on("copy", function(e){
        e.stopPropagation();
        e.preventDefault();
    });
      
      

    labelIconoYoutube.bind('paste',function(e){


        e.stopPropagation();
        e.preventDefault();
              
        var cd = e.originalEvent.clipboardData;
  
        var constTextPlain=cd.getData("text/plain");
              
        labelIconoYoutube.empty().val(constTextPlain);


        var splitUrlYoutube=constTextPlain.split('/');

        //var splitUrlYoutube=labelIconoYoutube.val().split('/');
    
        if(splitUrlYoutube.length === 5 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[3] === 'shorts' && splitUrlYoutube[2] === 'www.youtube.com' || splitUrlYoutube[2] === 'youtube.com'){
            shareOrNot=splitUrlYoutube[4].split('?');
    
            cajaYoutube_father.html(
                `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${shareOrNot[0]}' allowfullscreen>
                </iframe></div>
                `
            );

            urlStorage(shareOrNot[0])
    
            message.html('Shorts').css('color',colorSecundary);

            console.log('1');
    
        }else if(splitUrlYoutube.length === 4 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[2] === 'www.youtube.com' || splitUrlYoutube[2] === 'youtube.com' ){//Copiado de la url de Google
            var splitWatchYoutube=splitUrlYoutube[3].split('=');
           
            
           
            if(splitWatchYoutube[0] === 'watch?v' && splitWatchYoutube.length === 2){
                cajaYoutube_father.html(
                    `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${splitWatchYoutube[1]}' allowfullscreen>
                    </iframe></div>
                    `
                );
                urlStorage(splitWatchYoutube[1])
    
                
    
                $('#value-hdn').attr('value',splitWatchYoutube[1]);
                message.html('Video').css('color',colorSecundary);

                console.log('2.1');
    
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

                    urlStorage(splitWatchYoutube[2])

                    message.html('Lista de reproducción').css('color',colorSecundary);

                    console.log('2.2.1');
    
                }else if(typeSplitWatchYoutube.length ===2 && typeSplitWatchYoutube[1] === 'feature'){//De la misma página mia
                    splitWatchYoutube= splitWatchYoutube[1].split('&');
                    cajaYoutube_father.html(
                        `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${splitWatchYoutube[0]}' allowfullscreen>
                        </iframe></div>
                       
                        `
                    );

                    urlStorage(splitWatchYoutube[0])

                    message.html('Video').css('color',colorSecundary);

                    console.log('2.2.2');
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

                    urlStorage(splitWatchYoutube)
                    message.html('Video').css('color',colorSecundary);
                    console.log('2.2.3');
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

                urlStorage(splitWatchYoutube[1])
                message.html('Lista de reproducción').css('color',colorSecundary);
                console.log('2.3');
            }else{//Si no escribe nada, dejalo vacio
                $('#caja-youtube-realtime').remove();
                $('#value-hdn').attr('value','');
                message.html('No video').css('color',colorSecundary);
                console.log('2.4');
               
            }
    
           
    
        }else if(splitUrlYoutube.length === 4 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[2] === 'youtu.be' ){//Del boton de Yt de compartir
           
            cajaYoutube_father.html(
                `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${splitUrlYoutube[3]}' allowfullscreen>
                </iframe></div>
                `
            );

            urlStorage(splitUrlYoutube[3])
    
            $('#value-hdn').attr('value',splitUrlYoutube[3]);
            message.html('Lista de reproducción');
            console.log('3');
        }else{
            
            $('#caja-youtube-realtime').remove();
            $('#value-hdn').attr('value','');
            message.html('Hay un error').css('color','red');

            console.log('4');
           
        }


        //console.log(localStorage.getItem('url'));
    
    });

    

    
    deleteText.click(function(){
        labelIconoYoutube.val('');
    });
    
});
    
    
    