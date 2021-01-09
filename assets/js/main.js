
var data_id = [];
var i = 1;
$(document).ready(function($) {

    var data = firebase.database().ref('/absensi');

    data.on('value', (snapshot) => {

        item = snapshot.val();
        $.each(item,function(index) {

            fetchData(item[index],i);
            i++; 
            
        });

        // $.each(item['tugas'], function(index) {
        //     loopData(item['tugas'][index]);

        // });

    });


});



$('#btn-submit').click(function(event) {

    var _tanggal = $('#_tanggal').val();
    var _kelas = $('#_kelas').val();
    var _mapel = $('#_mapel').val();
    var _id = firebase.database().ref('absensi/').push().key;

    var data = {

        tanggal: _tanggal,
        kelas: _kelas,
        mapel: _mapel,        
        id: _id,
    }
    $('#_tanggal').val("");
    $('#_kelas').val("");
    $('#_mapel').val("");

    submitData(data);


});


function submitData(data) {
	i = 1;
    firebase.database().ref('/absensi/' + data['id']).set(data);

}


function fetchData(data,index){
	
	if(data_id.includes(data['id'])){

		return;

	}else {

		var html = "<tr>"
                    +"<td scope='row'>"+index+"</td>"
                    +"<td>"+data['tanggal']+"</td>"
                    +"<td>"+data['kelas']+"</td>"
                    +"<td>"+data['mapel']+"</td>"
                    +"<td>"
                    	+"<button class='btn btn-sm btn-info' data-toggle='modal' onclick='getData(\""+data['id']+"\")' data-target='#editModal'>Edit</button>"
                    	+'<button class="btn btn-sm btn-danger ml-1 btn-delete" id="btn-delete" data-id="'+data['id']+'" >Hapus</button>'
                    +'</td>'
               +"</tr>";


   $('#table-body').append(html);

	}
	data_id.push(data['id']);

}


function getData(id)
{
	var data = [];
	firebase.database().ref('/absensi/' + id).once('value').then((snapshot)=>{

		data.push(snapshot.val());
		$('#_tanggalEdit').val(data[0]['tanggal']);
		$('#_kelasEdit').val(data[0]['kelas']);
		$('#_mapelEdit').val(data[0]['mapel']);
		$('#_idEdit').val(data[0]['id']);

			
	});	

}


function updateData()
{


	var _tanggal = $('#_tanggalEdit').val();
    var _kelas = $('#_kelasEdit').val();
    var _mapel = $('#_mapelEdit').val();
	var _id = $('#_idEdit').val();

    

    var data = {

        tanggal: _tanggal,
        kelas: _kelas,
        mapel: _mapel,        
    	
    }
    $('#_tanggalEdit').val("");
    $('#_kelasEdit').val("");
    $('#_mapelEdit').val("");

    firebase.database().ref('/absensi/' + _id).update(data);

    window.location.reload();


}

