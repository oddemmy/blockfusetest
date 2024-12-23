function longestCommonPrefix(strs) {
    if (!strs.length)
         return "";
        let prefix = strs[0]
        for (let i=1; i< strs.length; i++)
         {
            while( strs[i].indexOf(prefix) !==0){
                prefix=prefix.slice(0,-1);
                if (!prefix) return "";
            }
    }
    return prefix;
}


// question 2

const WebSocket= require ("ws");
const eventStore= [];
const wss= new WebSocket.Server({ port: 8080})
// to listen to messages from the client 
wss.on("connection", (ws)=> {
    try{
        const event= JSON.parse(message);

        const validEvents= ["messageReceived", "dataUpdated","errorOccurred"];
        if(!validEvents.includes(event.type)){
            ws.send(JSON.stringify({ status: "error", message: "Invalid event type"}));
            return;
        }

        // to store the event in memory
        const storedEvent = { type: event.type, data: event.data, timestamp: new Date ()};
        eventStore.push(storedEvent);

        // display a susccess respons to the client
        ws.send(JSON.stringify({ status:"success", message: "Event stored successfully"}));
    }
    catch(error){
        ws.send(JSON.stringify({status: "error", message: "Invalid data format"}));
    }
}
);

// to notify when a client disconnects
ws.on("close", ()=>{
    console.log("Client disconnected");
    
});

console.log("WebSocket server is running on ws://localhost:8000");




// third question


