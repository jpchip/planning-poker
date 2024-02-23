import * as signalR from "@microsoft/signalr";

export class Poker {

    public groupName = '';

    public username = '';

    private connection: signalR.HubConnection | null = null;

    private static instance: Poker;

    private constructor() {
        this.init();
    }

    public static getInstance(): Poker {
        if (!Poker.instance) {
            Poker.instance = new Poker();
        }

        return Poker.instance;
    }

    init(): signalR.HubConnection {
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub")
        .withAutomaticReconnect()
        .build();

        this.connection.start().catch(err => document.write(err));
        return this.connection;
    }

    getConnection(): signalR.HubConnection {
        if (this.connection === null) {
            return this.init();
        }
        return this.connection;
    }

    addToGroup(userName: string, groupName: string) {
        this.username = userName;
        this.groupName = groupName;
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.send("addToGroup", this.username, this.groupName);
        }
    }

    removeFromGroup(userName: string, groupName: string) {
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.send("removeFromGroup", this.username, this.groupName);
        }
    }

    reconcileUsers(usernames: string[]) {
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.send("reconcileUsers", usernames, this.groupName);
        }
    }

    setScore(score: number) {
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.send("setScore", this.username, this.groupName, score);
        }
    }

    reveal() {
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.send("reveal", this.username, this.groupName);
        }
    }

    reset() {
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.send("reset", this.username, this.groupName);
        }
    }

    marco() {
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            this.connection.send("marco", this.username, this.groupName);
        }
    }
}