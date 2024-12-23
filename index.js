// Question 1: Longest Common Prefix
function longestCommonPrefix(strs) {
    if (strs.length === 0) {
        return "";
    }
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") {
                return "";
            }
        }
    }
    
    return prefix;
}

// Question 2: WebSocket Server
const WebSocket = require("ws");
const eventStore = [];
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        try {
            let event = JSON.parse(message);
            
            let validEvents = ["messageReceived", "dataUpdated", "errorOccurred"];
            
            if (validEvents.indexOf(event.type) === -1) {
                ws.send(JSON.stringify({ status: "error", message: "Invalid event type" }));
                return;
            }
            
            let storedEvent = {
                type: event.type,
                data: event.data,
                timestamp: new Date()
            };
            eventStore.push(storedEvent);
            
            ws.send(JSON.stringify({ status: "success", message: "Event stored successfully" }));
        } catch (e) {
            ws.send(JSON.stringify({ status: "error", message: "Invalid data format" }));
        }
    });
    
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server running on ws://localhost:8080");
