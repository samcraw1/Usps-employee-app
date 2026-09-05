export type Employee = {
    name: string;
    employeeId: string;

}

export type Shift = {
    BT: string;
    NS: true;
    date: string;
} | {
    BT: string;
    NS: false;
    date: string;
}

export type Station = {
    name: string;
}
