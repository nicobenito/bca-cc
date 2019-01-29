module.exports.checkBCAEligibility = input => {
    let application = require(input);

    // check amount requested
    if (application.amountRequested < 5000 || application.amountRequested > 50000)
        return false;
    console.log("Passed amount requested");
    
    // check time in business
    if (!(application.timeInBusiness.years && application.timeInBusiness.months || application.timeInBusiness.months > 12))
        return false;
    console.log("Passed time in business");

    // check last 12 months transactions
    if (!checkMonthsTransactionsData(application))
        return false;
    console.log("Passed past months transactions check");
        
    return true;
}

let checkMonthsTransactionsData = application => {
    const isAboveTwentyFiveThousand = application.amountRequested > 25000;
    let eligible = true;
    let transactions = application.transactions;
    let applicationAmountAverage = 0;
    let applicationAmountTotal = 0;
    let latestDate = 
    new Date(Math.max.apply(null, transactions.map(t => new Date(t.date))));

    let oldestDate = 
    new Date(Math.min.apply(null, transactions.map(t => new Date(t.date))));

    // get 12 months back
    let twelfthMonthsBackDate = new Date(latestDate.getTime());
    twelfthMonthsBackDate.setMonth(twelfthMonthsBackDate.getMonth() - 12);

    // if amountRequested is above 25000 check if there is transaction data for more than 12 months
    if (isAboveTwentyFiveThousand && !(twelfthMonthsBackDate > oldestDate)){
        console.log("Failed: Amount request above 25000 and there is no data for more than 12 months");
        return false;
    }

    // get transactions total average
    for (let transaction of transactions) {
        applicationAmountTotal += transaction.value;
    }

    applicationAmountAverage = applicationAmountTotal / transactions.length;

    // loop for the last 12 months
    for (let i = 0; i <= 12; i++) {
        // check if there is at least one entry for the specified month
        let monthHasData = transactions.some(t => {
            let tDate = new Date(t.date);
            return twelfthMonthsBackDate.getMonth() == tDate.getMonth() && twelfthMonthsBackDate.getYear() == tDate.getYear();
        });

        if (monthHasData) {
            let monthNumbers = {
                totalValue: 0,
                totalMonthTransactions: 0
            };
            // get every transaction for the specified month
            transactions.forEach(t => {
                let tDate = new Date(t.date);
                if (twelfthMonthsBackDate.getMonth() == tDate.getMonth() && twelfthMonthsBackDate.getYear() == tDate.getYear()) {
                    monthNumbers.totalValue += t.value;
                    monthNumbers.totalMonthTransactions ++;
                }
            });

            let average = monthNumbers.totalValue / monthNumbers.totalMonthTransactions;            
            if (average < application.amountRequested) {
                eligible = false;
                console.log("Failed on average");
                break;
            }
        }
        else {
            // if there is a month without data, first check that the amount request is equal or below 25000
            if (isAboveTwentyFiveThousand) {
                eligible = false;
                console.log("Failed: above 25000 with empty months");
                break;
            }
            // it adds new data for the month without transactions using the amount average as value
            else {
                transactions.push({
                    date: twelfthMonthsBackDate,
                    value: applicationAmountAverage
                });
            }
        }
        // set next month
        twelfthMonthsBackDate.setMonth(twelfthMonthsBackDate.getMonth() + 1);
    }

    return eligible;
}