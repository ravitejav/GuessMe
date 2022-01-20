export interface GameRoom {
    roomId: number;
    roomname: string;
    lastUpdate: Date;
    createdDate: Date;
    createdBy: User;
    users: Array<User>;
}

export interface User {
    userId: number;
    name: string;
    username: string;
    password: string;
    emailId: string;
}
