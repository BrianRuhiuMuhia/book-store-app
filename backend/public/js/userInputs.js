const url="http://localhost:5000/login"
const inputs={
    firstName:document.querySelector(".fName"),
    lastName:document.querySelector(".lName"),
    email:document.querySelector(".email"),
    password:document.querySelector(".password"),
    checkBox:document.querySelector(".show-password"),
    subBtn:document.querySelector(".sub-btn"),
    form:document.querySelector(".form")
}
const errorElements={
  firstName:document.querySelector(".fNameMssg"),
  lastName:document.querySelector(".lNameMssg"),
  email:document.querySelector(".emailMssg"),
  password:document.querySelector(".passwordMssg")
}
const regexs={
  nameRegex:/^[a-zA-Z'-]{1,30}$/,
  emailRegex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  passwordRegex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+=-{};:'<>,./?])(?=.*\d).{8,}$/
}
inputs.checkBox.addEventListener("click",()=>{
  inputs.password.setAttribute("type", inputs.checkBox.checked ? "text":"password");
})
inputs.subBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  let showFormError=false
  const firstName=inputs["firstName"].value
  const lastName=inputs["lastName"].value
  const email=inputs["email"].value
  const password=inputs["password"].value
  const data={}
  if(regexs.nameRegex.test(firstName))
  {
    showFormError=false
data["firstName"]=firstName
errorElements.firstName.classList.add("hidden")
  }
  else{
    showFormError=true
    errorElements.firstName.classList.remove("hidden")
  }
  if(regexs.nameRegex.test(lastName))
  {
    
data["lastName"]=lastName
errorElements.lastName.classList.add("hidden")
  }
  else{
    errorElements.lastName.classList.remove("hidden")
  }
  if(regexs.emailRegex.test(email))
  {
    showFormError=false
data["email"]=email
errorElements.email.classList.add("hidden")
  }
  else{
    showFormError=true
    errorElements.email.classList.remove("hidden")
  }
  if(regexs.passwordRegex.test(password))
  {
    showFormError=false
data["password"]=password
errorElements.password.classList.add("hidden")
  }
  else{
    showFormError=true
    errorElements.password.classList.remove("hidden")
  }
  if(showFormError)
  {
    inputs["form"].classList.add("form-error")
  }
  else{
    inputs["form"].classList.replace("form-error","form-success")
  }
if(!showFormError)
    apiRequest(data,url)
})
function apiRequest(data,url)
{
    const xmlRequest=new XMLHttpRequest()
    xmlRequest.open("POST",url)
    xmlRequest.setRequestHeader('Content-Type', 'application/json');
    xmlRequest.onload = function() {
        if (xmlRequest.status >= 200 && xmlRequest.status < 400) {
          const response = JSON.parse(xmlRequest.responseText);
          console.log(response);
        } else {
          console.log('Error', xmlRequest.statusText);
        }
      };
      
      xmlRequest.onerror = function() {
        console.log('Error', xmlRequest.statusText);
      };
      xmlRequest.send(JSON.stringify(data))
      


}