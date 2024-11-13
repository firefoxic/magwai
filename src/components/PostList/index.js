const POSTS_PER_PAGE = 5
const MAX_POST_COUNT = 30

let page = 1
let users = [
	{
		id: 1,
		name: `Eugenia`,
	},
]

let postListContainer = document.querySelector(`.PostList-Container`)
let loadMoreButton = document.querySelector(`.PostList-LoadMoreButton`)
let template = document.getElementById(`post-preview-template`)

/**
 * Adds a "load more" button to the page and loads the first page of post
 * previews. When the button is clicked, loads the next page of post previews.
 */
export function loadPostPreviews () {
	loadMoreButton.addEventListener(`click`, (event) => {
		event.preventDefault()
		loadPosts()
	})

	loadPosts()
}

/**
 * Loads and renders the next page of post previews.
 * If all posts have already been loaded, hides the load more button.
 */
async function loadPosts () {
	if ((page - 1) * POSTS_PER_PAGE >= MAX_POST_COUNT) {
		loadMoreButton.style.display = `none`

		return
	}

	let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`)
	let posts = await response.json()

	posts.forEach(addPostToDOM)
	page++
}

/**
 * Adds a single post preview to the page.
 *
 * @param {Object} post - A post object from the JSONPlaceholder API.
 */
function addPostToDOM (post) {
	let postElement = template.content.cloneNode(true)

	let userName = users.find((user) => user.id === post.userId)?.name

	postElement.querySelector(`.PostPreview-Title`).textContent = post.title
	postElement.querySelector(`.PostPreview-Body`).textContent = post.body
	postElement.querySelector(`.PostPreview-Author`).textContent = userName

	let imageContainer = postElement.querySelector(`.PostPreview`)

	imageContainer.appendChild(generatePictureElement(post.id), imageContainer.firstChild)

	postListContainer.appendChild(postElement)
}

/**
 * Generates a picture element with a specified image ID.
 *
 * @param {number} id - The ID of the image, which is used to construct the src and srcset attributes for the source and img elements.
 *
 * @returns {HTMLElement} A picture element containing a source for AVIF format and an img for WebP format, both with the specified image ID.
 */
function generatePictureElement (id) {
	id = id < 10 ? `0${id}` : id

	let picture = document.createElement(`picture`)
	let source = document.createElement(`source`)

	source.srcset = `/shared/images/image${id}@2x.avif 2x, /shared/images/image${id}@1x.avif`
	source.type = `image/avif`
	source.width = 640
	source.height = 360
	picture.appendChild(source)

	let img = document.createElement(`img`)

	img.classList.add(`PostPreview-Image`)
	img.src = `/shared/images/image${id}@1x.webp`
	img.srcset = `/shared/images/image${id}@2x.webp 2x`
	img.width = 640
	img.height = 360
	img.alt = ``
	picture.appendChild(img)

	return picture
}
