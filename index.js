$(document).ready(function(){

    let labelIconoYoutube=$('#label-icono-youtube');
    let cajaYoutube_father=$('#container-youtube');
    let message=$('#message span');
    let deleteText=$('#deleteText');
    let history_videos=$('#history_videos');
    var messageError=0
    const widthYoutube=$(window).width()-100;
    const heightYoutube=$(window).height()-200;
    const colorSecundary='var(--secundary-color)';

    $(document).on("copy", function(e){
        e.stopPropagation();
        e.preventDefault();
    });
      

    function forVideos(u){

        u = u === null || u === '' || u == null || u === [] ? false : u

        if(u===false){
            return false
        }

        var templateVideos= ''

     

        for (let i = 0; i < u.length; i++) {
            templateVideos+= `<iframe width=200 height=100  src='https://www.youtube.com/embed/${u[i]}' allowfullscreen>
            </iframe>
            `; 
        }

        return templateVideos
    }

    let StorageUrlsYoutube= JSON.parse(localStorage.getItem('url'))

    history_videos.html(forVideos(StorageUrlsYoutube))

    labelIconoYoutube.bind('paste',function(e){


        e.stopPropagation();
        e.preventDefault();
              
        var cd = e.originalEvent.clipboardData;
  
        var constTextPlain=cd.getData("text/plain");
              
        labelIconoYoutube.empty().val(constTextPlain);


        //Condiciones a entrada de url de Youtube .1

            var splitUrlYoutube=constTextPlain.split('/');

            let StorageUrlsYoutube= JSON.parse(localStorage.getItem('url'))
            history_videos.html(forVideos(StorageUrlsYoutube))

            if(splitUrlYoutube.length === 5 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[3] === 'shorts' && splitUrlYoutube[2] === 'www.youtube.com' || splitUrlYoutube[2] === 'youtube.com'){
                urlYoutube=splitUrlYoutube[4].split('?')[0];
        
                cajaYoutube_father.html(
                    `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${urlYoutube}' allowfullscreen>
                    </iframe></div>
                    `
                );
        
                message.html('Shorts').css('color',colorSecundary);

                messageError=1;
        
            }else if(splitUrlYoutube.length === 4 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[2] === 'www.youtube.com' || splitUrlYoutube[2] === 'youtube.com' ){//Copiado de la url de Google
                var splitWatchYoutube=splitUrlYoutube[3].split('=');
            
                
            
                if(splitWatchYoutube[0] === 'watch?v' && splitWatchYoutube.length === 2){
                    urlYoutube=splitWatchYoutube[1]
                    cajaYoutube_father.html(
                        `<iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${urlYoutube}' allowfullscreen>
                        </iframe>
                        `
                    );

        
                    $('#value-hdn').attr('value',splitWatchYoutube[1]);
                    message.html('Video').css('color',colorSecundary);

                    messageError=2.1;
        
                }else if(splitWatchYoutube[0] === 'watch?v' && splitWatchYoutube.length === 3){
        
                    typeSplitWatchYoutube=splitWatchYoutube[1].split('&');
        
                
        
                    if(typeSplitWatchYoutube.length ===2 && typeSplitWatchYoutube[1] === 'list'){//Lista de Yt
                        urlYoutube=splitWatchYoutube[2]
        
                        cajaYoutube_father.html(
                            `
                            <div id='caja-youtube-realtime'>
                            <iframe width=${widthYoutube} height=${heightYoutube} src="https://www.youtube.com/embed/videoseries?list=${urlYoutube}" 
                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe></div>
                        
                            `
                        );
                        message.html('Lista de reproducción').css('color',colorSecundary);

                        messageError=2.2,1;
        
                    }else if(typeSplitWatchYoutube.length ===2 && typeSplitWatchYoutube[1] === 'feature'){//De la misma página mia
                        

                        splitWatchYoutube= splitWatchYoutube[1].split('&');
                        urlYoutube=splitWatchYoutube[0]
                        cajaYoutube_father.html(
                            `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${urlYoutube}' allowfullscreen>
                            </iframe></div>
                        
                            `
                        );

                        message.html('Video').css('color',colorSecundary);

                        messageError=2.2,2;
                    }else if(typeSplitWatchYoutube.length ===2 && typeSplitWatchYoutube[1] === 't'){
                        
                        time=splitWatchYoutube[2].split('s')[0];
                        urlYoutube=splitWatchYoutube[1].split('&')[0];
                        cajaYoutube_father.html(
                            `<div id='caja-youtube-realtime'>
                            <iframe width=${widthYoutube} height=${heightYoutube} src="https://www.youtube.com/embed/${urlYoutube}?start=${time}" 
                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        
                            `
                        );

                        message.html('Video').css('color',colorSecundary);
                        messageError=2.2,3;
                    }
        
                    
                
                }else if(splitWatchYoutube[0] === 'playlist?list' && splitWatchYoutube.length === 2){
        
                    urlYoutube=splitWatchYoutube[1]
                    cajaYoutube_father.html(
                        `
                        <div id='caja-youtube-realtime'>
                        <iframe width=${widthYoutube} height=${heightYoutube} src="https://www.youtube.com/embed/videoseries?list=${urlYoutube}" 
                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe></div>
                    
                        `
                    );

                    message.html('Lista de reproducción').css('color',colorSecundary);
                    messageError=2.3;
                }else{//Si no escribe nada, dejalo vacio
                    $('#caja-youtube-realtime').remove();
                    $('#value-hdn').attr('value','');
                    message.html('No video').css('color',colorSecundary);
                    messageError=2.4;
                
                }
        
            
        
            }else if(splitUrlYoutube.length === 4 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[2] === 'youtu.be' ){//Del boton de Yt de compartir
                urlYoutube=splitUrlYoutube[3]
                cajaYoutube_father.html(
                    `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${urlYoutube}' allowfullscreen>
                    </iframe></div>
                    `
                );

                $('#value-hdn').attr('value',splitUrlYoutube[3]);
                message.html('Lista de reproducción');
                messageError=3;
            }else{
                
                $('#caja-youtube-realtime').remove();
                $('#value-hdn').attr('value','');
                message.html('Hay un error').css('color','red');

                urlYoutube=undefined
            
            }

        //---------------- Fin .1 -----------------------

        if(urlYoutube === undefined){ //Si hay un error en la url, no sigue la secuencia
            return false;
        }

        var localUrl=localStorage.getItem('url')
        var url
        url = localUrl === null || localUrl === '' || localUrl == null || localUrl === [] ? [] : localUrl

        url= Array.isArray(url) ? url : JSON.parse(url)

        const indexLocalUrl = url.indexOf(urlYoutube)

        if(indexLocalUrl >= 0){// Si el index es superior o igual a 0 es porque se encontró coincidencias.
            url.splice(indexLocalUrl, 1);
        }

        url.unshift(urlYoutube)

        if(url.length>5){// Si supera el tope de guardado, elimina a partir de la última fila
           url.pop()
           url= JSON.stringify(url)
        }else{
           url= JSON.stringify(url)
        }
        
        localStorage.setItem('url',url) //Guardamos en el localstorage el array de los codigos para embed Youtube
        
       
    })

    
    

 


    //localStorage.removeItem('url');



    
    deleteText.click(function(){
        labelIconoYoutube.val('').focus();
    });
    
});
    
    
    