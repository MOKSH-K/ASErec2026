var LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpolygon points='32,3 58,17.5 58,46.5 32,61 6,46.5 6,17.5' fill='%230f2236' stroke='%23ffb400' stroke-width='3'/%3E%3Ctext x='32' y='29' text-anchor='middle' font-family='Consolas,Menlo,monospace' font-size='15' font-weight='700' fill='%23ffb400'%3E%26lt;/%26gt;%3C/text%3E%3Ctext x='32' y='47' text-anchor='middle' font-family='Arial,sans-serif' font-size='14' font-weight='700' fill='%23ffffff'%3EASE%3C/text%3E%3C/svg%3E";

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Edit the events here ---------- */
    var events = [
        {
            img: "images/code conspirancy.png",
            title: "Code Conspiracy",
            tag: "With GeekMayhem",
            short: "Cash prize contest",
            text: "Two clubs, one mystery. GeekMayhem and ASE put their names on a contest where the title is the first clue. Gather a team, trust nobody's code but your own, and chase a cash prize across rooms 330 and 331.",
            facts: [
                ["Prizes", "₹2500 / ₹1500 / ₹1000"],
                ["Entry", "₹100 per team"],
                ["Venue", "Room 330 & 331"],
                ["Coordinator", "Panshul Tulsani"]
            ]
        },
        {
            img: "images/isolve ase.png",
            title: "I-Solve",
            tag: "Hack the Bangalore Traffic",
            short: "18 October 2024",
            text: "Everyone in Bangalore has an opinion about traffic. I-Solve asked students for working answers. Run alongside the Bengaluru Traffic Police with a prize pool of ₹60,000, it turned a daily headache into a problem statement.",
            facts: [
                ["Date", "18 October 2024"],
                ["Venue", "NMIT, Bangalore"],
                ["Prize pool", "₹60,000"],
                ["Partner", "Bengaluru Traffic Police"]
            ]
        },
        {
            img: "images/vibe craft.png",
            title: "VibeCraft",
            tag: "Quiz. Vibe Code. Conquer.",
            short: "28 February 2026",
            text: "Three verbs, one competition. VibeCraft mixes a quiz with vibe coding, for teams of one to three members who like to think fast and build faster, with ₹3000 waiting for first place.",
            facts: [
                ["Date", "28 February 2026"],
                ["Team size", "1 to 3 members"],
                ["Entry", "₹100 per team"],
                ["Prizes", "₹3000 / ₹2000 / ₹1000"]
            ]
        },
        {
            img: "images/rec2026.png",
            title: "Recruitment",
            tag: "#ase.nmit",
            short: "15 Oct, Room 344",
            text: "Every project starts with people. Our recruitment drive is an open invitation: stay curious, research, build, innovate. If that sounds like you, walk into Room 344 and say hello.",
            facts: [
                ["Date", "15 Oct"],
                ["Venue", "Room 344"],
                ["Who", "Anyone curious"]
            ],
            link: { text: "Join the club", href: "login.html#signup" }
        }
    ];

    /* ---------- Edit the team here ---------- */
    var team = [
        {
            domain: "Technical (Coding)",
            members: [
                { name: "Arnav Kumar", branch: "CSE" },
                { name: "Anshith Gupta", branch: "ISE" },
                { name: "Abhishek Kumar", branch: "CSE" }
            ]
        },
        {
            domain: "Research & Development",
            members: [
                { name: "Aditi Sahu", branch: "ECE" },
                { name: "Apratim Singh", branch: "ECE" }
            ]
        },
        {
            domain: "Social Media",
            members: [
                { name: "Yashika Chawla", branch: "AI/ML" },
                { name: "Nishvrith", branch: "CSE" },
                { name: "Shubhi", branch: "ISE" },
                { name: "Divya", branch: "AI/ML" }
            ]
        },
        {
            domain: "Documentation",
            members: [
                { name: "Pranav Rai", branch: "ISE" },
                { name: "Shardul", branch: "ECE" },
                { name: "Tanya Singh", branch: "ECE" }
            ]
        },
        {
            domain: "Design",
            members: [
                { name: "Ujwal Singh", branch: "ECE" }
            ]
        }
    ];

    function slug(name) {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    function initials(name) {
        var parts = name.split(" ");
        var text = parts[0].charAt(0);
        if (parts.length > 1) {
            text += parts[parts.length - 1].charAt(0);
        }
        return text.toUpperCase();
    }

    /* if a poster file is missing, show the event name instead of a broken image */
    function attachFallback(root) {
        root.querySelectorAll("img[data-poster]").forEach(function (img) {
            function showFallback() {
                img.parentNode.setAttribute("data-missing", "1");
                var box = document.createElement("div");
                box.className = "poster-fallback";
                box.textContent = img.getAttribute("data-title");
                img.replaceWith(box);
            }
            img.addEventListener("error", showFallback);
            if (img.complete && img.naturalWidth === 0) {
                showFallback();
            }
        });
    }

    /* ---------- Logo ---------- */
    document.querySelectorAll(".logo-img").forEach(function (img) {
        img.src = LOGO;
    });

    /* ---------- Hero poster collage ---------- */
    var collage = document.getElementById("collage");
    collage.innerHTML = events.map(function (ev) {
        return '<div class="poster-card" data-full="' + ev.img + '" data-title="' + ev.title + '">' +
            '<img data-poster data-title="' + ev.title + '" src="' + ev.img + '" alt="' + ev.title + ' poster">' +
        "</div>";
    }).join("");
    attachFallback(collage);

    /* ---------- Event showcase ---------- */
    var tabsBox = document.getElementById("tabs");
    var panel = document.getElementById("panel");
    var current = 0;
    var auto = null;

    tabsBox.innerHTML = events.map(function (ev, i) {
        return '<button class="tab" data-i="' + i + '"><b>' + ev.title + "</b><span>" + ev.short + "</span></button>";
    }).join("");

    function showEvent(i) {
        current = i;
        var ev = events[i];

        tabsBox.querySelectorAll(".tab").forEach(function (t, n) {
            t.classList.toggle("active", n === i);
        });

        var facts = ev.facts.map(function (f) {
            return "<dt>" + f[0] + "</dt><dd>" + f[1] + "</dd>";
        }).join("");

        var link = ev.link ? '<a class="btn btn-solid" href="' + ev.link.href + '">' + ev.link.text + "</a>" : "";

        panel.innerHTML =
            '<div class="panel-poster" data-full="' + ev.img + '" data-title="' + ev.title + '">' +
                '<img data-poster data-title="' + ev.title + '" src="' + ev.img + '" alt="' + ev.title + ' poster">' +
                '<span class="zoom">Click to enlarge</span>' +
            "</div>" +
            '<div class="panel-info">' +
                '<span class="panel-tag">' + ev.tag + "</span>" +
                "<h3>" + ev.title + "</h3>" +
                "<p>" + ev.text + "</p>" +
                '<dl class="facts">' + facts + "</dl>" +
                link +
            "</div>";

        attachFallback(panel);

        panel.classList.remove("enter");
        void panel.offsetWidth;
        panel.classList.add("enter");
    }

    function stopAuto() {
        if (auto) {
            clearInterval(auto);
            auto = null;
        }
    }

    tabsBox.addEventListener("click", function (e) {
        var tab = e.target.closest(".tab");
        if (tab) {
            stopAuto();
            showEvent(parseInt(tab.getAttribute("data-i"), 10));
        }
    });

    showEvent(0);

    var showcase = document.getElementById("showcase");
    var hovering = false;
    showcase.addEventListener("mouseenter", function () { hovering = true; });
    showcase.addEventListener("mouseleave", function () { hovering = false; });

    auto = setInterval(function () {
        if (!hovering) {
            showEvent((current + 1) % events.length);
        }
    }, 8000);

    /* ---------- Team table: one row per domain ---------- */
    var body = document.getElementById("teamBody");
    var rows = "";
    var memberTotal = 0;

    team.forEach(function (group) {
        memberTotal += group.members.length;

        var people = group.members.map(function (m) {
            return '<div class="member">' +
                '<div class="avatar">' + initials(m.name) +
                    '<img src="images/team/' + slug(m.name) + '.jpg" alt="' + m.name + '" onerror="this.remove()">' +
                "</div>" +
                '<div><span class="name">' + m.name + '</span><span class="branch">' + m.branch + "</span></div>" +
            "</div>";
        }).join("");

        rows += "<tr>" +
            '<th scope="row">' + group.domain +
                '<span class="dom-count">' + group.members.length + (group.members.length === 1 ? " member" : " members") + "</span></th>" +
            '<td><div class="members">' + people + "</div></td>" +
        "</tr>";
    });

    body.innerHTML = rows;

    /* ---------- Count-up numbers ---------- */
    var targets = { events: events.length, domains: team.length, members: memberTotal };

    function countUp(el) {
        var end = targets[el.getAttribute("data-count-target")];
        var step = 0;
        var steps = 30;
        var timer = setInterval(function () {
            step++;
            el.textContent = Math.round(end * step / steps);
            if (step >= steps) {
                clearInterval(timer);
            }
        }, 40);
    }

    document.querySelectorAll("[data-count-target]").forEach(countUp);

    /* ---------- Scroll reveal ---------- */
    var revealItems = document.querySelectorAll(".reveal");

    revealItems.forEach(function (el, i) {
        el.style.transitionDelay = (i % 3) * 0.12 + "s";
    });

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (el) { observer.observe(el); });
    } else {
        revealItems.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- Poster lightbox ---------- */
    var lightbox = document.getElementById("lightbox");
    var lbImg = document.getElementById("lbImg");

    function openBox(src, title) {
        lbImg.src = src;
        lbImg.alt = title + " poster";
        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
    }

    function closeBox() {
        lightbox.classList.remove("show");
        lightbox.setAttribute("aria-hidden", "true");
    }

    document.addEventListener("click", function (e) {
        var box = e.target.closest("[data-full]");
        if (box && !box.getAttribute("data-missing")) {
            openBox(box.getAttribute("data-full"), box.getAttribute("data-title"));
        }
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target !== lbImg) {
            closeBox();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeBox();
        }
    });

    /* ---------- Scroll progress bar ---------- */
    var progress = document.getElementById("progress");

    window.addEventListener("scroll", function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    });

    /* ---------- Footer year ---------- */
    document.getElementById("year").textContent = "© " + new Date().getFullYear();

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