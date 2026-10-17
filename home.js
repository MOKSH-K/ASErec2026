document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Edit this list to change the moving events bar ---------- */
    var events = [
        { date: "Date TBA", title: "I-solve Hack the BANGLORE traffic" },
        { date: "Date TBA", title: "Web Development Bootcamp" },
        { date: "Date TBA", title: "CODE CONSPIRANCY" },
        { date: "Date TBA", title: "VIBE CRAFT @NMIT" },
        { date: "Date TBA", title: "Competitive Programming Contest" },
        { date: "Date TBA", title: "Club Recruitment Drive" }
    ];

    /* ---------- Moving events bar ---------- */
    var track = document.getElementById("tickerTrack");
    var html = "";

    // the list is written twice so the loop never shows a gap
    for (var round = 0; round < 2; round++) {
        for (var i = 0; i < events.length; i++) {
            html += '<span class="ticker-item"><b>' + events[i].date + '</b>' + events[i].title + '</span>';
        }
    }
    track.innerHTML = html;

    /* ---------- Changing word: engineering <-> development ---------- */
    var words = ["engineering", "development"];
    var wordEl = document.getElementById("changingWord");
    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function type() {
        var current = words[wordIndex];

        if (!deleting) {
            charIndex++;
            wordEl.textContent = current.substring(0, charIndex);

            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
            setTimeout(type, 110);
        } else {
            charIndex--;
            wordEl.textContent = current.substring(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 60);
        }
    }

    type();

    /* ---------- Hover glow that follows the mouse on the hero ---------- */
    var hero = document.getElementById("hero");

    hero.addEventListener("mousemove", function (e) {
        var rect = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", (e.clientX - rect.left) + "px");
        hero.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });

    /* ---------- Mobile menu ---------- */
    var menuBtn = document.getElementById("menuBtn");
    var navLinks = document.getElementById("navLinks");

    menuBtn.addEventListener("click", function () {
        var open = navLinks.classList.toggle("open");
        menuBtn.classList.toggle("open", open);
        menuBtn.setAttribute("aria-expanded", open);
    });

    navLinks.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
            navLinks.classList.remove("open");
            menuBtn.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", false);
        }
    });

});



