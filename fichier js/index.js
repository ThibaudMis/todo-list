if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration =>{
        console.log("serWorker fonctionne mais pas consol log");
    }).catch(error =>{console.log("error serWorker");});
}