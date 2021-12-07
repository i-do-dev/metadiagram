const sayHello = () => {
    let messageInput: HTMLInputElement = <HTMLInputElement>document.getElementById('message');
    let message: String = messageInput.value;
    type WindowStates = "open" | "closed" | "minimized";
    let windowState: WindowStates = "open";
    console.log("windowState: ", windowState);
    console.log("Message: " + message);
    
}

const init = () => {
    let sayItInput: HTMLInputElement = <HTMLInputElement>document.getElementById('say');
    sayItInput.addEventListener('click', sayHello);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});