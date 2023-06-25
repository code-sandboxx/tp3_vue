<template>
    <section class="catalogue_wrapper">
    <router-link class="btn btn_ajouter" :to="{name: 'add-product'}">Ajouter un produit +</router-link>
    <section class="catalogue">

        <div v-for="(product, index) in inventory" :key="product.id" class="item_wrapper">

             <!-- Product image-->
            <div class="item_img_container">
                <img :src="require(`@/assets/img/${product.photo}`)" alt="image de produit"/>
            </div>
            <!-- Product details-->
            <div class="item_contenu">
                <!-- Product name-->
                <h2 class="item_nom">{{ product.name }}</h2>
                <!-- Product price-->
                <div class="item_description">{{ product.description }}</div>
                <div class="item_prix">$ {{ product.price }}</div>
                <div class="item_categorie">{{ product.category }}</div>
            </div>
            <!-- Product actions-->
            <div class="controles">
              <router-link class="btn btn_modifier" :to="{name: 'edit-product', params: {id: product.id}}">Modifier</router-link>
              <button class="btn btn_supprimer" @click="deleteProduct(product.id, index)">Supprimer</button>
            </div>

        </div>
    </section>
    </section>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'

export default {
  props: ['inventory', 'removeInv'],
  data () {
    return {
      submitted: false,
      message: null,
      product: {},
      id: parseInt(this.$route.params.id)
    }
  },
  methods: {
    deleteProduct (productId, productIndex) {
      ProductDataService.delete(productId)
        .then(response => {
          this.removeInv(productIndex)
          this.$router.push({ name: 'catalogue' })
        })
    }
  }
}
</script>
