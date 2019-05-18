import categoryCreate from './categoryCreate.js'
import categoryDelete from './categoryDelete.js'

document.addEventListener("DOMContentLoaded", function() {
  categoryCreate.createNewCategory()
  categoryDelete.categoryDelete()
})
