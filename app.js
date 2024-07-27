const inputTitle = document.querySelector('#input-title');
const inputAuthor = document.querySelector('#input-author');
const inputBody = document.querySelector('#input-body');
const blogPosts = document.querySelector('#blog-posts');

const btnSuccess = document.querySelector('#btnSuccess');
const btnReset = document.querySelector('#btnReset');

// load existing posts from localStorage
let userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

document.addEventListener('DOMContentLoaded', function() {
    // retrieve all existing posts
    const existingPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    // cycle through each post in the userPosts array 
    existingPosts.forEach((post, index) => {
        // Iterate through each key-value pair in the post object 
        for(const [key, value] of Object.entries(post)) {
            console.log(`Key: ${key}, Value: ${value}`);
        }

        // Render posts to the page 
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Author: ${post.author}</h6>
                    <p class="card-text">${post.body}</p>
                    <p class="card-text">timestamp: ${post.timestamp}</p>
                    <div class="vote-container">
                        <button class="vote-up" data-index="${index}">↑</button>
                        <span class="vote-up-count">${post.voteUp}</span>
                        <button class="vote-down" data-index="${index}">↓</button>
                        <span class="vote-down-count">${post.voteDown}</span>
                    </div>
                </div>
            </div>
        `;
        blogPosts.appendChild(postElement);
    })

    // Add event listeners for voting
    document.querySelectorAll('.vote-up, .vote-down').forEach(button => {
        button.addEventListener('click', handleVote);
    });

    console.log('DOM fully loaded and parsed');
});


if(userPosts.length === 0) {
    localStorage.setItem("userPosts", JSON.stringify(userPosts));
}

btnSuccess.addEventListener('click', () => {
    submitPost();
    console.log('success button clicked')
})

btnReset.addEventListener('click', () => {
    resetFields();
    console.log('reset button clicked')
})

function submitPost() {
    //validation of text fields before submissions
    if(inputTitle.value === "" || inputAuthor.value === "" || inputBody.value === "") {
        console.log("some fields missing. unable to submit post.")
    } else {
        console.log("all fields entered.")
        blogPost = {
            title: inputTitle.value,
            author: inputAuthor.value,
            body: inputBody.value,
            timestamp: new Date().toISOString(),
            voteUp: 0,
            voteDown: 0
        }
        console.log("blog post created.")

        userPosts.push(blogPost);
        localStorage.setItem("userPosts", JSON.stringify(userPosts));

        resetFields();
    }
}

function resetFields() {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputBody.value = "";
}

function handleVote(event) {
    const button = event.target;
    const index = parseInt(button.dataset.index);
    const isUpvote = button.classList.contains('vote-up');

    // Get current posts from localStorage
    let posts = JSON.parse(localStorage.getItem("userPosts")) || [];

    // Update the vote count
    if (isUpvote) {
        posts[index].voteUp++;
    } else {
        posts[index].voteDown++;
    }

    // Save updated posts back to localStorage
    localStorage.setItem("userPosts", JSON.stringify(posts));

    // Update the display
    const voteCountElement = button.nextElementSibling;
    voteCountElement.textContent = isUpvote ? posts[index].voteUp : posts[index].voteDown;
}
   

