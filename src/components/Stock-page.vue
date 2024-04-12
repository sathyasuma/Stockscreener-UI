<template>
  <div class="container">
    <SideBar></SideBar>

    <header class="header">
      <h2>Stock Screener</h2>
    </header>
    
    <div class="col-md-5 form-group">
      <label for="stock-select">Select Stock:</label>
      <select v-model="selectedStock" id="stock-select" class="form-control">
        <option value="">Select a stock</option>
        <option v-for="(item, index) in stocknames" :key="index" :value="item.symbol">{{ item.stock }}</option>
      </select>
    </div>
    <div class="result-row">
    <div class="col-md-3 form-group">
      <label for="from-date">From Date:</label>
      <input type="date" v-model="fromDate" id="from-date" class="form-control">
    </div>

    <div class="col-md-3 form-group">
      <label for="to-date">To Date:</label>
      <input type="date" v-model="toDate" id="to-date" class="form-control">
    </div>
    </div>

    <div></div>

    <div class="col-md-3 form-group">
    <button @click="search" class="btn btn-primary">Search</button>

    
    </div>

    <div v-if="showResults ==  true" class="search-results">
      <div class="header">
      <h3>Search Results</h3>
      </div>
      
      <div class="result-row">
        <p><strong>Stock Name:</strong> {{ this.searchData["Meta Data"]["2. Symbol"] }}</p>
        <p><strong>Information :</strong> {{ this.searchData["Meta Data"]["1. Information"] }}</p>
        <p><strong>Last Refreshed:</strong> {{this.searchData["Meta Data"]["3. Last Refreshed"]}}</p>
        
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Daily Open</th>
            <th>Daily High</th>
            <th>Daily Low</th>
            <th>Daily Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, date) in stockslist" :key="date">
          <td>{{ date }}</td>
          <td>{{ item['1. open'] }}</td>
          <td>{{ item['2. high'] }}</td>
          <td>{{ item['3. low'] }}</td>
          <td>{{ item['4. close'] }}</td>
          <td>{{ item['5. volume'] }}</td>
        </tr>
        </tbody>
      </table>
    
      <div class="col-md-2" v-if="showResults == true">
        <button @click="addToWatchlist" class="btn btn-danger">Add to my watchlist</button>
        </div>
      </div>
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
      showResults:false,
      fromDate:'',
      toDate:'',
      selectedStock:'',
      searchData:'',
      stockslist:[],
      editing:false,
      editedId: null,
      updatedName: '',
      addpage:false,
      editpage:false,
      editarray:[],
      alltimehigh:0,
      alltimelow:0,
      lastprice:0,
      lastvol:0,
      stocknames:'',
      stocks:[],
      stocksymbol:'',
    };
  },
  mounted() {
    this.getstocklist();
  },
  methods: {
    getstocklist() {
      axios
        .get('http://localhost:3000/api/getstockslist', {  })
        .then((response) => {
            this.stocknames = (response.data)

        })
    },
    finddetails(dataArray) {
          let maxHigh = -Infinity;
          let minLow = Infinity;

          dataArray.forEach(data => {
          const high = parseFloat(data.high);
          const low = parseFloat(data.low);

          if (high > maxHigh) {
            maxHigh = high;
          }
          if (low < minLow) {
            minLow = low;
          }
        });
        const lastClose = Number(dataArray[0].close);
        const lastvolume = Number(dataArray[0].volume);
        this.alltimehigh = Number(maxHigh);
        this.alltimelow = Number(minLow);
        this.lastprice = Number(lastClose)
        this.lastvol = Number(lastvolume)
        this.stocksymbol = this.searchData["Meta Data"]["2. Symbol"]
    },

    formattingddate(date){
      const parts = date.split('-');

      const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

      // Format the date in "YYYY-MM-DD" format
      const formattedDate = dateObject.toISOString().split('T')[0];
      return formattedDate
    },

    filterDataByDateRange(data, fromDate, toDate) {
    const filteredData1 = {};
    for (const date in data) {
        if (date >= fromDate && date <= toDate) {
            filteredData1[date] = data[date];
        }
    }

    return filteredData1;
    },

    addToWatchlist(){
        if (this.alltimehigh == '' || this.alltimelow == '' || this.stocksymbol == '' || this.lastprice == '' || this.lastvol =='')
        {
          alert("Incomplete details to add to your watch list")
        }
        console.log(this.high)
        const url = `http://localhost:3000/api/addstocks?high=${this.alltimehigh}&low=${this.alltimelow}&price=${this.lastprice}&volume=${this.lastvol}&symbol=${this.stocksymbol}`;
        axios.post(url)
        .then((response) => {
          const data = response.data;
        alert(data.message);
      })
      .catch((error) => {
      console.error('Error adding stock to watchlist:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
      } else {
        alert('Failed to add stock to watchlist'); // Default error message
      }
    });
    },

    search() {
      if (this.selectedStock == '')
      {
        alert('Please enter the Stock to screen')
        return false
      }
      if (this.fromDate == '' || this.toDate == '')
      {
        alert('Please enter the From and To Date');
        return false
      }
      this.showResults = true;
      console.log(this.selectedStock)
      const url = `http://localhost:3000/api/getstocks?symbol=${this.selectedStock}`;
      axios.get(url)
        .then((response) => {
          const da = response
          console.log(da)
          this.searchData = response.data;
          
          const timeSeriesData = this.searchData["Time Series (Daily)"];

          // Storing time series data in an array
          const dataArray =[]
          for (const date in timeSeriesData) {
            if (Object.prototype.hasOwnProperty.call(timeSeriesData, date)) {
              const dailyData = timeSeriesData[date];
              dataArray.push({
                date: date,
                open: dailyData["1. open"],
                high: dailyData["2. high"],
                low: dailyData["3. low"],
                close: dailyData["4. close"],
                volume: dailyData["5. volume"]
              });
            }
          }
          this.finddetails(dataArray)
          console.log(dataArray)
          console.log("================================="+timeSeriesData+"===================")

          const filteredData = this.filterDataByDateRange(this.searchData["Time Series (Daily)"], this.fromDate, this.toDate);
          this.stockslist = (filteredData)
          console.log(this.stockslist+"fkjbauis")
        })
        .catch((error) => {
          console.error(error);
        });
    },

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
