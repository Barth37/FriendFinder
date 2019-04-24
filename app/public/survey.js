for (var config) {
    $('.chosen-select').chosen(config['.chosen-select']);
  });
// Capture the form inputs 
$("#submit").on("click", function() {
  // Form validation
  function validateForm() {
    var isValid = true;
    $('.form-control').each(function() {
      if ($(this).val() === '')
        isValid = false;
    });
    $('.chosen-select').each(function() {
      if ($(this).val() === "")
        isValid = false
    })
    return isValid;
  }
  // If all required fields are filled
  if (validateForm() == true) {
    // Create an object for the user's data
    var userData = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: [$("#question1").val(), $("#question2").val(), $("#question3").val(), $("#question4").val(), $("#question5").val(), $("#question6").val(), $("#quesiton7").val(), $("#question8").val(), $("#question9").val(), $("#question10").val()]
      }
      // Grab the URL of the website
    var currentURL = window.location.origin;
    // AJAX post the data to the friends API. 
    $.post(currentURL + "/api/friends", userData, function(data) {
      // Grab the result from the AJAX post so that the best match's name and photo are displayed.
      $("#matchName").text(data.name);
      $('#matchImg').attr("src", data.photo);
      // Show the modal with the best match 
      $("#resultsModal").modal('toggle');
    });
  } else {
    alert("Please make sure all fields are filled out.");
  }

  return false;
});