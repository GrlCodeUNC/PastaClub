
$("#signup-btn").on("click", function(event) {
    event.preventDefault();

    var newSignup = { 
        name: $("#name").val().trim(),
        email: $("#email").val().trim(),
        password: $("#password").val().trim()
    };

    $.post("/api/signup", newSignup)

        .then(function(data) {
            $.get("/dashboard", function(results) {
            console.log(results);
        });
    });
});