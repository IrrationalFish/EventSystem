var thisUserID;
var thisUserName;

function closeUp() {
    var name = document.getElementById("unamein").value;
    var psw = document.getElementById("pswin").value;
    //the name is in name and password is in psw, call php to verify the identity
    if(name != '' && psw != ''){
        $("#loginButton").text("Connecting...");
        $.post("http://localhost/comp208/PHP/LogIn.php", {username: name, password: psw}, function(response){
            if(response.includes("100")){       //response返回字符串格式为100+userID
                alert("Log in succeed!");
                thisUserID = response.substring(4); 
                thisUserName = name;
                setCookie("userID",thisUserID);     //於：设置了cookie，刷新不会重置登录状态，
                setCookie("userName",thisUserName); //设置cookie使用的jq的方法（在cookie.js）里，没有用php的方法，如要修改，只需要修改cookie.js的方法即可
                //於：这个延时感觉没必要啊，就把延时设为0了
                setTimeout("document.getElementById(\"login\").style.display = \"none\"", 0);
            } else {
                if(response.includes("403 USERNAME")){
                    $("#loginButton").text("Login");    //yu:把按钮文字改回Login
                    document.getElementsByName('unamein')[0].value = "";
                    document.getElementsByName('unamein')[0].placeholder = "this username does not exist";
                    document.getElementsByName('pswin')[0].value = "";
                }
                if(response.includes("403 PASSWORD")){
                    $("#loginButton").text("Login");    //yu: 把按钮文字改回Login
                    document.getElementsByName('pswin')[0].value = "";
                    document.getElementsByName('pswin')[0].placeholder = "wrong password";
                }
            }
        });
    } else {
        if(name == ''){document.getElementsByName('unamein')[0].placeholder = "you did not enter username";}
        if(psw == ''){document.getElementsByName('pswin')[0].placeholder = "you did not enter password";}

        //this line only for test
        //setTimeout("document.getElementById(\"login\").style.display = \"none\"", 3000);
    }
}

function signUp(){
    var name = document.getElementById("unamereg").value;
    var psw = document.getElementById("pswreg").value;
    var email = document.getElementById("emailreg").value;
    //use php to verify
    if(name != '' && psw != '' && email != ''){
        $.post("http://localhost/comp208/PHP/SignUp.php", {username: name, password: psw, email: email}, function(response) {
            if(response.includes("100 true")){
                alert("Register succeed!");
                thisUserName = name;
                setTimeout("document.getElementById(\"login\").style.display = \"none\"", 3000);
            } else {
                if(response.includes("402 USERNAME")){
                    document.getElementsByName("unamereg")[0].value = "";
                    document.getElementsByName("unamereg")[0].placeholder = "the username has been used";
                }
                if(response.includes("402 EMAIL")){
                    document.getElementsByName("emailreg")[0].value = "";
                    document.getElementsByName("emailreg")[0].placeholder = "the email address has been used";
                }
            }
        });
    } else {
        if(name == ''){document.getElementsByName("unamereg")[0].placeholder = "you did not enter username";}
        if(psw == ''){document.getElementsByName("pswreg")[0].placeholder = "you did not enter password";}
        if(email == ''){document.getElementsByName("emailreg")[0].placeholder = "you did not enter email address";}
    }
}

function changeForm(){
    if(document.getElementById("2").style.display ==="none"){
        document.getElementById("2").style.display ="block";
        document.getElementById("1").style.display ="none";
    } else {
        document.getElementById("2").style.display ="none";
        document.getElementById("1").style.display ="block";
    }
}