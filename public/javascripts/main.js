
const key = "<HEREYOUAPIKEY>";

const form = document.querySelector('#simpleForm')
dataFetch = []

window.addEventListener('load' , () => {
     //aqui trabaja punpun
     const res = welcome_fetch().then(res => {
          let name = res.result;
          showBottons(name)
     });   
     
});

async function welcome_fetch() {

     options = {
          "trigger": "welcome",
          "sessionId": "1034021451",
          "storyId": "5eb30442031b9000067fc645"
     }

     let result = await fetch('https://api.chatbot.com/query', {
          method: 'POST',
          headers:{'Content-Type': 'application/json',
                    'authorization': `Bearer ${key}`
          },
          body: JSON.stringify(options)
     })
     let data = await result.json()
     console.log(data);
     return data
}

function showBottons(obj) {
     console.log(obj.fulfillment)
     const chat = document.getElementById('chat')

     const dt = document.createElement('dt')

     dt.innerHTML = `
     <span class="uk-badge uk-animation-scale-down  uk-animation-fast">BOT</span>
     <dd class="uk-animation-scale-down uk-animation-fast">${obj.fulfillment[0].message}</dd>
     `
     chat.appendChild(dt)

}
form.addEventListener('submit', async (e) => {
     e.preventDefault()


     console.log('enviando');
     var realTextArea = document.querySelector('#textArea');
     var textArea = document.querySelector('#textArea').value //
     
     if (textArea === '') {
          var element = document.getElementById("textArea");
          element.classList.add("uk-animation-shake");
          setTimeout(() => {
               element.classList.remove("uk-animation-shake");
          }, 1000);
     } else {
          
          const chat = document.getElementById('chat');

          let dt = document.createElement('dt');

          dt.innerHTML = `
          <dt class="uk-animation-scale-down uk-animation-fast">YOU: </dt>
          <dd class="uk-animation-scale-down uk-animation-fast">${textArea}</dd>
          `
          chat.appendChild(dt)

          
          realTextArea.value = "";
          dt = document.createElement('dt');
          dt.innerHTML = await justGet(textArea).then(res => {
               return (`
               <span class="uk-badge uk-animation-scale-down uk-animation-fast">BOT</span>
               <dd class="uk-animation-scale-down uk-animation-fast">${res.result.fulfillment[0].message}</dd>
               `)
          });
          chat.appendChild(dt);
     }
})


async function justGet(textArea) {

     options = {
          "query": textArea,
          "sessionId": "1034021451",
          "storyId": "5eb30442031b9000067fc645"
     }

     let result = await fetch('https://api.chatbot.com/query', {
          method: 'POST',
          headers:{'Content-Type': 'application/json',
                    'authorization': `Bearer ${key}`
          },
          body: JSON.stringify(options)
     })
     let data = await result.json()
     console.log(data);
     return data
}