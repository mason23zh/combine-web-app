function gid() {
    var elements = new Array();
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (typeof element == 'string') element = document.getElementById(element);
        if (arguments.length == 1) return element;
        elements.push(element);
    }
    return elements;
}

function hi() {
    gid('t1').style.display = "none";
    gid('t2').style.display = "none";
    gid('t3').style.display = "none";
    gid('t4').style.display = "none";
    gid('t5').style.display = "none";
    gid('t6').style.display = "none";
}

function uc1() {
    gid('t1').style.display = "block";
}

function uc2() {
    gid('t2').style.display = "block"
}

function uc3() {
    gid('t3').style.display = "block";
}

function uc4() {
    gid('t4').style.display = "block";
}

function uc5() {
    gid('t5').style.display = "block";
}

function uc6() {
    gid('t6').style.display = "block";
}

function len() {
    var from = gid('flength').value;
    var to = gid('tlength').value;
    var totext = gid('tlength').options[gid('tlength').selectedIndex].text;
    var ip = gid('lip').value;
    if (gid('lip').value == null || gid('lip').value.length == 0) gid('lop').value = '{$eunit}';
    else
        gid('lop').value = Math.round(ip * from / to * 100000) / 100000 + ' ' + totext;
}

function area() {
    var from = gid('farea').value;
    var to = gid('tarea').value;
    var totext = gid('tarea').options[gid('tarea').selectedIndex].text;
    ip = gid('aip').value;
    if (gid('aip').value == null || gid('aip').value.length == 0) gid('aop').value = '{$eunit}';
    else
        gid('aop').value = Math.round(ip * from / to * 100000) / 100000 + ' ' + totext;
}

function speed() {
    var from = gid('fspeed').value;
    var to = gid('tspeed').value;
    var totext = gid('tspeed').options[gid('tspeed').selectedIndex].text;
    var ip = gid('sip').value;
    if (gid('sip').value == null || gid('sip').value.length == 0) gid('sop').value = '{$eunit}';
    else
        gid('sop').value = Math.round(ip * from / to * 100000) / 100000 + ' ' + totext;
}

function weight() {
    var from = gid('fweight').value;
    var to = gid('tweight').value;
    var ip = gid('wip').value;
    var totext = gid('tweight').options[gid('tweight').selectedIndex].text;
    if (gid('wip').value == null || gid('wip').value.length == 0) gid('wop').value = '{$eunit}';
    else
        gid('wop').value = Math.round(ip * from / to * 100000) / 100000 + ' ' + totext;
}

function vol() {
    var from = gid('fvol').value;
    var to = gid('tvol').value;
    var ip = gid('vip').value;
    var totext = gid('tvol').options[gid('tvol').selectedIndex].text;
    if (gid('vip').value == null || gid('vip').value.length == 0) gid('vop').value = '{$eunit}';
    else
        gid('vop').value = Math.round(ip * from / to * 100000) / 100000 + ' ' + totext;
}

function temp() {
    var from = gid('ftemp').value;
    var to = gid('ttemp').value;
    var ip = gid('tip').value;
    var totext = gid('ttemp').options[gid('ttemp').selectedIndex].text;
    if (gid('tip').value == null || gid('tip').value.length == 0) gid('top').value = '{$eunit}';
    else
    if (from == 1 && to == 1) gid('top').value = ip + ' ' + totext;
    if (from == 1 && to == 2) gid('top').value = ((ip * 9 / 5) + 32 * 1).toFixed(2) + ' ' + totext;
    if (from == 1 && to == 3) gid('top').value = (ip * 1 + 273.15 * 1).toFixed(2) + ' ' + totext;
    if (from == 2 && to == 1) gid('top').value = ((ip - 32) * 5 / 9).toFixed(2) + ' ' + totext;
    if (from == 2 && to == 2) gid('top').value = ip + ' ' + totext;
    if (from == 2 && to == 3) gid('top').value = (((ip - 32) * 5 / 9) + 273.15).toFixed(2) + ' ' + totext;
    if (from == 3 && to == 1) gid('top').value = (ip - 273.15).toFixed(2) + ' ' + totext;
    if (from == 3 && to == 2) gid('top').value = ((ip - 273.15) * 9 / 5 + 32 * 1).toFixed(2) + ' ' + totext;
    if (from == 3 && to == 3) gid('top').value = ip + ' ' + totext;
}

function selunit() {
    if (gid('ut').value == '1') {
        hi();
        uc1();
        len();
    };
    if (gid('ut').value == '2') {
        hi();
        uc2();
        area();
    };
    if (gid('ut').value == '3') {
        hi();
        uc3();
        speed();
    };
    if (gid('ut').value == '4') {
        hi();
        uc4();
        weight();
    };
    if (gid('ut').value == '5') {
        hi();
        uc5();
        vol();
    };
    if (gid('ut').value == '6') {
        hi();
        uc6();
        temp();
    };
}
window.onload = function () {
    hi();
    uc1();
    len();
}