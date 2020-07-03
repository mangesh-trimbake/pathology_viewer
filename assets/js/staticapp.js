$(document).ready(function() {
    var viewer = new OpenSeadragon({
        id: "view",
        tileSources: "http://localhost:5000/CMU-1.tiff.dzi",
        // tileSources: "http://localhost:5000/CD3_Wholeslide_Default_Extended.tif.dzi",
        prefixUrl: "assets/images/",
        showNavigator: true,
        showRotationControl: true,
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 1,
        visibilityRatio: 1,
        zoomPerScroll: 2,
        timeout: 120000,
    });
    viewer.addHandler("open", function() {
        // To improve load times, ignore the lowest-resolution Deep Zoom
        // levels.  This is a hack: we can't configure the minLevel via
        // OpenSeadragon configuration options when the viewer is created
        // from DZI XML.
        viewer.source.minLevel = 15;
    });

    var mpp = parseFloat("{{ slide_mpp }}");
    viewer.scalebar({
        pixelsPerMeter: mpp ? (1e6 / mpp) : 0,
        xOffset: 10,
        yOffset: 10,
        barThickness: 3,
        color: '#555555',
        fontColor: '#333333',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    });
    console.log("statucapp js runing");




    $(document.body).on('change',"#filelist",function (e) {
       //doStuff
       var optVal= $("#filelist option:selected").val();
       console.log("value",optVal);
       if(optVal != ""){
         console.log("value",optVal);
         // viewer.tileSources = "http://localhost:5000/"+optVal;
         // viewer.world.resetItems();
         // viewer.remove();
         console.log(viewer);
         viewer.open( "http://localhost:5000/"+optVal+".dzi");
       }
       // alert(optVal);
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:5000/getfiles",
        contentType: false,
        processData: false,
        // data: formData,
        xhrFields: {
            withCredentials: false
        },
        success: function(response) {
            if (response.files) {

              $("#filelist").empty();
              $("#filelist").append("<option value=''>-Select-</option>")
              var files = response.files;
                for (var file_i in files) {
                    // alert(i);
                    console.log(file_i);
                    file = files[file_i];
                    $("#filelist").append("\
                        <option value='"+file['name']+"'>"+file['name']+"</option>\
                        ");


                }


            } else if (response.error) {
                return_response[0] = "error";
                return_response[1] = response;
                // return return_response;
                $("div[name='loader']").hide();
                $("i[name='btn_loader']").removeClass();
                // alert("loader ended");
                // swal(
                //     'Error!',
                //     response.error.message,
                //     'error'
                // ).catch(swal.noop);
                callback(return_response);

            };

        },
        error: function(error) {

            return_response[0] = "error";

        }

    });

});
