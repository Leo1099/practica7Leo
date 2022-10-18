const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const GET_CACHE_NAME = 'get-cache-v1.1';

self.addEventListener('install',(event)=>{
    console.log('SW: Instalado');

    const promiseCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(
            [
                './',
                './index.html',
                './js/app.js'
            ]
        );
    })

  
    const promiseCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll(
            [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
                'https://ichef.bbci.co.uk/news/640/cpsprodpb/870D/production/_111437543_197389d9-800f-4763-8654-aa30c04220e4.png',
                'https://st.mextudia.com/wp-content/uploads/2016/09/Cursos-en-l%C3%ADnea-1.jpg',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
            ]
        );
    })

    event.waitUntil(Promise.all([promiseCache,promiseCacheInmutable]));

    

});


self.addEventListener('fetch',(event)=>{

    const respCache = caches.match(event.request)

    event.respondWith(respCache);
});



