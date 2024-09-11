export interface OrderType{
    id: number,
    serialNumber: string,
    userId: number,
    totalPrice: number,
    status: number,
    note: string,
    orderDetails: [],
    receiveName: string,
    receiveAddress: string,
    receivePhone: string
}