<template>
  <form class="form">
    <h1>Veuillez saisir les informations de produit</h1>
    <div v-show="message" class="error">{{ message }}</div>
    <div class="needs-validation" novalidate>
      <div v-if="!submitted">
        <!-- Product name input-->
        <div class="form_input_wrapper">
          <label>Nom du produit : </label>
          <div v-if="errors.name" class="error">
            Veuillez entrer un nom valide
          </div>
          <input
            type="text"
            v-model="product.name"
            placeholder="Ajoutez le nom du produit..."
            required
          />
        </div>
        <!-- Product description input-->
        <div class="form_input_wrapper">
          <label>Description : </label>
          <div v-if="errors.description" class="error">
            Veuillez entrer une description valide
          </div>
          <textarea
            placeholder="Ajoutez la description..."
            rows="7"
            v-model="product.description"
          ></textarea>
        </div>
        <!-- Product price input-->
        <div class="form_input_wrapper">
          <label>Prix, $ : </label>
          <div v-if="errors.price" class="error">Le prix est obligatoire</div>
          <input
            type="number"
            placeholder="$"
            v-model.number="product.price"
            required
          />
        </div>
        <!-- Product category input-->
        <div class="form_input_wrapper">
          <label>Categorie : </label>
          <div v-if="errors.category" class="error">
            la catégorie est obligatoire
          </div>
          <input
            type="text"
            placeholder="Ajoutez la categorie..."
            v-model="product.category"
            required
          />
        </div>
        <!-- Product image path-->
        <div class="form_input_wrapper img_generique_produit_wrapper">
          <label>Image de produit : </label>
          <div v-if="errors.photo" class="error">
            Veuillez entrer le nom de l'image valide
          </div>
          <input
            type="text"
            placeholder="Entrez le nom de l'image de produit..."
            v-model="product.photo"
            required
          />
        </div>
        <!-- Buttons-->
        <div class="controles">
          <router-link to="/catalogue" class="btn btn_retour"
            >Retour</router-link
          >
          <button
            type="button"
            class="btn btn_sauvegarder"
            @click="saveProduct"
          >
            Sauvegarder
          </button>
        </div>
      </div>
      <div v-else >
        <div class="product_add_success">
          <p> Le produit a ete ajouté!</p>
          <router-link to="/catalogue" class="btn btn_retour">Retour</router-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'

export default {
  props: ['addInv'],
  data () {
    return {
      submitted: false,
      message: null,
      product: {
        name: null,
        photo: null,
        price: null,
        description: null,
        category: null
      },
      errors: {
        name: false,
        photo: false,
        price: false,
        description: false,
        category: false
      }
    }
  },
  methods: {
    saveProduct () {
      this.errors = {
        name: !this.product.name,
        photo: !this.product.photo,
        price: !this.product.price,
        description: !this.product.description,
        category: !this.product.category
      }
      if (
        !(
          this.errors.name ||
          this.errors.photo ||
          this.errors.price ||
          this.errors.description ||
          this.errors.category
        )
      ) {
        ProductDataService.create(this.product)
          .then((response) => {
            this.product.id = response.data.id
            this.addInv(this.product)
            console.log(this.product)
            this.submitted = true
            this.message = null
          })
          .catch((error) => {
            this.message = error.response.data.message
          })
      }
    },
    newProduct () {
      this.product = {
        name: null,
        photo: null,
        price: null,
        description: null,
        category: null
      }
      this.errors = {
        name: false,
        photo: false,
        price: false,
        description: false,
        category: false
      }
      this.submitted = false
    }
  }
}
</script>
