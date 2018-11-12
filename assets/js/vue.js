var areaSelect = new Vue ({
  el: '#areaSelect',
  data: {
    target_url: 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',
    attractions: [],
    show:'',
    filteredAttractions: [],
    hotArea: [],
  },
  created: function() {
      this.getData()
  
  },
  computed: {
    zones: function() { 
      // console.log('This is from mapZone', this.attractions)
      return [...new Set(this.attractions.map( p => p.Zone ))]
    },
  },
  methods: {
    getData: function(){
      var vm = this
      axios.get(vm.target_url)
      .then(res => {
        this.attractions = res.data.result.records
        // this.mapZone()
        // this.zones = [...new Set(this.attractions.map( p => p.Zone))]
        // console.log('This is from getData', vm.attractions)
      })
    },
    showData: function(value){
      var vm = this
      console.log(value)
      this.filteredAttractions = vm.attractions.filter(row =>row.Zone === value)
    },
  },
  components:{
    'card':{
      props:['name','ticketinfo','tel','add','opentime','picture1'],
      data:  function() {
        return {
          filteredAttractions: []
        }
      },
      methods: {
      },
      template:
        '<div class="card">' +
          '<div class="pic">' +
            '<img :src="picture1" class="img-responsive center-block">' +
          '</div>' +
          '<div class="img-intro">' +
            '<h3 >{{ name }}</h3>' +
          '</div>' +
          '<div class="caption">' +
            '<p>' +
              '<time>{{ opentime }}</time>' +
            '</p>'+
            '<p>{{ add }}</p>' +
            '<p>' + '<span itemprop="telephone">'+'<a href="tel:">{{ tel }}</a>' + '</span>' + '</p>' +
            '<p class="Ticke_tinfo">{{ ticketinfo }}</p>' +
          '</div>' +
        '</div>'
      }
  }
})