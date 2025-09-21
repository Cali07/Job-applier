export default defineNuxtPlugin(() => {
    let deferredPrompt: any = null

    // Listen for the install prompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt = e

        // Show a simple popup
        const popup = document.createElement('div')
        popup.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border: 1px solid #ccc;
      padding: 15px;
      box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
      border-radius: 10px;
      font-family: sans-serif;
      z-index: 9999;
    `
        popup.innerHTML = `
      <p style="margin-bottom:10px;font-size:14px;">Install Invoice Builder for quicker access?</p>
      <button id="installPwaBtn" style="padding:6px 12px;margin-right:10px;background:#000;color:#fff;border:none;border-radius:5px;">Install</button>
      <button id="dismissPwaBtn" style="padding:6px 12px;background:#ccc;border:none;border-radius:5px;">Later</button>
    `
        document.body.appendChild(popup)

        // Install button click
        document.getElementById('installPwaBtn')?.addEventListener('click', async () => {
            popup.remove()
            if (deferredPrompt) {
                deferredPrompt.prompt()
                const choice = await deferredPrompt.userChoice
                if (choice.outcome === 'accepted') {
                    console.log('User accepted the install prompt')
                } else {
                    console.log('User dismissed the install prompt')
                }
                deferredPrompt = null
            }
        })

        // Dismiss button click
        document.getElementById('dismissPwaBtn')?.addEventListener('click', () => {
            popup.remove()
        })
    })
})
