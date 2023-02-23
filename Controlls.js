var keys = {};

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(e) {
    keys[e.key] = true
};

function keyup(e) {
    keys[e.key] = false
};