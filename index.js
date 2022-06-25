$(document).ready(function(){

    let labelIconoYoutube=$('#label-icono-youtube');
    let cajaYoutube_father=$('#container-youtube');
    let message=$('#message span');
    let deleteText=$('#deleteText');
    const widthYoutube=$(window).width()-20;
    const heightYoutube=$(window).height()-30;
    const colorSecundary='var(--secundary-color)';


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
    
        if(splitUrlYoutube.length === 5 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[3] === 'shorts' && splitUrlYoutube[2] === 'www.youtube.com' || splitUrlYoutube[2] === 'youtube.com'){
            urlYoutube=splitUrlYoutube[4].split('?')[0];
    
            cajaYoutube_father.html(
                `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${urlYoutube}' allowfullscreen>
                </iframe></div>
                `
            );
    
            message.html('Shorts').css('color',colorSecundary);

            console.log('1');
    
        }else if(splitUrlYoutube.length === 4 && splitUrlYoutube[0] === 'https:' && splitUrlYoutube[1] === '' && splitUrlYoutube[2] === 'www.youtube.com' || splitUrlYoutube[2] === 'youtube.com' ){//Copiado de la url de Google
            var splitWatchYoutube=splitUrlYoutube[3].split('=');
           
            
           
            if(splitWatchYoutube[0] === 'watch?v' && splitWatchYoutube.length === 2){
                urlYoutube=splitWatchYoutube[1]
                cajaYoutube_father.html(
                    `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${urlYoutube}' allowfullscreen>
                    </iframe></div>
                    `
                );

    
                $('#value-hdn').attr('value',splitWatchYoutube[1]);
                message.html('Video').css('color',colorSecundary);

                console.log('2.1');
    
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

                    console.log('2.2.1');
    
                }else if(typeSplitWatchYoutube.length ===2 && typeSplitWatchYoutube[1] === 'feature'){//De la misma página mia
                    

                    splitWatchYoutube= splitWatchYoutube[1].split('&');
                    urlYoutube=splitWatchYoutube[0]
                    cajaYoutube_father.html(
                        `<div id='caja-youtube-realtime'><iframe width=${widthYoutube} height=${heightYoutube}  src='https://www.youtube.com/embed/${urlYoutube}' allowfullscreen>
                        </iframe></div>
                       
                        `
                    );

                    message.html('Video').css('color',colorSecundary);

                    console.log('2.2.2');
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
                    console.log('2.2.3');
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
                console.log('2.3');
            }else{//Si no escribe nada, dejalo vacio
                $('#caja-youtube-realtime').remove();
                $('#value-hdn').attr('value','');
                message.html('No video').css('color',colorSecundary);
                console.log('2.4');
               
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
            console.log('3');
        }else{
            
            $('#caja-youtube-realtime').remove();
            $('#value-hdn').attr('value','');
            message.html('Hay un error').css('color','red');

            console.log('4');
           
        }


        var localUrl=localStorage.getItem('url')
        localUrl = localUrl === null || localUrl === undefined || localUrl === '' || localUrl == null || localUrl === [] ? [] : localUrl

        localUrl= Array.isArray(localUrl) ? localUrl : JSON.parse(localUrl)

        localUrl.push(urlYoutube);

        
        localStorage.setItem('url',JSON.stringify(localUrl))

       

        

       
    
    });

    console.log(localStorage.getItem('url'));

    // localStorage.removeItem('url');

    //https://www.youtube.com/watch?v=kSIG5WDifvU

 
    
    // const text = '[ "Ford" ]';
    // const myArr = JSON.parse(text);

    // console.log(myArr);
    

    
    deleteText.click(function(){
        labelIconoYoutube.val('');
    });
    
});
    
    
    