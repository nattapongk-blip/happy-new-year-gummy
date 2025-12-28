document.getElementById("surpriseBtn").onclick = ()=>{
  document.getElementById("surpriseBtn").style.display="none";
  textBox.classList.add("fly");

  setTimeout(startLoading, 1200); // หน่วงนิด
};
