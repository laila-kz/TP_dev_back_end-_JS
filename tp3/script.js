const {createApp} = Vue;

createApp({
    data(){
        return {
            pieces: [
  {
    "id": 1,
    "nom": "Batterie 12V",
    "prix": 120,
    "categorie": "Électricité",
    "disponible": true,
    "image": "image1.jpg"
  },
  {
    "id": 2,
    "nom": "Filtre à huile",
    "prix": 15,
    "categorie": "Filtration",
    "disponible": false,
    "image": "image2.jpg"
  },
  {
    "id": 3,
    "nom": "Bougies d'allumage (x4)",
    "prix": 35,
    "categorie": "Moteur",
    "disponible": true,
    "image": "image3.jpg"
  },
  {
    "id": 4,
    "nom": "Disques de frein (x2)",
    "prix": 80,
    "categorie": "Freinage",
    "disponible": false,
    "image": "image4.jpg"
  },
  {
    "id": 5,
    "nom": "Courroie de distribution",
    "prix": 90,
    "categorie": "Moteur",
    "disponible": true,
    "image": "image5.jpg"
  },
  {
    "id": 6,
    "nom": "Pompe à eau",
    "prix": 70,
    "categorie": "Refroidissement",
    "disponible": false,
    "image": "image6.jpg"
  },
  {
    "id": 7,
    "nom": "Amortisseurs arrière (x2)",
    "prix": 150,
    "categorie": "Suspension",
    "disponible": true,
    "image": "image7.jpg"
  },
  {
    "id": 8,
    "nom": "Filtre à air",
    "prix": 20,
    "categorie": "Filtration",
    "disponible": false,
    "image": "image8.jpg"
  },
  {
    "id": 9,
    "nom": "Capteur ABS",
    "prix": 50,
    "categorie": "Sécurité",
    "disponible": true,
    "image": "image9.jpg"
  },
  {
    "id": 10,
    "nom": "Radiateur de refroidissement",
    "prix": 130,
    "categorie": "Refroidissement",
    "disponible": false,
    "image": "image10.jpg"
  },
  {
    "id": 11,
    "nom": "Alternateur",
    "prix": 200,
    "categorie": "Électricité",
    "disponible": true,
    "image": "image11.jpg"
  },
  {
    "id": 12,
    "nom": "Démarreur",
    "prix": 180,
    "categorie": "Électricité",
    "disponible": false,
    "image": "image12.jpg"
  },
  {
    "id": 13,
    "nom": "Kit d’embrayage",
    "prix": 220,
    "categorie": "Transmission",
    "disponible": true,
    "image": "image13.jpg"
  },
  {
    "id": 14,
    "nom": "Injecteur de carburant",
    "prix": 110,
    "categorie": "Moteur",
    "disponible": false,
    "image": "image14.jpg"
  },
  {
    "id": 15,
    "nom": "Pompe à carburant",
    "prix": 90,
    "categorie": "Carburant",
    "disponible": true,
    "image": "image15.jpg"
  },
  {
    "id": 16,
    "nom": "Capteur de pression des pneus (TPMS)",
    "prix": 45,
    "categorie": "Sécurité",
    "disponible": false,
    "image": "image16.jpg"
  },
  {
    "id": 17,
    "nom": "Rétroviseur extérieur",
    "prix": 60,
    "categorie": "Carrosserie",
    "disponible": true,
    "image": "image17.jpg"
  },
  {
    "id": 18,
    "nom": "Échappement complet",
    "prix": 250,
    "categorie": "Échappement",
    "disponible": false,
    "image": "image18.jpg"
  },
  {
    "id": 19,
    "nom": "Vanne EGR",
    "prix": 140,
    "categorie": "Moteur",
    "disponible": true,
    "image": "image19.jpg"
  },
  {
    "id": 20,
    "nom": "Turbo",
    "prix": 400,
    "categorie": "Moteur",
    "disponible": false,
    "image": "image20.jpg"
  },
  {
    "id": 21,
    "nom": "Joint de culasse",
    "prix": 75,
    "categorie": "Moteur",
    "disponible": true,
    "image": "image21.jpg"
  },
  {
    "id": 22,
    "nom": "Boîtier de direction",
    "prix": 300,
    "categorie": "Direction",
    "disponible": false,
    "image": "image22.jpg"
},
{
    "id": 23,
    "nom": "Silent bloc de suspension",
    "prix": 35,
    "categorie": "Suspension",
    "disponible": true,
    "image": "image23.jpg"
},
{
    "id": 24,
    "nom": "Cardan de transmission",
    "prix": 160,
    "categorie": "Transmission",
    "disponible": false,
    "image": "image24.jpg"
},
{
    "id": 25,
    "nom": "Capteur de position vilebrequin",
    "prix": 50,
    "categorie": "Moteur",
    "disponible": true,
    "image": "image25.jpg"
}

            ],
            searchQuery: '',
            selectedCategory: '',
            cart: []
        }
    },
    computed: {
      filteredProducts(){
        let filtered = this.pieces;
        // show only available pieces by default
        filtered = filtered.filter(piece => piece.disponible);
        if(this.searchQuery){
          filtered = filtered.filter(piece => piece.nom.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
        if(this.selectedCategory){
          filtered = filtered.filter(piece => piece.categorie === this.selectedCategory);
        }
        return filtered;
      }
    },
    methods: {
        addToCart(piece) {
            this.cart.push(piece);
            alert(`${piece.nom} a été ajouté au panier.`);
        },
        
    },
}).mount('#app');