const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections= document.querySelector('.main-content');


function PageTransitions(){
    //Button click active class
    for(let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        })
    }

    //Sections Active Class
    allSections.addEventListener('click', (e) =>{
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other btns
            sectBtns.forEach((btn) =>{
                btn.classList.remove('active');
            })
            e.target.classList.add('active');

            //hide other sections
            sections.forEach((section)=>{
                section.classList.remove('active');
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })
}

PageTransitions();

//Handling the Contact section so that it gets the messages
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    const submitBtn = form.querySelector(".submit-btn button");
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Stop the default form submission

        // Get form data
        const formData = new FormData(form);

        // Disable button while sending
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = "Sending...";
        submitBtn.querySelector('.btn-icon i').classList.add('fa-spinner', 'fa-spin');
        submitBtn.querySelector('.btn-icon i').classList.remove('fa-paper-plane');

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData, // ✅ Sending as FormData, not JSON
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                alert("Message sent successfully! 🎉");
                form.reset(); // Clear the form fields
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            alert("Something went wrong. Please check your connection.");
        } finally {
            // Re-enable the button
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = "Send Message";
            submitBtn.querySelector('.btn-icon i').classList.remove('fa-spinner', 'fa-spin');
            submitBtn.querySelector('.btn-icon i').classList.add('fa-paper-plane');
        }
    });
});
