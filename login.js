        document.addEventListener("DOMContentLoaded", function () {

            var statusBox = document.getElementById("status-message");

            if (window.location.hash === "#signup") {
                document.getElementById("signup-tab").checked = true;
            }

            function showStatus(message, color) {
                statusBox.style.backgroundColor = color;
                statusBox.innerText = message;
                statusBox.style.display = "block";
            }

            document.querySelectorAll(".tab-input").forEach(function (radio) {
                radio.addEventListener("change", function () {
                    statusBox.style.display = "none";
                });
            });

            function getUsers() {
                try {
                    return JSON.parse(localStorage.getItem("aseUsers")) || [];
                } catch (e) {
                    return [];
                }
            }

            document.getElementById("signup-btn").addEventListener("click", function () {
                var name = document.getElementById("s-name").value.trim();
                var email = document.getElementById("s-email").value.trim().toLowerCase();
                var password = document.getElementById("s-password").value;
                var confirm = document.getElementById("s-confirm").value;

                if (!name || !email || !password) {
                    showStatus("Please fill in all the fields.", "#dc3545");
                    return;
                }
                if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                    showStatus("Please enter a valid email address.", "#dc3545");
                    return;
                }
                if (password.length < 6) {
                    showStatus("Password must be at least 6 characters.", "#dc3545");
                    return;
                }
                if (password !== confirm) {
                    showStatus("Passwords do not match.", "#dc3545");
                    return;
                }

                var users = getUsers();
                var exists = users.some(function (u) { return u.email === email; });
                if (exists) {
                    showStatus("An account with this email already exists.", "#dc3545");
                    return;
                }

                users.push({ name: name, email: email, password: password });
                localStorage.setItem("aseUsers", JSON.stringify(users));

                showStatus("Account created. You can log in now.", "#1f9d6b");
                document.getElementById("s-name").value = "";
                document.getElementById("s-email").value = "";
                document.getElementById("s-password").value = "";
                document.getElementById("s-confirm").value = "";

                setTimeout(function () {
                    document.getElementById("login-tab").checked = true;
                    statusBox.style.display = "none";
                }, 1500);
            });

            document.getElementById("login-btn").addEventListener("click", function () {
                var email = document.getElementById("l-email").value.trim().toLowerCase();
                var password = document.getElementById("l-password").value;

                if (!email || !password) {
                    showStatus("Please enter your email and password.", "#dc3545");
                    return;
                }

                var match = getUsers().filter(function (u) {
                    return u.email === email && u.password === password;
                })[0];

                if (!match) {
                    showStatus("Wrong email or password.", "#dc3545");
                    return;
                }

                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("userName", match.name);

                showStatus("Welcome back, " + match.name + "!", "#1f9d6b");

                setTimeout(function () {
                    window.location.href = "home.html";
                }, 1500);
            });

        });