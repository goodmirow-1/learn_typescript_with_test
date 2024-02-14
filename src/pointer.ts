export class Wallet{
    balance: number = 0;

    constructor(amount: number) {
        console.log("address of balance in Deposit is ", amount);
        this.balance += amount;
    }

    Balance() : number{
        return this.balance;
    }

    Withdraw(amount: number){
        if(amount > this.balance){
            console.log("oh no")
        }

        this.balance -= amount;
        return null;
    }
}