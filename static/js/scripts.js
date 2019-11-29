
// Once button gets hit, get string from textbox
function buttonHit() {
        
    if($('.search.bar').val() != ''){
        q = "q="+$('.search.bar').val();
        // Get the app_key and app id
        var url = "https://api.edamam.com/search?" + q + "&app_id=4a6fc98d&app_key=1d0d0df2a038b26f451f70a62cd39b06&to=10";
        searchRecipe(url)
    } else {
        alert("User Error: Try to input legit food in there");
    }
};

// Display table 
function searchRecipe(url) {

    var html = '';

    html += '<table class="table table-responsive table-striped table-light">'+
            '  <thead class="thead-dark">'+
            '    <tr>'+
            '      <th scope="col">Image</th>'+
            '      <th scope="col">Qty</th>'+
            '      <th scope="col">Unit</th>'+                     
            '      <th class="col">Title</th>'+
            // '      <th class="col">Allergies</th>'+
            '      <th scope="col">Energy</th>'+
            '      <th scope="col">Nutrients</th>'+          
            '    </tr>'+
            '  </thead>'+
            '  <tbody>';

    axios.get(url).then(function(data) {

            for (var i = 0; i < 10; i++) {

                    if (typeof(data.data.hits[i].recipe.image) != "undefined") {
                            img = '<img style="height: 50%; background: white" src="'+data.data.hits[i].recipe.image+'">';
                    } else {img = ''}

                    if (typeof(data.data.hits[i].recipe.yield) != "undefined") {
                            srv = Math.round(data.data.hits[i].recipe.yield);
                    } else {srv = '-'}

                    // im using the name as a hyper link.
                    if (typeof(data.data.hits[i].recipe.url) != "undefined") {
                            ingr = '<a target="_blank" href="'+data.data.hits[i].recipe.url+'">'+ data.data.hits[i].recipe.label +'</a>';
                    } else {ingr = '-'}

                    // var hLabelsArray = new Array();
                    // var allergies = '';
                    // if (typeof(data.data.hits[i].recipe.healthLabels) != "undefined") {
                    //         for (var j = 0; j < data.data.hits[i].recipe.healthLabels.size; j++) {

                    //                 allergies += data.data.hits[i].recipe.healthLabels.foodId;
                    //                 alert(allergies);
                    //         }
                    // } else {hLabelsArray = '-'}
                    
                    if (typeof(data.data.hits[i].recipe.totalNutrients.ENERC_KCAL.quantity) != "undefined") {
                            cal = '<b>'+Math.floor(data.data.hits[i].recipe.totalNutrients.ENERC_KCAL.quantity)+' kcal</b>';
                    } else {cal = '-'}

                    if (typeof(data.data.hits[i].recipe.totalNutrients.PROCNT.quantity) != "undefined") {
                            pro = 'Protein: <b>'+ "  " +Math.floor(data.data.hits[i].recipe.totalNutrients.PROCNT.quantity)+' g</b></br>';
                    } else {pro = ''}
                    
                    if (typeof(data.data.hits[i].recipe.totalNutrients.FAT.quantity) != "undefined") {
                            fat = 'Fat: <b>'+ "  " +Math.floor(data.data.hits[i].recipe.totalNutrients.FAT.quantity)+' g</b></br>';
                    } else {fat = '-'}
                    
                    if (typeof(data.data.hits[i].recipe.totalNutrients.CHOCDF.quantity) != "undefined") {
                            carbs = 'Carbs: <b>'+ "  " + Math.floor(data.data.hits[i].recipe.totalNutrients.CHOCDF.quantity)+' g</b></br>';
                    } else {carbs = '-'}

                    html += '<tr>'+
                    '	        <td>'+img+'</td>'+
                    '	        <td>'+srv+'</td>'+
                    '	        <td>servings</td>'+
                    '               <td>'+ingr+'</td>'+
                    // '               <th>'+allergies+'</th>'+
                    '               <td>'+cal+'</td>'+
                    '               <td>'+pro+fat+carbs+'</td>'+           
                    '       </tr>';
            }       

            html += '	</tbody>'+
                      '</table>';
            
            document.getElementById("result-area").innerHTML = html;
    });
}