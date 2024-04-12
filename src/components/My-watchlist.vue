<template>
    <div class="container">
      <SideBar></SideBar>
  
      <header class="header">
        <h2>My Stock Watch List</h2>
      </header>
  
      <div class="form-group row">
        <div class="col-md-3 form-group">
      <label for="stock-select">Select Stock:</label>
      <select v-model="selectedsymbol" id="stock-select" class="form-control">
        <option value="">Select a stock</option>
        <option v-for="stock in stocknames" :value="stock.symbol" :key="stock.symbol">{{ stock.stock }}</option>
      </select>
        </div>

        <div class="col-md-3 form-group">
            <label>Volume of stocks:</label>
            <input type="text" v-model.number="volume" placeholder="Enter volume" />
        </div>
    </div>
        <div class="form-group row">
            <div class="form-group"><label>Price Range:</label></div>
            <div class="col-md-3 form-group"><input type="text" v-model.number="min" placeholder="Min Price" /></div>
            <div class="col-md-3 form-group"><input type="text" v-model.number="max" placeholder="Max Price" /></div>

            <div class="col-md-3 form-group"><button @click="filterstocks" class="btn btn-primary">Filter</button></div>
        </div>
      

      
  
      <div v-if="showResults" class="search-results header">
        <h3>Stocks you wanted to watch out</h3>
      </div>
        

        <table class="table">
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>All time High</th>
              <th>All time Low</th>
              <th>Present Price</th>
              <th>Volume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, index) in searchData" :key="index">
          <td>{{ stock.symbol }}</td>
          <td>{{ stock.high }}</td>
          <td>{{ stock.low }}</td>
          <td>{{ stock.price }}</td>
          <td>{{ stock.volume }}</td>
          <td>
            <button class="btn-danger btn mr-2" @click="deleteEntry(stock.id)">Delete</button>
          </td>
            </tr>
          </tbody>
        </table>
      
  
    </div>
  </template>
  
  
  <script>
  // import AddOrder from './Add-order.vue';
  import SideBar from './Stock-view.vue'
    import axios from 'axios';
  export default {
    components:{
      SideBar,
  },
  
    data() {
      return {
        showTable : true,
        searchData : '',
        max : '',
        min : '',
        volume : '',
        selectedsymbol : '',
        stocknames : '',

      };
    },
    mounted() {
      this.getstocklist()
      this.filterstocks()
    },
    methods: {
      getstocklist() {
      axios
        .get('http://localhost:3000/api/getstockslist', {  })
        .then((response) => {
            this.stocknames = response.data
        })
        .catch((error) => {
            console.error(error);
          });
    },
    filterstocks() {
        this.showTable = true;
        this.volume = this.volume.toString()
        const url =`http://localhost:3000/api/getmystockslist/?max=${this.max}&min=${this.min}&symbol=${this.selectedsymbol}&volume=${this.volume}`;
        axios
          .get(url)
          .then((response) => {
            this.searchData = response.data;
            // alert(JSON.stringify(this.searchData));
          })
          .catch((error) => {
            console.error(error);
          });
      },
      deleteEntry(id) {
        const url = `http://localhost:3000/api/deletemystocks/?id=${id}`
        axios
          .delete(url)
          .then((response) => {
            const data = response.data
            alert(data)
            
          })
          .catch((error) => {
            console.error(error);
          });
      },
      editEntry(item){
        this.editarray=item;
        this.editpage=!this.editpage;
        this.search()
      }
  
    //   updateEntry() {
    //     const data = {
    //       id: this.editedId,
    //       qty: this.uqty,
    //     };
  
    //     axios
    //       .put(`http://localhost:3000/update/${this.editedId}`, data) // Change the URL accordingly
    //       .then(() => {
    //         alert('Entry updated successfully');
    //         this.cancelEdit();
    //         this.search();
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         alert('Failed to update entry');
    //       });
    //   },
    // },
    }
  };
  
  
  
  </script>
  
  <style scoped>
  .search-results {
    margin-top: 20px;
  }
  
  .result-row {
    display: flex;
  }
  .flex-item {
    flex: 1; /* Distribute available space equally among items */
    margin-right: 20px; /* Add margin between items */
  }
  .result-row p {
    margin-right: 20px;
  }
  .container {
    padding: 20px;
    max-width: 1300px;
    margin: auto;
    margin-bottom: 120px;
    margin-right: 30px;
  }
  
  .header {
    background-color: #007bff;
    color: #fff;
    padding: 10px 0;
    text-align: center;
    margin-bottom: 60px;
    margin-top: 90px
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  