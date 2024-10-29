document.getElementById('convertButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert("Silakan pilih file PDF terlebih dahulu.");
        return;
    }

    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    
    // Ekstrak teks dari PDF (sederhana, tidak sempurna)
    let textContent = '';
    const pages = pdfDoc.getPages();

    for (const page of pages) {
        textContent += await page.getTextContent().then(content => {
            return content.items.map(item => item.str).join(' ');
        }) + '\n';
    }

    // Buat file Word (dalam format .docx)
    const blob = new Blob([textContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'output.docx';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Unduh Word';
});
