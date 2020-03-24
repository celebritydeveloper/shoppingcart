// Variables Declarations
const items = document.getElementById('courses-list');
const cart = document.querySelector('#cart-content tbody');
const clearBtn = document.getElementById('clear-cart');
const subMenu = document.querySelector('.submenu span');



// Eventlistners functions
eventListners();


function eventListners() {
    items.addEventListener('click', buyCourse);
    cart.addEventListener('click', deleteCourse);
}
/*  */

// Buy Course Function
function buyCourse(e) {
    e.preventDefault();
    if(e.target.classList.contains('add-to-cart')){
        const course = e.target.parentElement.parentElement;
        fetchCourses(course);
    }   
}

// Add course Function
function fetchCourses(course) {
    courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('.info-card h4').textContent,
        price: course.querySelector('.price span').textContent
    }

    addCourseToStorage(courseInfo);
}


// Add Course into Localstroge Function
function addCourseToStorage(course) {
    if(localStorage.getItem('courses') === null) {
        let courses = [];
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }else {
        let courses = JSON.parse(localStorage.getItem('courses'));
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }
}



addCourseIntoCart();
// Add course into Cart
function addCourseIntoCart() {
    let courses = JSON.parse(localStorage.getItem('courses'));

    courses.forEach(course => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><img src="${course.image}" width="120"</td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td><a href="javascript:void(0)" class="remove">x</a></td>
        `;

        cart.appendChild(tr);
    });
}


// Update cart number of Items function
cartNumber();
function cartNumber() {
    let courses = JSON.parse(localStorage.getItem('courses'));

    const course = courses.keys();

    for(item of course) {
        subMenu.textContent = ++item;   
    }
}



// Remove Course Function
function deleteCourse(e) {
    if(e.target.classList.contains('remove')){
        let courses = JSON.parse(localStorage.getItem('courses'));

        const course = courses.keys();

        for(item of course) {
            localStorage.removeItem(item);  
        }
    }  
}


// Clear all Course Function
