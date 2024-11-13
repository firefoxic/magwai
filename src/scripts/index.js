import { activateNavigation } from "../components/Navigation/index.js"
import { loadPostPreviews } from "../components/PostList/index.js"

let navigations = document.querySelectorAll(`.Navigation`)

navigations.forEach((navigation) => { activateNavigation(navigation) })

loadPostPreviews()
