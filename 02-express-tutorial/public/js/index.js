// Insert Copyright Text in Footer
let footer = document.getElementsByClassName("footer")[0];

const thisYear = new Date().getFullYear(); 
const copyrightText =  "I turn coffee☕️ into code. \u00A9 " + "Tetiana Klitna " + thisYear;

footerText = document.createElement("p");
footerText.innerText = copyrightText;
footer.append(footerText);

const today = (new Date()).toLocaleDateString();
footerText = document.createElement("p");
footerText.innerText = "Today is " + today;
footer.append(footerText);

//Create List of Skills
let skills = {"HTML": "img/html_icon.png", 
            "CSS": "img/css_icon.png", 
            "JavaScript": "img/js_icon.png",
            "Java": "img/java_icon.png",
            "Oracle" : "img/oracle_icon.png",
            "Python": "img/python_icon.png"};
let ulItem  = document.getElementById("skills").querySelector("ul");
ulItem.style.listStyle = "none";

for (const key in skills) {
    console.log(key);
    const titleItem = document.createElement("li");
    titleItem.innerHTML = `<img src=${skills[key]} alt="Python logo" /><p>${key}</p>`; 
    ulItem.append(titleItem);
}

// Handle Message Form Submit
const messageForm = document.forms['leave_message'];
messageForm.addEventListener("submit", 
    event => {
        
        event.preventDefault();

        let name = event.target.usersName.value;
        let email = event.target.usersEmail.value;
        let message = event.target.usersMessage.value;
        console.log(`${name} ${email} ${message}`);
        event.target.reset();

        // Display Messages in List
        const messageSection = document.getElementById("messages");
        let messageList = messageSection.querySelector("ul");
        messageList.style.listStyle = 'none';
        let newMessage = document.createElement("li");

        let removeButton = document.createElement("button");
        removeButton.innerHTML = "<img class = 'btn-remove' src = 'img/remove_icon.png' alt = 'remove icon'/>";
        removeButton.type = "button";
        removeButton.addEventListener("click", 
            event => {
            let entry = event.target.closest("li");
            entry.remove();
            toggleMessagesSection(messageSection, messageList);
        });
        
        newMessage.innerHTML = `<a href='mailto:${email}'><strong>${name}</strong></a>:  <span> ${message} </span> `;
        newMessage.appendChild(removeButton);
        messageList.append(newMessage);
        toggleMessagesSection(messageSection, messageList);
    });

function toggleMessagesSection(messageSection, messageList) {
    if (messageList.children.length > 0) {
        messageSection.style.display = 'block';
    } else {
        messageSection.style.display= 'none';
    }
}
//Display Repositories from GitHub in List  
fetch('https://api.github.com/users/TetianaKlitna/repos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json(); 
  })
  .then(data => {
    const projectsSection = document.getElementById("projects");
    let projectsList = projectsSection.querySelector("ul");
    projectsList.style.listStyle = 'none';
    for(let i = 0; i < data.length; i++){
        let project = data[i].name;
        if(project.endsWith("-ctd")){
            let newProject = document.createElement("li");
            newProject.innerHTML = `<a href = '${data[i].html_url}'> <img src = "img/html_code_icon.png"><br>${data[i].name}</a>`;
            projectsList.appendChild (newProject);
            console.log(`${data[i].name} saccessfully added.`)
        }
      
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });