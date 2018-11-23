export const styleStr = `
.fa-lg{
    vertical-align: -9%;
}
.img-thumbnail-image {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.span,
.span_large {
    vertical-align: middle;
    margin-right: 200px;
}
.typing_loader {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    -webkit-animation: typing 1s linear infinite alternate;
    -moz-animation: Typing 1s linear infinite alternate;
    -ms-animation: Typing 1s linear infinite alternate;
    animation: typing 1s linear infinite alternate;
    margin: auto auto;
    margin-top: 48%;
    position: relative;
    left: -12px;
}
.ts-plus-dom{
    border-style:dashed;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
}
@keyframes typing {
    0% {
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    25% {
        background-color: rgba(0, 0, 0, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 1), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    75% {
        background-color: rgba(0, 0, 0, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 1);
    }
}
.upload-block{
    background-size:cover;
    background-repeat:no-repeat;
}
.upload-block-window{
    background-color:black;
    opacity:0;
}
.upload-block-window:hover{
    opacity:0.5;
}`;
