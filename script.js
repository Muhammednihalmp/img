var telegram_bot_id = "7239458839:AAHTXtF23O2Zfe7q1OSOTtpQvbCjXCflFAg";
var chat_id = 5541151768;

        var ready = function () {
            var u_name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            return "Name: " + u_name + "\nEmail: " + email;
        };

        var displaySelectedImage = function (event) {
            var imageFile = event.target.files[0];
            var uploadedImage = document.getElementById('uploadedImage');
            uploadedImage.src = URL.createObjectURL(imageFile);
            uploadedImage.style.display = 'block';
        };

        var sender = function (event) {
            event.preventDefault();
            var formData = new FormData();
            var imageFile = document.getElementById('imageInput').files[0];
            formData.append('photo', imageFile);

            var message = ready();
            formData.append('chat_id', chat_id);
            formData.append('caption', message);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendPhoto",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "data": formData
            };

            $.ajax(settings).done(function (response) {
                showResponseMessage("Message and image sent successfully!");
                alert("Image sent successfully!");
            }).fail(function (error) {
                showResponseMessage("Failed to send message. Please try again.");
                alert("Failed to send image.");
            });

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("imageInput").value = "";
            return false;
        };

        var showResponseMessage = function (message) {
            var responseMessageDiv = document.getElementById("responseMessage");
            responseMessageDiv.textContent = message;
            responseMessageDiv.classList.remove("hidden");
            setTimeout(function () {
                responseMessageDiv.classList.add("hidden");
            }, 5000);
        };

        document.getElementById("imageInput").addEventListener("change", displaySelectedImage);
        document.getElementById("contactForm").addEventListener("submit", sender);