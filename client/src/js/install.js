const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent default to stop the browser from asking to install the app
    event.preventDefault();
    // defer the prompt until the user clicks the install button
    deferredPrompt = event;
    // show the install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // show the install prompt only after the user clicks the install button
    deferredPrompt.prompt();
    // wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // if the user accepted the prompt, hide the install button
    if (outcome === 'accepted') {
        butInstall.style.display = 'none';
    }
    // clear the deferredPrompt variable
    deferredPrompt = null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // I made an alert so the user knows the app was installed
    alert('JATE was installed');
    // hide the install button once it's installed
    butInstall.style.display = 'none';
});
