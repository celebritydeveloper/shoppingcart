

// Initialize the HTMLUI 
const cart = new Cart();
const html = new HTMLUI();

// Event Listners function

document.addEventListener("DOMContentLoaded", function() {
    
    html.fetchCourseFromStorage();

    // Get the courses
    const list = document.getElementById("courses-list");
    list.addEventListener("click", function(e) {
        if(e.target.classList.contains("add-to-cart")) {
            const course = e.target.parentElement.parentElement;
            cart.addToLocalStorage(course);
        }
    });

    const remove = document.querySelector("#cart-content tbody");
    remove.addEventListener("click", function(e) {
        
        
        const courses = JSON.parse(localStorage.getItem("courses"));
        
        const deleted = e.target.getAttribute("data-id");

        courses.forEach((courseList, index) => {
            const id = courseList.id;
            
            if(deleted === id) {
                courses.splice(index, 1);
            }
            html.fetchCourseFromStorage();
            localStorage.setItem("courses", JSON.stringify(courses));
            
        });

        
    });
    

    
});


function HTMLUI() {}

function Cart() {}






HTMLUI.prototype.fetchCourseFromStorage = function() {
    const courses = JSON.parse(localStorage.getItem("courses"));

    courses.forEach(course => {
        // Insert the selected course into the HTML mockup
        const shoppingCart = document.querySelector("#cart-content tbody");
        const row = document.createElement('tr');
        
            row.innerHTML = `
                <tr>
                    <td><img src="${course.img}" width="200"></td>
                    <td>${course.title}</td>
                    <td>${course.price}</td>
                    <td><a href="javascript:void(0)" class="remove" data-id="${course.id}">x</a></td>
                </tr>
            `;
        shoppingCart.appendChild(row);
        
    });
}





Cart.prototype.addToLocalStorage = function(course) {

    const courseList = {
        img: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector(".price span").textContent,
        id: course.querySelector(".info-card a").getAttribute("data-id")
    }
    
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





// Cart.prototype.removeCourseFromStorage = function(course) {
//     const courses = html.fetchCourseFromStorage();
//         // const courseDelete = courses.substring(0, course.length - 1);
//         courses.forEach((courseLS, index) => {
//             if(courseDelete === courseLS) {
//                 courses.splice(index, 1);
//             }
//         });
// }

// cart.removeCourseFromStorage();
