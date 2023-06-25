<template>
  <div class="navbar">

    <div class="logo_wrapper">

      <router-link to="/">
        <div class="logo_image_container">
          <img :src="require(`@/assets/img/focus.png`)" alt="image logo">
        </div>
      </router-link>
      <div class="logo_text">
        Pro Photo
      </div>

    </div>

    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/catalogue">Catalogue</router-link>
    </nav>
  </div>
  <!-- Le composant de la route sera affiché ici -->
  <RouterView
    :inventory="inventory"
    :addInv="addInventory"
    :removeInv = "removeInventory"
    :updateInv="updateInventory"
  />
  <footer>
    <p>&copy; 2023 Copyright</p>
  </footer>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'

export default {
  data () {
    return {
      inventory: []
    }
  },
  methods: {
    addInventory (data) {
      this.inventory.push(data)
    },
    removeInventory (index) {
      this.inventory.splice(index, 1)
    },
    updateInventory (index, data) {
      this.inventory[index].name = data.name
      this.inventory[index].photo = data.photo
      this.inventory[index].price = data.price
      this.inventory[index].description = data.description
      this.inventory[index].category = data.category
    }
  },
  mounted () {
    ProductDataService.getAll()
      .then(response => {
        this.inventory = response.data
        // console.log(response.data)
      })
  }
}
</script>
