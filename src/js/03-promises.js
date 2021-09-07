const form = document.querySelector(".form");
const amount = document.querySelector("input[name=amount]");
const step = document.querySelector("input[name=step]");
const delayStart = document.querySelector("input[name=delay]");


form.addEventListener("submit", onSubmit); 

function onSubmit(event) {
  event.preventDefault();
  let delay = Number(delayStart.value);
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += Number(step.value); 
    
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
  }, delay);
  });
}



  

