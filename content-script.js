// THIS IS A PROTOTYPE
// This code needs a major refactor


addQrCodeButton();

function addQrCodeButton() {

    const button = document.createElement('button');
  
    button.setAttribute("class", "ytp-button");
    button.setAttribute("aria-label", "Continue on smartphone");
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("title", "Continue on smartphone");
    button.onclick = showQrCodeModal;
  
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" 
            height="100%" 
            viewBox="-8 -8 41 41"
            width="100%"
            fill="#FFFFFF"
            id="ytp-id-999">
                <use class="ytp-svg-shadow" xlink:href="#ytp-id-999"></use>
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M18 1.01L8 1c-1.1 0-2 .9-2 2v3h2V5h10v14H8v-1H6v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM10 15h2V8H5v2h3.59L3 15.59 4.41 17 10 11.41V15z"/>
        </svg>
    `;
  
    const youtubeRightControls = document.getElementsByClassName("ytp-right-controls")[0];

    youtubeRightControls.prepend(button);
}

function showQrCodeModal() {   

    const modal = document.createElement("dialog");
    modal.innerHTML = "";

    modal.setAttribute(
        "style", `
        border: 5px solid #aaa;
        border-radius: 10px;
        background-color: #101010;
        position: fixed;
        box-shadow: 0px 0px 50px rgba(0, 0, 0, 1);
        `
    );

    const videoDuration = Math.trunc(document.getElementsByClassName('video-stream')[0].currentTime);
    const urlParams = new URLSearchParams(window.location.search);
    const videoCode = urlParams.get('v');
    const qrCodeUrl = "https://youtu.be/" + videoCode + "?t=" + videoDuration;

    modal.innerHTML = `
        <div style="top:0px; left:0px;">
            <button style="padding: 8px 12px; font-size: 16px; border: 3px solid #ddd; border-radius: 100px; cursor:pointer; background: #101010; color: #ddd"><b>x</b></button>
            <span style="font-size: 11pt; margin-left: 8px; color: #ddd">Scan with your smartphone camera</span>
        </div>
        <br>
        <div id="video-qrcode" style="height:100%;"></div>
        <br>
        <div style="top:0px; left:0px;">
            <span style="color: #ddd"><b>Url:</b> ${qrCodeUrl}</span>
            <br><br>
            <a href="https://github.com/gabrielgouv/continue-watching-on-smartphone" target="_blank" style="color: #ccc">Help</a>
            <span style="color: #ccc">•</span>
            <a href="https://github.com/gabrielgouv/continue-watching-on-smartphone" target="_blank" style="color: #ccc">Source code</a>
        </div>
    `;

    document.body.prepend(modal);

    const dialog = document.querySelector("dialog");

    dialog.showModal();

    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
    });

    const qrCodeContainer = document.getElementById("video-qrcode");
    qrCodeContainer.innerHTML = "";

    new QRCode(qrCodeContainer, {
        text: qrCodeUrl,
        width: 300,
        height: 300,
        colorDark : "#cccccc",
        colorLight : "#101010",
        correctLevel : QRCode.CorrectLevel.H
    });

}
