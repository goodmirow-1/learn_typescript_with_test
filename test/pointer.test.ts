import {Wallet} from "../src/pointer";

describe("pointer assertBalance", () => {
    function assertBalance(wallet: Wallet, want: number){
        const got = wallet.Balance()

        if(got != want){
            console.error(`got ${got} want ${want}`)
        }
    }

    function  assertError(err : null){
        if(err == null){
            console.error("wanted an error but didn't get one")
        }
    }

    test('withdraw insufficient funds', () => {
        const startingBalance = 20;
        const wallet = new Wallet(startingBalance);
        const err = wallet.Withdraw(100);

        assertBalance(wallet,startingBalance);
        assertError(err);
    })
})