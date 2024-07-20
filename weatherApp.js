window.addEventListener('load', function () 
{
    const formBox = document.getElementById("container");
    //console.log(formBox)

    const form = document.getElementById('submission'); // Use document.getElementById instead of formBox.getElementById

    form.addEventListener('submit', function(event) 
    {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        console.log("Working");
    
        const city = document.getElementById('location').value;
    
        // Basic validation
        if (city === '') 
        {
            alert('Please fill in all fields');
            return;
        }
    
        // If validation passes, you can handle form submission here (e.g., send data to a server)
        console.log('Form submitted successfully!');
        console.log('City:', city);
    });
});
