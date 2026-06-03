
export function toggleAddbtn() {


    const btn_addStd = document.querySelector(".stdForm");


    if (btn_addStd) {

        btn_addStd.addEventListener("click", () => {
            document.getElementById("addForm").classList.toggle("open");
        })
    }
}