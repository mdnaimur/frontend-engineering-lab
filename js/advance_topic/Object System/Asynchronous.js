// const processOrder = (customer) => {
//     console.log(`processing order for customer 1😎`);

//     var currentTime = new Date().getTime();
//     while (currentTime + 3000 >= new Date().getTime());

//     console.log(`order processed for customer 🤷‍♀️1`);

// };

// console.log(`take ⚠️order for customer 1`);
// processOrder();

// console.log(`completed order for customer 1 🎯`);



// const processOrder = (customer) => {
//     console.log(`processing order for customer 1😎`);

//     setTimeout(() => {
//         console.log(`cooking complete`);
//     }, 3000);

//     console.log(`order processed for customer 🤷‍♀️1`);

// };

// console.log(`take ⚠️order for customer 1`);
// processOrder();

// console.log(`completed order for customer 1 🎯`);


// const takeOrder = (customer, callback) => {

//     console.log(`take order for ${customer}`);
//     callback(customer);
// };


// const processOrder = (customer, callback) => {
//     console.log(`processing order for ${customer} 1😎`);

//     setTimeout(() => {
//         console.log(`cooking complete`);
//         console.log(`order processed for ${customer} 🤷‍♀️1`);
//         callback(customer);
//     }, 3000);


// };

// const completeOrder = (customer) => {
//     console.log(`completed order for ${customer}`);
// }

// takeOrder('Custo-Naimur', (customer) => {
//     processOrder(customer, (customer) => {
//         completeOrder(customer);
//     })
// });

const hasMeeting = false;

const meeting = new Promise((resolve, reject) => {
    if (!hasMeeting) {
        const metingDetails = {
            name: 'Technical Meeting',
            location: "Zoom online",
            time: '10:00 pm',
        };
        resolve(metingDetails);
    }

    else {
        reject(new Error('Meeting already scheduled! Sorry....'));
    }
});


// meeting.then((res) => {
//     console.log(JSON.stringify(res, null, 4));

// })
//     .catch((err) => {
//         console.log('Error', err)

//     })



// const promise1 = Promise.resolve(`Promise 1 resolved`);

// const promise2 = new Promise((res, rej) => {
//     setTimeout(() => {
//         res(`Promise 2 resolved`);
//     }, 2000)
// });


// promise1.then(res => console.log(res));
// promise2.then(res => console.log(res));


// Promise.all([promise1, promise2])
//     .then((res) => {
//         console.log(res);
//     })


// Promise.race([promise1, promise2])
//     .then((res) => {
//         console.log(res);
//     })




// async function friedFuction() {
//     return `Hello`;
// }

// console.log(friedFuction());


async function myMeeting() {
    const meetingsDetails = await meeting;

}

myMeeting();