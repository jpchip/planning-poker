import * as signalR from "@microsoft/signalr";

export class Poker {

    public connection: signalR.HubConnection;

    public username = new Date().getTime();

    public divMessages: HTMLDivElement = document.querySelector("#divMessages");
    public tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
    public btnSend: HTMLButtonElement = document.querySelector("#btnSend");

    constructor() {
        this.init();
    }

    init() {
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub")
        .build();
        const username = new Date().getTime();

        this.tbMessage.addEventListener("keyup", this.onKeyup);      
        this.btnSend.addEventListener("click", this.send);

        this.connection.on("messageReceived", this.messageReceived);
        
        this.connection.start().catch(err => document.write(err));
    }

    /**
     * name
     */
    public messageReceived(username: string, message: string) {
        let m = document.createElement("div");
        
            m.innerHTML =
                `<div class="message-author">${username}</div><div>${message}</div>`;
        
            this.divMessages.appendChild(m);
            this.divMessages.scrollTop = this.divMessages.scrollHeight;
    }

    onKeyup(e: KeyboardEvent) {
        if (e.key === "Enter") {
            this.send();
        }
    }

    send() {
        this.connection.send("newMessage", this.username, this.tbMessage.value)
        .then(() => this.tbMessage.value = "");
    }
}