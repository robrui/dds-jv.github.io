(function ($) {
    "use strict";
    $(document).ready(function(){
        $.ajax({
            url: 'sitemap.xml',
            type: 'GET',
            dataType:'html'
        }).done(function(document) {    
            var documentParsed = $.parseHTML(document);
            var nodosHijos = Array.from(documentParsed[2].childNodes)
                .filter(doc => doc.nodeName !== "#text")
                .map(doc => {
                    return {
                        nombre: doc.childNodes[1].innerText,
                        ruta: doc.childNodes[3].innerText.split("/").filter(route => route && route.length),
                        orden: doc.childNodes[5].innerText ? parseInt(doc.childNodes[5].innerText) : 0,
                        hijos: []
                    }
                })
                .sort(doc => doc.ruta);

            var maximoNivel = 0;
            nodosHijos.forEach(doc => {
                maximoNivel = doc.ruta && (doc.ruta.length > maximoNivel) ? doc.ruta.length : maximoNivel;
            });

            for (var i = 1; i <= maximoNivel; i++) {
                var tagsPrincipales = nodosHijos.filter(doc => doc.ruta && doc.ruta.length === i);

                //tagsPrincipales.forEach(function(tagPrincipal) {
                //    
                //});

                console.log(tagsPrincipales);
            }

            //console.log(nodosHijos);
        });

        $(".post-article-image").click(function() {
            if ($(".post-viewmore").is(":visible")) {
                $('html, body').animate({ scrollTop: $(window).height() }, 250);
            }
        });
    });
}(jQuery));
