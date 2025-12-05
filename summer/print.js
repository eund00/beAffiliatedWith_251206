function printOnlyArea() {
  const userNote = prompt("닉네임을 입력하세요!", "");
  const printContents = document.getElementById("printArea").innerHTML;
  const printWindow = window.open("", "_blank");
  const now = new Date();
  const dateString = now.toLocaleString();

  let html = `
    <html>
    <head>
      <title>Print</title>
      <style>
        body { margin: 0; padding: 20px; }
        .canvas { font-size: 15px;padding: 10px;width: 220px;border:5px solid #000 }
        .word-card { margin-right: 0.3rem; }
      </style>
    </head>
    <body>
      <p style="font-size: 15px;">노골적으로 부속하며<br> ㅁ(미음)까지...</p>
      <p>======= result =======<p>
      <p><span>${userNote}</span>님의 뒤섞임....</p>
      <p>↓↓↓↓↓</p>
      ${printContents}
      <p>↑↑↑↑↑</p>
      <p style="font-size:">
        뒤섞인 
        문장들에서 
        힌트를 
        찾아보아요☘️
      </p>
      <p style="font-style: italic;">======================<p>
      <p style="font-size: 13px">
        ${dateString}
      </p>
      <p></p>
      <p style="padding-bottom: 20px;">end.</p>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, 150);
}













