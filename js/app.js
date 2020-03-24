// Event Listners function

const cart = new Cart();

document.addEventListener("DOMContentLoaded", function() {
    // Initialize the HTMLUI 
        const html = new HTMLUI();
        
        
    // Get the courses
    const list = document.getElementById("courses-list");
    list.addEventListener("click", function(e) {
        if(e.target.classList.contains("add-to-cart")) {
            const course = e.target.parentElement.parentElement;
            html.displayCourse(course);
        }
    });
});


function HTMLUI() {}

HTMLUI.prototype.displayCourse = function(course) {

    const courseList = {
        img: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector(".price span").textContent,
        id: course.querySelector(".info-card a").getAttribute("data-id")
    }

    // Insert the selected course into the HTML mockup
        const shoppingCart = document.querySelector("#cart-content tbody");
        const row = document.createElement('tr');
            row.innerHTML = `
                <tr>
                    <td><img src="${courseList.img}" width="200"></td>
                    <td>${courseList.title}</td>
                    <td>${courseList.price}</td>
                    <td><a href="javascript:void(0)" class="remove">x</a></td>
                </tr>
            `;
        shoppingCart.appendChild(row);
        cart.addToLocalStorage(courseList);
}


function Cart(courseList) {
    this.courseList = courseList;
}


Cart.prototype.addToLocalStorage = function(courseList) {
    
    if(!JSON.parse(localStorage.getItem("courses"))) {
        const courses = [];
        courses.push(courseList);
        localStorage.setItem("courses", JSON.stringify(courses));
    }else {
        const courses = JSON.parse(localStorage.getItem("courses"));
        courses.push(courseList);
        localStorage.setItem("courses", JSON.stringify(courses));
    } 
}

