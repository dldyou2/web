$(document).ready(function() { // $(function () { ... });
    var imgArray = ["./img/hangman0.gif", "./img/hangman1.gif", "./img/hangman2.gif", "./img/hangman3.gif", "./img/hangman4.gif"];
    var curImg = 0;
    $("div.out").on("mouseover", function() {
        $("div.out p:first").text("mouse over"); // $("div.out", this).text("mouse over") 
        $("div.out p:nth-child(2)").text(parseInt($("div.out p:nth-child(2)").text(), 10) + 1);
    })
    $("div.out").on("mouseout", function() {
        $("div.out p:first").text("mouse out");
    })
    $("#b1").on("click", {
        url: "http://www.google.com", 
        winattributes: "resize=1, scrollbars=1, status=1"}, 
        max_open);
    $("#bind").on("click", function() {
        $("body").on("click", "#theone", flash).find("#theone").text("Can Click!");
    });
    $("#unbind").on("click", function() {
       $("body").off("click", "#theone", flash).find("#theone").text("Does nothing..."); 
    });
    $("#trigger_test").on("click", "button:first", function() {
        update($("#trigger_test span:first"));
    });
    $("#trigger_test").on("click", "button:last", function() {
        $("#trigger_test>button:first").trigger("click");
        update($("#trigger_test span:last"));
    });
    $("#imageArea").on("click", function() {
        var src = $("#imageArea img").attr("src");
        src = src == "./img/img1.jpg" ? "./img/img2.jpg" : "./img/img1.jpg";
        $("#imageArea img").attr("src", src);
    });
    $("#imgAlbum").attr("src", imgArray[curImg]);
    $("#imgAlbum").on("click", function() {
        curImg = (curImg + 1) % imgArray.length;
        $(this).attr("src", imgArray[curImg]);
    });
    $(".main-menu").on("mouseover", function() {
        $(this).css({"font-size":"20px", "background-color":"green"});
    });
    $(".main-menu").on("mouseout", function() {
        $(this).css({"font-size":"1em", "background":"none"});
    });
    $("#add_img img").on("click", function() {
        $("#note_form").addClass("popup");
        change_position($(".popup"));
        $("#note_form").fadeIn();
    });
    $("#add_note").on("click", function() {
        var title = $("#note_title").val();
        var date = $("#note_date").val();
        var content = $("#note_content").val();
        $("#note_form").fadeOut();
        $("#note").append("<p>" + title + "<br>" + date + "<br>" + content + "</p><br>");       
    });
    $(window).resize(function() {
        change_position($(".popup"));
    });
    $("#moving_button").on("click", function() {
        $("#moving_box").animate({
            right: 0, 
            height: "+=50px", 
            width: "+=50px"}, 500);
        $("#animation_test").animate({height: "+=50px"})
    });
    $(".accordion").each(function() {
        var dl = $(this);
        var alldd = dl.find("dd"); 
        var alldt = dl.find("dt"); 
        function closeAll() {
            alldd.addClass("closed");
            alldt.addClass("closed");
        }
        function open(dt, dd) {
            dt.removeClass("closed");
            dd.removeClass("closed");
        }
        closeAll();
        alldt.on("click", function() {
            var dt = $(this);
            var dd = dt.next();
            closeAll();
            open(dt, dd);
        });
    })
    var interval = 3000;
    $(".slideshow").each(function() {
        var container = $(this);
        var timer; 
        function switchImg() {
            var img = container.find("img");
            var first = img.eq(0);
            var second = img.eq(1);
            first.appendTo(container).fadeOut(2000);
            second.fadeIn();
        }
        function startTimer() {
            timer = setInterval(switchImg, interval);
        }
        function stopTimer() {
            clearInterval(timer);
        }
        startTimer();
        container.find("img").hover(stopTimer, startTimer);
    });
    $("#getText").on("click",function() {
        $("#textbox").text("");
        var req = $.ajax("data.txt");
        req.done(function(data, status) {
            // test call
            console.log("파일을 불러오는데 성공했습니다.");
            var students = JSON.parse(data);
            for(var i = 0; i < students.length; i++) {
                var str = students[i].name + "<br>";
                $("#textbox").append(str);
            }
        });
        req.fail(function() {
            // test call
            console.log("파일을 불러오는데 오류가 있습니다.");
        });
    });
});

function max_open(e) {
    var maxwindow = window.open(e.data.url, "", e.data.winattributes);
    maxwindow.moveTo(0, 0);
    maxwindow.resizeTo(screen.availWidth, screen.availHeight);
}

function flash() {
    $("#off_test").show().fadeOut("slow");
}

function update(target) {
    var n = parseInt(target.text(), 10);
    target.text(n + 1);
}

function change_position(target) {
    var w = ($(window).width() - target.width()) / 2;
    var h = ($(window).height() - target.height()) / 2;
    target.css({top: h, left: w});
}

