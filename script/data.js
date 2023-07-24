'use strict';

const btnExport = document.getElementById('export-btn');
const btnImport = document.getElementById('import-btn');
//Export
btnExport.addEventListener('click',function(){
    const isExport = confirm("Bạn có muốn tải xuống?");
    if(isExport){
        saveStaticDataToFile();
    }
});

function saveStaticDataToFile(){
    const blod = new Blod([JSON.stringify(getFromStorage("petArr"), null, 2)],{ 
        type: "application/json",
    });

    saveAs(blod,"petData.json");
}
//Import
btnImport.addEventListener('click',function(){
    if(!fileInput.value){
        alert("Vui lòng chọn file Import!");
    }else{
        const isImport = confirm("Bạn có muốn Import?");
        if(isImport){
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.addEventListener("load",function(){
                const isValidateFile = checkFile(JSON.parse(reader.result));
                if(isValidateFile){
                    saveToStorage("petArr",JSON.parse(reader.result));
                    alert("Import thành công !");
                }
            },false);

            if(file){
                reader.readAsText(file);
            }

            fileInput.value = "";
        }
    }
})

